import { products as fallbackProducts, Product } from "@/lib/data";

type WooProduct = {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  categories?: { name: string; slug?: string }[];
  images?: { src: string; alt?: string; name?: string }[];
  tags?: { name: string }[];
};

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeStoreUrl() {
  const configuredUrl = process.env.WOOCOMMERCE_STORE_URL?.replace(/\/$/, "");
  if (!configuredUrl) return "";
  return configuredUrl.replace(/^http:\/\//i, "https://");
}

function wooHeaders() {
  const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
  if (!key || !secret) return null;

  const token = Buffer.from(`${key}:${secret}`).toString("base64");
  return {
    Accept: "application/json",
    Authorization: `Basic ${token}`,
    "User-Agent": "EastyFurnitureFrontend/1.0"
  };
}

function cleanName(item: WooProduct) {
  const nameMap: Record<string, string> = {
    "easty-e2cd7034": "PARCO Seating",
    ding: "DING Sofa",
    kylinc: "KYLINC Qilin"
  };
  return nameMap[item.slug] || item.name;
}

function normalizeCategory(item: WooProduct) {
  const categoryText = `${item.categories?.map((category) => `${category.name} ${category.slug || ""}`).join(" ")} ${item.name} ${item.slug}`.toLowerCase();
  const parentCategory = item.categories?.[0]?.name?.toLowerCase() || "";
  const officeOverride = /whiteboard|ada|shirlly|sailay|training consultation|podium|tea table/.test(categoryText);
  if (officeOverride) return "Office Furniture";
  if (parentCategory.includes("display") || categoryText.includes("lighting")) return "Display Furniture";
  if (parentCategory.includes("hotel")) return "Hotel Furniture";
  if (parentCategory.includes("office")) return "Office Furniture";
  if (parentCategory.includes("educational")) return "Educational Furniture";
  if (categoryText.includes("display") || categoryText.includes("rack") || categoryText.includes("counter")) return "Display Furniture";
  if (categoryText.includes("hotel") || categoryText.includes("bedroom") || categoryText.includes("bedside") || categoryText.includes("dining") || categoryText.includes("suite") || categoryText.includes("tv cabinet") || categoryText.includes("public reception") || categoryText.includes("simple-convenient")) return "Hotel Furniture";
  if (categoryText.includes("educational") || categoryText.includes("classroom") || categoryText.includes("library") || categoryText.includes("apartment") || categoryText.includes("restaurant") || categoryText.includes("reading") || categoryText.includes("handcrafted")) return "Educational Furniture";
  return "Office Furniture";
}

function normalizeApplication(category: string) {
  if (category === "Educational Furniture") return "LEARN";
  if (category === "Hotel Furniture") return "STAY";
  if (category === "Display Furniture") return "STORE";
  return "WORK";
}

function uniqueImages(images: WooProduct["images"]) {
  return Array.from(new Set((images || []).map((image) => image.src).filter(Boolean)));
}

function toProduct(item: WooProduct): Product {
  const category = normalizeCategory(item);
  const gallery = uniqueImages(item.images);
  const shortDescription = item.short_description || "";
  const description = item.description || "";
  const summary = stripHtml(shortDescription || description);

  return {
    id: item.id,
    slug: item.slug || String(item.id),
    name: cleanName(item),
    category,
    application: normalizeApplication(category),
    image: gallery[0] || "/images/03_office_benching_workspace.png",
    gallery,
    summary,
    shortDescription,
    description,
    tags: item.tags?.map((tag) => tag.name).filter(Boolean).slice(0, 4) || item.categories?.map((categoryItem) => categoryItem.name).filter(Boolean).slice(0, 4) || [category],
    source: "woocommerce"
  };
}

async function getWooProducts(params: Record<string, string>) {
  try {
    const storeUrl = normalizeStoreUrl();
    const headers = wooHeaders();
    if (!storeUrl || !headers) return [];

    const endpoint = new URL("/wp-json/wc/v3/products", storeUrl);
    Object.entries(params).forEach(([key, value]) => endpoint.searchParams.set(key, value));

    const response = await fetch(endpoint, {
      headers,
      next: { revalidate: 60 }
    });

    if (!response.ok) return [];
    return ((await response.json()) as WooProduct[]).map(toProduct).filter((product) => product.name);
  } catch {
    return [];
  }
}

export async function getProducts(limit = 24): Promise<Product[]> {
  const storeUrl = normalizeStoreUrl();
  if (!storeUrl) return fallbackProducts;
  return getWooProducts({ per_page: String(limit) });
}

export async function getProduct(slug: string) {
  const storeUrl = normalizeStoreUrl();
  if (!storeUrl) return fallbackProducts.find((product) => product.slug === slug);
  const [product] = await getWooProducts({ slug, per_page: "1" });
  return product;
}
