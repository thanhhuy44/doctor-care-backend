import mongoose from "mongoose";
import path from "path";
import HealthPackage from "../models/healthPackage.js";
import Hospital from "../models/hospital.js";
import TypePackage from "../models/typePackage.js";
import fs from "fs";

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
              message: "Lỗi",
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
                        message: "Lỗi!",
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
                            message: "Lỗi!",
                          });
                        } else {
                          resolve({
                            errCode: 0,
                            message: "Thêm gói khám vào hệ thống thành công!",
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
      HealthPackage.find({})
        .populate({
          path: "hospital",
          select: "_id name alias link address image",
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
        .populate({
          path: "reviews",
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

const updatePackage = (id, image, data) => {
  return new Promise((resolve, reject) => {
    try {
      if (image === 0) {
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
                  message: "Cập nhật thông tin gói khám thành công!",
                  data: result,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "Không tìm thấy gói khám trên hệ thống!",
                });
              }
            }
          }
        );
      } else {
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
                  ...data,
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
                        message: "Cập nhật thông tin gói khám thành công!",
                        data: result,
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        message: "Không tìm thấy gói khám trên hệ thống!",
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
              const path = result.image.replace(
                process.env.BASE_URL,
                "./src/assets"
              );
              fs.unlink(path, (error) => {
                if (error) {
                  resolve({
                    errCode: 1,
                    message: error.message,
                  });
                } else {
                  resolve({
                    errCode: 0,
                    message: "Xóa gói khám khỏi hệ thống thành công!",
                  });
                }
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không tìm thấy gói khám trên hệ thống!",
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

const searchPackage = (keyword) => {
  return new Promise((resolve, reject) => {
    try {
      HealthPackage.find(
        { name: { $regex: keyword, $options: "i" } },
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
                message: "Thành công!",
                data: data,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không có kết quả!",
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
  updatePackage,
  deletePackage,
  searchPackage,
};
