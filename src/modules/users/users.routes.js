import { Router } from "express";
 import * as users from "./users.controller.js";

 const router=Router();

//  router.get('/all',users.getUsers)
 router.post('/register',users.register);
 router.post('/login',users.login);
 router.get('/logout',users.logout);
 router.get('/:userId/posts/:postId/comments',users.getUserWithPostAndComments);


 export default router;