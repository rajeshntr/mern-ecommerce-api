import express from "express";
import { 
  createReviewsCtrl,
  getAllReviewsCtrl
 } from "../controllers/reviewCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productID", isLoggedIn, createReviewsCtrl);
reviewRouter.get("/", getAllReviewsCtrl);

// reviewRouter.get("/:id", getColorCtrl);
// reviewRouter.put("/:id", isLoggedIn, updateColorCtrl);
// reviewRouter.delete("/:id/delete", isLoggedIn, deleteColorCtrl);

export default reviewRouter;