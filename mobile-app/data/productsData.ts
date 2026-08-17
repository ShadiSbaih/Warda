export interface Product {
  id: number;
  name: string;
  title: string;
  price: string;
  numericPrice: number;
  image: any;
  category: string;
  rating: string;
  reviews: string;
  time: string;
  description: string;
  wrappingColors: string[];
  tags: string[];
  favorite?: boolean;
  isPopular?: boolean;
}

export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Red Roses Bouquet",
    title: "Red Roses Bouquet",
    price: "85",
    numericPrice: 85,
    image: require("../assets/gifts/red-roses.png"),
    category: "Rose Bouquets",
    rating: "4.9",
    reviews: "1.2K",
    time: "45 mins",
    description: "A signature luxury bouquet of premium Dutch red roses, hand-arranged with lush Italian greenery and elegant velvet wrapping. Express your deepest emotions with timeless beauty.",
    wrappingColors: ["#E53935", "#F48FB1", "#FFFFFF", "#FFD700", "#4A235A"],
    tags: ["Romantic", "Luxury", "Anniversary", "Fresh Roses"],
    isPopular: true,
  },
  {
    id: 2,
    name: "Luxury Chocolate Box",
    title: "Luxury Chocolate Box",
    price: "120",
    numericPrice: 120,
    image: require("../assets/gifts/chocolate-box.png"),
    category: "Chocolate",
    rating: "4.8",
    reviews: "890",
    time: "30 mins",
    description: "Handcrafted Belgian artisan chocolates with rich hazelnut praline, salted caramel, and dark chocolate ganache, housed in a velvet keepsake jewel box.",
    wrappingColors: ["#FFD700", "#4A235A", "#E53935", "#1E1E2D"],
    tags: ["Handmade", "Belgian", "Gourmet", "Sweet Moments"],
    isPopular: true,
  },
  {
    id: 3,
    name: "White Roses Bouquet",
    title: "White Roses Bouquet",
    price: "95",
    numericPrice: 95,
    image: require("../assets/gifts/white-roses-v2.png"),
    category: "Rose Bouquets",
    rating: "4.7",
    reviews: "640",
    time: "50 mins",
    description: "Pristine avalanche white roses symbolizing purity and new beginnings, accented with eucalyptus leaves and finished with sheer satin ribbon.",
    wrappingColors: ["#FFFFFF", "#F8BBD9", "#FFD700", "#90CAF9"],
    tags: ["Elegant", "Wedding", "Pure", "Peaceful"],
    isPopular: true,
  },
  {
    id: 4,
    name: "Joyful Mixed Bouquet",
    title: "Joyful Mixed Bouquet",
    price: "110",
    numericPrice: 110,
    image: require("../assets/gifts/mixed-bouquet.png"),
    category: "Rose Bouquets",
    rating: "4.9",
    reviews: "1.5K",
    time: "40 mins",
    description: "A vibrant seasonal symphony of pink peonies, yellow ranunculus, baby roses, and delicate lilies designed to brighten any room with radiant joy.",
    wrappingColors: ["#F48FB1", "#FFD700", "#FFFFFF", "#E91E63"],
    tags: ["Celebration", "Vibrant", "Birthday", "Cheer"],
    isPopular: true,
  },
  {
    id: 5,
    name: "Special Graduation Box",
    title: "Special Graduation Box",
    price: "150",
    numericPrice: 150,
    image: require("../assets/gifts/graduation-box-v2.png"),
    category: "Graduation Gifts",
    rating: "4.9",
    reviews: "750",
    time: "60 mins",
    description: "Honor milestone achievements with a deluxe gift set featuring a bespoke gold-embossed graduation sash, preserved royal roses, and gourmet sweets.",
    wrappingColors: ["#4A235A", "#1565C0", "#FFD700", "#1E1E2D"],
    tags: ["Graduation", "Milestone", "Gold Plated", "Prestige"],
    isPopular: true,
  },
  {
    id: 6,
    name: "Birthday Party Bouquet",
    title: "Birthday Party Bouquet",
    price: "130",
    numericPrice: 130,
    image: require("../assets/gifts/birthday-bouquet-v2.png"),
    category: "Birthdays",
    rating: "4.8",
    reviews: "980",
    time: "45 mins",
    description: "The ultimate birthday treat: dazzling pink hydrangeas, cheerful pastel roses, a celebratory mini helium balloon, and customized greeting card.",
    wrappingColors: ["#E91E63", "#FF9800", "#9C27B0", "#FFD700"],
    tags: ["Birthday", "Party", "Balloons", "Special Day"],
    isPopular: false,
  },
  {
    id: 7,
    name: "Custom Gift Hamper",
    title: "Custom Gift Hamper",
    price: "200",
    numericPrice: 200,
    image: require("../assets/gifts/custom-hamper-v2.png"),
    category: "Custom Boxes",
    rating: "5.0",
    reviews: "420",
    time: "60 mins",
    description: "A tailored wooden luxury hamper curated with French perfume, velvet preserved rose dome, luxury candle, and decadent Swiss treats.",
    wrappingColors: ["#FFD700", "#E53935", "#4A235A", "#FFFFFF"],
    tags: ["Bespoke", "Luxury Hamper", "VIP", "Perfume"],
    isPopular: true,
  },
  {
    id: 8,
    name: "Anniversary Royal Box",
    title: "Anniversary Royal Box",
    price: "180",
    numericPrice: 180,
    image: require("../assets/gifts/anniversary-box.png"),
    category: "Custom Boxes",
    rating: "4.9",
    reviews: "530",
    time: "55 mins",
    description: "Eternal preserved red roses paired with sparkling cider, heart-shaped chocolates, and a gold-trimmed photo frame for memorable romance.",
    wrappingColors: ["#E53935", "#FFD700", "#4A235A"],
    tags: ["Anniversary", "Forever Roses", "Romantic", "Luxury"],
    isPopular: false,
  },
];

export const CATEGORIES_LIST = [
  { id: 1, name: "Rose Bouquets", image: require("../assets/categories/roses.png") },
  { id: 2, name: "Chocolate", image: require("../assets/categories/chocolate.png") },
  { id: 3, name: "Graduation Gifts", image: require("../assets/categories/graduation.png") },
  { id: 4, name: "Birthdays", image: require("../assets/categories/birthday.png") },
  { id: 5, name: "Custom Boxes", image: require("../assets/categories/custom-box.png") },
];
