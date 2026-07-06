export type Product = {
  id: string | number;
  slug: string;
  name: string;
  category: string;
  application: string;
  image: string;
  gallery: string[];
  summary: string;
  shortDescription: string;
  description: string;
  tags: string[];
  source: "local" | "woocommerce";
};

export const categories = ["All Products", "Office Furniture", "Educational Furniture", "Hotel Furniture", "Display Furniture"];
export const applications = ["WORK", "LEARN", "STAY", "STORE"];

export const products: Product[] = [
  { id: "office-workstation", slug: "office-workstation-series", name: "Office Workstation", category: "Office Furniture", application: "WORK", image: "/images/03_office_benching_workspace.png", gallery: ["/images/03_office_benching_workspace.png"], summary: "Modular benching and partition systems engineered for large commercial office fit-outs.", shortDescription: "", description: "", tags: ["Modular", "Steel Wood", "Project"], source: "local" },
  { id: "chair", slug: "office-chair-series", name: "Office Chair Series", category: "Office Furniture", application: "WORK", image: "/images/05_office_chair_series.png", gallery: ["/images/05_office_chair_series.png"], summary: "Task, meeting, and staff seating for professional daily-use environments.", shortDescription: "", description: "", tags: ["Seating", "Mesh", "Ergonomic"], source: "local" },
  { id: "classroom", slug: "classroom-desk-series", name: "Classroom Desk", category: "Educational Furniture", application: "LEARN", image: "/images/13_education_classroom_scene.png", gallery: ["/images/13_education_classroom_scene.png"], summary: "Education furniture packages for classroom, library, and training environments.", shortDescription: "", description: "", tags: ["Campus", "Training", "Classroom"], source: "local" },
  { id: "lobby", slug: "lobby-lounge-series", name: "Lobby Lounge Series", category: "Hotel Furniture", application: "STAY", image: "/images/17_hotel_lobby_scene.jpg", gallery: ["/images/17_hotel_lobby_scene.jpg"], summary: "Lobby reception and lounge furniture for hotels, apartments, and public waiting areas.", shortDescription: "", description: "", tags: ["Lobby", "Hotel", "Public Area"], source: "local" },
  { id: "dorm", slug: "student-dormitory-bed", name: "Student Dormitory Bed", category: "Educational Furniture", application: "STAY", image: "/images/15_student_apartment_bed_scene.jpg", gallery: ["/images/15_student_apartment_bed_scene.jpg"], summary: "Apartment-style beds, wardrobes, desks, and compact living solutions for campuses.", shortDescription: "", description: "", tags: ["Dormitory", "Apartment", "Storage"], source: "local" },
  { id: "locker", slug: "storage-locker-series", name: "Storage Locker", category: "Office Furniture", application: "STORE", image: "/images/07_storage_locker_scene.jpg", gallery: ["/images/07_storage_locker_scene.jpg"], summary: "Durable locker and cabinet systems for offices, schools, and shared spaces.", shortDescription: "", description: "", tags: ["Locker", "Cabinet", "Steel"], source: "local" },
  { id: "reception", slug: "reception-desk-series", name: "Reception Desk", category: "Office Furniture", application: "WORK", image: "/images/04_office_reception_desk.png", gallery: ["/images/04_office_reception_desk.png"], summary: "Reception counters and service desks for front-of-house commercial projects.", shortDescription: "", description: "", tags: ["Reception", "Counter", "Custom"], source: "local" },
  { id: "qilin", slug: "qilin-series", name: "Qilin", category: "Office Furniture", application: "WORK", image: "/images/08_kylinc_trending_scene.jpg", gallery: ["/images/08_kylinc_trending_scene.jpg"], summary: "Signature executive and meeting furniture with premium commercial presence.", shortDescription: "", description: "", tags: ["Trending", "Executive", "Meeting"], source: "local" },
  { id: "shirlly", slug: "shirlly-sailay-series", name: "SHIRLLY / Sailay", category: "Educational Furniture", application: "LEARN", image: "/images/09_shirlly_training_scene.jpg", gallery: ["/images/09_shirlly_training_scene.jpg"], summary: "Flexible training tables for seminar rooms, classrooms, and corporate learning.", shortDescription: "", description: "", tags: ["Training", "Mobile", "Flexible"], source: "local" },
  { id: "whiteboard", slug: "whiteboard-plus-series", name: "Whiteboard+", category: "Educational Furniture", application: "LEARN", image: "/images/11_whiteboard_collaboration_scene.png", gallery: ["/images/11_whiteboard_collaboration_scene.png"], summary: "Collaborative whiteboard systems for learning, planning, and presentation spaces.", shortDescription: "", description: "", tags: ["Whiteboard", "Collaboration", "Mobile"], source: "local" },
  { id: "parco", slug: "parco-sofa-series", name: "PARCO Sofa Series", category: "Office Furniture", application: "STAY", image: "/images/06_sofa_lounge_scene.jpg", gallery: ["/images/06_sofa_lounge_scene.jpg"], summary: "Commercial lounge seating for reception, office, library, and hospitality spaces.", shortDescription: "", description: "", tags: ["Sofa", "Lounge", "Public"], source: "local" },
  { id: "powder", slug: "powder-coating-series", name: "Powder Coating Series", category: "Display Furniture", application: "STORE", image: "/images/12_powder_coated_counter_scene.png", gallery: ["/images/12_powder_coated_counter_scene.png"], summary: "Powder-coated furniture and counter solutions for heavy commercial applications.", shortDescription: "", description: "", tags: ["Powder Coating", "Counter", "Durable"], source: "local" }
];

export const trendingProducts = [products[7], products[8], products[9], products[10], products[11], products[2]];

export const sectors = [
  { title: "Office Furniture", text: "Workstations, executive spaces, seating, reception, and storage.", image: "/images/02_home_hero_office_workstation.png" },
  { title: "Educational Furniture", text: "Classrooms, libraries, training rooms, and campus accommodation.", image: "/images/13_education_classroom_scene.png" },
  { title: "Hotel Furniture", text: "Lobby public areas, guest rooms, suites, and apartment packages.", image: "/images/18_hotel_bedroom_scene.jpg" },
  { title: "Display Furniture", text: "Counters, racks, whiteboards, and high-traffic public furniture.", image: "/images/12_powder_coated_counter_scene.png" }
];
