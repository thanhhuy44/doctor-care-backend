import {
  createTypePackage,
  deleteTypePackage,
  getAllTypePackages,
  getDetailTypePackage,
  updateImageTypePackage,
  updateInfoTypePackage,
} from "../services/typePackageServices.js";

const handleCreateTypePackage = async (req, res) => {
  let result = await createTypePackage(req.body, res.files.image);
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

const handleUpdateInfoTypePackage = async (req, res) => {
  let result = await updateInfoTypePackage(req.params.id, req.body);
  return res.json(result);
};

const handleUpdateImageTypePackage = async (req, res) => {
  let result = await updateImageTypePackage(req.params.id, req.body);
  return res.json(result);
};

const handleDeleteTypePackage = async (req, res) => {
  let result = await deleteTypePackage(req.params.id);
  return req.json(result);
};

export {
  handleCreateTypePackage,
  handleGetAllTypePackages,
  handleGetOneTypePackage,
  handleUpdateInfoTypePackage,
  handleUpdateImageTypePackage,
  handleDeleteTypePackage,
};
