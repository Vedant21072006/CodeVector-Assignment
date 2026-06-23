import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import { faker } from "@faker-js/faker";
import router from "./routes/productRoutes.js";
import cors from 'cors'
dotenv.config();

const app = express();

await connectDB();

//Middlewares 
app.use(cors())
app.use(express.json())
app.use('/products',router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});