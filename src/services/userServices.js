import mongoose from "mongoose";
import path from "path";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const userSignup = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images/users", fileName),
        async (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: "Error",
            });
          } else {
            let id = mongoose.Types.ObjectId();
            let aliasName = data.name.split(" ").join("-");
            await User.create(
              {
                _id: id,
                ...data,
                image: `${process.env.BASE_URL}/images/users/${fileName}`,
                alias: aliasName,
                link: `/user/${aliasName}/${id}`,
              },
              (error, result) => {
                if (result) {
                  resolve({
                    errCode: 0,
                    message: "Sign up successfully!",
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

const userLogin = (userName, password) => {
  return new Promise((resolve, reject) => {
    try {
      User.findOne({ userName: userName }, (error, user) => {
        if (error) {
          resolve({
            errCode: 1,
            message: "Error!",
          });
        } else {
          if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
              if (same) {
                resolve({
                  errCode: 0,
                  message: "Login sucessfully!",
                  data: user,
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
              message: "User not found",
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const userChangeInfo = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      User.findByIdAndUpdate(
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
                message: "Update successfully!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "User not found!",
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

const userChangeImage = (id, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images/users", fileName),
        (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            User.findByIdAndUpdate(
              {
                _id: mongoose.Types.ObjectId(id),
              },
              {
                image: `${process.env.BASE_URL}/images/users/${fileName}`,
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
                      message: "Update image user successfully!",
                      data: result,
                    });
                  } else {
                    resolve({
                      errCode: 1,
                      message: "User not found",
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

const changePassword = (userName, password, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      User.findOne({ userName: userName }, (error, result) => {
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
                User.findOneAndUpdate(
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

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      User.findByIdAndDelete(
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
                message: "Delete user successfully!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "User not found!",
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

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      User.find({}, (error, result) => {
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
            });
          } else {
            resolve({
              errCode: 1,
              message: "User not found!",
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
  userLogin,
  changePassword,
  userSignup,
  userChangeImage,
  userChangeInfo,
  deleteUser,
  getAllUsers,
};
