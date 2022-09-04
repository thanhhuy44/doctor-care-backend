import mongoose from "mongoose";
import path from "path";
import bcrypt from "bcrypt";
import Doctor from "../models/doctor.js";

const createDoctor = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images/doctors", fileName),
        async (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: "Error",
            });
          } else {
            let checkEmailExist = await Doctor.findOne({
              email: data.email,
            });
            if (checkEmailExist) {
              resolve({
                errCode: 1,
                message: "Email is already exist!",
              });
            } else {
              let id = mongoose.Types.ObjectId();
              let aliasName = `${data.firstName
                .split(" ")
                .join("-")}-${data.lastName.split(" ").join("-")}`;
              await Doctor.create(
                {
                  _id: id,
                  firstName: data.firstName,
                  lastName: data.lastName,
                  birth: data.birthDay,
                  email: data.email,
                  password: data.email,
                  specialty: mongoose.Types.ObjectId(data.specialty),
                  hospital: mongoose.Types.ObjectId(data.hospital),
                  alias: aliasName,
                  link: `/doctor/${aliasName}/${id}`,
                  image: `${process.env.BASE_URL}/images/doctors/${fileName}`,
                  price: data.price,
                  phoneNumber: data.phoneNumber,
                  shortDescription: data.shortDescription,
                  description: data.description,
                },
                (error, result) => {
                  if (result) {
                    resolve({
                      errCode: 0,
                      message: "Create successfully!",
                      data: result,
                    });
                  } else {
                    console.log(error);
                    resolve({
                      errCode: 1,
                      message: "Error!",
                    });
                  }
                }
              );
            }
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      Doctor.find({}, (error, result) => {
        if (result) {
          resolve({
            errCode: 0,
            message: "Successfully!",
            data: result,
          });
        } else {
          resolve({
            errCode: 1,
            message: "Error!",
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailDoctor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      Doctor.findById({ _id: mongoose.Types.ObjectId(id) })
        .populate({
          path: "specialty",
          select: "_id name alias link",
        })
        .populate({
          path: "hospital",
          select: "_id name alias link address image",
        })
        .exec((error, doctor) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (doctor) {
              resolve({
                errCode: 0,
                message: "Successful!",
                data: doctor,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Doctor not found",
              });
            }
          }
        });
    } catch (e) {
      reject(e);
    }
  });
};

const updateInfoDoctor = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      Doctor.findByIdAndUpdate(
        {
          _id: mongoose.Types.ObjectId(id),
        },
        data,
        (error, result) => {
          if (result) {
            resolve({
              errCode: 1,
              message: "Update Successfully!",
              data: result,
            });
          } else {
            resolve({
              errCode: 1,
              message: error.message,
            });
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const updateImageDoctor = (id, image) => {
  return new Promise((resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      image.mv(
        path.resolve("./src/assets/images/doctors", fileName),
        (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            Doctor.findByIdAndUpdate(
              {
                _id: mongoose.Types.ObjectId(id),
              },
              {
                image: `${process.env.BASE_URL}/images/doctors/${fileName}`,
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
                      message: "Update image doctor successfully!",
                      data: result,
                    });
                  } else {
                    resolve({
                      errCode: 1,
                      message: "Doctor not found",
                    });
                  }
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

const deleteDoctor = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Doctor.findByIdAndDelete(
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
                message: "Delete successfully!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Doctor not found!",
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

export {
  createDoctor,
  getDetailDoctor,
  getAllDoctors,
  updateInfoDoctor,
  updateImageDoctor,
  deleteDoctor,
};
