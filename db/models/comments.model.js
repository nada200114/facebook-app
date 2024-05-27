


import { DataTypes } from "sequelize";
import { sequelize } from "../connectionD.js";
import { userModel } from "./users.model.js";
import { postModel } from "./posts.model.js";

export const commentModel = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: postModel,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: 'id'
    }
  }
});

postModel.hasMany(commentModel, { foreignKey: 'postId' });
commentModel.belongsTo(postModel, { foreignKey: 'postId' });

userModel.hasMany(commentModel, { 
    foreignKey: 'userId',
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
 });
commentModel.belongsTo(userModel, {
     foreignKey: 'userId',
     onDelete:"CASCADE",
     onUpdate:"CASCADE"
     });

