import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("mysql://uehibcx99wfhlxlx:k1lpSXclCJiRLB7DjlVT@bexvq8simq0mw8pwr3bf-mysql.services.clever-cloud.com:3306/bexvq8simq0mw8pwr3bf");

const connectionDB =async ()=>{
    return await sequelize.sync({alert:true,force:false}).then(()=>{
        console.log("Database connected");
    }).catch(err=>{
        console.log(err)
})
}



export default connectionDB;