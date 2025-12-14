'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Beer,
  ChefHat,
  Coffee,
  Croissant,
  Heart,
  Home,
  IceCream,
  Leaf,
  MapPin,
  Menu,
  Moon,
  Search,
  Star,
  Sun,
  User,
  Utensils,
} from 'lucide-react';

const CATEGORIES = ['All', 'Restaurants', 'Cafes', 'Bakeries', 'Bars', 'Desserts'];

const RESTAURANTS = [
  {
    id: 1,
    name: 'Canlis',
    category: 'Restaurants',
    cuisine: 'Fine Dining',
    price: '$$$$',
    rating: '9.9',
    reviews: 2450,
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000',
    tags: ['Romantic', 'View', 'Iconic'],
    desc: "Seattle's landmark fine-dining destination offering Pacific Northwest cuisine.",
  },
  {
    id: 2,
    name: 'The Pink Door',
    category: 'Restaurants',
    cuisine: 'Italian',
    price: '$$$',
    rating: '9.7',
    reviews: 3100,
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000',
    tags: ['Burlesque', 'Patio', 'Lively'],
    desc: 'Italian-American dining with a side of trapeze entertainment.',
  },
  {
    id: 3,
    name: 'Walrus & Carpenter',
    category: 'Restaurants',
    cuisine: 'Seafood',
    price: '$$$',
    rating: '9.8',
    reviews: 1800,
    image:
      'https://images.unsplash.com/photo-1615141982880-13131e2c974c?auto=format&fit=crop&q=80&w=1000',
    tags: ['Oysters', 'Hip', 'Busy'],
    desc: 'The quintessential spot for oysters in Ballard.',
  },
  {
    id: 4,
    name: 'Deep Dive',
    category: 'Bars',
    cuisine: 'Speakeasy',
    price: '$$$',
    rating: '9.6',
    reviews: 850,
    image:
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=1000',
    tags: ['Cocktails', 'Luxury', 'Hidden'],
    desc: 'An immersive bar inside the Amazon Spheres.',
  },
  {
    id: 5,
    name: 'Kamonegi',
    category: 'Restaurants',
    cuisine: 'Japanese',
    price: '$$',
    rating: '9.5',
    reviews: 920,
    image:
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&q=80&w=1000',
    tags: ['Soba', 'Tempura', 'Cozy'],
    desc: 'Handmade soba noodles and tempura that defies physics.',
  },
  {
    id: 6,
    name: 'Pike Place Chowder',
    category: 'Restaurants',
    cuisine: 'Seafood',
    price: '$',
    rating: '9.8',
    reviews: 6500,
    image:
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&q=80&w=1000',
    tags: ['Casual', 'Tourist Fav', 'Lunch'],
    desc: 'World-famous chowder served in the heart of Pike Place Market.',
  },
  {
    id: 7,
    name: 'Sushi Kashiba',
    category: 'Restaurants',
    cuisine: 'Fine Dining',
    price: '$$$$',
    rating: '9.9',
    reviews: 1200,
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000',
    tags: ['Omakase', 'Shiro Kashiba', 'Market View'],
    desc: 'Edomae-style sushi from the legendary Shiro Kashiba.',
  },
  {
    id: 8,
    name: 'The Metropolitan Grill',
    category: 'Restaurants',
    cuisine: 'Steakhouse',
    price: '$$$$',
    rating: '9.6',
    reviews: 2100,
    image:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=1000',
    tags: ['Classic', 'Martinis', 'Business'],
    desc: 'The best steak in town. Classic dry-aged cuts in a historic atmosphere.',
  },
  {
    id: 9,
    name: 'Un Bien',
    category: 'Restaurants',
    cuisine: 'Caribbean',
    price: '$',
    rating: '9.7',
    reviews: 2800,
    image:
      'https://images.unsplash.com/photo-1563245372-f21724e3a8c9?auto=format&fit=crop&q=80&w=1000',
    tags: ['Sandwiches', 'Casual', 'Outdoor'],
    desc: 'Caribbean roast sandwiches on baguette that are messy and incredible.',
  },
  {
    id: 10,
    name: 'Spinasse',
    category: 'Restaurants',
    cuisine: 'Italian',
    price: '$$$',
    rating: '9.5',
    reviews: 1100,
    image:
      'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=1000',
    tags: ['Pasta', 'Intimate', 'Capitol Hill'],
    desc: 'Northern Italian fare featuring handmade tajarin pasta.',
  },
  {
    id: 11,
    name: "Dick's Drive-In",
    category: 'Restaurants',
    cuisine: 'Burgers',
    price: '$',
    rating: '9.4',
    reviews: 10500,
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1000',
    tags: ['Late Night', 'Iconic', 'Fast Food'],
    desc: "Seattle's original fast-food icon. Bags of burgers and hand-dipped shakes.",
  },
  {
    id: 12,
    name: 'Altura',
    category: 'Restaurants',
    cuisine: 'Fine Dining',
    price: '$$$$',
    rating: '9.8',
    reviews: 950,
    image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1000',
    tags: ['Tasting Menu', 'Italian', 'Elegant'],
    desc: 'Seasonal Italian tasting menus that change almost daily.',
  },
  {
    id: 13,
    name: 'Manolin',
    category: 'Restaurants',
    cuisine: 'Seafood',
    price: '$$',
    rating: '9.3',
    reviews: 780,
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=1000',
    tags: ['Ceviche', 'Wood Fired', 'Modern'],
    desc: 'Bright, oceanic plates and wood-fired dishes in Fremont.',
  },
  {
    id: 14,
    name: 'The Herbfarm',
    category: 'Restaurants',
    cuisine: 'Fine Dining',
    price: '$$$$',
    rating: '9.9',
    reviews: 600,
    image:
      'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=1000',
    tags: ['Farm to Table', 'Wine Pairing', 'Experience'],
    desc: 'A legendary 9-course meal with ingredients from their own gardens.',
  },
  {
    id: 15,
    name: 'Taku',
    category: 'Restaurants',
    cuisine: 'Fusion',
    price: '$$',
    rating: '9.2',
    reviews: 500,
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1000',
    tags: ['Fried Chicken', 'Karaage', 'Bar'],
    desc: "Chef Shota Nakajima's Osaka-style fried chicken joint.",
  },
  {
    id: 16,
    name: 'Pho Bac Sup Shop',
    category: 'Restaurants',
    cuisine: 'Vietnamese',
    price: '$',
    rating: '9.6',
    reviews: 1500,
    image:
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=1000',
    tags: ['Noodles', 'Comfort', 'Pho'],
    desc: "The boat-shaped restaurant that started Seattle's Pho obsession.",
  },
  {
    id: 17,
    name: "Molly Moon's",
    category: 'Desserts',
    cuisine: 'Ice Cream',
    price: '$',
    rating: '9.8',
    reviews: 4200,
    image:
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=1000',
    tags: ['Local', 'Sweet', 'Waffle Cones'],
    desc: 'Homemade ice cream with unique PNW flavors like Honey Lavender.',
  },
  {
    id: 18,
    name: 'Starbucks Reserve',
    category: 'Cafes',
    cuisine: 'Coffee',
    price: '$$',
    rating: '9.5',
    reviews: 15000,
    image:
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000',
    tags: ['Roastery', 'Experience', 'Iconic'],
    desc: 'The Willy Wonka factory of coffee. A must-see spectacle.',
  },
  {
    id: 19,
    name: "Xi'an Noodles",
    category: 'Restaurants',
    cuisine: 'Chinese',
    price: '$',
    rating: '9.4',
    reviews: 800,
    image:
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=1000',
    tags: ['Spicy', 'Hand-Pulled', 'Casual'],
    desc: 'Biang Biang noodles that are perfectly chewy and spicy.',
  },
  {
    id: 20,
    name: 'Paseo',
    category: 'Restaurants',
    cuisine: 'Caribbean',
    price: '$$',
    rating: '9.6',
    reviews: 3500,
    image:
      'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=1000',
    tags: ['Sandwiches', 'Fremont', 'Lunch'],
    desc: 'Legendary caribbean roast sandwiches dripping with garlic aioli.',
  },
  {
    id: 21,
    name: 'Piroshky Piroshky',
    category: 'Bakeries',
    cuisine: 'Russian Bakery',
    price: '$',
    rating: '9.7',
    reviews: 8200,
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000',
    tags: ['Pastries', 'Market', 'Smoked Salmon'],
    desc: 'Hand-held pies that cause lines down the block at Pike Place Market.',
  },
  {
    id: 22,
    name: 'Espresso Vivace',
    category: 'Cafes',
    cuisine: 'Coffee',
    price: '$',
    rating: '9.6',
    reviews: 2100,
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000',
    tags: ['Latte Art', 'Capitol Hill', 'Roaster'],
    desc: 'The birthplace of latte art in the US. Serious espresso for serious people.',
  },
  {
    id: 23,
    name: 'Canon',
    category: 'Bars',
    cuisine: 'Whiskey Bar',
    price: '$$$',
    rating: '9.5',
    reviews: 1400,
    image:
      'https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=1000',
    tags: ['Whiskey', 'Award Winning', 'Intimate'],
    desc: "Home to one of the world's largest spirit collections.",
  },
  {
    id: 24,
    name: 'Le Panier',
    category: 'Bakeries',
    cuisine: 'French Bakery',
    price: '$$',
    rating: '9.4',
    reviews: 3200,
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1000',
    tags: ['Croissants', 'Macarons', 'Market'],
    desc: 'Authentic French bakery bringing the scent of butter to the waterfront.',
  },
  {
    id: 25,
    name: 'Hello Robin',
    category: 'Desserts',
    cuisine: 'Cookies',
    price: '$',
    rating: '9.5',
    reviews: 900,
    image:
      'https://images.unsplash.com/photo-1499636138143-bd649043ea80?auto=format&fit=crop&q=80&w=1000',
    tags: ['Cookies', 'Macklesmore', 'Capitol Hill'],
    desc: "The cookies are soft, the ice cream is Molly Moon's, the vibe is sweet.",
  },
  {
    id: 26,
    name: 'Archipelago',
    category: 'Restaurants',
    cuisine: 'Filipino',
    price: '$$$$',
    rating: '9.8',
    reviews: 500,
    image:
      'https://images.unsplash.com/photo-1601314167099-232775b3d6fd?auto=format&fit=crop&q=80&w=1000',
    tags: ['Tasting Menu', 'Hillman City', 'Intimate'],
    desc: 'A stunning exploration of Filipino flavors using PNW ingredients.',
  },
  {
    id: 27,
    name: 'Communion',
    category: 'Restaurants',
    cuisine: 'Soul',
    price: '$$$',
    rating: '9.7',
    reviews: 1200,
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000',
    tags: ['Soul Food', 'Central District', 'Vibrant'],
    desc: "Chef Kristi Brown's 'Seattle Soul' cuisine is the heartbeat of the Central District.",
  },
  {
    id: 28,
    name: 'Beast and Cleaver',
    category: 'Restaurants',
    cuisine: 'Steakhouse',
    price: '$$$',
    rating: '9.6',
    reviews: 600,
    image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1000',
    tags: ['Butcher Shop', 'Wine', 'Meat Focused'],
    desc: 'A neighborhood butcher shop that transforms into an incredible steak bistro at night.',
  },
  {
    id: 29,
    name: 'Maneki',
    category: 'Restaurants',
    cuisine: 'Japanese',
    price: '$$',
    rating: '9.5',
    reviews: 3500,
    image:
      'https://images.unsplash.com/photo-1552590635-27c2c2128abf?auto=format&fit=crop&q=80&w=1000',
    tags: ['Historic', 'Comfort', 'Tatami Rooms'],
    desc: "Seattle's oldest Japanese restaurant (1904), serving comfort food and history.",
  },
  {
    id: 30,
    name: "L'Oursin",
    category: 'Restaurants',
    cuisine: 'French',
    price: '$$$',
    rating: '9.4',
    reviews: 850,
    image:
      'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=1000',
    tags: ['Bistro', 'Natural Wine', 'Seafood'],
    desc: 'A charming French bistro in the Central District with superb seafood and natural wines.',
  },
  {
    id: 31,
    name: 'Marination Ma Kai',
    category: 'Restaurants',
    cuisine: 'Hawaiian',
    price: '$',
    rating: '9.6',
    reviews: 4500,
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000',
    tags: ['View', 'Tacos', 'Patio'],
    desc: 'Hawaiian-Korean fusion on the water with the absolute best view of the Seattle skyline.',
  },
  {
    id: 32,
    name: 'Cafe Flora',
    category: 'Restaurants',
    cuisine: 'Vegetarian',
    price: '$$',
    rating: '9.5',
    reviews: 2800,
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1000',
    tags: ['Plant Based', 'Atrium', 'Brunch'],
    desc: 'A vegetarian landmark offering creative, hearty plant-based dishes in a sunny atrium.',
  },
  {
    id: 33,
    name: 'Homer',
    category: 'Restaurants',
    cuisine: 'Mediterranean',
    price: '$$$',
    rating: '9.6',
    reviews: 1100,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000',
    tags: ['Wood Fired', 'Hummus', 'Neighborhood'],
    desc: 'Wood-fired Mediterranean plates and soft serve in a cozy Beacon Hill setting.',
  },
  {
    id: 34,
    name: 'Local Tide',
    category: 'Restaurants',
    cuisine: 'Seafood',
    price: '$$',
    rating: '9.4',
    reviews: 600,
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=1000',
    tags: ['Crab Roll', 'Fremont', 'Modern'],
    desc: 'A bright, modern seafood spot in Fremont famous for its crab rolls and rockfish.',
  },
  {
    id: 35,
    name: 'Ltd Edition Sushi',
    category: 'Restaurants',
    cuisine: 'Sushi',
    price: '$$$$',
    rating: '9.8',
    reviews: 300,
    image:
      'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=1000',
    tags: ['Omakase', 'Capitol Hill', 'Exclusive'],
    desc: 'An intimate, exclusive sushi counter offering a playful yet serious omakase.',
  },
  {
    id: 36,
    name: 'Ahadu',
    category: 'Restaurants',
    cuisine: 'Ethiopian',
    price: '$$',
    rating: '9.4',
    reviews: 450,
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1000',
    tags: ['Butcher Shop', 'Northgate', 'Authentic'],
    desc: 'A beloved Northgate butcher shop serving incredible Ethiopian combo platters.',
  },
  {
    id: 37,
    name: 'Asadero Prime',
    category: 'Restaurants',
    cuisine: 'Steakhouse',
    price: '$$$',
    rating: '9.7',
    reviews: 1100,
    image:
      'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&q=80&w=1000',
    tags: ['Mexican', 'Wagyu', 'Mesquite'],
    desc: 'Northern Mexican-style steakhouse specializing in mesquite-grilled Wagyu.',
  },
  {
    id: 38,
    name: 'Bar del Corso',
    category: 'Restaurants',
    cuisine: 'Italian',
    price: '$$',
    rating: '9.5',
    reviews: 1300,
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=1000',
    tags: ['Pizza', 'Beacon Hill', 'Seasonal'],
    desc: 'A Beacon Hill favorite famous for its wood-fired pizza and Roman street snacks.',
  },
  {
    id: 39,
    name: 'Bongos Cafe',
    category: 'Restaurants',
    cuisine: 'Caribbean',
    price: '$$',
    rating: '9.6',
    reviews: 2200,
    image:
      'https://images.unsplash.com/photo-1596627706346-6085a6a5757d?auto=format&fit=crop&q=80&w=1000',
    tags: ['Sand', "Outdoor", "Po'Boys"],
    desc: 'Eat citrus-braised pork with your feet in the sand at this Green Lake Caribbean spot.',
  },
  {
    id: 40,
    name: 'Cafe Munir',
    category: 'Restaurants',
    cuisine: 'Middle Eastern',
    price: '$$',
    rating: '9.5',
    reviews: 600,
    image:
      'https://images.unsplash.com/photo-1544379368-20d43702d765?auto=format&fit=crop&q=80&w=1000',
    tags: ['Mezze', 'Ballard', 'Sharing'],
    desc: 'An elegant yet neighborly Ballard spot for whiskey and sprawling mezze spreads.',
  },
  {
    id: 41,
    name: 'Carnitas Michoacán',
    category: 'Restaurants',
    cuisine: 'Mexican',
    price: '$',
    rating: '9.6',
    reviews: 950,
    image:
      'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=1000',
    tags: ['Tacos', 'Beacon Hill', 'Late Night'],
    desc: 'The best carnitas in town, served with hand-pressed tortillas on Beacon Hill.',
  },
  {
    id: 42,
    name: 'Chicken Supply',
    category: 'Restaurants',
    cuisine: 'Filipino',
    price: '$$',
    rating: '9.5',
    reviews: 400,
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1000',
    tags: ['Fried Chicken', 'Gluten Free', 'Greenwood'],
    desc: 'Filipino-style fried chicken that happens to be gluten-free and totally addictive.',
  },
  {
    id: 43,
    name: 'Familyfriend',
    category: 'Restaurants',
    cuisine: 'Filipino',
    price: '$$',
    rating: '9.4',
    reviews: 350,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000',
    tags: ['Smashburger', 'Guamanian', 'Cocktails'],
    desc: 'A low-key Beacon Hill bar serving Guamanian dishes and a viral smashburger.',
  },
  {
    id: 44,
    name: "Lil Red's BBQ",
    category: 'Restaurants',
    cuisine: 'BBQ',
    price: '$$',
    rating: '9.7',
    reviews: 800,
    image:
      'https://images.unsplash.com/photo-1529193591184-b1d580690dd0?auto=format&fit=crop&q=80&w=1000',
    tags: ['Soul Food', 'Jamaican', 'Ribs'],
    desc: 'A powerhouse of Soul food and Jamaican BBQ in Columbia City.',
  },
  {
    id: 45,
    name: 'MariPili Tapas Bar',
    category: 'Restaurants',
    cuisine: 'Spanish',
    price: '$$$',
    rating: '9.5',
    reviews: 500,
    image:
      'https://images.unsplash.com/photo-1536668700506-69d6754bb70e?auto=format&fit=crop&q=80&w=1000',
    tags: ['Galician', 'Tapas', 'Gin & Tonic'],
    desc: 'An ode to Galicia featuring octopus, tapas, and distinct gin and tonics.',
  },
  {
    id: 46,
    name: 'Pancita',
    category: 'Restaurants',
    cuisine: 'Mexican',
    price: '$$',
    rating: '9.6',
    reviews: 400,
    image:
      'https://images.unsplash.com/photo-1615870216519-2f9fa575fa3c?auto=format&fit=crop&q=80&w=1000',
    tags: ['Heirloom Corn', 'Ravenna', 'Modern'],
    desc: 'Modern Mexican cuisine focused on house-nixtamalized heirloom corn tortillas.',
  },
  {
    id: 47,
    name: 'Pasta Casalinga',
    category: 'Restaurants',
    cuisine: 'Italian',
    price: '$$',
    rating: '9.5',
    reviews: 900,
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=1000',
    tags: ['Pike Place', 'Handmade', 'Lunch'],
    desc: 'A hidden gem in Pike Place Market serving rotating bowls of handmade pasta.',
  },
  {
    id: 48,
    name: 'Ramie',
    category: 'Restaurants',
    cuisine: 'Vietnamese',
    price: '$$$',
    rating: '9.6',
    reviews: 200,
    image:
      'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&q=80&w=1000',
    tags: ['Cocktails', 'Capitol Hill', 'Sophisticated'],
    desc: 'Sophisticated Vietnamese cuisine and cocktails from the siblings behind Trinh.',
  },
];

