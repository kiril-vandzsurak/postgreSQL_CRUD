import { DataTypes } from "sequelize";
import sequelize from "../../db.js";

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

export default ReviewsModel;
