import express from "express";
import ProductModel from "./model.js";
import CategoriesModel from "../category/model.js";
import ProductsCategoriesModel from "./productCategoryModel.js";

const productRouter = express.Router();

productRouter.post("/", async (req, res, next) => {
  try {
    const { id } = await ProductModel.create(req.body);
    console.log("IDDDD:::::::", id);
    if (req.body.category) {
      await ProductsCategoriesModel.bulkCreate(
        req.body.category.map((category) => {
          return {
            categoryId: category,
            productId,
          };
        })
      );
    }
    res.status(201).send({ productId: id });
  } catch (error) {
    next(error);
  }
});

export default productRouter;
