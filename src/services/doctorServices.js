import mongoose from "mongoose";
import path from "path";
import Doctor from "../models/doctor.js";
import Hospital from "../models/hospital.js";
import Specialty from "../models/specialty.js";

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
                    Hospital.findByIdAndUpdate(
                      mongoose.Types.ObjectId(data.hospital),
                      {
                        $push: { doctors: id },
                      },
                      {}
                    ).exec((error) => {
                      if (error) {
                        resolve({
                          errCode: 1,
                          message: "Error!",
                        });
                      } else {
                        resolve({
                          errCode: 0,
                          message: "Create successfully!",
                          data: result,
                        });
                      }
                    });
                    Specialty.findByIdAndUpdate(
                      mongoose.Types.ObjectId(data.specialty),
                      {
                        $push: { doctors: id },
                      },
                      {}
                    ).exec((error) => {
                      if (error) {
                        resolve({
                          errCode: 1,
                          message: "Error!",
                        });
                      } else {
                        resolve({
                          errCode: 0,
                          message: "Create successfully!",
                          data: result,
                        });
                      }
                    });
                  } else {
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
      Doctor.find({})
        .select("-booking")
        .populate({
          path: "specialty",
          select: "_id name alias link",
        })
        .populate({
          path: "hospital",
          select: "_id name alias link address image",
        })
        .exec((error, result) => {
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
        .populate({
          path: "booking",
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

const searchDoctor = (keyword) => {
  return new Promise((resolve, reject) => {
    try {
      Doctor.find(
        { lastName: { $regex: keyword, $options: "i" } },
        (error, data) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (data) {
              resolve({
                errCode: 0,
                message: "Search successfully!",
                data: data,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Search not found!",
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

const findDoctorWithFilter = (filter) => {
  return new Promise((resolve, reject) => {
    try {
      filter.hospital &&
        !filter.specialty &&
        Doctor.find(
          {
            hospital: mongoose.Types.ObjectId(filter.hospital),
          },
          (error, data) => {
            if (data) {
              resolve({
                errCode: 0,
                message: "Get successfully!",
                data: data,
              });
            } else {
              resolve({
                errCode: 1,
                message: error.message,
              });
            }
          }
        );
      !filter.hospital &&
        filter.specialty &&
        Doctor.find(
          {
            specialty: mongoose.Types.ObjectId(filter.specialty),
          },
          (error, data) => {
            if (data) {
              resolve({
                errCode: 0,
                message: "Get successfully!",
                data: data,
              });
            } else {
              resolve({
                errCode: 1,
                message: error.message,
              });
            }
          }
        );
      filter.hospital &&
        filter.specialty &&
        Doctor.find(
          {
            hospital: mongoose.Types.ObjectId(filter.hospital),
            specialty: mongoose.Types.ObjectId(filter.specialty),
          },
          (error, data) => {
            if (data) {
              resolve({
                errCode: 0,
                message: "Get successfully!",
                data: data,
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
              errCode: 0,
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

const updateDoctor = (id, image, info) => {
  return new Promise((resolve, reject) => {
    try {
      if (image === 0) {
        Doctor.findByIdAndUpdate(
          {
            _id: mongoose.Types.ObjectId(id),
          },
          info,
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
                  message: "Update Successfully!",
                  data: result,
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
      } else {
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
      }
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
  updateDoctor,
  deleteDoctor,
  searchDoctor,
  findDoctorWithFilter,
};
