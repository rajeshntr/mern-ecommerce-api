import express from "express";
import { 
  createColorsCtrl,
  getAllColorsCtrl,
  getColorCtrl,
  updateColorCtrl,
  deleteColorCtrl
 } from "../controllers/colorsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const colorRouter = express.Router();

colorRouter.post("/", isLoggedIn, createColorsCtrl);
colorRouter.get("/", getAllColorsCtrl);
colorRouter.get("/:id", getColorCtrl);
colorRouter.put("/:id", isLoggedIn, updateColorCtrl);
colorRouter.delete("/:id/delete", isLoggedIn, deleteColorCtrl);

export default colorRouter;