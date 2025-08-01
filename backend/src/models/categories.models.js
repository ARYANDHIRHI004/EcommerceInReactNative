import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      Type: String,
      required: true,
    },
    description: {
      Type: String,
      required: true,
    },
    owner: {
      Type: mongoose.Types.ObjectId,
      ref: "User",
    },
    shop: {
      Type: mongoose.Types.ObjectId,
      ref: "Shop",
    },
    
  },
  { timestamps: true },
);

export const Category = mongoose.model("Category", categorySchema);
