import {
  create,
  getAll,
  getOneById,
  update,
  remove,
} from "../services/CRUDServices.js";
import Specialty from "../models/specialty.js";
import {
  getDetailSpecialty,
  createSpecialty,
  getAllSpecialties,
  updateInfoSpecialty,
  updateImageSpecialty,
  deleteSpecialty,
} from "../services/specialtyServices.js";

const handleCreateSpecialty = async (req, res) => {
  let result = await createSpecialty(req.body, req.files.image);
  return res.json(result);
};

const handleGetAllSpecialties = async (req, res) => {
  let result = await getAllSpecialties();
  return res.json(result);
};

const handleGetSpecialtyById = async (req, res) => {
  let result = await getDetailSpecialty(req.params.id);
  return res.json(result);
};

const handleUpdateInfoSpecialty = async (req, res) => {
  let result = await updateInfoSpecialty(req.params.id, req.body);
  return res.json(result);
};

const handleUpdateImageSpecialty = async (req, res) => {
  let result = await updateImageSpecialty(req.params.id, req.files.image);
  return res.json(result);
};

const handleDeleteSpecialty = async (req, res) => {
  let result = await deleteSpecialty(req.params.id);
  return res.send(result);
};

export {
  handleCreateSpecialty,
  handleGetAllSpecialties,
  handleGetSpecialtyById,
  handleUpdateInfoSpecialty,
  handleUpdateImageSpecialty,
  handleDeleteSpecialty,
};
