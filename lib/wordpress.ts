export type WordPressPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  link: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  categories: string[];
};

type WordPressPostResponse = {
  id: number;
  slug: string;
  date: string;
  link: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  categories?: number[];
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url?: string;
      media_details?: {
        width?: number;
        height?: number;
        sizes?: Record<string, { source_url?: string; width?: number; height?: number }>;
      };
    }[];
    "wp:term"?: { id: number; name: string; taxonomy: string }[][];
  };
};

type CreatePostInput = {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  status?: "draft" | "publish" | "private" | "pending";
};

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function sanitizeWordPressContent(value = "") {
  return value.replace(/<(img|iframe)\b([^>]*)>/gi, (tag, tagName: string, attributes: string) => {
    const dataSrc = attributes.match(/\sdata-src=(["'])(.*?)\1/i)?.[2];
    let cleanedAttributes = attributes;

    if (dataSrc && /\ssrc=(["'])data:image\/svg\+xml[^"']*\1/i.test(cleanedAttributes)) {
      cleanedAttributes = cleanedAttributes.replace(/\ssrc=(["'])(.*?)\1/i, ` src="${dataSrc}"`);
    } else if (dataSrc && !/\ssrc=/i.test(cleanedAttributes)) {
      cleanedAttributes += ` src="${dataSrc}"`;
    }

    cleanedAttributes = cleanedAttributes
      .replace(/\sdata-src=(["'])(.*?)\1/gi, "")
      .replace(/\sdata-load-mode=(["']?)[^"'\s>]+\1/gi, "")
      .replace(/\sclass=(["'])(.*?)\1/gi, (_match, quote: string, classNames: string) => {
        const cleanedClassNames = classNames
          .split(/\s+/)
          .filter((className) => className && className !== "lazyload" && className !== "lazyloaded")
          .join(" ");

        return cleanedClassNames ? ` class=${quote}${cleanedClassNames}${quote}` : "";
      });

    return `<${tagName}${cleanedAttributes}>`;
  });
}

function wordpressSiteUrl() {
  const configuredUrl = (process.env.WORDPRESS_SITE_URL || process.env.WOOCOMMERCE_STORE_URL || "").replace(/\/$/, "");
  if (!configuredUrl) return "";
  return configuredUrl.replace(/^http:\/\//i, "https://");
}

function wordpressAuthHeader() {
  const username = process.env.WORDPRESS_USERNAME;
  const password = process.env.WORDPRESS_APP_PASSWORD?.replace(/\s+/g, "");
  if (!username || !password) return "";
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

function postEndpoint(path = "/wp-json/wp/v2/posts") {
  const siteUrl = wordpressSiteUrl();
  if (!siteUrl) return null;
  return new URL(path, siteUrl);
}

async function getCategoryId(slug: string) {
  const endpoint = postEndpoint("/wp-json/wp/v2/categories");
  if (!endpoint) return null;

  endpoint.searchParams.set("slug", slug);

  const authHeader = wordpressAuthHeader();
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
      ...(authHeader ? { Authorization: authHeader } : {})
    },
    next: { revalidate: 300 }
  });

  if (!response.ok) return null;
  const [category] = (await response.json()) as { id: number }[];
  return category?.id || null;
}

function toPost(post: WordPressPostResponse): WordPressPost {
  const title = decodeEntities(stripHtml(post.title?.rendered || "Untitled"));
  const excerpt = decodeEntities(stripHtml(post.excerpt?.rendered || ""));
  const content = sanitizeWordPressContent(post.content?.rendered || "");
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const mediaSizes = media?.media_details?.sizes;
  const image = mediaSizes?.large?.source_url || mediaSizes?.medium_large?.source_url || mediaSizes?.full?.source_url || media?.source_url;
  const imageWidth = mediaSizes?.large?.width || mediaSizes?.medium_large?.width || mediaSizes?.full?.width || media?.media_details?.width;
  const imageHeight = mediaSizes?.large?.height || mediaSizes?.medium_large?.height || mediaSizes?.full?.height || media?.media_details?.height;
  const categories = post._embedded?.["wp:term"]?.flat().filter((term) => term.taxonomy === "category").map((term) => term.name) || [];

  return {
    id: post.id,
    slug: post.slug,
    title,
    excerpt,
    content,
    date: post.date,
    link: post.link,
    image,
    imageWidth,
    imageHeight,
    categories
  };
}

export async function getPosts(limit = 12, categorySlug?: string): Promise<WordPressPost[]> {
  const endpoint = postEndpoint();
  if (!endpoint) return [];

  endpoint.searchParams.set("per_page", String(limit));
  endpoint.searchParams.set("status", "publish");
  endpoint.searchParams.set("_embed", "1");
  if (categorySlug) {
    const categoryId = await getCategoryId(categorySlug);
    if (!categoryId) return [];
    endpoint.searchParams.set("categories", String(categoryId));
  }

  const authHeader = wordpressAuthHeader();
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
      ...(authHeader ? { Authorization: authHeader } : {})
    },
    next: { revalidate: 300 }
  });

  if (!response.ok) return [];
  return ((await response.json()) as WordPressPostResponse[]).map(toPost);
}

export async function getPost(slug: string): Promise<WordPressPost | null> {
  const endpoint = postEndpoint();
  if (!endpoint) return null;

  endpoint.searchParams.set("slug", slug);
  endpoint.searchParams.set("status", "publish,draft,private,pending");
  endpoint.searchParams.set("_embed", "1");

  const authHeader = wordpressAuthHeader();
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
      ...(authHeader ? { Authorization: authHeader } : {})
    },
    next: { revalidate: 300 }
  });

  if (!response.ok) return null;
  const [post] = (await response.json()) as WordPressPostResponse[];
  return post ? toPost(post) : null;
}

export async function createPost(input: CreatePostInput) {
  const endpoint = postEndpoint();
  const authHeader = wordpressAuthHeader();
  if (!endpoint || !authHeader) {
    throw new Error("WordPress site URL, username, and application password are required.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: authHeader,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      slug: input.slug,
      status: input.status || "draft"
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`WordPress post creation failed: ${response.status} ${message}`);
  }

  return toPost((await response.json()) as WordPressPostResponse);
}
