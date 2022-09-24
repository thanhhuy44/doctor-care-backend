import { getHome } from "../services/pageServices.js";

const handleGetHomePage = async (req, res) => {
  const result = await getHome();
  return res.status(200).json(result);
};

export { handleGetHomePage };
