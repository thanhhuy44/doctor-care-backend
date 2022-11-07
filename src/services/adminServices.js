import mongoose from "mongoose";
import path from "path";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";

const createAdmin = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmailExist = await Admin.findOne({
        email: data.email,
      });
      let checkUserNameExist = await Admin.findOne({
        userName: data.userName,
      });
      if (checkEmailExist) {
        resolve({
          errCode: 1,
          message: "Email đã tồn tại trên hệ thống!",
        });
      }
      if (checkUserNameExist) {
        resolve({
          errCode: 1,
          message: "Tên đăng nhập đã được sử dụng!",
        });
      }
      if (!checkEmailExist && !checkUserNameExist) {
        let fileName = image.name.split(" ").join("-");
        await image.mv(
          path.resolve("./src/assets/images/admin", fileName),
          async (error) => {
            if (error) {
              resolve({
                errCode: 1,
                message: "Lỗi",
              });
            } else {
              let id = mongoose.Types.ObjectId();
              let aliasName = data.name.split(" ").join("-");
              await Admin.create(
                {
                  _id: id,
                  ...data,
                  image: `${process.env.BASE_URL}/images/admin/${fileName}`,
                  alias: aliasName,
                  link: `/admin/${aliasName}/${id}`,
                },
                (error, result) => {
                  if (result) {
                    resolve({
                      errCode: 0,
                      message: "Thêm quản trị viên vào hệ thống thành công!",
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
      }
    } catch (e) {
      reject(e);
    }
  });
};

const adminLogin = (userName, password) => {
  return new Promise((resolve, reject) => {
    try {
      Admin.findOne(
        {
          userName: userName,
        },
        (error, admin) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (admin) {
              bcrypt.compare(password, admin.password, (error, same) => {
                if (same) {
                  resolve({
                    errCode: 0,
                    message: "Đăng nhập thành công!",
                    data: admin,
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
                message: "Không tìm thấy quản trị viên!",
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

const getAllAdmin = () => {
  return new Promise((resolve, reject) => {
    try {
      Admin.find({}).exec((error, result) => {
        if (error) {
          resolve({
            errCode: 1,
            message: error.message,
          });
        } else {
          if (result) {
            resolve({
              errCode: 0,
              message: "Thành công!",
              data: result,
            });
          } else {
            resolve({
              errCode: 1,
              message: "Không tìm thấy kết quả!",
            });
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getOneAdmin = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Admin.findById({
        _id: mongoose.Types.ObjectId(id),
      }).exec((error, admin) => {
        if (error) {
          resolve({
            errCode: 1,
            message: error.message,
          });
        } else {
          if (admin) {
            resolve({
              errCode: 0,
              message: "Thành công!",
              data: admin,
            });
          } else {
            resolve({
              errCode: 1,
              message: "Không tìm thấy quản trị viên trên hệ thống!",
            });
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const adminChangePassword = (id, password, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      Admin.findOne({ _id: mongoose.Types.ObjectId(id) }, (error, result) => {
        if (error) {
          resolve({
            errCode: 1,
            message: "Lỗi!",
          });
        } else {
          if (result) {
            bcrypt.compare(password, result.password, async (error, same) => {
              if (same) {
                let hashPass = await bcrypt.hash(newPassword, 10);
                Admin.findOneAndUpdate(
                  { _id: mongoose.Types.ObjectId(id) },
                  { password: hashPass },
                  (error, result) => {
                    if (result) {
                      resolve({
                        errCode: 0,
                        message: "Thay đổi mật khẩu thành công!",
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        message: "Lỗi!",
                      });
                    }
                  }
                );
              } else {
                resolve({
                  errCode: 1,
                  message: "Sai Mật khẩu!",
                });
              }
            });
          } else {
            resolve({
              errCode: 1,
              message: "Không tìm thấy admin trên hệ thống!!!",
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateAdmin = (id, image, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (image === 0) {
        Admin.findByIdAndUpdate(
          {
            _id: mongoose.Types.ObjectId(id),
          },
          data,
          (error, admin) => {
            if (error) {
              resolve({
                errCode: 1,
                message: error.message,
              });
            } else {
              if (admin) {
                resolve({
                  errCode: 0,
                  message: "Cập nhật thông tin quản trị viên thành công!",
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "Không tìm thấy quản trị viên trên hệ thống!",
                });
              }
            }
          }
        );
      } else {
        let fileName = image.name.split(" ").join("-");
        await image.mv(
          path.resolve("./src/assets/images/admin", fileName),
          (error) => {
            if (error) {
              resolve({
                errCode: 1,
                message: error.message,
              });
            } else {
              Admin.findByIdAndUpdate(
                {
                  _id: mongoose.Types.ObjectId(id),
                },
                {
                  ...data,
                  image: `${process.env.BASE_URL}/images/admin/${fileName}`,
                },
                (error, admin) => {
                  if (error) {
                    resolve({
                      errCode: 1,
                      message: error.message,
                    });
                  } else {
                    if (admin) {
                      resolve({
                        errCode: 0,
                        message: "Cập nhật thông tin quản trị viên thành công!",
                        data: admin,
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        message: "Không tìm thấy quản trị viên trên hệ thống!",
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
const deleteAdmin = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Admin.findByIdAndDelete({ _id: mongoose.Types.ObjectId(id) }).exec(
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
                message: "Thành công!",
              });
            } else {
              resolve({
                errCode: "1",
                message: "Không tìm thấy quản trị viên trên hệ thống!",
              });
            }
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

const searchAdmin = (keyword) => {
  return new Promise((resolve, reject) => {
    try {
      Admin.find(
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
    } catch (error) {
      reject(error);
    }
  });
};

export {
  createAdmin,
  getAllAdmin,
  getOneAdmin,
  updateAdmin,
  adminChangePassword,
  adminLogin,
  deleteAdmin,
  searchAdmin,
};
