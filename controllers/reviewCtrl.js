import asyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";


//Create a color
export const createReviewsCtrl =  asyncHandler(async(req, res) => {
  const { product, message, rating } = req.body;

  const { productID } = req.params;
  
  // check product is exists  
  const productFound =  await Product.findById(productID).populate("reviews");
  if (!productFound) {
    throw new Error("No Product found");
  }

  // check whether user reviewed
  const hasReviewed =  productFound?.reviews?.find((review) => {
    console.log(review);
    return review?.user?.toString() === req.userAuthId?.toString();
  });
  console.log(hasReviewed);

  if (hasReviewed) {
    throw new Error("You alredy reviwed this product");
  }
  
  // creating review
  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId,
  });

  productFound.reviews.push(review?._id);
  await productFound.save();

  // send responce
  res.json({
    status:'success',
    message: 'Review created successfully',
  });
});


//Fetch all review
export const getAllReviewsCtrl = asyncHandler(async(req, res) => {
  // Fetching all review
  const reviews = await Review.find();

  // send responce
  res.json({
    status:'success',
    message: 'review fetched successfully',
    reviews,
  });
});