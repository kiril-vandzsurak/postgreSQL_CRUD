import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import ProductModel from "../product/model.js";

const ReviewsModel = sequelize.define("review", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});

ProductModel.hasMany(ReviewsModel, { foreignKey: { allowNull: false } });
ReviewsModel.belongsTo(ProductModel);

export default ReviewsModel;
