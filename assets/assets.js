import logo from "./morven.png";
import search_icon from "./search_icon.svg";
import user_icon from "./user_icon.svg";
import cart_icon from "./cart_icon.svg";
import add_icon from "../assets-optimized/add_icon.webp";
import order_icon from "../assets-optimized/order_icon.webp";

import instagram_icon from "./instagram_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import box_icon from "./box_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import menu_icon from "./menu_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import increase_arrow from "./increase_arrow.svg";
import decrease_arrow from "./decrease_arrow.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import my_location_image from "./my_location_image.svg";
import arrow_icon_white from "./arrow_icon_white.svg";
import heart_icon from "./heart_icon.svg";
import star_icon from "./star_icon.svg";
import redirect_icon from "./redirect_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";

// Optimized WebP images
import header_headphone_image from "../assets-optimized/header_headphone_image.webp";
import header_playstation_image from "../assets-optimized/header_playstation_image.webp";
import header_macbook_image from "../assets-optimized/header_macbook_image.webp";

import macbook_image from "../assets-optimized/macbook_image.webp";
import bose_headphone_image from "../assets-optimized/bose_headphone_image.webp";
import apple_earphone_image from "../assets-optimized/apple_earphone_image.webp";
import samsung_s23phone_image from "../assets-optimized/samsung_s23phone_image.webp";
import venu_watch_image from "../assets-optimized/venu_watch_image.webp";

import upload_area from "../assets-optimized/upload_area.webp";
import cannon_camera_image from "../assets-optimized/cannon_camera_image.webp";
import sony_airbuds_image from "../assets-optimized/sony_airbuds_image.webp";
import asus_laptop_image from "../assets-optimized/asus_laptop_image.webp";
import projector_image from "../assets-optimized/projector_image.webp";
import playstation_image from "../assets-optimized/playstation_image.webp";

import girl_with_headphone_image from "../assets-optimized/girl_with_headphone_image.webp";
import girl_with_earphone_image from "../assets-optimized/girl_with_earphone_image.webp";
import md_controller_image from "../assets-optimized/md_controller_image.webp";
import sm_controller_image from "../assets-optimized/sm_controller_image.webp";
import jbl_soundbox_image from "../assets-optimized/jbl_soundbox_image.webp";
import boy_with_laptop_image from "../assets-optimized/boy_with_laptop_image.webp";

import checkmark from "../assets-optimized/checkmark.webp";

import product_details_page_apple_earphone_image1 from "../assets-optimized/product_details_page_apple_earphone_image1.webp";
import product_details_page_apple_earphone_image2 from "../assets-optimized/product_details_page_apple_earphone_image2.webp";
import product_details_page_apple_earphone_image3 from "../assets-optimized/product_details_page_apple_earphone_image3.webp";
import product_details_page_apple_earphone_image4 from "../assets-optimized/product_details_page_apple_earphone_image4.webp";
import product_details_page_apple_earphone_image5 from "../assets-optimized/product_details_page_apple_earphone_image5.webp";

// Your fashion images
import fashionImage from "../assets-optimized/265A1182.webp";
import suit1 from "../assets-optimized/Suit 1.webp";
import suit2 from "../assets-optimized/Suit 2.webp";

export const assets = {
  logo,
  search_icon,
  user_icon,
  cart_icon,
  add_icon,
  order_icon,

  instagram_icon,
  facebook_icon,
  twitter_icon,

  box_icon,
  product_list_icon,
  menu_icon,
  arrow_icon,
  increase_arrow,
  decrease_arrow,
  arrow_right_icon_colored,
  my_location_image,
  arrow_icon_white,
  heart_icon,
  star_icon,
  redirect_icon,
  star_dull_icon,

  header_headphone_image,
  header_playstation_image,
  header_macbook_image,

  macbook_image,
  bose_headphone_image,
  apple_earphone_image,
  samsung_s23phone_image,
  venu_watch_image,

  upload_area,
  cannon_camera_image,
  sony_airbuds_image,
  asus_laptop_image,
  projector_image,
  playstation_image,

  girl_with_headphone_image,
  girl_with_earphone_image,
  md_controller_image,
  sm_controller_image,
  jbl_soundbox_image,
  boy_with_laptop_image,

  product_details_page_apple_earphone_image1,
  product_details_page_apple_earphone_image2,
  product_details_page_apple_earphone_image3,
  product_details_page_apple_earphone_image4,
  product_details_page_apple_earphone_image5,

  checkmark,

  // Grosvenor / Fashion images
  fashionImage,
  suit1,
  suit2,
};

