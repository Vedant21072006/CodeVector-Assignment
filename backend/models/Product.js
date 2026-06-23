import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  updatedAt: -1,
  _id: -1,
});

productSchema.index({
  category: 1,
  updatedAt: -1,
  _id: -1,
});

const Product = mongoose.model("Product", productSchema);

export default Product;