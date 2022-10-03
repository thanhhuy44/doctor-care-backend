import Doctor from "../models/doctor.js";
import {
  createDoctor,
  getAllDoctors,
  getDetailDoctor,
  updateInfoDoctor,
  updateImageDoctor,
  deleteDoctor,
  searchDoctor,
  findDoctorWithFilter,
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

const handleUpdateInfoDoctor = async (req, res) => {
  let result = await updateInfoDoctor(req.params.id, req.body);
  return res.json(result);
};

const handleUpdateImageDoctor = async (req, res) => {
  let result = await updateImageDoctor(req.params.id, req.files.image);
  return res.json(result);
};

const handleDeleteDoctor = async (req, res) => {
  let result = await deleteDoctor(req.params.id);
  return res.json(result);
};

export {
  handleCreateDoctor,
  handleGetAllDoctors,
  handleGetDoctorById,
  handleUpdateInfoDoctor,
  handleDeleteDoctor,
  handleUpdateImageDoctor,
  handleSearchDoctor,
};
