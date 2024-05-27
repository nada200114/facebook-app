import { commentModel } from "../../../db/models/comments.model.js";


// ______________________________________________________________
// To get a all comments
// _______________________________________________________________
export const getComments = async (req, res) => {
  try {
    const comments = await commentModel.findAll();
    res.status(200).json({ msg: "done", comments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ______________________________________________________________
// To create a new comment 
// _______________________________________________________________
export const createComment = async (req, res) => {
  const { content, postId, userId } = req.body;
  try {
    const comment = await commentModel.create({ content, postId, userId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ______________________________________________________________
// To get a specific comment
// _______________________________________________________________
export const getComment = async (req, res) => {
  try {
    const comment = await commentModel.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// ______________________________________________________________
// To update a specif comment
// _______________________________________________________________
export const updateComment = async (req, res) => {
  try {
    const comment = await commentModel.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (comment.userId !== req.body.userId) {
      return res.status(403).json({ error: 'You can only edit your own comments' });
    }
    const updatedComment = await comment.update(req.body);
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// ______________________________________________________________
// To delete a specific comment
// _______________________________________________________________
export const deleteComment = async (req, res) => {
  try {
    const comment = await commentModel.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (comment.userId !== req.body.userId) {
      return res.status(403).json({ error: 'You can only delete your own comments' });
    }
    await comment.destroy();
    res.json({ message: 'Comment deleted', comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




  