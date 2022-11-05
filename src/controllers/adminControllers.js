import {
  createAdmin,
  updateAdmin,
  adminChangePassword,
  adminLogin,
  getAllAdmin,
  getOneAdmin,
  deleteAdmin,
  searchAdmin,
} from "../services/adminServices.js";

const handleCreateAdmin = async (req, res) => {
  let result = await createAdmin(req.body, req.files.image);
  return res.json(result);
};

const handleGetAllAdmin = async (req, res) => {
  let result = await getAllAdmin();
  return res.json(result);
};

const handleGetOneAdmin = async (req, res) => {
  let result = await getOneAdmin(req.params.id);
  return res.status(200).json(result);
};
const handleAdminLogin = async (req, res) => {
  let result = await adminLogin(req.body.userName, req.body.password);
  return res.json(result);
};

const handleUpdateAdmin = async (req, res) => {
  let result = await updateAdmin(
    req.params.id,
    req.files ? req.files.image : 0,
    req.body
  );
  return res.json(result);
};

const handleAdminChangePassword = async (req, res) => {
  let result = await adminChangePassword(
    req.params.id,
    req.body.password,
    req.body.newPassword
  );
  return res.json(result);
};

const handleDeleteAdmin = async (req, res) => {
  let result = await deleteAdmin(req.params.id);
  return res.json(result);
};

const handleSearchAdmin = async (req, res) => {
  let result = await searchAdmin(req.query.keyword);
  return res.json(result);
};

export {
  handleCreateAdmin,
  handleGetAllAdmin,
  handleGetOneAdmin,
  handleAdminLogin,
  handleUpdateAdmin,
  handleAdminChangePassword,
  handleDeleteAdmin,
  handleSearchAdmin,
};
