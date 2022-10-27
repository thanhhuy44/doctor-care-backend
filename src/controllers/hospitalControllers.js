import { response } from "express";
import {
  createHospital,
  getAllHospitals,
  getDetailHospital,
  deleteHospital,
  updateHospital,
  searchHospital,
} from "../services/hospitalServices.js";

const handleCreateHospital = async (req, res) => {
  let result = await createHospital(req.body, req.files.logo, req.files.image);
  return res.status(200).json(result);
};

const handleGetAllHospitals = async (req, res) => {
  let result = await getAllHospitals();
  return res.status(200).json(result);
};

const handleGetHospitalById = async (req, res) => {
  let result = await getDetailHospital(req.params.id);
  return res.status(200).json(result);
};

const handleUpdateHospital = async (req, res) => {
  let result = await updateHospital(
    req.params.id,
    req.files.logo ? req.files.logo : 0,
    req.files.image ? req.files.image : 0,
    req.body
  );
  return res.status(200).json(result);
};

const handleDeleteHospital = async (req, res) => {
  let result = await deleteHospital(req.params.id);
  return res.status(200).json(result);
};

const handleSearchHospital = async (req, res) => {
  let result = await searchHospital(req.query.keyword);
  return res.status(200).json(result);
};

export {
  handleCreateHospital,
  handleGetAllHospitals,
  handleGetHospitalById,
  handleUpdateHospital,
  handleDeleteHospital,
  handleSearchHospital,
};