const SPOTLIGHTS = [
  {
    id: 's1',
    title: 'Omakase Experience',
    subtitle: "Chef Shiro's Seasonal Selection",
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    accent: 'bg-rose-500',
    size: 'large',
  },
  {
    id: 's2',
    title: 'Coffee Culture',
    subtitle: 'Latte Art at Vivace',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
    accent: 'bg-amber-600',
    size: 'small',
  },
  {
    id: 's3',
    title: 'Market Fresh',
    subtitle: "Piroshky's Seasonal Pies",
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    accent: 'bg-orange-500',
    size: 'small',
  },
];

const LiquidBlob = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-[100%] mix-blend-multiply filter blur-3xl opacity-70 ${className}`}
    animate={{
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, 90, 180, 270, 360],
      borderRadius: [
        '30% 70% 70% 30% / 30% 30% 70% 70%',
        '60% 40% 30% 70% / 60% 30% 70% 40%',
        '30% 70% 70% 30% / 30% 30% 70% 70%',
      ],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay,
    }}
  />
);

const LiquidText = ({
  children,
  className = '',
  isNight,
}: {
  children: React.ReactNode;
  className?: string;
  isNight: boolean;
}) => {
  return (
    <span className={`liquid-interaction ${className} ${isNight ? 'liquid-night' : 'liquid-day'}`}>
      {children}
    </span>
  );
};

const LiquidButton = ({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-8 py-3 rounded-full font-bold tracking-wide overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/10 backdrop-blur-md border border-white/20" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-400/20 to-purple-400/20" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
      <div className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-white/30 to-transparent rounded-t-full opacity-60" />
    </motion.button>
  );
};

const LiquidNavButton = ({
  active,
  children,
  onClick,
  isNight,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  isNight: boolean;
}) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      active ? 'text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
    }`}
  >
    {active && (
      <motion.div
        layoutId="activePill"
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/30"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    )}
    <span className="relative z-10">{active ? children : <LiquidText isNight={isNight}>{children}</LiquidText>}</span>
  </button>
);

export default function Home() {
  const [isNight, setIsNight] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => setIsNight(!isNight);

  const filteredRestaurants = RESTAURANTS.filter((r) => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch =
      r.name.toLowerCase().includes(normalizedQuery) ||
      r.cuisine.toLowerCase().includes(normalizedQuery) ||
      r.category.toLowerCase().includes(normalizedQuery) ||
      r.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        isNight ? 'bg-[#0f172a] text-white' : 'bg-[#f0f4f8] text-slate-900'
      } font-sans overflow-x-hidden selection:bg-cyan-300 selection:text-cyan-900`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .liquid-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .liquid-card-dark {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }
        .liquid-interaction {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          transition: background 0.2s ease;
        }
        .liquid-day {
           background-image: radial-gradient(
            circle 400px at var(--mouse-x) var(--mouse-y),
            #2563eb 0%,
            #0f172a 20%,
            #0f172a 100%
          );
        }
        .liquid-night {
          background-image: radial-gradient(
            circle 400px at var(--mouse-x) var(--mouse-y),
            #22d3ee 0%,
            #e2e8f0 25%,
            #94a3b8 100%
          );
        }
        .text-gradient-liquid {
          background: linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <LiquidBlob
          className={`top-[-10%] left-[-10%] w-[50vw] h-[50vw] ${
            isNight ? 'bg-indigo-600/30' : 'bg-cyan-300/40'
          }`}
        />
        <LiquidBlob
          className={`top-[20%] right-[-10%] w-[40vw] h-[40vw] ${
            isNight ? 'bg-purple-600/30' : 'bg-pink-300/40'
          }`}
          delay={2}
        />
        <LiquidBlob
          className={`bottom-[-10%] left-[20%] w-[60vw] h-[60vw] ${
            isNight ? 'bg-cyan-600/30' : 'bg-blue-300/40'
          }`}
          delay={4}
        />
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left z-[70]"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isNight ? 'liquid-card-dark border-b-0' : 'liquid-card border-b-0'
        } m-4 mt-4 rounded-full max-w-7xl left-1/2 -translate-x-1/2`}
      >
        <div className="px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/20">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">
              <LiquidText isNight={isNight}>Seattle Eats</LiquidText>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-full backdrop-blur-sm">
            {['Discover', 'Reservations', 'Events'].map((item) => (
              <a
                key={item}
                href="#"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isNight
                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-black hover:bg-white/50'
                }`}
              >
                <LiquidText isNight={isNight} className="text-sm font-semibold">
                  {item}
                </LiquidText>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isNight ? 'bg-white/10 hover:bg-white/20 text-cyan-300' : 'bg-black/5 hover:bg-black/10 text-amber-500'
              }`}
            >
              {isNight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <LiquidButton className={isNight ? 'text-white' : 'text-slate-900'}>Book Table</LiquidButton>
          </div>
        </div>
      </nav>

      <header className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <div
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 backdrop-blur-md border shadow-xl ${
                isNight ? 'bg-white/5 border-white/10 text-cyan-300' : 'bg-white/40 border-white/40 text-blue-600'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wider uppercase">Seattle, Washington</span>
            </div>

            <h1 className="font-serif text-7xl md:text-9xl font-bold leading-[0.95] tracking-tight mb-8 drop-shadow-sm">
              <span className="block">
                <LiquidText isNight={isNight} className="opacity-90">
                  Seattle's
                </LiquidText>
              </span>
              <span className="block pb-4">
                <LiquidText isNight={isNight} className="text-gradient-liquid">
                  Best Restaurants
                </LiquidText>
              </span>
            </h1>

            <p className={`max-w-2xl mx-auto text-xl mb-12 leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
              Experience dining through a new lens. The most fluid discovery platform for the Pacific Northwest.
            </p>

            <div className="max-w-2xl mx-auto mb-16 relative z-20">
              <div
                className={`relative group p-2 rounded-full transition-all duration-500 ${
                  isNight ? 'bg-white/5 hover:bg-white/10' : 'bg-white/30 hover:bg-white/50'
                } backdrop-blur-xl border border-white/20 shadow-2xl shadow-cyan-500/10`}
              >
                <Search className={`absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 ${isNight ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for sushi, cafes, or moods..."
                  className={`w-full pl-16 pr-8 py-4 rounded-full text-lg outline-none bg-transparent ${
                    isNight ? 'text-white placeholder:text-slate-400' : 'text-slate-900 placeholder:text-slate-500'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-20 relative z-10">
        <section className="mb-32">
          <div className="flex items-end justify-between mb-12 px-4">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">
                <LiquidText isNight={isNight}>Curated Drops</LiquidText>
              </h2>
              <p className={isNight ? 'text-slate-400' : 'text-slate-500'}>Weekly essentials for the local gourmand.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[800px] md:h-[600px]">
            {SPOTLIGHTS.map((spot, idx) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative group overflow-hidden rounded-[2rem] ${
                  spot.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-2'
                } cursor-pointer shadow-lg`}
              >
                <img
                  src={spot.image}
                  alt={spot.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isNight ? 'from-black/90 via-black/40' : 'from-slate-900/80 via-transparent'
                  } to-transparent`}
                />
                <div className="absolute inset-x-4 bottom-4 p-6 rounded-3xl liquid-card border-0 bg-black/20 backdrop-blur-md">
                  <div className={`w-12 h-1 mb-4 rounded-full ${spot.accent}`} />
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">{spot.title}</h3>
                  <p className="text-slate-200 text-sm">{spot.subtitle}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className={`relative overflow-hidden rounded-[2rem] md:col-span-1 md:row-span-2 p-8 flex flex-col justify-between ${
                isNight ? 'liquid-card-dark' : 'liquid-card'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">Liquid Gold</h3>
                <p className="text-sm opacity-70 mb-6">Exclusive perks for members.</p>
                <ul className="space-y-4">
                  {[1, 2].map((i) => (
                    <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <div className="flex-1">
                        <div className="h-2 w-20 bg-current opacity-20 rounded mb-1" />
                        <div className="h-2 w-12 bg-current opacity-10 rounded" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow">
                Unlock All
              </button>
            </motion.div>
          </div>
        </section>

        <section id="directory" className="min-h-screen">
          <div className="sticky top-24 z-30 mb-12 py-4">
            <div
              className={`flex overflow-x-auto p-2 gap-2 hide-scrollbar rounded-full max-w-fit mx-auto ${
                isNight ? 'bg-black/40 border border-white/10' : 'bg-white/40 border border-white/40'
              } backdrop-blur-xl`}
            >
              {CATEGORIES.map((cat) => (
                <LiquidNavButton key={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} isNight={isNight}>
                  {cat}
                </LiquidNavButton>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            <AnimatePresence>
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant) => (
                  <motion.article
                    key={restaurant.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`group relative rounded-[2rem] overflow-hidden transition-all duration-500 ${
                      isNight ? 'liquid-card-dark hover:bg-white/5' : 'liquid-card hover:bg-white/20'
                    }`}
                  >
                    <div className="relative h-72 overflow-hidden m-2 rounded-[1.5rem]">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-black shadow-lg">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {restaurant.rating}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-serif text-2xl font-bold">
                              <LiquidText isNight={isNight}>{restaurant.name}</LiquidText>
                            </h3>
                            {restaurant.category === 'Bakeries' && <Croissant className="w-4 h-4 text-orange-400" />}
                            {restaurant.category === 'Cafes' && <Coffee className="w-4 h-4 text-amber-600" />}
                            {restaurant.category === 'Bars' && <Beer className="w-4 h-4 text-purple-400" />}
                            {restaurant.category === 'Restaurants' && restaurant.cuisine === 'Vegetarian' && (
                              <Leaf className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <p
                            className={`text-xs font-bold uppercase tracking-wider ${
                              isNight ? 'text-cyan-400' : 'text-blue-500'
                            }`}
                          >
                            {restaurant.cuisine} • {restaurant.price}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm mb-6 line-clamp-2 leading-relaxed opacity-80">{restaurant.desc}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {restaurant.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] px-3 py-1 rounded-full border ${
                              isNight ? 'border-white/10 bg-white/5' : 'border-black/5 bg-white/40'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all ${
                          isNight ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-slate-900'
                        }`}
                      >
                        Reserve Table
                      </button>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50">
                  <div className="w-20 h-20 rounded-full bg-slate-200/20 flex items-center justify-center mb-4">
                    <Utensils className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-xl font-serif">No results found.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                    className="mt-4 text-blue-500 underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <footer className={`py-20 relative z-10 ${isNight ? 'bg-[#0a0a0a] border-t border-white/5' : 'bg-white border-t border-slate-100'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="font-serif text-3xl font-bold mb-2">Seattle Eats</h2>
              <p className="text-sm opacity-60">Crafted with ❤️ in the PNW.</p>
            </div>
            <div className="flex gap-8 text-sm font-medium opacity-60">
              <a href="#" className="hover:opacity-100 transition-opacity">
                Instagram
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Twitter
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div
        className={`fixed bottom-6 left-6 right-6 md:hidden z-50 p-4 rounded-2xl flex justify-between items-center shadow-2xl ${
          isNight ? 'liquid-card-dark' : 'liquid-card'
        }`}
      >
        <button className="p-2 opacity-100 text-current">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-2 opacity-50 text-current">
          <Search className="w-6 h-6" />
        </button>
        <button className="p-4 -mt-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/30 text-white">
          <Utensils className="w-6 h-6" />
        </button>
        <button className="p-2 opacity-50 text-current">
          <Heart className="w-6 h-6" />
        </button>
        <button className="p-2 opacity-50 text-current">
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
