import {
  createAdmin,
  adminChangeImage,
  adminChangeInfo,
  adminChangePassword,
  adminLogin,
} from "../services/adminServices.js";

const handleCreateAdmin = async (req, res) => {
  let result = await createAdmin(req.body, req.files.image);
  return res.json(result);
};

const handleAdminLogin = async (req, res) => {
  let result = await adminLogin(req.body.userName, req.body.password);
  return res.json(result);
};

const handleAdminChangeInfo = async (req, res) => {
  let result = await adminChangeInfo(req.params.id, req.body);
  return res.json(result);
};

const handleAdminchangeImage = async (req, res) => {
  let result = await adminChangeImage(req.params.id, req.files.image);
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

export {
  handleCreateAdmin,
  handleAdminLogin,
  handleAdminchangeImage,
  handleAdminChangeInfo,
  handleAdminChangePassword,
};
