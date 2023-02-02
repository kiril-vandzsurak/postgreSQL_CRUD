import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { pgConnect, syncModels } from "./db.js";
import cartRouter from "./api/cart/index.js";
import categoriesRouter from "./api/category/index.js";
import productRouter from "./api/product/index.js";

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());

server.use("/cart", cartRouter);
server.use("/categories", categoriesRouter);
server.use("/product", productRouter);

await pgConnect();
await syncModels();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});
