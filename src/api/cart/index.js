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
      console.log("ERROR GET SINGLE");
    }
  } catch (error) {
    next(error);
  }
});

cartRouter.put("/:cartId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await CartModel.update(
      req.body,
      {
        where: { id: req.params.cartId },
        returning: true,
      }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      console.log("ERROR PUT");
    }
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/:cartId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await CartModel.destroy({
      where: { id: req.params.cartId },
    });
    if (numberOfDeletedRows === 1) {
      res.status(204).send();
    } else {
      console.log("ERROR DELETE");
    }
  } catch (error) {
    next(error);
  }
});

export default cartRouter;
