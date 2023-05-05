import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";

//Create a category
export const createCategoryCtrl = asyncHandler(async(req, res) => {
  const { name, user, image, products } = req.body;
  
  // check category is exists
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new Error("Category exists");
  }

  // creating category
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId, 
    image, 
    products,
  });

  // send responce
  res.json({
    status:'success',
    message: 'category created successfully',
    category,
  });
});

//Fetch all category
export const getAllCategoriesCtrl = asyncHandler(async(req, res) => {
  // Fetching all category
  const categories = await Category.find();

  // send responce
  res.json({
    status:'success',
    message: 'category fetched successfully',
    categories,
  });
});

// Get single category
export const getCategoryCtrl = asyncHandler(async(req, res) => {
  
  // Fetching a category
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new Error("Category not Found");
  }

  // send responce
  res.json({
    status:'success',
    message: "category fetch successfully",
    category,
  });

});

//Update Category
export const updateCategoryCtrl = asyncHandler(async(req, res) => {
  
  const { name } = req.body;

  // Fetch and update a category
  await Category.findByIdAndUpdate(req.params.id,{
    name
  },
  {
    new: true,
  });

  // send responce
  res.json({
    status:'success',
    message: "category update successfully",
  });
});

// Delete category
export const deleteCategoryCtrl = asyncHandler(async(req, res) => {
  
  // Fetch and delete a category
  await Category.findByIdAndDelete(req.params.id);

  // send responce
  res.json({
    status:'success',
    message: "category delete successfully",
  });
});