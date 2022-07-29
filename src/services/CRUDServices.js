import mongoose from "mongoose";
import path from "path";
import bcrypt from "bcrypt";

const create = (Schema, data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Schema) {
        if (image) {
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
                if (data.email) {
                  let checkEmailExist = await Schema.findOne({
                    email: data.email,
                  });
                  if (checkEmailExist) {
                    resolve({
                      errCode: 1,
                      message: "Email is already registered!",
                    });
                  } else {
                    Schema.create(
                      {
                        _id: id,
                        ...data,
                        link: `/${Schema.modelName.toLowerCase()}/${aliasName}/${id}`,
                        alias: aliasName,
                        image: "/images/" + fileName,
                      },
                      (err, result) => {
                        if (err) {
                          console.log(err);
                          resolve({
                            errCode: 1,
                            message: "Error Data, try again!",
                          });
                        } else {
                          resolve({
                            errCode: 0,
                            message: "Create is successful!",
                          });
                        }
                      }
                    );
                  }
                } else {
                  Schema.create(
                    {
                      _id: id,
                      ...data,
                      link: `/${Schema.modelName.toLowerCase()}/${aliasName}/${id}`,
                      alias: aliasName,
                      image: "/images/" + fileName,
                    },
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        resolve({
                          errCode: 1,
                          message: "Error Data, try again!",
                        });
                      } else {
                        resolve({
                          errCode: 0,
                          message: "Create is successful!",
                        });
                      }
                    }
                  );
                }
              }
            }
          );
        } else {
          resolve({
            errCode: 1,
            message: "Error: Image is required",
          });
        }
      } else {
        resolve({
          errCode: 1,
          message: "Error!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const createBooking = (Schema, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        console.log(data);
        let id = await mongoose.Types.ObjectId();
        await Schema.create(
          {
            _id: id,
            ...data,
          },
          (error, result) => {
            if (error) {
              resolve({
                errCode: 1,
                message: "Error 1!",
              });
            } else {
              resolve({
                errCode: 0,
                message: "Create Successfully!",
                data: result,
              });
            }
          }
        );
      } else {
        resolve({
          errCode: 1,
          message: "Please complete all infomation!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (Schema) => {
  return new Promise((resolve, reject) => {
    try {
      if (Schema) {
        Schema.find({}, (error, result) => {
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
      } else {
        resolve({
          errCode: 1,
          message: "Error!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getOneById = (Schema, id) => {
  return new Promise((resolve, reject) => {
    try {
      if (Schema) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (isValidId) {
          Schema.findById(
            { _id: mongoose.Types.ObjectId(id) },
            (error, result) => {
              if (error) {
                resolve({
                  errCode: 1,
                  message: "Error!",
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
                    message: "Not found ID!",
                  });
                }
              }
            }
          );
        } else {
          resolve({
            errCode: 1,
            message: "Wrong ID!",
          });
        }
      } else {
        resolve({
          error: 1,
          message: "Error",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const update = async (Schema, data, id) => {
  return new Promise((resolve, reject) => {
    try {
      let isValidId = mongoose.Types.ObjectId.isValid(id);
      if (isValidId) {
        Schema.findByIdAndUpdate(
          { _id: mongoose.Types.ObjectId(id) },
          data,
          (err, result) => {
            if (err) {
              console.log(err);
              resolve({
                errCode: 1,
                message: "Error!",
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
                  message: "Not found ID!",
                });
              }
            }
          }
        );
      } else {
        resolve({
          errCode: 1,
          message: "Wrong ID!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const remove = (Schema, id) => {
  return new Promise((resolve, reject) => {
    try {
      let isValidId = mongoose.Types.ObjectId.isValid(id);
      if (isValidId) {
        Schema.findByIdAndDelete(
          {
            _id: mongoose.Types.ObjectId(id),
          },
          (error, result) => {
            if (error) {
              console.log(error);
              resolve({
                errCode: 1,
                message: "Error!",
              });
            } else {
              if (result) {
                resolve({
                  errCode: 0,
                  message: "Delete Successful!",
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "Not found ID!",
                });
              }
            }
          }
        );
      } else {
        resolve({
          errCode: 1,
          message: "Wrong ID!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export { create, getAll, getOneById, update, remove, createBooking };
