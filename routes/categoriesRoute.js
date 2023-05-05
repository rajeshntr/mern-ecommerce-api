import express from "express";
import { 
  createCategoryCtrl, 
  getAllCategoriesCtrl, 
  getCategoryCtrl, 
  updateCategoryCtrl, 
  deleteCategoryCtrl 
} from "../controllers/categoryCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoryRouter = express.Router();

categoryRouter.post("/", isLoggedIn, createCategoryCtrl);
categoryRouter.get("/", getAllCategoriesCtrl);
categoryRouter.get("/:id", getCategoryCtrl);
categoryRouter.put("/:id", isLoggedIn, updateCategoryCtrl);
categoryRouter.delete("/:id/delete", isLoggedIn, deleteCategoryCtrl);

export default categoryRouter;