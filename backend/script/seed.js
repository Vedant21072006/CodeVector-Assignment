import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

import connectDB from "../db.js";
import Product from "../models/Product.js";

dotenv.config();

const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Sports",
  "Home",
  "Beauty",
  "Automotive",
  "Toys",
];

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

const generateProduct = () => {
  const createdAt = faker.date.past();

  return {
    name: faker.commerce.productName(),

    category:
      categories[
        Math.floor(Math.random() * categories.length)
      ],

    price: Number(faker.commerce.price()),

    createdAt,

    updatedAt: faker.date.between({
      from: createdAt,
      to: new Date(),
    }),
  };
};

const seedProducts = async () => {
  try {
    await connectDB();

    console.log("Connected");

    await Product.deleteMany({});

    console.log("Existing products removed");

    for (
      let inserted = 0;
      inserted < TOTAL_PRODUCTS;
      inserted += BATCH_SIZE
    ) {
      const batch = [];

      for (let i = 0; i < BATCH_SIZE; i++) {
        batch.push(generateProduct());
      }

      await Product.insertMany(batch);

      console.log(
        `Inserted ${Math.min(
          inserted + BATCH_SIZE,
          TOTAL_PRODUCTS
        )}/${TOTAL_PRODUCTS}`
      );
    }

    const count = await Product.countDocuments();

    console.log(`Final count: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedProducts();