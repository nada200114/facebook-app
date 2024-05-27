import { DataTypes } from "sequelize";
import { sequelize } from "../connectionD.js";


export const userModel=sequelize.define("users",{
   name :{
    type:DataTypes.STRING,
    allowNull:false 
   },
   email:{
    type:DataTypes.STRING,
    allowNull:false ,
    unique:true,
   },
   password:{
    type:DataTypes.STRING,
    allowNull:false 
   }
 
})