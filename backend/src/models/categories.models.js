import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    shop: {
      type: mongoose.Types.ObjectId,
      ref: "Shop",
    },
    
  },
  { timestamps: true },
);

export const Category = mongoose.model("Category", categorySchema);
