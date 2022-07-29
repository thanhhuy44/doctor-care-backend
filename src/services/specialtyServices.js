import { rejects } from "assert";
import e from "express";
import mongoose from "mongoose";
import path from "path";
import Doctor from "../models/doctor.js";
import Specialty from "../models/specialty.js";

const createSpecialty = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let aliasName = data.name.split(" ").join("-");
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images", fileName),
        function (error) {
          if (error) {
            resolve({
              errCode: 1,
              message: "Error",
            });
          } else {
            let id = mongoose.Types.ObjectId();
            Specialty.create(
              {
                _id: id,
                ...data,
                link: `/specialty/${aliasName}/${id}`,
                alias: aliasName,
                image: process.env.BASE_URL + "/images/" + fileName,
              },
              (error, result) => {
                if (error) {
                  resolve({
                    errCode: 1,
                    message: error.message,
                  });
                } else {
                  resolve({
                    errCode: 0,
                    message: "Create specialty is successful!",
                    data: result,
                  });
                }
              }
            );
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getAllSpecialties = () => {
  return new Promise((resolve, reject) => {
    try {
      Specialty.find({}, (error, result) => {
        if (error) {
          resolve({
            errCode: 1,
            message: "Error!",
          });
        } else {
          resolve({
            errCode: 0,
            message: "Successfull!",
            data: result,
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailSpecialty = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Specialty.findById(
        { _id: mongoose.Types.ObjectId(id) },
        (error, specialty) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (specialty) {
              Doctor.find({ specialty: specialty._id }, (error, doctor) => {
                if (error) {
                  resolve({
                    errCode: 1,
                    message: error.message,
                  });
                } else {
                  resolve({
                    errCode: 0,
                    message: "Successful!",
                    data: {
                      name: specialty.name,
                      description: specialty.description,
                      image: specialty.image,
                      doctors: doctor,
                    },
                  });
                }
              });
            } else {
              resolve({
                errCode: 1,
                message: "Specialty not found",
              });
            }
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const updateInfoSpecialty = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      Specialty.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        data,
        (error, result) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (result) {
              resolve({
                errCode: 0,
                message: "Update info successfully!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Specialty not found!",
              });
            }
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const updateImageSpecialty = (id, image) => {
  return new Promise((resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      image.mv(path.resolve("./src/assets/images", fileName), (error) => {
        if (error) {
          resolve({
            errCode: 1,
            message: error.message,
          });
        } else {
          Specialty.findByIdAndUpdate(
            {
              _id: mongoose.Types.ObjectId(id),
            },
            {
              image: `${process.env.BASE_URL}/images/${fileName}`,
            },
            (error, result) => {
              if (error) {
                resolve({
                  errCode: 1,
                  message: error.message,
                });
              } else {
                if (result) {
                  resolve({
                    errCode: 0,
                    message: "Update image specialty successfully!",
                    data: result,
                  });
                } else {
                  resolve({
                    errCode: 1,
                    message: "Specialty not found",
                  });
                }
              }
            }
          );
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteSpecialty = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Specialty.findOneAndDelete(
        {
          _id: mongoose.Types.ObjectId(id),
        },
        (error, result) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (result) {
              resolve({
                errCode: 0,
                message: "Delete Successfully!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Specialty not found!",
              });
            }
          }
        }
      );
    } catch (e) {
      e;
    }
  });
};

export {
  createSpecialty,
  getAllSpecialties,
  getDetailSpecialty,
  updateInfoSpecialty,
  updateImageSpecialty,
  deleteSpecialty,
};
