import { Router } from "express";
 import * as comments from "./comments.controller.js";

 const router=Router();
 router.get('/all',comments.getComments);
 router.post('/create',comments.createComment);
 router.patch('/update/:id',comments.updateComment);
 router.delete('/delete/:id',comments.deleteComment);


 export default router;