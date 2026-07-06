import { products as fallbackProducts, Product } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

type WooProduct = {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  categories?: { name: string; slug?: string }[];
  images?: { src: string; alt?: string; name?: string }[];
  tags?: { name: string }[];
  lang?: string;
};

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeStoreUrl() {
  const configuredUrl = process.env.WOOCOMMERCE_STORE_URL?.replace(/\/$/, "");
  if (!configuredUrl) return "";
  return configuredUrl.replace(/^http:\/\//i, "https://");
}

function wooCredentials() {
  const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
  if (!key || !secret) return null;
  return { key, secret };
}

function cleanName(item: WooProduct) {
  const localizedName = localizedProductText(item.slug, item.lang).name;
  if (localizedName) return localizedName;
  const nameMap: Record<string, string> = {
    "easty-e2cd7034": "PARCO Seating",
    ding: "DING Sofa",
    kylinc: "KYLINC Qilin"
  };
  return nameMap[item.slug] || item.name;
}

function baseSlug(slug: string) {
  return slug.replace(/-(es|ar)$/, "");
}

function localizedProductText(slug: string, lang?: string) {
  const key = baseSlug(slug);
  const names: Record<string, { es?: string; ar?: string }> = {
    "whiteboard-plus": { es: "Pizarra Whiteboard+", ar: "Whiteboard+" },
    "whiteboard-plus-series": { es: "Pizarra Whiteboard+", ar: "Whiteboard+" },
    "storage-locker": { es: "Taquilla de almacenamiento", ar: "خزانة تخزين" },
    "storage-locker-series": { es: "Taquilla de almacenamiento", ar: "خزانة تخزين" },
    "sofa-collection": { es: "Colección de sofás", ar: "مجموعة الأرائك" },
    "parco-sofa-series": { es: "Serie de sofás PARCO", ar: "سلسلة أرائك PARCO" },
    "so-sofa": { es: "Sofá SO", ar: "أريكة SO" },
    "gem-sofa": { es: "Sofá GEM", ar: "أريكة GEM" },
    ding: { es: "Sofá DING", ar: "أريكة DING" },
    "easty-e2cd7034": { es: "Asientos", ar: "مقاعد" },
    "partition-workstation-series": { es: "Serie de estaciones de trabajo PARTITION", ar: "سلسلة محطات عمل PARTITION" },
    "multimedia-cabinet": { es: "Gabinete multimedia", ar: "خزانة وسائط متعددة" },
    "hor-executive-office-series-i": { es: "Serie de oficina ejecutiva HOR I", ar: "سلسلة مكتب تنفيذي HOR I" },
    "e-viva-series": { es: "Serie E-VIVA", ar: "سلسلة E-VIVA" },
    "e-siu-series": { es: "Serie E-SIU", ar: "سلسلة E-SIU" },
    "e-jane-series": { es: "Serie E-JANE", ar: "سلسلة E-JANE" },
    "benching-steel-wood-desk-series": { es: "Serie de escritorios BENCHING acero-madera", ar: "سلسلة مكاتب BENCHING من الفولاذ والخشب" },
    "balloon-height-adjustable-desk-series": { es: "Serie de escritorios regulables en altura BALLOON", ar: "سلسلة مكاتب BALLOON قابلة لتعديل الارتفاع" },
    "staff-mesh-chair": { es: "Silla de malla para personal", ar: "كرسي شبكي للموظفين" },
    "nap-chair": { es: "Silla de descanso", ar: "كرسي استراحة" },
    "meeting-chair": { es: "Silla de reunion", ar: "كرسي اجتماعات" },
    "bar-stool": { es: "Taburete de bar", ar: "كرسي بار" },
    "ather-chair-series": { es: "Serie de sillas Ather", ar: "سلسلة كراسي Ather" },
    kylinc: { es: "KYLINC Qilin", ar: "KYLINC Qilin" },
    "qilin-series": { es: "Qilin", ar: "Qilin" },
    "tv-cabinet": { es: "Mueble de TV", ar: "خزانة تلفاز" },
    "suite-wall-view": { es: "Vista de pared de suite", ar: "واجهة جدار الجناح" },
    "simple-convenient-hotel": { es: "Hotel simple y conveniente", ar: "فندق بسيط وعملي" },
    "public-reception-area": { es: "Area de recepcion publica", ar: "منطقة استقبال عامة" },
    "office-work": { es: "Trabajo de oficina", ar: "عمل مكتبي" },
    "dining-room": { es: "Comedor", ar: "غرفة طعام" },
    desk: { es: "Escritorio", ar: "مكتب" },
    "bedside-wardrobe": { es: "Armario de cabecera", ar: "خزانة بجانب السرير" },
    bedroom: { es: "Dormitorio", ar: "غرفة نوم" },
    whiteboard: { es: "Pizarra", ar: "سبورة بيضاء" },
    "training-consultation": { es: "Formacion y consulta", ar: "التدريب والاستشارات" },
    "tea-table": { es: "Mesa de te", ar: "طاولة شاي" },
    shirlly: { es: "SHIRLLY Sailay", ar: "SHIRLLY Sailay" },
    "shirlly-sailay-series": { es: "SHIRLLY / Sailay", ar: "SHIRLLY / Sailay" },
    "shirlly-negotiation-table": { es: "Mesa de negociacion SHIRLLY", ar: "طاولة تفاوض SHIRLLY" },
    podium: { es: "Podio", ar: "منصة" },
    "ada-training-table": { es: "Mesa de formacion Ada", ar: "طاولة تدريب Ada" },
    "restaurant-furniture": { es: "Mobiliario para restaurante", ar: "أثاث المطاعم" },
    library: { es: "Biblioteca", ar: "المكتبة" },
    thinkin: { es: "Sillas de aula THINKIN", ar: "كراسي صفية THINKIN" },
    "classroom-desk-series": { es: "Escritorio de aula", ar: "مكتب الفصل الدراسي" },
    "apartment-style-bed": { es: "Cama estilo apartamento", ar: "سرير بنمط الشقة" },
    "student-dormitory-bed": { es: "Cama de dormitorio estudiantil", ar: "سرير سكن الطلاب" },
    "mobile-reading-table": { es: "Mesa de lectura movil", ar: "طاولة قراءة متحركة" },
    "handcrafted-table-series": { es: "Serie de mesas artesanales", ar: "سلسلة طاولات يدوية الصنع" },
    "lighting-fixtures": { es: "Luminarias", ar: "وحدات الإضاءة" },
    "powder-coated-bar-counter": { es: "Barra con recubrimiento en polvo", ar: "منضدة بار مطلية بالبودرة" },
    "powder-coating-series": { es: "Serie de recubrimiento en polvo", ar: "سلسلة الطلاء بالبودرة" },
    "display-racks": { es: "Estanterias de exhibicion", ar: "رفوف العرض" },
    "office-workstation-series": { es: "Serie de puestos de trabajo de oficina", ar: "سلسلة محطات العمل المكتبية" },
    "office-chair-series": { es: "Serie de sillas de oficina", ar: "سلسلة كراسي المكتب" },
    "lobby-lounge-series": { es: "Serie lounge para lobby", ar: "سلسلة صالات اللوبي" },
    "reception-desk-series": { es: "Serie de mostradores de recepcion", ar: "سلسلة مكاتب الاستقبال" }
  };

  return {
    name: lang === "ar" ? names[key]?.ar : lang === "es" ? names[key]?.es : undefined
  };
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
    const credentials = wooCredentials();
    if (!storeUrl || !credentials) return [];

    const endpoint = new URL("/wp-json/wc/v3/products", storeUrl);
    Object.entries(params).forEach(([key, value]) => endpoint.searchParams.set(key, value));
    endpoint.searchParams.set("consumer_key", credentials.key);
    endpoint.searchParams.set("consumer_secret", credentials.secret);

    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "User-Agent": "EastyFurnitureFrontend/1.0"
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) return [];
    return ((await response.json()) as WooProduct[]).map(toProduct).filter((product) => product.name);
  } catch {
    return [];
  }
}

export async function getProducts(limit = 24, locale: Locale = "en"): Promise<Product[]> {
  const storeUrl = normalizeStoreUrl();
  if (!storeUrl) return fallbackProducts;
  const localizedProducts = await getWooProducts({ per_page: String(limit), status: "publish", lang: locale });
  if (localizedProducts.length || locale === "en") return localizedProducts;
  return getWooProducts({ per_page: String(limit), status: "publish", lang: "en" });
}

export async function getProduct(slug: string, locale: Locale = "en") {
  const storeUrl = normalizeStoreUrl();
  if (!storeUrl) return fallbackProducts.find((product) => product.slug === slug);
  const [product] = await getWooProducts({ slug, per_page: "1", status: "publish", lang: locale });
  if (product || locale === "en") return product || fallbackProducts.find((item) => item.slug === slug);
  const [englishProduct] = await getWooProducts({ slug, per_page: "1", status: "publish", lang: "en" });
  return englishProduct || fallbackProducts.find((item) => item.slug === slug);
}
