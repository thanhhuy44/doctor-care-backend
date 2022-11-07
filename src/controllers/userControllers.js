import {
  changePassword,
  userLogin,
  userSignup,
  userChangeImage,
  userChangeInfo,
  deleteUser,
  getAllUsers,
} from "../services/userServices.js";

const handleSignupUser = async (req, res) => {
  let result = await userSignup(req.body, req.files.image);
  return res.json(result);
};

const handleChangeInfoUser = async (req, res) => {
  let result = await userChangeInfo(req.params.id, req.body);
  return res.json(result);
};

const handleChangeImageUser = async (req, res) => {
  let result = await userChangeImage(req.params.id, req.files.image);
  return res.json(result);
};

const handleGetAllUser = async (req, res) => {
  let result = await getAllUsers();
  return res.status(200).json(result);
};

const handleUserLogin = async (req, res) => {
  let result = await userLogin(req.body.userName, req.body.password);
  return res.json({ result });
};

const handleUserChangePassword = async (req, res) => {
  let result = await changePassword(
    req.body.userName,
    req.body.password,
    req.body.newPassword
  );
  return res.json(result);
};

const handleDeleteUser = async (req, res) => {
  let result = await deleteUser(req.params.id);
  return res.json(result);
};

export {
  handleSignupUser,
  handleChangeInfoUser,
  handleGetAllUser,
  handleUserLogin,
  handleUserChangePassword,
  handleDeleteUser,
};
