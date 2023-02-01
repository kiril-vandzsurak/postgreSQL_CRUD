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

export default cartRouter;
