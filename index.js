import express from 'express';
import connectionDB from './db/connectionD.js';
import userRouter from './src/modules/users/users.routes.js';
import postsRouter from './src/modules/posts/posts.routes.js';
import commentsRouter from './src/modules/comments/comments.routes.js';
const app = express();
const port=process.env.port||3000;
app.use(express.json());

app.use('/users',userRouter);
app.use('/posts',postsRouter);
app.use("/comments",commentsRouter);

app.use('*',(req,res)=>{
    res.status(404).json({
        message:"Page not found"
    })
        
})
app.listen(port,()=>{
    console.log(`listening on port ${port}!!!!!`)
})

connectionDB()