export const BagIcon = () => {
  return (
    <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
    </svg>
  )
}

export const CartIcon = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.75 0.75H3.75L5.76 10.7925C5.82858 11.1378 6.01643 11.448 6.29066 11.6687C6.56489 11.8895 6.90802 12.0067 7.26 12H14.55C14.902 12.0067 15.2451 11.8895 15.5193 11.6687C15.7936 11.448 15.9814 11.1378 16.05 10.7925L17.25 4.5H4.5M7.5 15.75C7.5 16.1642 7.16421 16.5 6.75 16.5C6.33579 16.5 6 16.1642 6 15.75C6 15.3358 6.33579 15 6.75 15C7.16421 15 7.5 15.3358 7.5 15.75ZM15.75 15.75C15.75 16.1642 15.4142 16.5 15 16.5C14.5858 16.5 14.25 16.1642 14.25 15.75C14.25 15.3358 14.5858 15 15 15C15.4142 15 15.75 15.3358 15.75 15.75Z" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <rect width="18" height="18" fill="white" />
      </defs>
    </svg>

  )
}

export const BoxIcon = () => (
  <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.875 1.25 3.875 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z" />
  </svg>
);

export const HomeIcon = () => (
  <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
  </svg>
);

export const productsDummyData = [
  {
    _id: "fashion001",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Classic Grey Suit",
    description:
      "A sophisticated classic grey suit crafted for a refined and professional appearance. Perfect for business meetings, formal events and special occasions.",
    price: 3500,
    offerPrice: 3200,
    image: [fashionImage],
    category: "Suits",
    date: Date.now(),
    __v: 0,
  },

  {
    _id: "fashion002",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Executive Brown Suit",
    description:
      "A premium executive brown suit designed for business meetings, formal occasions and an elegant professional appearance.",
    price: 3800,
    offerPrice: 3500,
    image: [suit1],
    category: "Suits",
    date: Date.now(),
    __v: 0,
  },

  {
    _id: "fashion003",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Luxury Yellow Suit",
    description:
      "A distinctive premium yellow suit designed for a confident and sophisticated appearance. Ideal for celebrations, special events and statement looks.",
    price: 4000,
    offerPrice: 3600,
    image: [suit2],
    category: "Suits",
    date: Date.now(),
    __v: 0,
  },

  {
    _id: "fashion004",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Premium White Suit",
    description:
      "A clean and elegant premium white suit suitable for weddings, celebrations and formal occasions.",
    price: 3800,
    offerPrice: 3400,
    image: [fashionImage],
    category: "Suits",
    date: Date.now(),
    __v: 0,
  },

  {
    _id: "fashion005",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Grosvenor Black Suit",
    description:
      "A timeless black suit featuring a sophisticated cut, premium finish and elegant construction for the modern gentleman.",
    price: 4000,
    offerPrice: 3600,
    image: [suit1],
    category: "Suits",
    date: Date.now(),
    __v: 0,
  },

  {
    _id: "fashion006",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Grosvenor Grey Suit",
    description:
      "A refined grey suit designed for modern gentlemen who appreciate quality, comfort and timeless style.",
    price: 3800,
    offerPrice: 3500,
    image: [suit2],
    category: "Suits",
    date: Date.now(),
    __v: 0,
  },

  {
    _id: "fashion007",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Premium Formal Suit",
    description:
      "A premium formal suit designed to deliver a sharp and confident appearance for weddings, ceremonies, corporate events and formal occasions.",
    price: 3900,
    offerPrice: 3500,
    image: [fashionImage],
    category: "Suits",
    date: Date.now(),
    __v: 0,
  },

  {
    _id: "fashion008",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Business Suit",
    description:
      "A sophisticated business suit perfect for professional settings, corporate meetings and important occasions.",
    price: 3700,
    offerPrice: 3300,
    image: [suit1],
    category: "Suits",
    date: Date.now(),
    __v: 0,
  },

  {
    _id: "fashion009",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Elegant Menswear",
    description:
      "Elegant menswear designed for a polished and confident appearance, combining refined style with premium craftsmanship.",
    price: 3600,
    offerPrice: 3300,
    image: [suit2],
    category: "Menswear",
    date: Date.now(),
    __v: 0,
  },

  {
    _id: "fashion010",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Premium Ties Collection",
    description:
      "A refined collection of premium ties designed to complete your formal look and add a sophisticated finishing touch.",
    price: 800,
    offerPrice: 650,
    image: [fashionImage],
    category: "Accessories",
    date: Date.now(),
    __v: 0,
  },
];

