import { postModel } from '../../../db/models/posts.model.js';
import { userModel } from "../../../db/models/users.model.js";

// GET POSTS
export const getPosts = async (req, res, next) => {
  try {
    const posts = await postModel.findAll();
    res.status(200).json({ msg: "done", posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ______________________________________________________________
// TO create a new post
// _______________________________________________________________
export const createPost = async (req, res, next) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await postModel.create({ title, content, authorId });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ______________________________________________________________
// To GET a specific post
// _______________________________________________________________
export const getPost = async (req, res) => {
    try {
      const post = await postModel.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
// ______________________________________________________________
// To update a post y id
// _______________________________________________________________
export const updatePost = async (req, res) => {
    try {
      const post = await postModel.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      if (post.authorId !== req.body.authorId) {
        return res.status(403).json({ error: 'You can only edit your own posts' });
      }
      const updatedPost = await post.update(req.body);
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

// ______________________________________________________________
// To delete a  post by id
// _______________________________________________________________
export const deletePost = async (req, res) => {
    try {
      const post = await postModel.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      if (post.authorId !== req.body.authorId) {
        return res.status(403).json({ error: 'You can only delete your own posts' });
      }
      await post.destroy();
      res.json({ message: 'Post deleted',post });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// ______________________________________________________________
// To get a specific post with its author
// _______________________________________________________________
export const getPostWithAuthor = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await postModel.findByPk(postId, { include: userModel });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
