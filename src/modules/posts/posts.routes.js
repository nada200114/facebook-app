import { Router } from "express";
import * as posts from "./posts.controller.js";

const router = Router();
router.get('/all', posts.getPosts);
router.post('/create', posts.createPost);
router.get('/getPost/:id',posts.getPost);
router.patch('/update/:id',posts.updatePost);
router.delete('/delete/:id',posts.deletePost);
router.get('/:postId', posts.getPostWithAuthor);


export default router;
