import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import ProductsCategoriesModel from "./productCategoryModel.js";
import CategoriesModel from "../category/model.js";

const ProductModel = sequelize.define("product", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

ProductModel.belongsToMany(CategoriesModel, {
  through: BlogsCategoriesModel,
  foreignKey: { name: "blogId", allowNull: false },
});
CategoriesModel.belongsToMany(ProductModel, {
  through: BlogsCategoriesModel,
  foreignKey: { name: "categoryId", allowNull: false },
});

export default ProductModel;
