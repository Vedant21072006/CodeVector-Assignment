import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      category,
      cursorId,
      cursorUpdatedAt,
      snapshotTime,
      limit = 20,
    } = req.query;


    const browsingSnapshot =
      snapshotTime || new Date().toISOString();

    
    const filter = {
      updatedAt: {
        $lte: new Date(browsingSnapshot),
      },
    };


    if (category) {
      filter.category = category;
    }

    if (cursorId && cursorUpdatedAt) {
      filter.$or = [
        {
          updatedAt: {
            $lt: new Date(cursorUpdatedAt),
          },
        },
        {
          updatedAt: new Date(cursorUpdatedAt),
          _id: {
            $lt: new mongoose.Types.ObjectId(cursorId),
          },
        },
      ];
    }

    const products = await Product.find(filter)
      .sort({
        updatedAt: -1,
        _id: -1,
      })
      .limit(Number(limit));

    const lastProduct = products[products.length - 1];

    const nextCursor = lastProduct
      ? {
          cursorId: lastProduct._id.toString(),
          cursorUpdatedAt:
            lastProduct.updatedAt.toISOString(),
        }
      : null;

    res.status(200).json({
      success: true,
      snapshotTime: browsingSnapshot,
      count: products.length,
      nextCursor,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;