import Doctor from "../models/doctor.js";
import {
  createDoctor,
  getAllDoctors,
  getDetailDoctor,
  deleteDoctor,
  searchDoctor,
  findDoctorWithFilter,
  updateDoctor,
  doctorLogin,
  doctorChangePassword,
} from "../services/doctorServices.js";

const handleGetAllDoctors = async (req, res) => {
  if (req.query.hospital || req.query.specialty) {
    let data = await findDoctorWithFilter(req.query);
    return res.json(data);
  } else {
    let data = await getAllDoctors(Doctor);
    return res.json(data);
  }
};

const handleCreateDoctor = async (req, res) => {
  if (req.body === {} || !req.files) {
    return res.json({
      errCode: 1,
      message: "Error: Not Enough data",
    });
  } else {
    let result = await createDoctor(req.body, req.files.image);
    return res.json(result);
  }
};

const handleSearchDoctor = async (req, res) => {
  let data = await searchDoctor(req.query.keyword);
  return res.status(200).json(data);
};

const handleGetDoctorById = async (req, res) => {
  let data = await getDetailDoctor(req.params.id);
  return res.json(data);
};

const handleUpdateDoctor = async (req, res) => {
  if (req.files) {
    let result = await updateDoctor(req.params.id, req.files.image, req.body);
    return res.json(result);
  } else {
    let result = await updateDoctor(req.params.id, 0, req.body);
    return res.json(result);
  }
};

const handleUpdateImageDoctor = async (req, res) => {
  let result = await updateImageDoctor(req.params.id, req.files.image);
  return res.json(result);
};

const handleDeleteDoctor = async (req, res) => {
  let result = await deleteDoctor(req.params.id);
  return res.json(result);
};

const handleDoctorLogin = async (req, res) => {
  let result = await doctorLogin(req.body.email, req.body.password);
  return res.json(result);
};

const handleChangePasswordDoctor = async (req, res) => {
  let result = await doctorChangePassword(
    req.params.id,
    req.body.password,
    req.body.newPassword
  );
  return res.json(result);
};

export {
  handleCreateDoctor,
  handleGetAllDoctors,
  handleGetDoctorById,
  handleUpdateDoctor,
  handleDeleteDoctor,
  handleUpdateImageDoctor,
  handleSearchDoctor,
  handleDoctorLogin,
  handleChangePasswordDoctor,
};
