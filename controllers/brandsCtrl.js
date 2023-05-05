import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

//Create a brand
export const createBrandCtrl =  asyncHandler(async(req, res) => {

  const { name, user, products } = req.body;

  // check brand is exists  
  const brandExists = await Brand.findOne({ name });
  console.log(brandExists);
  if (brandExists) {
    throw new Error("Brand exists");
  }

  // creating brand
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId, 
    products,
  });

  // send responce
  res.json({
    status:'success',
    message: 'brand created successfully',
    brand,
  });
});

//Fetch all brand
export const getAllBrandsCtrl = asyncHandler(async(req, res) => {
  // Fetching all brand
  const brands = await Brand.find();

  // send responce
  res.json({
    status:'success',
    message: 'brand fetched successfully',
    brands,
  });
});

// Get single brand
export const getBrandCtrl = asyncHandler(async(req, res) => {
  
  // Fetching a brand
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    throw new Error("Brand not Found");
  }

  // send responce
  res.json({
    status:'success',
    message: "brand fetch successfully",
    brand,
  });

});

//Update brand
export const updateBrandCtrl = asyncHandler(async(req, res) => {
  
  const { name } = req.body;

  // Fetch and update a brand
  await Brand.findByIdAndUpdate(req.params.id,{
    name
  },
  {
    new: true,
  });

  // send responce
  res.json({
    status:'success',
    message: "brand update successfully",
  });
});

// Delete brand
export const deleteBrandCtrl = asyncHandler(async(req, res) => {
  
  // Fetch and delete a brand
  await Brand.findByIdAndDelete(req.params.id);

  // send responce
  res.json({
    status:'success',
    message: "brand delete successfully",
  });
});