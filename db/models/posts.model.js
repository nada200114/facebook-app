import { DataTypes } from "sequelize";
import { sequelize } from "../connectionD.js";
import { userModel } from "./users.model.js";


export const postModel=sequelize.define("posts",{
   title :{
    type:DataTypes.STRING,
    allowNull:false 
    
   },
   content:{
    type:DataTypes.TEXT,
    allowNull:false ,
   },
   
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: 'id'
    }
  }
});

userModel.hasMany(postModel, { foreignKey: 'authorId' });
postModel.belongsTo(userModel, { 
    foreignKey: 'authorId' ,
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
    



    
})

