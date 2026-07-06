import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/data";
import { type Locale, categoryLabel, localizedPath, t } from "@/lib/i18n";

export function ProductCard({ product, square = false, locale = "en" }: { product: Product; square?: boolean; locale?: Locale }) {
  const dictionary = t(locale);
  return (
    <Card className="group overflow-hidden shadow-none transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-industrial-red">
      <Link href={localizedPath(locale, `/products/${product.slug}`)} className={square ? "relative block aspect-square overflow-hidden bg-surface-container" : "relative block aspect-[4/3] overflow-hidden bg-surface-container"}>
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      </Link>
      <CardContent className="p-3 sm:p-6">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-tight text-primary">{categoryLabel(locale, product.category)}</p>
        <h3 className="mb-1 text-base font-semibold leading-tight sm:mb-2 sm:text-2xl sm:leading-8">{product.name}</h3>
        <p className="line-clamp-2 text-xs leading-4 text-muted-foreground sm:line-clamp-3 sm:text-sm sm:leading-5">{product.summary}</p>
        <div className="mt-2 hidden flex-wrap gap-2 sm:flex sm:mt-4">{product.tags.slice(0, 3).map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
        <Button asChild variant="ghost" className="mt-2 h-auto px-0 py-0 text-primary hover:bg-transparent sm:mt-4"><Link href={localizedPath(locale, `/products/${product.slug}`)}>{dictionary.productDetail.viewDetails} <ArrowUpRight className="size-4" /></Link></Button>
      </CardContent>
    </Card>
  );
}
