import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
import generateToken from "../utils/generateToken.js";

export const isLoggedIn = (req, res, next) => {
  //get token from header
  const token  = getTokenFromHeader(req);

  const decodedUser = verifyToken(token);
  
  if(!decodedUser) {
    throw new Error('Invalid/Expred token');
  } else {
    req.userAuthId = decodedUser?.id;
    next();
  }
};