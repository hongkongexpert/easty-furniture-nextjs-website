import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/data";
import { type Locale, categoryLabel, localizedPath, t } from "@/lib/i18n";

export function ProductCard({ product, square = false, locale = "en" }: { product: Product; square?: boolean; locale?: Locale }) {
  const dictionary = t(locale);
  return (
    <Card className="group flex flex-col overflow-hidden border-[#e3e3e3] bg-surface shadow-none transition-colors hover:border-[#b8b8b8]">
      <Link href={localizedPath(locale, `/product/${product.slug}`)} className={square ? "relative block aspect-square overflow-hidden bg-surface-container-low" : "relative block aspect-[4/3] overflow-hidden bg-surface-container-low"}>
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      </Link>
      <CardContent className="flex flex-1 flex-col p-3 sm:p-stack-md">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-tight text-primary">{categoryLabel(locale, product.category)}</p>
        <h3 className="mb-1 text-base font-semibold leading-tight sm:mb-2 sm:text-[24px] sm:leading-8">{product.name}</h3>
        <p className="line-clamp-2 text-xs leading-4 text-muted-foreground sm:line-clamp-3 sm:text-sm sm:leading-5">{product.summary}</p>
        <div className="mt-2 hidden flex-wrap gap-2 sm:mt-4 sm:flex">{product.tags.slice(0, 3).map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
        <div className="mt-auto pt-3 sm:pt-stack-md">
          <Button asChild variant="ghost" size="sm" className="h-9 w-full justify-start border-t border-[#e3e3e3] px-0 text-[10px] font-bold uppercase tracking-wider hover:bg-transparent hover:text-foreground sm:text-xs">
            <Link href={localizedPath(locale, `/product/${product.slug}`)}>{dictionary.productDetail.viewDetails}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
