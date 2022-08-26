import mongoose from "mongoose";
import path from "path";
import Hospital from "../models/hospital.js";

const createHospital = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images/hospitals", fileName),
        async (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: "Error",
            });
          } else {
            let id = mongoose.Types.ObjectId();
            let aliasName = data.name.split(" ").join("-");
            await Hospital.create(
              {
                _id: id,
                ...data,
                image: `${process.env.BASE_URL}/images/hospitals/${fileName}`,
                alias: aliasName,
                link: `/hospital/${aliasName}/${id}`,
              },
              (error, result) => {
                if (result) {
                  resolve({
                    errCode: 0,
                    message: "Create hospital successful",
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
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getAllHospitals = () => {
  return new Promise((resolve, reject) => {
    try {
      Hospital.find({}, (error, result) => {
        if (result) {
          resolve({
            errCode: 0,
            message: "Successful",
            data: result,
          });
        } else {
          resolve({
            errCode: 1,
            message: error.message,
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailHospital = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Hospital.findById(
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
                message: "Successful!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Hospital not found!",
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

const updateInfoHospital = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      Hospital.findByIdAndUpdate(
        {
          _id: mongoose.Types.ObjectId(id),
        },
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
                message: "Upadate successfully!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Hospital not found!",
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

const updateImageHospital = (id, image) => {
  return new Promise((resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      image.mv(
        path.resolve("./src/assets/images/hospitals", fileName),
        (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            Hospital.findByIdAndUpdate(
              {
                _id: mongoose.Types.ObjectId(id),
              },
              {
                image: `${process.env.BASE_URL}/images/hospitals/${fileName}`,
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
                      message: "Update image hospital successfully!",
                      data: result,
                    });
                  } else {
                    resolve({
                      errCode: 1,
                      message: "Hospital not found",
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

const deleteHospital = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Hospital.findByIdAndDelete(
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
                message: "Delete Hospital successfully!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Hospital not found!",
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
  createHospital,
  getAllHospitals,
  getDetailHospital,
  updateInfoHospital,
  updateImageHospital,
  deleteHospital,
};
