import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type Locale, localizedPath } from "@/lib/i18n";
import type { WordPressPost } from "@/lib/wordpress";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export function PostCardGrid({ posts, locale }: { posts: WordPressPost[]; locale: Locale }) {
  return (
    <section className="grid gap-gutter md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <Card className="group flex flex-col overflow-hidden shadow-industrial transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-industrial-red" key={post.id}>
          <Link href={localizedPath(locale, `/blog/${post.slug}`)} className="relative block aspect-[4/3] overflow-hidden bg-surface-container">
            {post.image ? (
              <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            ) : (
              <Image src="/images/03_office_benching_workspace.png" alt="" fill className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            )}
          </Link>
          <CardContent className="flex flex-1 flex-col p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {(post.categories.length ? post.categories : ["WordPress"]).slice(0, 2).map((category) => <Badge key={category}>{category}</Badge>)}
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><CalendarDays className="size-3" /> {formatDate(post.date)}</span>
            </div>
            <h2 className="text-xl font-semibold leading-7">{post.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
            <Button asChild variant="outline" size="sm" className="mt-auto h-9 w-full text-[10px] font-bold uppercase tracking-wider sm:text-xs">
              <Link href={localizedPath(locale, `/blog/${post.slug}`)}>Read Article</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
