import { getHome, search } from "../services/pageServices.js";

const handleGetHomePage = async (req, res) => {
  const result = await getHome();
  return res.status(200).json(result);
};

const handleSearch = async (req, res) => {
  const result = await search(req.query.keyword);
  return res.status(200).json(result);
};

export { handleGetHomePage, handleSearch };
