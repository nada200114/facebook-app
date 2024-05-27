
import bcrypt from 'bcryptjs';
import { userModel } from '../../../db/models/users.model.js';
import { postModel } from "../../../db/models/posts.model.js";
import { commentModel } from "../../../db/models/comments.model.js";
// ______________________________To Register__________________________________

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// ______________________________To Login____________________________________

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ________________________________To Logout________________________________
export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// ___________________________________________________________________________________
// GET a specific user with his posts and comments
// ____________________________________________________________________________________
// User has posts >>posts have comments 
// user exist ?  user's posts exist ? >>post's comments exist ?
export const getUserWithPostAndComments = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    // get user with the specified user ID
    const user = await userModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    //get post with the specified post ID authored by the user
    const post = await postModel.findOne({ where: { id: postId, authorId: userId } });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    //get all comments associated with the post
    const comments = await commentModel.findAll({ where: { postId } });

    res.json({ user, post, comments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
