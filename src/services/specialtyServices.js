import mongoose from "mongoose";
import path from "path";
import Specialty from "../models/specialty.js";
import fs from "fs";

const createSpecialty = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let aliasName = data.name.split(" ").join("-");
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve(__dirname + "/src/assets/images/specialties", fileName),
        function (error) {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            let id = mongoose.Types.ObjectId();
            Specialty.create(
              {
                _id: id,
                ...data,
                link: `/specialty/${aliasName}/${id}`,
                alias: aliasName,
                image: process.env.BASE_URL + "/images/specialties/" + fileName,
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
                    message: "Thêm chuyên khoa vào hệ thống thành công!",
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
      Specialty.find({})
        .populate("doctors")
        .exec((error, result) => {
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
      Specialty.findById({ _id: mongoose.Types.ObjectId(id) })
        .populate({
          path: "doctors",
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
                errCode: "0",
                message: "Thành công!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không tìm thấy chuyên khoa",
              });
            }
          }
        });
    } catch (e) {
      reject(e);
    }
  });
};

const updateSpecialty = (id, image, data) => {
  return new Promise((resolve, reject) => {
    try {
      if (image === 0) {
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
                  message: "Cập nhật thông tin chuyên khoa thành công!",
                  data: result,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "Không tìm thấy chuyên khoa trên hệ thống!",
                });
              }
            }
          }
        );
      } else {
        let fileName = image.name.split(" ").join("-");
        image.mv(
          path.resolve("./src/assets/images/specialties", fileName),
          (error) => {
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
                  ...data,
                  image: `${process.env.BASE_URL}/images/specialties/${fileName}`,
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
                        message: "Cập nhật chuyên khoa thành công!",
                        data: result,
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        message: "Không tìm thấy chuyên khoa trên hệ thống!",
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
                    message: "Xóa chuyên khoa khỏi hệ thống thành công!",
                  });
                }
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không tìm thấy chuyên khoa trên hệ thống!",
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

const searchSpecialty = (keyword) => {
  return new Promise((resolve, reject) => {
    try {
      Specialty.find(
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
  createSpecialty,
  getAllSpecialties,
  getDetailSpecialty,
  updateSpecialty,
  deleteSpecialty,
  searchSpecialty,
};