export const userDummyData = {
  "_id": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
  "name": "GreatStack",
  "email": "admin@example.com",
  "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycnlnUnFiUDBYT2dEZ2h1ZmRXcGlpdWV5OXoiLCJyaWQiOiJ1c2VyXzJzWkZIUzFVSUl5c0p5RFZ6Q3BRaFVoVElodyJ9",
  "cartItems": {
    // "67a1f4e43f34a77b6dde9144": 3
  },
  "__v": 0
}

export const orderDummyData = [
  {
    "_id": "67a20934b3db72db5cc77b2b",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "items": [
      {
        "product": {
          "_id": "67a1f4e43f34a77b6dde9144",
          "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
          "name": "Apple AirPods Pro",
          "description": "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
          "price": 499.99,
          "offerPrice": 399.99,
          "image": [
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/lrllaprpos2pnp5c9pyy.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667238/jqotgy2rvm36vfjv6lxl.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667238/niw7tqxvjsxt7wcehxeo.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/h8cq4x9cfzqzwaiarvpk.png"
          ],
          "category": "Earphone",
          "date": 1738667236865,
          "__v": 0
        },
        "quantity": 1,
        "_id": "67a20934b3db72db5cc77b2c"
      }
    ],
    "amount": 406.99,
    "address": {
      "_id": "67a1e4233f34a77b6dde9055",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "fullName": "GreatStack",
      "phoneNumber": "0123456789",
      "pincode": 654321,
      "area": "Main Road , 123 Street, G Block",
      "city": "City",
      "state": "State",
      "__v": 0
    },
    "status": "Order Placed",
    "date": 1738672426822,
    "__v": 0
  },
  {
    "_id": "67a20949b3db72db5cc77b2e",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "items": [
      {
        "product": {
          "_id": "67a1f52e3f34a77b6dde914a",
          "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
          "name": "Bose QuietComfort 45",
          "description": "The Bose QuietComfort 45 headphones are engineered for exceptional sound quality and unparalleled noise cancellation. With a 24-hour battery life and comfortable, lightweight design, these headphones deliver premium audio for any environment. Whether on a flight, in the office, or at home, the Bose QC45 blocks out distractions, offering an immersive listening experience.",
          "price": 429.99,
          "offerPrice": 329.99,
          "image": [
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667311/m16coelz8ivkk9f0nwrz.png"
          ],
          "category": "Headphone",
          "date": 1738667310300,
          "__v": 0
        },
        "quantity": 1,
        "_id": "67a20949b3db72db5cc77b2f"
      }
    ],
    "amount": 335.99,
    "address": {
      "_id": "67a1e4233f34a77b6dde9055",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "fullName": "GreatStack",
      "phoneNumber": "0123456789",
      "pincode": 654321,
      "area": "Main Road , 123 Street, G Block",
      "city": "City",
      "state": "State",
      "__v": 0
    },
    "status": "Order Placed",
    "date": 1738672448031,
    "__v": 0
  },
  {
    "_id": "67a209bab3db72db5cc77b34",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "items": [
      {
        "product": {
          "_id": "67a1f4e43f34a77b6dde9144",
          "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
          "name": "Apple AirPods Pro",
          "description": "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
          "price": 499.99,
          "offerPrice": 399.99,
          "image": [
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/lrllaprpos2pnp5c9pyy.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667238/jqotgy2rvm36vfjv6lxl.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667238/niw7tqxvjsxt7wcehxeo.png",
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/h8cq4x9cfzqzwaiarvpk.png"
          ],
          "category": "Earphone",
          "date": 1738667236865,
          "__v": 0
        },
        "quantity": 1,
        "_id": "67a209bab3db72db5cc77b35"
      }
    ],
    "amount": 406.99,
    "address": {
      "_id": "67a1e4233f34a77b6dde9055",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "fullName": "GreatStack",
      "phoneNumber": "0123456789",
      "pincode": 654321,
      "area": "Main Road , 123 Street, G Block",
      "city": "City",
      "state": "State",
      "__v": 0
    },
    "status": "Order Placed",
    "date": 1738672560698,
    "__v": 0
  }
]

export const addressDummyData = [
  {
    "_id": "67a1e4233f34a77b6dde9055",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "fullName": "GreatStack",
    "phoneNumber": "0123456789",
    "pincode": 654321,
    "area": "Main Road , 123 Street, G Block",
    "city": "City",
    "state": "State",
    "__v": 0
  }
]