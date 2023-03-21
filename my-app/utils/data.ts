import bcrypt from 'bcryptjs';

const data = {
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
      name: "Free Shirt",
      slug: "free-shirt",
      category: "Shirts",
      image: "/images/shirt1.png",
      price: 70,
      brand: "Nike",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular shirt",
    },
    {
      name: "Fit Shirt",
      slug: "fit-shirt",
      category: "Shirts",
      image: "/images/shirt2.png",
      price: 80,
      brand: "Adidas",
      rating: 3.2,
      numReviews: 12,
      countInStock: 30,
      description: "A popular shirt",
    },
    {
      name: "Golf Pant",
      slug: "golf-pant",
      category: "Pants",
      image: "/images/pant1.jpg",
      price: 130,
      brand: "Nike",
      rating: 4.4,
      numReviews: 33,
      countInStock: 38,
      description: "A popular pant",
    },
    {
      name: "Fit Pant",
      slug: "fit-pant",
      category: "Pants",
      image: "/images/pant2.jpg",
      price: 140,
      brand: "Adidas",
      rating: 4.2,
      numReviews: 22,
      countInStock: 42,
      description: "A popular pant",
    }
  ]
}
export default data;