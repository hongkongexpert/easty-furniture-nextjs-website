import { redirect } from "next/navigation";
import { localizedPath } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export default async function LegacyProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = await getLocale();
  const { slug } = await params;
  redirect(localizedPath(locale, `/product/${slug}`));
}
