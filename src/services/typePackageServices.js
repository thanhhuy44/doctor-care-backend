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

const updateTypePackage = (id, image, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (image === 0) {
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
                  message: "Cập nhật loại gói khám thành công!",
                  data: result,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "Không tìm thấy loại gói khám trên hệ thống!",
                });
              }
            }
          }
        );
      } else {
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
                  ...data,
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
                        message: "Cập nhật loại gói khám thành công!",
                        data: result,
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        message: "Không tìm thấy loại gói khám trên hệ thống!",
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

const deleteTypePackage = (id) => {
  return new Promise((resolve, reject) => {
    try {
      TypePackage.findByIdAndDelete(
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
                message: "Xóa loại gói khám thành công!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không tìm thấy loại gói khám trên hệ thống!",
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

const searchTypePackage = (keyword) => {
  return new Promise((resolve, reject) => {
    try {
      TypePackage.find(
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
  createTypePackage,
  getAllTypePackages,
  getDetailTypePackage,
  updateTypePackage,
  deleteTypePackage,
  searchTypePackage,
};
