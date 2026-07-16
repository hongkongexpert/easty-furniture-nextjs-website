import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { localizedPath } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getPost } from "@/lib/wordpress";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog Post | EASTY Furniture" };
  return {
    title: `${post.title} | EASTY Furniture Blog`,
    description: post.excerpt
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = await getLocale();
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <main>
      <article>
        <header className="container py-stack-lg">
          <Button asChild variant="ghost" className="mb-6 px-0">
            <Link href={localizedPath(locale, "/blog")}><ArrowLeft className="size-4" /> Blog</Link>
          </Button>
          <div className="max-w-4xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <CalendarDays className="size-4" /> {formatDate(post.date)}
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl sm:leading-[56px]">{post.title}</h1>
            {post.excerpt ? <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{post.excerpt}</p> : null}
          </div>
        </header>

        <section className="bg-surface-container-lowest">
          <div className="container py-stack-lg">
            <div className="mx-auto max-w-6xl bg-surface p-5 text-base leading-8 text-foreground shadow-industrial sm:p-10">
              <div className="wordpress-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
