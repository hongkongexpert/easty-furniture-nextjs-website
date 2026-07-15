import Link from "next/link";
import { PostCardGrid } from "@/components/post-card-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { localizedPath } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getPosts } from "@/lib/wordpress";

export const metadata = {
  title: "News | EASTY Furniture",
  description: "Latest EASTY Furniture news, announcements, awards, and company updates."
};

export default async function NewsPage() {
  const locale = await getLocale();
  const posts = await getPosts(24, "news");

  return (
    <main className="container py-stack-lg">
      <header className="mb-stack-lg max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">News</p>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl sm:leading-[56px]">EASTY Furniture News</h1>
        <p className="mt-3 text-base leading-6 text-muted-foreground">Company updates, media coverage, award announcements, and event news from EASTY.</p>
      </header>

      {posts.length ? (
        <PostCardGrid posts={posts} locale={locale} />
      ) : (
        <Card>
          <CardContent className="grid gap-4 p-8">
            <h2 className="text-2xl font-semibold">No news posts available yet</h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">Published WordPress posts categorized as News will appear here automatically.</p>
            <Button asChild variant="outline" className="w-fit"><Link href={localizedPath(locale, "/blog")}>View Blog</Link></Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
