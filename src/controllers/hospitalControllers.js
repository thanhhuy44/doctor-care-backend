import {
  createHospital,
  getAllHospitals,
  getDetailHospital,
  updateInfoHospital,
  updateImageHospital,
  deleteHospital,
} from "../services/hospitalServices.js";

const handleCreateHospital = async (req, res) => {
  let result = await createHospital(
    req.body,
    req.files.image,
    req.files.descImages
  );
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

const handleUpdateInfoHospital = async (req, res) => {
  let result = await updateInfoHospital(req.params.id, req.body);
  return res.status(200).json(result);
};

const handleUpdateImageHospital = async (req, res) => {
  let result = await updateImageHospital(req.params.id, req.files.image);
  return res.status(200).json(result);
};

const handleDeleteHospital = async (req, res) => {
  let result = await deleteHospital(req.params.id);
  return res.status(200).json(result);
};

export {
  handleCreateHospital,
  handleGetAllHospitals,
  handleGetHospitalById,
  handleUpdateInfoHospital,
  handleUpdateImageHospital,
  handleDeleteHospital,
};
