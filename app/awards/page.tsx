import Link from "next/link";
import { PostCardGrid } from "@/components/post-card-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { localizedPath } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getPosts } from "@/lib/wordpress";

export const metadata = {
  title: "Awards | EASTY Furniture",
  description: "EASTY Furniture awards, nominations, media recognition, and brand honors."
};

export default async function AwardsPage() {
  const locale = await getLocale();
  const posts = await getPosts(24, "awards");

  return (
    <main className="container py-stack-lg">
      <header className="mb-stack-lg max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Awards</p>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl sm:leading-[56px]">Awards & Recognition</h1>
        <p className="mt-3 text-base leading-6 text-muted-foreground">Award wins, nominations, media recognition, and brand honors connected to the EASTY group.</p>
      </header>

      {posts.length ? (
        <PostCardGrid posts={posts} locale={locale} />
      ) : (
        <Card>
          <CardContent className="grid gap-4 p-8">
            <h2 className="text-2xl font-semibold">No award posts available yet</h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">Published WordPress posts categorized as Awards will appear here automatically.</p>
            <Button asChild variant="outline" className="w-fit"><Link href={localizedPath(locale, "/news")}>View News</Link></Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
