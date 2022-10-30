import mongoose from "mongoose";
import path from "path";
import Doctor from "../models/doctor.js";
import Hospital from "../models/hospital.js";
import Specialty from "../models/specialty.js";
import bcrypt from "bcrypt";

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
              message: error.message,
            });
          } else {
            let checkEmailExist = await Doctor.findOne({
              email: data.email,
            });
            if (checkEmailExist) {
              resolve({
                errCode: 1,
                message:
                  "Email này đã có trên hệ thống, vui lòng cung cấp email khác!",
              });
            } else {
              let id = mongoose.Types.ObjectId();
              let aliasName = `${data.name.split(" ").join("-")}`;
              await Doctor.create(
                {
                  _id: id,
                  name: data.name,
                  birth: data.birthDay,
                  email: data.email,
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
                          message: error.message,
                        });
                      } else {
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
                              message: error.message,
                            });
                          } else {
                            resolve({
                              errCode: 0,
                              message: "Thêm bác sĩ vào hệ thống thành công!",
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
              message: "thành công!",
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
                message: "Thành công!",
                data: doctor,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không tìm thấy bác sĩ trên hệ thống!",
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
                message: "Thành công!",
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
                message: "Thành công!",
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
                message: "Thành công!",
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
              message: "Cập nhật bác sĩ thành công!",
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
      let aliasName = `${info.name.split(" ").join("-")}`;
      if (image === 0) {
        Doctor.findByIdAndUpdate(
          {
            _id: mongoose.Types.ObjectId(id),
          },
          { alias: aliasName, link: `/doctor/${aliasName}/${id}`, ...info },
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
                  message: "Cập nhật thông tin bác sĩ thành công",
                  data: result,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "Không tìm thấy bác sĩ trên hệ thống!",
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
                  alias: aliasName,
                  link: `/doctor/${aliasName}/${id}`,
                  ...info,
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
                        message: "Cập nhật thông tin bác sĩ thành công!",
                        data: result,
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        message: "Không tìm thấy bác sĩ trên hệ thống!",
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
                message: "Xóa bác sĩ ra khỏi hệ thống thành công!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không tìm thấy bác sĩ trên hệ thống!",
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

const doctorLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    try {
      Doctor.findOne({
        email: email,
      })
        .select("password")
        .exec((error, doctor) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (doctor) {
              bcrypt.compare(password, doctor.password, (error, same) => {
                if (same) {
                  resolve({
                    errCode: 0,
                    message: "Bác sĩ đăng nhập thành công!",
                    data: doctor,
                  });
                } else {
                  resolve({
                    errCode: 1,
                    message: "Sai mật khẩu!",
                  });
                }
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không tìm thấy bác sĩ trên hệ thống!",
              });
            }
          }
        });
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
  doctorLogin,
};
