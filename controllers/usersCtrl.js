import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const registerUserCtrl = async ( req, res ) => {
 
  const { fullname, email, password } = req.body;

  // check if user exists
  const userExists = await User.findOne({ email });
  if(userExists) {
    res.json({
      message:"User already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword  = await bcrypt.hash(password,salt);
 
  const user = await User.create({
    fullname,
    email,
    password: hashPassword
  });
  
  res.status(201).json({
    status:'success',
    message: 'User registered succesfullu',
    data: user,
  });
};

export const loginUserCtrl = asyncHandler(async(req, res) => {
  const { email, password } = req.body;
  
  //
  const userFound = await User.findOne({email})
  if (!userFound) {
    res.json({
      message:"invalid login details",
    });
  }
  console.log(userFound);
  console.log(password);

  const isMatch = await bcrypt.compare(password, userFound.password);
  console.log(isMatch);
  console.log(userFound?.id);
  if (!isMatch) {
    throw new Error('Invalid login creadentials');
  } else {
    res.json({
      status:"sucess",
      msg:"User logedin",
      userFound,
      token: generateToken(userFound?.id)
    });
  }
  
  // res.json({
  //   msg:"Login sucess",
  //   user: userFound.id
  // });
});


export const getUserProfile = asyncHandler(async(req, res) => {
  console.log(req.headers);
  const token = getTokenFromHeader(req);
  console.log(token);
  const verified = verifyToken(token);
  console.log(verified);
  
  res.json({
    msg:'Welcom Profile Page',
  });
});