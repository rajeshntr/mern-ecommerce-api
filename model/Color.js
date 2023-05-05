import mongoose, { Schema } from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name:{
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
        ref: "Product",
      }
    ],
  },
  {
    timestamps:true,
  }
);

const Color = mongoose.model("color", colorSchema);

export default Color;