import mongoose from "mongoose";
import path from "path";
import HealthPackage from "../models/healthPackage.js";
import TypePackage from "../models/typePackage.js";

const createTypePackage = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images/typePackages", fileName),
        async (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: "Error",
            });
          } else {
            let id = mongoose.Types.ObjectId();
            let aliasName = data.name.split(" ").join("-");
            await TypePackage.create(
              {
                _id: id,
                ...data,
                image: `${process.env.BASE_URL}/images/typePackages/${fileName}`,
                alias: aliasName,
                link: `/type-package/${aliasName}/${id}`,
              },
              (error, result) => {
                if (result) {
                  resolve({
                    errCode: 0,
                    message: "Create Type Package successful",
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

const getAllTypePackages = () => {
  return new Promise((resolve, reject) => {
    try {
      TypePackage.find({}, (error, result) => {
        if (error) {
          resolve({
            errCode: 1,
            message: error.message,
          });
        } else {
          if (result) {
            resolve({
              errCode: 0,
              data: result,
              message: "Successful!",
            });
          } else {
            resolve({
              errCode: 1,
              message: "Type not found!",
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailTypePackage = (id) => {
  return new Promise((resolve, reject) => {
    try {
      TypePackage.findById({ _id: mongoose.Types.ObjectId(id) })
        .populate({
          path: "healthPackages",
          populate: {
            path: "hospital booking",
          },
        })
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
                message: "Successfully!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Type Package not found!",
              });
            }
          }
        });
    } catch (e) {
      reject(e);
    }
  });
};

const updateInfoTypePackage = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      TypePackage.findByIdAndUpdate(
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
                message: "Successful!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Not found type package!",
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

const updateImageTypePackage = (id, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images/typePackages", fileName),
        (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            TypePackage.findByIdAndUpdate(
              {
                _id: mongoose.Types.ObjectId(id),
              },
              {
                image: `${process.env.BASE_URL}/images/typePackages/${fileName}`,
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
                      message: "Update image type package successfully!",
                      data: result,
                    });
                  } else {
                    resolve({
                      errCode: 1,
                      message: "Type Package not found",
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

const deleteTypePackage = (id) => {
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
                message: "Delete successfully!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Type package not found!",
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
  createTypePackage,
  getAllTypePackages,
  getDetailTypePackage,
  updateImageTypePackage,
  updateInfoTypePackage,
  deleteTypePackage,
};
