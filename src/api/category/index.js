import express from "express";
import CategoriesModel from "./model.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/", async (req, res, next) => {
  try {
    const { categoryId } = await CategoriesModel.create(req.body);
    res.status(201).send({ id: categoryId });
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get("/", async (req, res, next) => {
  try {
    const categories = await CategoriesModel.findAll();
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.post("/bulk", async (req, res, next) => {
  try {
    const categories = await CategoriesModel.bulkCreate([
      { name: "Laptops" },
      { name: "Drons" },
      { name: "Television" },
      { name: "Scooters" },
    ]);
    res.send(categories.map((category) => category.categoryId));
  } catch (error) {
    next(error);
  }
});

export default categoriesRouter;
