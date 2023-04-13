import bcrypt from 'bcryptjs';

interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface Product {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
}

interface Data {
  users: User[];
  products: Product[];
}

export const data: Data = {
  users: [
    {
      name: 'esteban',
      email: 'cat.3st3ban@gmail.com',
      password: bcrypt.hashSync('8FsD1vs7bnLZU9ZF'),
      isAdmin: true,
    },
    {
      name: 'celestine',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    }
  ],
  products: [
    {
      name: "Black Dress",
      slug: "black-dress",
      category: "Dress",
      image: "/images/girl1.png",
      price: 70,
      brand: "Nike",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A new Dress-Fashion",
    },
    {
      name: "Blue Dress",
      slug: "blue-dress",
      category: "Dress",
      image: "/images/girl2.png",
      price: 80,
      brand: "Adidas",
      rating: 3.2,
      numReviews: 12,
      countInStock: 30,
      description: "A new Dress-Fashion",
    },
    {
      name: "Sadness Dress",
      slug: "sadness-dress",
      category: "Dress",
      image: "/images/girl3.png",
      price: 130,
      brand: "Nike",
      rating: 4.4,
      numReviews: 33,
      countInStock: 38,
      description: "A new Dress-Fashion",
    },
    {
      name: "Trendy Clothing",
      slug: "trendy-clothing",
      category: "cloth",
      image: "/images/man1.png",
      price: 140,
      brand: "Adidas",
      rating: 4.2,
      numReviews: 22,
      countInStock: 42,
      description: "Fashion wear",
    },
    {
      name: "Cool Clothes",
      slug: "cool-clothes",
      category: "cloth",
      image: "/images/man2.png",
      price: 140,
      brand: "Adidas",
      rating: 4.2,
      numReviews: 22,
      countInStock: 42,
      description: "Fashion wear",
    },
    {
      name: "Smart Cloth",
      slug: "smart-cloth",
      category: "cloth",
      image: "/images/man3.png",
      price: 140,
      brand: "Adidas",
      rating: 4.2,
      numReviews: 22,
      countInStock: 42,
      description: "Fashion wear",
    }
  ]
}
