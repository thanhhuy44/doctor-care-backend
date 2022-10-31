import {
  createPackage,
  deletePackage,
  getAllPackages,
  getDetailPackages,
  updatePackage,
} from "../services/healthPackageServices.js";

const handleCreatePackage = async (req, res) => {
  let result = await createPackage(req.body, req.files.image);
  return res.json(result);
};

const handleGetAllPackages = async (req, res) => {
  let result = await getAllPackages();
  return res.json(result);
};

const handleGetDetailPackage = async (req, res) => {
  let result = await getDetailPackages(req.params.id);
  return res.json(result);
};

const handleUpdatePackage = async (req, res) => {
  let result = await updatePackage(
    req.params.id,
    req.files ? req.files.image : 0,
    req.body
  );
  return res.json(result);
};

const handleDeletePackage = async (req, res) => {
  let result = await deletePackage(req.params.id);
  return res.json(result);
};

export {
  handleCreatePackage,
  handleGetAllPackages,
  handleGetDetailPackage,
  handleUpdatePackage,
  handleDeletePackage,
};
