export const locales = ["en", "es", "ar"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "es" || value === "ar";
}

export function localizedPath(locale: Locale, path: string) {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return locale === "en" ? cleanPath : `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}

export function switchLocalePath(locale: Locale, pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const rest = isLocale(segments[0]) ? segments.slice(1) : segments;
  const path = `/${rest.join("/")}`;
  return localizedPath(locale, path === "/" ? "/" : path);
}

export function dirForLocale(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export function t(locale: Locale) {
  return translations[locale];
}

export function categoryLabel(locale: Locale, category: string) {
  return (translations[locale].categories as Record<string, string>)[category] || category;
}

export const translations = {
  en: {
    languageName: "English",
    nav: {
      productSeries: "Product Series",
      about: "About Us",
      contact: "Contact",
      language: "Language",
      requestQuote: "Request Quote",
      home: "Home",
      products: "Products",
      news: "News",
      awards: "Awards",
      blog: "Blog",
      company: "Company",
      procurement: "Procurement",
      manufacturing: "Manufacturing"
    },
    categories: {
      "All Products": "All Products",
      "Office Furniture": "Office Furniture",
      "Educational Furniture": "Educational Furniture",
      "Hotel Furniture": "Hotel Furniture",
      "Display Furniture": "Display Furniture"
    },
    footer: {
      intro: "Industrial commercial furniture manufacturing for office, education, hotel, apartment, and public-space procurement.",
      support: "Request catalog, technical specification, and quotation support.",
      contactSupport: "Contact Support"
    },
    cta: {
      title: "Ready to scale your facility?",
      text: "Download our technical specifications or speak with a procurement specialist about your next large-scale project.",
      request: "Request Quote",
      catalog: "Catalog"
    },
    home: {
      heroTitle: "Professional Commercial Furniture Manufacturer",
      heroText: "Quality commercial furniture from a 135,000 sqm Foshan production base, integrating R&D, design, production, sales, and service for office, education, hotel, apartment, and public-space projects.",
      exploreProducts: "Explore Products",
      companyProfile: "Company Profile",
      proof: [
        ["135,000 sqm", "Foshan intelligent production base"],
        ["400+", "Production equipment across workshop systems"],
        ["ISO systems", "ISO9001, ISO14001, ISO45001, CQC, Ten Ring, Greenguard"],
        ["PDF proof", "Company profile, product line, and equipment documents available"]
      ],
      visualEyebrow: "Visual Experience",
      visualTitle: "Product Animations & Videos",
      videos: [
        ["Product Animations", "Precision-engineered 3D visualizations of our latest hardware."],
        ["Product Scene Videos", "Dynamic walkthroughs in live commercial environments."],
        ["Case Study Videos", "Real-world deployments and logistical success stories."],
        ["Manufacturing Process", "Direct insight into high-scale production capabilities."]
      ],
      hotEyebrow: "Hot Series",
      hotTitle: "Trending Products",
      sectorsTitle: "Specialized Sectors",
      sectorsText: "Project references cover government, finance, healthcare, legal/service, IT/media, real estate, food, manufacturing, logistics, education/public, and other procurement sectors."
    },
    about: {
      heroTitle: "Global Industrial Excellence",
      heroText: "EASTY Furniture provides quality commercial furniture through a 135,000 sqm Foshan manufacturing base, integrated design capability, and project-focused service.",
      exploreFacility: "Explore Our Facility",
      viewPdf: "View Company PDF",
      heritage: "Established Heritage",
      storyTitle: "Better Furniture, Better Space",
      story: [
        "EASTY focuses on the relationship between furniture and space: good furniture supports a better workplace, and a better space gives furniture its full value.",
        "The company integrates R&D, design, production, sales, and service to provide office, education, healthcare, hotel, kitchen/bath, and whole-home commercial furniture systems.",
        "Its market promise is direct: better quality, better price, and better service for customers who need dependable project delivery."
      ],
      productSystemEyebrow: "Product System",
      productSystemTitle: "Commercial Furniture Coverage from Office to Education and Hotel Projects",
      productSystemText: "The product-line PDF positions EASTY as a professional commercial furniture manufacturer with a broad product map for executive areas, workstations, public spaces, learning environments, hospitality, storage, and apartment-style combinations.",
      productSystems: ["Executive area", "Steel-wood desks", "Screen workstations", "Open public areas", "Storage systems", "Education furniture", "Hotel products", "Apartment combinations"],
      statsTitle: "Manufacturing Power in Numbers",
      statsText: "Verified scale that supports large international furniture projects.",
      stats: [
        ["135,000 sqm", "Foshan Production Base", "Intelligent furniture manufacturing base with imported equipment and digital production workflows."],
        ["400+", "Production Equipment", "Workshop capacity across metal, cutting, panel, injection, screen, packaging, and finishing processes."],
        ["300+", "Partners", "A commercial furniture network built for procurement, project coordination, and long-term service."]
      ],
      patent: "R&D Patents Listed in Company History",
      values: [
        ["Space Strategy", "EASTY connects furniture with spatial planning so clients can reduce fit-out waste, improve area efficiency, and support long-term organizational growth."],
        ["Full-System Delivery", "R&D, design, production, sales, and service are integrated into one coordinated commercial furniture workflow."],
        ["Certified Quality", "The company profile lists ISO9001, ISO14001, ISO45001, CQC, Ten Ring, Greenguard, high-tech enterprise, engineering technology center, and industry-leading honors."]
      ],
      referencesEyebrow: "Reference Projects",
      referencesTitle: "Project Experience Across Procurement Sectors",
      referencesText: "The client reference PDF organizes EASTY projects across major B2B sectors, supporting procurement teams that need proven delivery experience beyond a single market.",
      projectSectors: ["Government", "Finance", "Healthcare", "Legal and service", "IT and media", "Construction and real estate", "Food and dining", "Manufacturing", "Transport and logistics", "Education and public"],
      networkTitle: "Strategic Global Network",
      networkText: "EASTY combines international coordination with Foshan manufacturing strength to support commercial furniture projects from planning to delivery.",
      hqTitle: "Headquarters | Hong Kong",
      hqText: "International coordination, trade support, and customer communication for overseas projects.",
      baseTitle: "Manufacturing Base | Foshan",
      baseText: "135,000 sqm production base with CNC machining, automated processing, finishing, warehouse, and seating production capabilities.",
      mapText: "Map Interface Interactive Hub",
      docsEyebrow: "Company Documents",
      docsTitle: "Relevant PDFs",
      docsText: "These website-ready PDFs are taken from the source folder and linked here for buyers who need company proof, production capability, and procurement review material.",
      openPdf: "Open PDF",
      resources: [
        ["Company Profile About Extract", "Official company background, development history, philosophy, production base, R&D, service, and product system pages from the 2026 B2B profile.", "PDF - 32 MB"],
        ["Product Line Summary", "Product-line map covering executive areas, steel-wood desks, screen workstations, open public areas, education furniture, hotel products, storage, bar tables, and related systems.", "PDF - 4 MB"],
        ["Client Reference Sectors", "Reference-sector overview showing EASTY project coverage across government, finance, healthcare, legal/service, IT/media, real estate, food, manufacturing, logistics, education/public, and other sectors.", "PDF - 1 MB"],
        ["Production Equipment Advantages", "Workshop and equipment overview covering welding robots, laser cutting, BIESSE processing, edge banding, injection, and handling systems.", "PDF - 13 MB"]
      ],
      finalCtaTitle: "Ready to Transform Your Project?",
      finalCtaText: "Join global enterprises that trust EASTY for high-performance, precision-engineered furniture solutions.",
      partner: "Partner With Us",
      requestTour: "Request Factory Tour"
    },
    productSeries: {
      crumb: "Product Catalog",
      title: "Product Solutions",
      text: "High-performance industrial furniture engineered for modern commercial, educational, and hospitality environments.",
      category: "Category",
      application: "Application",
      download: "Catalog Download",
      sort: "Sort",
      count: "product series"
    },
    productDetail: {
      productSeries: "Product Series",
      industrial: "Industrial-grade material platform",
      fast: "Fast project configuration support",
      acoustic: "Acoustic and privacy options",
      request: "Request Quote",
      download: "Download Spec",
      procurement: "Available for project procurement and container shipment.",
      excellence: "Agile Benching Excellence",
      excellenceText1: "Constructed with industrial-grade materials, EASTY workstations are built to withstand the rigors of 24/7 corporate operations.",
      excellenceText2: "Every component is selected for durability, repeatability, and large-scale commercial integration.",
      specs: "Technical Specifications",
      related: "Related Products",
      viewDetails: "View Details",
      inquiry: "Inquiry"
    },
    manufacturing: {
      eyebrow: "Manufacturing",
      title: "Industrial capability for commercial furniture supply",
      text: "Factory capability and process visibility for serious procurement teams.",
      process: [
        ["R&D and Engineering", "Product development, structure planning, and production preparation."],
        ["Surface and Coating", "Powder coating, panel processing, and finish coordination."],
        ["Packing Control", "Project packing, labeling, and shipment preparation."],
        ["Logistics Support", "Bulk export coordination and container loading."]
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "Global Inquiry & Project Support",
      text: "Submit product requirements, quantities, drawings, destination, and project timeline for a professional B2B quotation.",
      formTitle: "Professional Inquiry Form",
      fields: ["Full Name", "Company Name", "Work Email", "Phone / WhatsApp", "Country", "Product Category", "Project Type", "Quantity / Budget", "Message"],
      placeholders: ["Your name", "Company name", "email@company.com", "+852...", "Destination market", "Select category", "e.g. Office Fit-out, Hospitality", "Approximate quantity or procurement budget", "Tell us series, quantity, destination, timeline, and specification needs."],
      upload: "Upload drawings or BOQ placeholder",
      submit: "Submit Inquiry",
      save: "Save Draft",
      hq: "Global Headquarters",
      hqItems: ["Foshan, Guangdong, China", "inquiry@eastyfurniture.com", "Professional B2B project support"],
      logistics: "Logistics & Port Hub",
      logisticsItems: ["Export-ready documentation", "Container loading coordination", "Project shipment planning"],
      faq: "Frequently Asked Inquiries",
      faqItems: ["Office Fit-out", "Education Furniture Package", "Hotel Room Furniture", "Bulk Storage Systems"]
    }
  },
  es: {
    languageName: "Español",
    nav: {
      productSeries: "Series de Productos",
      about: "Sobre Nosotros",
      contact: "Contacto",
      language: "Idioma",
      requestQuote: "Solicitar Cotización",
      home: "Inicio",
      products: "Productos",
      news: "Noticias",
      awards: "Premios",
      blog: "Blog",
      company: "Empresa",
      procurement: "Compras",
      manufacturing: "Fabricación"
    },
    categories: {
      "All Products": "Todos los Productos",
      "Office Furniture": "Mobiliario de Oficina",
      "Educational Furniture": "Mobiliario Educativo",
      "Hotel Furniture": "Mobiliario Hotelero",
      "Display Furniture": "Mobiliario de Exhibición"
    },
    footer: {
      intro: "Fabricación de mobiliario comercial industrial para oficinas, educación, hoteles, apartamentos y espacios públicos.",
      support: "Solicite catálogo, especificaciones técnicas y soporte de cotización.",
      contactSupport: "Soporte de Contacto"
    },
    cta: {
      title: "¿Listo para escalar su proyecto?",
      text: "Descargue nuestras especificaciones técnicas o hable con un especialista en compras sobre su próximo proyecto a gran escala.",
      request: "Solicitar Cotización",
      catalog: "Catálogo"
    },
    home: {
      heroTitle: "Fabricante Profesional de Mobiliario Comercial",
      heroText: "Mobiliario comercial de calidad desde una base de producción de 135.000 m2 en Foshan, integrando I+D, diseño, producción, ventas y servicio para proyectos de oficina, educación, hoteles, apartamentos y espacios públicos.",
      exploreProducts: "Explorar Productos",
      companyProfile: "Perfil de Empresa",
      proof: [
        ["135.000 m2", "Base de producción inteligente en Foshan"],
        ["400+", "Equipos de producción en sistemas de taller"],
        ["Sistemas ISO", "ISO9001, ISO14001, ISO45001, CQC, Ten Ring, Greenguard"],
        ["Prueba PDF", "Perfil de empresa, línea de productos y documentos de equipos disponibles"]
      ],
      visualEyebrow: "Experiencia Visual",
      visualTitle: "Animaciones y Videos de Producto",
      videos: [
        ["Animaciones de Producto", "Visualizaciones 3D de precisión de nuestro hardware más reciente."],
        ["Videos de Escenas", "Recorridos dinámicos en entornos comerciales reales."],
        ["Videos de Casos", "Implementaciones reales y éxito logístico."],
        ["Proceso de Fabricación", "Visión directa de la capacidad de producción a gran escala."]
      ],
      hotEyebrow: "Series Destacadas",
      hotTitle: "Productos Tendencia",
      sectorsTitle: "Sectores Especializados",
      sectorsText: "Las referencias de proyectos cubren gobierno, finanzas, salud, servicios legales, TI/medios, inmobiliario, alimentos, manufactura, logística, educación/público y otros sectores de compras."
    },
    about: {
      heroTitle: "Excelencia Industrial Global",
      heroText: "EASTY Furniture ofrece mobiliario comercial de calidad mediante una base de fabricación de 135.000 m2 en Foshan, capacidad de diseño integrada y servicio enfocado en proyectos.",
      exploreFacility: "Explorar la Fábrica",
      viewPdf: "Ver PDF de Empresa",
      heritage: "Trayectoria Establecida",
      storyTitle: "Mejor Mobiliario, Mejor Espacio",
      story: [
        "EASTY se enfoca en la relación entre mobiliario y espacio: un buen mobiliario sostiene un mejor lugar de trabajo, y un mejor espacio da pleno valor al mobiliario.",
        "La empresa integra I+D, diseño, producción, ventas y servicio para ofrecer sistemas de mobiliario comercial para oficina, educación, salud, hotel, cocina/baño y soluciones integrales.",
        "Su promesa de mercado es directa: mejor calidad, mejor precio y mejor servicio para clientes que necesitan una entrega confiable de proyectos."
      ],
      productSystemEyebrow: "Sistema de Producto",
      productSystemTitle: "Cobertura de Mobiliario Comercial para Oficina, Educación y Hoteles",
      productSystemText: "El PDF de línea de productos posiciona a EASTY como fabricante profesional de mobiliario comercial con un mapa amplio para áreas ejecutivas, estaciones de trabajo, espacios públicos, aprendizaje, hospitalidad, almacenamiento y combinaciones para apartamentos.",
      productSystems: ["Área ejecutiva", "Mesas acero-madera", "Puestos con panel", "Áreas públicas abiertas", "Sistemas de almacenamiento", "Mobiliario educativo", "Productos hoteleros", "Combinaciones de apartamento"],
      statsTitle: "Potencia de Fabricación en Cifras",
      statsText: "Escala verificada para respaldar grandes proyectos internacionales.",
      stats: [
        ["135.000 m2", "Base de Producción en Foshan", "Base inteligente de fabricación con equipos importados y flujos digitales de producción."],
        ["400+", "Equipos de Producción", "Capacidad de taller en metal, corte, paneles, inyección, pantallas, embalaje y acabados."],
        ["300+", "Socios", "Red de mobiliario comercial para compras, coordinación de proyectos y servicio a largo plazo."]
      ],
      patent: "Patentes de I+D Indicadas en la Historia de la Empresa",
      values: [
        ["Estrategia Espacial", "EASTY conecta mobiliario con planificación espacial para reducir desperdicio, mejorar eficiencia y apoyar el crecimiento organizacional."],
        ["Entrega Integral", "I+D, diseño, producción, ventas y servicio se integran en un flujo coordinado de mobiliario comercial."],
        ["Calidad Certificada", "El perfil indica ISO9001, ISO14001, ISO45001, CQC, Ten Ring, Greenguard, empresa de alta tecnología, centro de ingeniería y honores del sector."]
      ],
      referencesEyebrow: "Proyectos de Referencia",
      referencesTitle: "Experiencia de Proyecto en Sectores de Compra",
      referencesText: "El PDF de referencias organiza proyectos EASTY en grandes sectores B2B, apoyando a equipos de compras que necesitan experiencia probada.",
      projectSectors: ["Gobierno", "Finanzas", "Salud", "Legal y servicios", "TI y medios", "Construcción e inmobiliario", "Alimentos y comedor", "Manufactura", "Transporte y logística", "Educación y público"],
      networkTitle: "Red Global Estratégica",
      networkText: "EASTY combina coordinación internacional con fortaleza de fabricación en Foshan para apoyar proyectos desde la planificación hasta la entrega.",
      hqTitle: "Sede | Hong Kong",
      hqText: "Coordinación internacional, soporte comercial y comunicación con clientes para proyectos en el extranjero.",
      baseTitle: "Base de Fabricación | Foshan",
      baseText: "Base de 135.000 m2 con mecanizado CNC, procesamiento automatizado, acabados, almacén y producción de asientos.",
      mapText: "Centro Interactivo de Mapa",
      docsEyebrow: "Documentos de Empresa",
      docsTitle: "PDFs Relevantes",
      docsText: "Estos PDFs listos para web provienen de la carpeta fuente y sirven a compradores que necesitan prueba de empresa, capacidad de producción y material de revisión.",
      openPdf: "Abrir PDF",
      resources: [
        ["Extracto del Perfil de Empresa", "Antecedentes, historia, filosofía, base de producción, I+D, servicio y sistema de productos del perfil B2B 2026.", "PDF - 32 MB"],
        ["Resumen de Línea de Productos", "Mapa de productos para áreas ejecutivas, mesas acero-madera, puestos, áreas públicas, educación, hotel, almacenamiento y sistemas relacionados.", "PDF - 4 MB"],
        ["Sectores de Referencia", "Resumen de sectores con proyectos en gobierno, finanzas, salud, legal/servicios, TI/medios, inmobiliario, alimentos, manufactura, logística, educación/público y más.", "PDF - 1 MB"],
        ["Ventajas de Equipos de Producción", "Resumen de taller y equipos: robots de soldadura, corte láser, procesamiento BIESSE, canto, inyección y manipulación.", "PDF - 13 MB"]
      ],
      finalCtaTitle: "¿Listo para Transformar su Proyecto?",
      finalCtaText: "Únase a empresas globales que confían en EASTY para soluciones de mobiliario de alto rendimiento y precisión.",
      partner: "Trabaje con Nosotros",
      requestTour: "Solicitar Visita a Fábrica"
    },
    productSeries: {
      crumb: "Catálogo de Productos",
      title: "Soluciones de Producto",
      text: "Mobiliario industrial de alto rendimiento para entornos comerciales, educativos y hoteleros modernos.",
      category: "Categoría",
      application: "Aplicación",
      download: "Descargar Catálogo",
      sort: "Ordenar",
      count: "series de productos"
    },
    productDetail: {
      productSeries: "Series de Productos",
      industrial: "Plataforma de materiales de grado industrial",
      fast: "Soporte rápido de configuración de proyecto",
      acoustic: "Opciones acústicas y de privacidad",
      request: "Solicitar Cotización",
      download: "Descargar Especificación",
      procurement: "Disponible para compras por proyecto y envío en contenedor.",
      excellence: "Excelencia en Bancadas Ágiles",
      excellenceText1: "Construidas con materiales industriales, las estaciones EASTY resisten operaciones corporativas intensivas.",
      excellenceText2: "Cada componente se selecciona por durabilidad, repetibilidad e integración comercial a gran escala.",
      specs: "Especificaciones Técnicas",
      related: "Productos Relacionados",
      viewDetails: "Ver Detalles",
      inquiry: "Consulta"
    },
    manufacturing: {
      eyebrow: "Fabricación",
      title: "Capacidad industrial para suministro de mobiliario comercial",
      text: "Capacidad de fábrica y visibilidad de procesos para equipos de compras profesionales.",
      process: [
        ["I+D e Ingeniería", "Desarrollo de producto, planificación estructural y preparación de producción."],
        ["Superficie y Recubrimiento", "Pintura en polvo, procesamiento de paneles y coordinación de acabados."],
        ["Control de Embalaje", "Embalaje de proyecto, etiquetado y preparación de envío."],
        ["Soporte Logístico", "Coordinación de exportación y carga de contenedores."]
      ]
    },
    contact: {
      eyebrow: "Contacto",
      title: "Consulta Global y Soporte de Proyecto",
      text: "Envíe requisitos, cantidades, planos, destino y cronograma para una cotización B2B profesional.",
      formTitle: "Formulario Profesional de Consulta",
      fields: ["Nombre Completo", "Empresa", "Email Laboral", "Teléfono / WhatsApp", "País", "Categoría de Producto", "Tipo de Proyecto", "Cantidad / Presupuesto", "Mensaje"],
      placeholders: ["Su nombre", "Nombre de la empresa", "email@empresa.com", "+852...", "Mercado de destino", "Seleccione categoría", "Ej. acondicionamiento de oficina, hotelería", "Cantidad aproximada o presupuesto", "Indique serie, cantidad, destino, cronograma y necesidades técnicas."],
      upload: "Subir planos o BOQ",
      submit: "Enviar Consulta",
      save: "Guardar Borrador",
      hq: "Sede Global",
      hqItems: ["Foshan, Guangdong, China", "inquiry@eastyfurniture.com", "Soporte profesional para proyectos B2B"],
      logistics: "Centro Logístico y Puerto",
      logisticsItems: ["Documentación lista para exportación", "Coordinación de carga de contenedor", "Planificación de envío por proyecto"],
      faq: "Consultas Frecuentes",
      faqItems: ["Proyecto de oficina", "Paquete de mobiliario educativo", "Mobiliario de habitación hotelera", "Sistemas de almacenamiento a granel"]
    }
  },
  ar: {
    languageName: "العربية",
    nav: {
      productSeries: "سلاسل المنتجات",
      about: "من نحن",
      contact: "اتصل بنا",
      language: "اللغة",
      requestQuote: "طلب عرض سعر",
      home: "الرئيسية",
      products: "المنتجات",
      news: "News",
      awards: "Awards",
      blog: "Blog",
      company: "الشركة",
      procurement: "المشتريات",
      manufacturing: "التصنيع"
    },
    categories: {
      "All Products": "كل المنتجات",
      "Office Furniture": "أثاث المكاتب",
      "Educational Furniture": "الأثاث التعليمي",
      "Hotel Furniture": "أثاث الفنادق",
      "Display Furniture": "أثاث العرض"
    },
    footer: {
      intro: "تصنيع أثاث تجاري صناعي للمكاتب والتعليم والفنادق والشقق والمساحات العامة.",
      support: "اطلب الكتالوج والمواصفات الفنية ودعم عروض الأسعار.",
      contactSupport: "دعم التواصل"
    },
    cta: {
      title: "هل أنت جاهز لتوسيع مشروعك؟",
      text: "حمّل المواصفات الفنية أو تحدث مع مختص مشتريات حول مشروعك الكبير القادم.",
      request: "طلب عرض سعر",
      catalog: "الكتالوج"
    },
    home: {
      heroTitle: "مصنع محترف للأثاث التجاري",
      heroText: "أثاث تجاري عالي الجودة من قاعدة إنتاج في فوشان بمساحة 135,000 متر مربع، مع تكامل البحث والتطوير والتصميم والإنتاج والمبيعات والخدمة لمشاريع المكاتب والتعليم والفنادق والشقق والمساحات العامة.",
      exploreProducts: "استعرض المنتجات",
      companyProfile: "ملف الشركة",
      proof: [
        ["135,000 م2", "قاعدة إنتاج ذكية في فوشان"],
        ["400+", "معدات إنتاج عبر أنظمة الورش"],
        ["أنظمة ISO", "ISO9001 و ISO14001 و ISO45001 و CQC و Ten Ring و Greenguard"],
        ["ملفات PDF", "ملف الشركة وخط المنتجات ووثائق المعدات متاحة"]
      ],
      visualEyebrow: "تجربة مرئية",
      visualTitle: "رسوم وفيديوهات المنتجات",
      videos: [
        ["رسوم المنتجات", "تصورات ثلاثية الأبعاد دقيقة لأحدث التجهيزات."],
        ["فيديوهات المشاهد", "جولات ديناميكية في بيئات تجارية واقعية."],
        ["فيديوهات دراسات الحالة", "تنفيذات حقيقية ونجاحات لوجستية."],
        ["عملية التصنيع", "نظرة مباشرة على قدرات الإنتاج واسعة النطاق."]
      ],
      hotEyebrow: "السلاسل الرائجة",
      hotTitle: "منتجات رائجة",
      sectorsTitle: "قطاعات متخصصة",
      sectorsText: "تشمل مراجع المشاريع الحكومة والتمويل والرعاية الصحية والخدمات القانونية وتقنية المعلومات والإعلام والعقارات والأغذية والتصنيع واللوجستيات والتعليم والقطاع العام وقطاعات مشتريات أخرى."
    },
    about: {
      heroTitle: "تميز صناعي عالمي",
      heroText: "توفر EASTY Furniture أثاثاً تجارياً عالي الجودة عبر قاعدة تصنيع في فوشان بمساحة 135,000 متر مربع وقدرات تصميم متكاملة وخدمة موجهة للمشاريع.",
      exploreFacility: "استكشف المصنع",
      viewPdf: "عرض ملف الشركة PDF",
      heritage: "خبرة راسخة",
      storyTitle: "أثاث أفضل، مساحة أفضل",
      story: [
        "تركز EASTY على العلاقة بين الأثاث والمساحة: الأثاث الجيد يدعم بيئة عمل أفضل، والمساحة الأفضل تمنح الأثاث قيمته الكاملة.",
        "تدمج الشركة البحث والتطوير والتصميم والإنتاج والمبيعات والخدمة لتقديم أنظمة أثاث للمكاتب والتعليم والرعاية الصحية والفنادق والمطابخ والحمامات والحلول المتكاملة.",
        "وعدها في السوق واضح: جودة أفضل وسعر أفضل وخدمة أفضل للعملاء الذين يحتاجون إلى تسليم موثوق للمشاريع."
      ],
      productSystemEyebrow: "نظام المنتجات",
      productSystemTitle: "تغطية الأثاث التجاري من المكاتب إلى التعليم والفنادق",
      productSystemText: "يعرض ملف خط المنتجات EASTY كمصنع محترف للأثاث التجاري مع خريطة واسعة للمناطق التنفيذية ومحطات العمل والمساحات العامة وبيئات التعليم والضيافة والتخزين وتركيبات الشقق.",
      productSystems: ["منطقة تنفيذية", "طاولات فولاذ وخشب", "محطات عمل بحواجز", "مساحات عامة مفتوحة", "أنظمة تخزين", "أثاث تعليمي", "منتجات فندقية", "تركيبات شقق"],
      statsTitle: "قوة التصنيع بالأرقام",
      statsText: "حجم موثق يدعم المشاريع الدولية الكبيرة.",
      stats: [
        ["135,000 م2", "قاعدة إنتاج فوشان", "قاعدة تصنيع ذكية بأجهزة مستوردة وتدفقات إنتاج رقمية."],
        ["400+", "معدات إنتاج", "قدرات ورش تشمل المعدن والقطع والألواح والحقن والحواجز والتغليف والتشطيب."],
        ["300+", "شركاء", "شبكة أثاث تجاري للمشتريات وتنسيق المشاريع والخدمة طويلة الأمد."]
      ],
      patent: "براءات بحث وتطوير مذكورة في تاريخ الشركة",
      values: [
        ["استراتيجية المساحة", "تربط EASTY الأثاث بتخطيط المساحة لتقليل الهدر وتحسين كفاءة المساحة ودعم نمو المؤسسات."],
        ["تسليم متكامل", "البحث والتطوير والتصميم والإنتاج والمبيعات والخدمة مدمجة في مسار عمل واحد للأثاث التجاري."],
        ["جودة معتمدة", "يذكر ملف الشركة ISO9001 و ISO14001 و ISO45001 و CQC و Ten Ring و Greenguard وشهادات ومراكز تكريم صناعية."]
      ],
      referencesEyebrow: "مشاريع مرجعية",
      referencesTitle: "خبرة مشاريع عبر قطاعات المشتريات",
      referencesText: "ينظم ملف مراجع العملاء مشاريع EASTY عبر قطاعات B2B رئيسية لدعم فرق المشتريات التي تحتاج إلى خبرة تنفيذ مثبتة.",
      projectSectors: ["حكومة", "تمويل", "رعاية صحية", "قانون وخدمات", "تقنية وإعلام", "بناء وعقارات", "أغذية ومطاعم", "تصنيع", "نقل ولوجستيات", "تعليم وقطاع عام"],
      networkTitle: "شبكة عالمية استراتيجية",
      networkText: "تجمع EASTY بين التنسيق الدولي وقوة التصنيع في فوشان لدعم مشاريع الأثاث التجاري من التخطيط إلى التسليم.",
      hqTitle: "المقر | هونغ كونغ",
      hqText: "تنسيق دولي ودعم تجاري وتواصل مع العملاء للمشاريع الخارجية.",
      baseTitle: "قاعدة التصنيع | فوشان",
      baseText: "قاعدة إنتاج 135,000 متر مربع مع تشغيل CNC ومعالجة آلية وتشطيب ومستودعات وإنتاج مقاعد.",
      mapText: "مركز خريطة تفاعلي",
      docsEyebrow: "وثائق الشركة",
      docsTitle: "ملفات PDF ذات صلة",
      docsText: "هذه الملفات الجاهزة للويب مأخوذة من مجلد المصدر وتفيد المشترين الذين يحتاجون إلى إثبات الشركة وقدرات الإنتاج ومواد المراجعة.",
      openPdf: "فتح PDF",
      resources: [
        ["مقتطف ملف الشركة", "خلفية الشركة وتاريخ التطور والفلسفة وقاعدة الإنتاج والبحث والتطوير والخدمة ونظام المنتجات من ملف B2B 2026.", "PDF - 32 MB"],
        ["ملخص خط المنتجات", "خريطة منتجات للمناطق التنفيذية والطاولات الفولاذية الخشبية ومحطات العمل والمساحات العامة والتعليم والفنادق والتخزين والأنظمة المرتبطة.", "PDF - 4 MB"],
        ["قطاعات مراجع العملاء", "ملخص قطاعات يوضح تغطية مشاريع EASTY في الحكومة والتمويل والرعاية الصحية والخدمات وتقنية المعلومات والعقارات والأغذية والتصنيع واللوجستيات والتعليم وغيرها.", "PDF - 1 MB"],
        ["مزايا معدات الإنتاج", "نظرة عامة على الورش والمعدات: روبوتات اللحام والقطع بالليزر ومعالجة BIESSE والتلبيس والحقن وأنظمة المناولة.", "PDF - 13 MB"]
      ],
      finalCtaTitle: "هل أنت جاهز لتحويل مشروعك؟",
      finalCtaText: "انضم إلى الشركات العالمية التي تثق في EASTY لحلول أثاث عالية الأداء ومصممة بدقة.",
      partner: "اعمل معنا",
      requestTour: "طلب جولة في المصنع"
    },
    productSeries: {
      crumb: "كتالوج المنتجات",
      title: "حلول المنتجات",
      text: "أثاث صناعي عالي الأداء للبيئات التجارية والتعليمية والفندقية الحديثة.",
      category: "الفئة",
      application: "التطبيق",
      download: "تحميل الكتالوج",
      sort: "فرز",
      count: "سلسلة منتجات"
    },
    productDetail: {
      productSeries: "سلاسل المنتجات",
      industrial: "منصة مواد بدرجة صناعية",
      fast: "دعم سريع لتكوين المشروع",
      acoustic: "خيارات صوتية وخصوصية",
      request: "طلب عرض سعر",
      download: "تحميل المواصفة",
      procurement: "متاح لمشتريات المشاريع والشحن بالحاويات.",
      excellence: "تميز محطات العمل المرنة",
      excellenceText1: "مصنوعة من مواد صناعية، صممت محطات EASTY لتحمل التشغيل التجاري المكثف.",
      excellenceText2: "يتم اختيار كل مكون للمتانة وقابلية التكرار والتكامل التجاري واسع النطاق.",
      specs: "المواصفات الفنية",
      related: "منتجات ذات صلة",
      viewDetails: "عرض التفاصيل",
      inquiry: "استفسار"
    },
    manufacturing: {
      eyebrow: "التصنيع",
      title: "قدرة صناعية لتوريد الأثاث التجاري",
      text: "قدرة المصنع ووضوح العمليات لفرق المشتريات الجادة.",
      process: [
        ["البحث والتطوير والهندسة", "تطوير المنتج وتخطيط الهيكل والتحضير للإنتاج."],
        ["السطح والطلاء", "الطلاء بالبودرة ومعالجة الألواح وتنسيق التشطيبات."],
        ["مراقبة التعبئة", "تغليف المشروع ووضع الملصقات والتحضير للشحن."],
        ["الدعم اللوجستي", "تنسيق التصدير بالجملة وتحميل الحاويات."]
      ]
    },
    contact: {
      eyebrow: "اتصل بنا",
      title: "دعم عالمي للاستفسارات والمشاريع",
      text: "أرسل متطلبات المنتج والكميات والرسومات والوجهة والجدول الزمني للحصول على عرض سعر B2B احترافي.",
      formTitle: "نموذج استفسار احترافي",
      fields: ["الاسم الكامل", "اسم الشركة", "البريد العملي", "الهاتف / واتساب", "الدولة", "فئة المنتج", "نوع المشروع", "الكمية / الميزانية", "الرسالة"],
      placeholders: ["اسمك", "اسم الشركة", "email@company.com", "+852...", "سوق الوجهة", "اختر الفئة", "مثال: تجهيز مكتب، ضيافة", "الكمية التقريبية أو الميزانية", "اذكر السلسلة والكمية والوجهة والجدول الزمني والاحتياجات الفنية."],
      upload: "رفع الرسومات أو BOQ",
      submit: "إرسال الاستفسار",
      save: "حفظ مسودة",
      hq: "المقر العالمي",
      hqItems: ["فوشان، غوانغدونغ، الصين", "inquiry@eastyfurniture.com", "دعم احترافي لمشاريع B2B"],
      logistics: "مركز اللوجستيات والميناء",
      logisticsItems: ["وثائق جاهزة للتصدير", "تنسيق تحميل الحاويات", "تخطيط شحن المشروع"],
      faq: "استفسارات شائعة",
      faqItems: ["تجهيز مكتب", "حزمة أثاث تعليمي", "أثاث غرف فندقية", "أنظمة تخزين بالجملة"]
    }
  }
} as const;

export type Dictionary = (typeof translations)[Locale];
