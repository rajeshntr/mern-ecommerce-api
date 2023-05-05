import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";

export const createProductsCtrl = asyncHandler( async(req, res) => {
  // const { name, description, brand, category, sizes, colors, user, images, reviews, price, totalQty, totalSold } = req.body;
  const { name, description, brand, category, sizes, colors, user, price, totalQty } = req.body;

  // check Product exixts
  const productExists = await Product.findOne({ name });
  if(productExists) {
    throw new Error("Product exists");
  } 

  // find category
  const categoryFound = await Category.findOne({
    name: category
  });

  if (!categoryFound) {
    throw new Error("Category not found");
  }

  // find brand
  const brandFound  = await Brand.findOne({
    name: brand
  })

  if (!brandFound) {
    throw new Error("Brand not found");
  }


  // create product
  const product = await Product.create({
    name, 
    description, 
    brand,
    category, 
    sizes, 
    colors, 
    user: req.userAuthId, 
    price, 
    totalQty
  });

  // push product into category
  categoryFound.products.push(product);

  // push product into brand
  brandFound.products.push(product);
  
  // resvae category
  await categoryFound.save();

  // resvae brand
  await brandFound.save();

  // send responce
  res.json({
    status:'success',
    message: 'Product created succesfullu',
    product,
  });

});


export const getProductsCtrl = asyncHandler(async(req, res) => {
  console.log(req.query);
  console.log(req.query.name);
  /*
  // working
  let products;
  if(req.query.name) {
    products  = await Product.find( 
      { name: { $regex: req.query.name, $options: "i" } } 
    );

    let productQuery  = await Product.find();
    
  } else {
    products  = await Product.find();
  }
  */

  let productQuery  = Product.find();
  console.log(productQuery);

  // search by name
  if(req.query.name) {
    productQuery = productQuery.find(
      { name: { $regex: req.query.name, $options: "i" } } 
    );
  }

  // search by brand
  if(req.query.brand) {
    productQuery = productQuery.find(
      { brand: { $regex: req.query.brand, $options: "i" } } 
    );  
  }

  // search by category
  if(req.query.category) {
    productQuery = productQuery.find(
      { category: { $regex: req.query.category, $options: "i" } } 
    );  
  }

  // search by colors
  if(req.query.colors) {
    productQuery = productQuery.find(
      { colors: { $regex: req.query.colors, $options: "i" } } 
    );  
  }

  // search by colors
  if(req.query.sizes) {
    productQuery = productQuery.find(
      { sizes: { $regex: req.query.sizes, $options: "i" } } 
    );  
  }

  // filter by price
  if(req.query.price) {
    const priceRange = req.query.price.split("-");
    console.log(priceRange);

    productQuery = productQuery.find(
      { price: { $gte: priceRange[0], $lte: priceRange[1] }} 
    );
  }

  //pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;

  //limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10; 

  //startIndex
  const startIndex = (page - 1) * limit;

  //endIndex
  const endIndex = page * limit;

  //totalProduct
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  //pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex>0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  //await query
  const products  = await productQuery;
  
  res.json({
    status: "sucess",
    result: products.length,
    total,
    pagination,
    message: "Product fethced succefully",
    products,
  })
});

//get single product
export const getProductCtrl = asyncHandler(async(req, res) => {
  console.log(req.params);
  console.log(req.params.id);
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    throw new Error("Product not Found");
  }

  res.json({
    status:'success',
    message: "Product fetch successfully",
    product,
  });
});

//updating product
export const updateProductCtrl  = asyncHandler(async(req, res) => {
  const { name, description, brand, category, sizes, colors, user, price, totalQty } = req.body;

  const product = await Product.findByIdAndUpdate(req.params.id,{
      name, 
      description, 
      brand,
      category, 
      sizes, 
      colors, 
      user, 
      price, 
      totalQty
    },
    {
      new: true,
    }
  );
  res.json({
    status:'success',
    message: "Product update successfully",
  });
});


//delete product
export const deleteProductCtrl  = asyncHandler(async(req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  
  res.json({
    status:'success',
    message: "Product delete successfully",
  });
});


