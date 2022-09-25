import mongoose from "mongoose";
import path from "path";
import HealthPackage from "../models/healthPackage.js";
import Hospital from "../models/hospital.js";
import TypePackage from "../models/typePackage.js";

const createPackage = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images/packages", fileName),
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
                image: `${process.env.BASE_URL}/images/packages/${fileName}`,
                alias: aliasName,
                link: `/health-package/${aliasName}/${id}`,
              },
              (error, result) => {
                if (result) {
                  Hospital.findByIdAndUpdate(
                    mongoose.Types.ObjectId(data.hospital),
                    {
                      $push: { healthPackages: id },
                    }
                  ).exec((error) => {
                    if (error) {
                      resolve({
                        errCode: 1,
                        message: "Error!",
                      });
                    } else {
                      TypePackage.findByIdAndUpdate(
                        mongoose.Types.ObjectId(data.typePackage),
                        {
                          $push: { healthPackages: id },
                        }
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
                    }
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
      HealthPackage.find({}).exec((error, result) => {
        if (error) {
          resolve({
            errCode: 1,
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
        .populate({
          path: "typePackage",
          select: "_id name alias link",
        })
        .populate({
          path: "hospital",
          select: "_id name alias link address image",
        })
        .populate({
          path: "booking",
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
      image.mv(
        path.resolve("./src/assets/images/packages", fileName),
        (error) => {
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
                image: `${process.env.BASE_URL}/images/packages/${fileName}`,
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
        }
      );
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
