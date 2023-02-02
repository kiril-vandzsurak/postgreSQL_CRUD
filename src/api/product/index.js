import express from "express";
import ProductModel from "./model.js";
import CategoriesModel from "../category/model.js";
import ProductsCategoriesModel from "./productCategoryModel.js";

const productRouter = express.Router();

productRouter.post("/", async (req, res, next) => {
  try {
    const { productId } = await ProductModel.create(req.body);

    if (req.body.category) {
      await ProductsCategoriesModel.bulkCreate(
        req.body.category.map((category) => {
          return {
            categoryId: category,
            productId,
          };
        })
      ); // --> [{categoryId: "asdasd", blogId: "asdasdasdas"}]
    }
    res.status(201).send({ id: productId });
  } catch (error) {
    next(error);
  }
});

export default productRouter;
