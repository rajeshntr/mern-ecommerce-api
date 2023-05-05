import mongoose from "mongoose";
const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
    ],
  },
  {
    timestamps:true
  }
);

const Brand = mongoose.model("brand", BrandSchema);

export default Brand;