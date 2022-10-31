import {
  getDetailSpecialty,
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
  updateSpecialty,
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

const handleUpdateSpecialty = async (req, res) => {
  let result = await updateSpecialty(
    req.params.id,
    req.files ? req.files.image : 0,
    req.body
  );
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
  handleDeleteSpecialty,
  handleUpdateSpecialty,
};
