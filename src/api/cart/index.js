import express from "express";
//import createHttpError from "http-errors";
import { Op } from "sequelize";
import CartModel from "./model.js";

const cartRouter = express.Router();

cartRouter.post("/", async (req, res, next) => {
  try {
    const { id } = await CartModel.create(req.body);
    res.status(201).send({ id });
  } catch (error) {
    next(error);
  }
});

cartRouter.get("/", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.name) query.name = { [Op.iLike]: `${req.query.name}%` };
    const cart = await CartModel.findAll({
      where: { ...query },
      attributes: ["name", "category", "description", "id"],
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

cartRouter.get("/:cartId", async (req, res, next) => {
  try {
    const cart = await CartModel.findByPk(req.params.cartId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (cart) {
      res.send(cart);
    } else {
      console.log("ERROR");
    }
  } catch (error) {
    next(error);
  }
});

export default cartRouter;
