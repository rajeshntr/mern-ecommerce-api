import jwt from "jsonwebtoken";

const generateToken =(id) => {
  console.log(process.env.JWT_KEY);

  return jwt.sign({id}, process.env.JWT_KEY, {expiresIn: "3d" });
};

export default generateToken;