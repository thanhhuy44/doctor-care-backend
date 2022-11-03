import {
  createTypePackage,
  deleteTypePackage,
  getAllTypePackages,
  getDetailTypePackage,
  searchTypePackage,
  updateTypePackage,
} from "../services/typePackageServices.js";

const handleCreateTypePackage = async (req, res) => {
  let result = await createTypePackage(req.body, req.files.image);
  return res.json(result);
};

const handleGetAllTypePackages = async (req, res) => {
  let result = await getAllTypePackages();
  return res.json(result);
};

const handleGetOneTypePackage = async (req, res) => {
  let result = await getDetailTypePackage(req.params.id);
  return res.json(result);
};

const handleUpdateTypePackage = async (req, res) => {
  let result = await updateTypePackage(
    req.params.id,
    req.files ? req.files.image : 0,
    req.body
  );
  return res.json(result);
};

const handleDeleteTypePackage = async (req, res) => {
  let result = await deleteTypePackage(req.params.id);
  return res.json(result);
};

const handleSearchTypePackage = async (req, res) => {
  let result = await searchTypePackage(req.query.keyword);
  return res.json(result);
};

export {
  handleCreateTypePackage,
  handleGetAllTypePackages,
  handleGetOneTypePackage,
  handleUpdateTypePackage,
  handleDeleteTypePackage,
  handleSearchTypePackage,
};
