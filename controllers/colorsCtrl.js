import asyncHandler from "express-async-handler";
import Color from "../model/Color.js";

//Create a color
export const createColorsCtrl =  asyncHandler(async(req, res) => {

  const { name, user, products } = req.body;

  // check color is exists  
  const colorExists = await Color.findOne({ name });
  console.log(colorExists);
  if (colorExists) {
    throw new Error("Color exists");
  }

  // creating color
  const brand = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId, 
    products,
  });

  // send responce
  res.json({
    status:'success',
    message: 'color created successfully',
    brand,
  });
});

//Fetch all color
export const getAllColorsCtrl = asyncHandler(async(req, res) => {
  // Fetching all color
  const colors = await Color.find();

  // send responce
  res.json({
    status:'success',
    message: 'color fetched successfully',
    colors,
  });
});

// Get single color
export const getColorCtrl = asyncHandler(async(req, res) => {
  
  // Fetching a color
  const color = await Color.findById(req.params.id);
  if (!color) {
    throw new Error("color not Found");
  }

  // send responce
  res.json({
    status:'success',
    message: "color fetch successfully",
    color,
  });

});

//Update color
export const updateColorCtrl = asyncHandler(async(req, res) => {
  
  const { name } = req.body;

  // Fetch and update a color
  await Color.findByIdAndUpdate(req.params.id,{
    name
  },
  {
    new: true,
  });

  // send responce
  res.json({
    status:'success',
    message: "color update successfully",
  });
});

// Delete color
export const deleteColorCtrl = asyncHandler(async(req, res) => {
  
  // Fetch and delete a color
  await Color.findByIdAndDelete(req.params.id);

  // send responce
  res.json({
    status:'success',
    message: "color delete successfully",
  });
});