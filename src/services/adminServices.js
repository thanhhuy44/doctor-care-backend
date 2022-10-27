import mongoose from "mongoose";
import path from "path";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";

const createAdmin = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images/admin", fileName),
        async (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: "Error",
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
                link: `/user/${aliasName}/${id}`,
              },
              (error, result) => {
                if (result) {
                  resolve({
                    errCode: 0,
                    message: "Create admin successfully!",
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
                    message: "Login sucessfully!",
                    data: admin,
                  });
                } else {
                  resolve({
                    errCode: 1,
                    message: "Wrong password!",
                  });
                }
              });
            } else {
              resolve({
                errCode: 1,
                message: "Admin not found!",
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

const adminChangePassword = (userName, password, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      Admin.findOne({ userName: userName }, (error, result) => {
        if (error) {
          resolve({
            errCode: 1,
            message: "Error",
          });
        } else {
          if (result) {
            bcrypt.compare(password, result.password, async (error, same) => {
              if (same) {
                let hashPass = await bcrypt.hash(newPassword, 10);
                Admin.findOneAndUpdate(
                  { userName: userName },
                  { password: hashPass },
                  (error, result) => {
                    if (result) {
                      resolve({
                        errCode: 0,
                        message: "Change password successfully!",
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        message: "Error!",
                      });
                    }
                  }
                );
              } else {
                resolve({
                  errCode: 1,
                  message: "Wrong password!",
                });
              }
            });
          } else {
            resolve({
              errCode: 1,
              message: "User not found!!!",
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const adminChangeInfo = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
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
                message: "Update info successfully!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Admin not found!",
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

const adminChangeImage = (id, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      await image.mv(path.resolve("./src/assets/images", fileName), (error) => {
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
              image: `${process.env.BASE_URL}/images/${fileName}`,
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
                    message: "Update admin's image successfully!",
                    data: admin,
                  });
                } else {
                  resolve({
                    errCode: 1,
                    message: "Admin not found",
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

export {
  createAdmin,
  adminChangeImage,
  adminChangeInfo,
  adminChangePassword,
  adminLogin,
};
