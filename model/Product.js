import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    images: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      }
    ],
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    timestamps: true,
    toJSON:{ virtuals: true},
  }
);

// Qty left
ProductSchema.virtual('qtyLeft').get(function(){
  const product = this;
  return product.totalQty - product.totalSold;
});

// total review
ProductSchema.virtual('totalReviews').get(function() {
  console.log("this");
  const product = this;
  return product?.reviews?.length;
});

// total rating
ProductSchema.virtual("averageRating").get(function() {
  let totalRating = 0;
  const product = this;
  console.log("this_____");
  console.log(product?.reviews);
  product?.reviews?.forEach(review => {    
    console.log(review.rating);
    totalRating += review?.rating
  });
  // cal average rating
  const averageRating = totalRating / product?.reviews?.length; 
  return averageRating;
});

const Product = mongoose.model('product', ProductSchema);

export default Product;