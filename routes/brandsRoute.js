import express from "express";
import { 
  createBrandCtrl,
  getAllBrandsCtrl,
  getBrandCtrl,
  updateBrandCtrl,
  deleteBrandCtrl
  } from "../controllers/brandsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const brandRouter = express.Router();

brandRouter.post("/", isLoggedIn, createBrandCtrl);
brandRouter.get("/", getAllBrandsCtrl);
brandRouter.get("/:id", getBrandCtrl);
brandRouter.put("/:id", isLoggedIn, updateBrandCtrl);
brandRouter.delete("/:id/delete", isLoggedIn, deleteBrandCtrl);

export default brandRouter;