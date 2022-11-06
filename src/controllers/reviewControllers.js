import {
  createReview,
  getAllReviews,
  searchReview,
} from "../services/reviewServices.js";

const handleCreateReview = async (req, res) => {
  let result = await createReview(req.body);
  return res.status(200).json(result);
};

const handleGetAllReviews = async (req, res) => {
  let result = await getAllReviews();
  return res.status(200).json(result);
};

const handleSearchReview = async (req, res) => {
  let result = await searchReview(req.query.keyword, req.query.doctor);
  return res.status(200).json(result);
};

export { handleCreateReview, handleGetAllReviews, handleSearchReview };
