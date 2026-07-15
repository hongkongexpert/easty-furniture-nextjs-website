import { ExternalLink } from "lucide-react";
import { PostCardGrid } from "@/components/post-card-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLocale } from "@/lib/i18n-server";
import { getPosts } from "@/lib/wordpress";

export const metadata = {
  title: "EASTY Furniture Blog | Commercial Furniture Insights",
  description: "News, product notes, and procurement insights from EASTY Furniture."
};

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = await getPosts(24);

  return (
    <main className="container py-stack-lg">
      <header className="mb-stack-lg max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Insights</p>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl sm:leading-[56px]">Commercial Furniture Blog</h1>
        <p className="mt-3 text-base leading-6 text-muted-foreground">WordPress articles, product updates, and procurement notes for office, education, hotel, and commercial furniture projects.</p>
      </header>

      {posts.length ? (
        <PostCardGrid posts={posts} locale={locale} />
      ) : (
        <Card>
          <CardContent className="grid gap-4 p-8">
            <h2 className="text-2xl font-semibold">No WordPress posts available yet</h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">The blog page is connected to WordPress. Once published posts are available through the WordPress REST API, they will appear here automatically.</p>
            <Button asChild variant="outline" className="w-fit">
              <a href={process.env.WORDPRESS_SITE_URL || process.env.WOOCOMMERCE_STORE_URL || "#"} target="_blank" rel="noreferrer">
                Open WordPress <ExternalLink className="size-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
