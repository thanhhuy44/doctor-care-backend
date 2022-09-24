import {
  createPackage,
  deletePackage,
  getAllPackages,
  getDetailPackages,
  updateInfoPackage,
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

const handleUpdateInfoPackage = async (req, res) => {
  let result = await updateInfoPackage(req.params.id, req.body);
  return res.json(result);
};
const handleUpdateImagePackage = async (req, res) => {
  let result = await updateInfoPackage(req.params.id, req.files.image);
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
  handleUpdateImagePackage,
  handleUpdateInfoPackage,
  handleDeletePackage,
};
