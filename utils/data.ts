import { ContentType } from "@/types";

export const BACKEND_URL = "https://www.otekis.com/api/slash-api"; // process.env.EXPO_PUBLIC_BACKEND_URL!;

// export const CATEGORIES = [
//   "Mode",
//   "Beauté",
//   "Technologie",
//   "Maison & Déco",
//   "Sport",
//   "Cuisine",
//   "Jeux",
//   "Voyage",
//   "Musique",
//   "Art",
// ];

export const CATEGORIES = [
  {
    value: "vetements",
    label: "Vetements et chaussures",
  },
  {
    value: "accessoires",
    label: "Accessoires et Bijoux",
  },
  {
    value: "cosmetiques",
    label: "Cosmetiques et Beauté",
  },
  {
    value: "electroniques",
    label: "Electroniques",
  },
  {
    value: "aliments",
    label: "Nourriture et boissons",
  },
  {
    value: "autres",
    label: "Autres",
  },
];

export const ANIMALS = [
  "chat",
  "chien",
  "lion",
  "tigre",
  "éléphant",
  "ours",
  "loup",
  "renard",
  "panda",
  "girafe",
  "zèbre",
  "kangourou",
  "hippopotame",
  "rhinocéros",
  "singe",
  "gorille",
  "chimpanzé",
  "dauphin",
  "requin",
  "baleine",
  "pingouin",
  "paon",
  "aigle",
  "faucon",
];

export const ADJECTIVES = [
  "rapide",
  "intelligent",
  "courageux",
  "sauvage",
  "fier",
  "curieux",
  "malin",
  "fort",
  "agile",
  "loyal",
  "timide",
  "joueur",
  "doux",
  "énergique",
  "vif",
  "sociable",
  "protecteur",
  "indépendant",
  "mystérieux",
  "gracieux",
  "puissant",
];

export const CONTENTS: ContentType[] = [
  {
    product: {
      id: "p1",
      title: "Casque Bluetooth NovaSound X1",
      description:
        "Casque sans fil avec réduction active du bruit et 30h d’autonomie. Design épuré et confortable.",
      images: [
        "https://images.unsplash.com/photo-1741958206402-652e35bfc69a?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1741957878935-558bd0505041?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      category: "Électronique",
      type: "Audio",
      price: 129.99,
      stock: 32,
      brand: "NovaSound",
      discountPercentage: 10,
      currency: "USD",
      target: "unisex",
    },
    shop: {
      id: "s1",
      name: "TechZone",
      description:
        "Boutique spécialisée dans les accessoires high-tech modernes.",
      logo: "https://images.unsplash.com/photo-1643449689391-f798261a16ee?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    url: "https://techzone.shop/products/nova-x1",
  },
  {
    product: {
      id: "p2",
      title: "Sneakers AirFlow One",
      description:
        "Chaussures de sport légères et respirantes, idéales pour le running et le quotidien.",
      images: [
        "https://images.unsplash.com/photo-1623970437305-af22610a0f46?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1560906977-d266eff65a1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      category: "Mode",
      type: "Chaussures",
      price: 89.99,
      stock: 58,
      brand: "AirFlow",
      discountPercentage: 15,
      currency: "USD",
      target: "man",
    },
    shop: {
      id: "s2",
      name: "UrbanStyle",
      description: "Marque de vêtements streetwear et lifestyle.",
      logo: "https://images.unsplash.com/photo-1722842655644-869cb12728e7?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    url: "https://urbanstyle.shop/products/airflow-one",
  },
  {
    product: {
      id: "p3",
      title: "Montre connectée Zenith Fit Pro",
      description:
        "Suivi de santé complet : fréquence cardiaque, sommeil, SpO2 et notifications intelligentes.",
      images: [
        "https://images.unsplash.com/photo-1670082379834-be7116cf7d70?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1702620717855-22a66cd29dc7?q=80&w=993&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      category: "Technologie",
      type: "Accessoire",
      price: 199.99,
      stock: 20,
      brand: "Zenith",
      // discountPercentage: 20,
      currency: "USD",
      target: "unisex",
    },
    shop: {
      id: "s3",
      name: "SmartWorld",
      description: "Tout pour la maison et le quotidien connecté.",
      logo: "https://images.unsplash.com/photo-1633421878925-ac220d8f6e4f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    url: "https://smartworld.io/products/zenith-fit-pro",
  },
  {
    product: {
      id: "p4",
      title: "Sac à dos Explorer 35L",
      description:
        "Résistant à l’eau, multi-compartiments et design moderne. Parfait pour le voyage et la randonnée.",
      images: [
        "https://images.unsplash.com/photo-1621609764049-5ee1db3d7c35?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1625060371499-8a01616c86f0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      category: "Voyage",
      type: "Accessoire",
      price: 59.99,
      stock: 75,
      brand: "TrailX",
      // discountPercentage: 12,
      currency: "USD",
      target: "unisex",
    },
    shop: {
      id: "s4",
      name: "AdventureGear",
      description: "Spécialiste des équipements d’extérieur et d’aventure.",
      logo: "https://images.unsplash.com/photo-1588098596266-0b5fa8e94712?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    url: "https://adventuregear.fr/products/explorer-35l",
  },
  {
    product: {
      id: "p5",
      title: "Lampe LED Ambiance Aurora",
      description:
        "Lampe d’ambiance connectée multicolore, contrôlable via smartphone. Créez votre atmosphère idéale.",
      images: [
        "https://images.unsplash.com/photo-1632525903092-91f792babec8?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1655153375803-efd113330c97?q=80&w=966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      category: "Maison",
      type: "Décoration",
      price: 39.99,
      stock: 120,
      brand: "AuroraHome",
      discountPercentage: 25,
      currency: "USD",
      target: "unisex",
    },
    shop: {
      id: "s5",
      name: "HomeLight",
      description: "Décoration et accessoires pour un intérieur moderne.",
      logo: "https://images.unsplash.com/photo-1699649169796-85ef07ed3707?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    url: "https://homelight.fr/products/aurora-led",
  },
];
