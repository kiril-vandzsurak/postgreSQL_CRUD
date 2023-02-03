import express from "express";
import ProductModel from "./model.js";
import CategoriesModel from "../category/model.js";
import ProductsCategoriesModel from "./productCategoryModel.js";

const productRouter = express.Router();

productRouter.post("/", async (req, res, next) => {
  try {
    const { id } = await ProductModel.create(req.body);
    if (req.body.category) {
      await ProductsCategoriesModel.bulkCreate(
        req.body.category.map((category) => {
          return {
            categoryId: category,
            productId: id,
          };
        })
      );
    }
    res.status(201).send({ productId: id });
  } catch (error) {
    next(error);
  }
});

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.findAll({
      include: [
        {
          model: CategoriesModel,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productRouter.put("/:productId/category", async (req, res, next) => {
  try {
    const { id } = await ProductsCategoriesModel.create({
      productId: req.params.productId,
      categoryId: req.body.categoryId,
    });
    res.status(201).send({ id });
  } catch (error) {
    next(error);
  }
});

export default productRouter;
