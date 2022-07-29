import mongoose from "mongoose";
import path from "path";
import HealthPackage from "../models/healthPackage.js";

const createPackage = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images", fileName),
        async (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: "Error",
            });
          } else {
            let id = mongoose.Types.ObjectId();
            let aliasName = data.name.split(" ").join("-");
            await HealthPackage.create(
              {
                _id: id,
                ...data,
                image: `${process.env.BASE_URL}/images/${fileName}`,
                alias: aliasName,
                link: `/health-package/${aliasName}/${id}`,
              },
              (error, result) => {
                if (result) {
                  resolve({
                    errCode: 0,
                    message: "Create Health Package successful",
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

const getAllPackages = () => {
  return new Promise((resolve, reject) => {
    try {
      HealthPackage.find({}, (error, result) => {
        if (error) {
          resolve({
            errCode: error,
            message: error.message,
          });
        } else {
          if (result) {
            resolve({
              errCode: 0,
              message: "Successful",
              data: result,
            });
          } else {
            resolve({
              errCode: 1,
              message: "Error!",
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailPackages = (id) => {
  return new Promise((resolve, reject) => {
    try {
      HealthPackage.findById({
        _id: mongoose.Types.ObjectId(id),
      })
        .populate("hospital")
        .exec((error, result) => {
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
                message: "Package not found!",
              });
            }
          }
        });
    } catch (e) {
      reject(e);
    }
  });
};

const updateInfoPackage = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      HealthPackage.findByIdAndUpdate(
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
                message: "Successful!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Package not found!",
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

const updateImagePackage = (id, image) => {
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
          HealthPackage.findByIdAndUpdate(
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
                    message: "Update image package successfully!",
                    data: result,
                  });
                } else {
                  resolve({
                    errCode: 1,
                    message: "Package not found",
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

const deletePackage = (id) => {
  return new Promise((resolve, reject) => {
    try {
      HealthPackage.findByIdAndDelete(
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
                message: "Delete package successful!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Package not found!",
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
  createPackage,
  getAllPackages,
  getDetailPackages,
  updateImagePackage,
  updateInfoPackage,
  deletePackage,
};
