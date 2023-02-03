import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import ProductsCategoriesModel from "./productCategoryModel.js";
import CategoriesModel from "../category/model.js";
import ReviewsModel from "./productCategoryModel.js";

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
  through: ProductsCategoriesModel,
  foreignKey: { name: "productId", allowNull: false },
});

CategoriesModel.belongsToMany(ProductModel, {
  through: ProductsCategoriesModel,
  foreignKey: { name: "categoryId", allowNull: false },
});

ProductModel.hasMany(ReviewsModel, { foreignKey: { allowNull: false } });
ReviewsModel.belongsTo(ProductModel);

export default ProductModel;
