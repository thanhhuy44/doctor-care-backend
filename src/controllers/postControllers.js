import {
  createPost,
  deletePost,
  getAllPosts,
  getDetailPost,
} from "../services/postServices.js";

const handleCreatePost = async (req, res) => {
  let result = await createPost(req.body, req.files.banner);
  return res.json(result);
};

const handleGetAllPosts = async (req, res) => {
  let result = await getAllPosts();
  return res.status(200).json(result);
};

const handleGetDetailPost = async (req, res) => {
  let result = await getDetailPost(req.params.id);
  return res.status(200).json(result);
};

const handleDeletePost = async (req, res) => {
  let result = await deletePost(req.params.id);
  return res.status(200).json(result);
};

export {
  handleCreatePost,
  handleGetAllPosts,
  handleGetDetailPost,
  handleDeletePost,
};
