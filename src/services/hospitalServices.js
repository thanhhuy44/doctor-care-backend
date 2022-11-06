import mongoose from "mongoose";
import path from "path";
import Hospital from "../models/hospital.js";

const createHospital = (data, logo, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let logoName = logo.name.split(" ").join("-");
      let imageName = image.name.split(" ").join("-");
      await image.mv(
        path.resolve("./src/assets/images/hospitals", imageName),
        async (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            await logo.mv(
              path.resolve("./src/assets/images/hospitals", logoName),
              async (error) => {
                if (error) {
                  resolve({
                    errCode: 1,
                    message: error.message,
                  });
                } else {
                  let id = mongoose.Types.ObjectId();
                  let aliasName = data.name.split(" ").join("-");
                  await Hospital.create(
                    {
                      _id: id,
                      ...data,
                      location: {
                        province: data.location[0],
                        district: data.location[1],
                        wards: data.location[2],
                      },
                      logo: `${process.env.BASE_URL}/images/hospitals/${logoName}`,
                      image: `${process.env.BASE_URL}/images/hospitals/${imageName}`,
                      alias: aliasName,
                      link: `/hospital/${aliasName}/${id}`,
                    },
                    (error, result) => {
                      if (result) {
                        resolve({
                          errCode: 0,
                          message: "Thêm cơ sở y tế thành công!",
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
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getAllHospitals = () => {
  return new Promise((resolve, reject) => {
    try {
      Hospital.find({})
        .select("-doctors -healthPackages")
        .exec((error, result) => {
          if (result) {
            resolve({
              errCode: 0,
              message: "Thành công !",
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

const getDetailHospital = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Hospital.findById({
        _id: mongoose.Types.ObjectId(id),
      })
        .populate({
          path: "doctors",
          populate: {
            path: "booking",
          },
        })
        .populate({
          path: "healthPackages",
          populate: {
            path: "booking",
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
                message: "Thành công !",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không tìm thấy cơ sở y tế !",
              });
            }
          }
        });
    } catch (e) {
      reject(e);
    }
  });
};

const updateHospital = (id, logo, image, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (logo !== 0 && image === 0) {
        let logoName = logo.name.split(" ").join("-");
        logo.mv(
          path.resolve("./src/assets/images/hospitals", logoName),
          (error) => {
            if (error) {
              resolve({
                errCode: 1,
                message: error.message,
              });
            } else {
              Hospital.findByIdAndUpdate(
                {
                  _id: mongoose.Types.ObjectId(id),
                },
                {
                  logo: `${process.env.BASE_URL}/images/hospitals/${logoName}`,
                  ...data,
                  location: {
                    province: data.location[0],
                    district: data.location[1],
                    wards: data.location[2],
                  },
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
                        message: "Cập nhật thông tin cơ sở y tế thành công!",
                        data: result,
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        message: "Không tìm thấy cơ sở y tế!",
                      });
                    }
                  }
                }
              );
            }
          }
        );
      } else if (image !== 0 && logo === 0) {
        let imageName = image.name.split(" ").join("-");
        image.mv(
          path.resolve("./src/assets/images/hospitals", imageName),
          (error) => {
            if (error) {
              resolve({
                errCode: 1,
                message: error.message,
              });
            } else {
              Hospital.findByIdAndUpdate(
                {
                  _id: mongoose.Types.ObjectId(id),
                },
                {
                  image: `${process.env.BASE_URL}/images/hospitals/${imageName}`,
                  ...data,
                  location: {
                    province: data.location[0],
                    district: data.location[1],
                    wards: data.location[2],
                  },
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
                        message: "Cập nhật thông tin cơ sở y tế thành công!",
                        data: result,
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        message: "Không tìm thấy cơ sở y tế!",
                      });
                    }
                  }
                }
              );
            }
          }
        );
      } else if (logo !== 0 && image !== 0) {
        let logoName = logo.name.split(" ").join("-");
        let imageName = image.name.split(" ").join("-");
        await image.mv(
          path.resolve("./src/assets/images/hospitals", imageName),
          async (error) => {
            if (error) {
              resolve({
                errCode: 1,
                message: error.message,
              });
            } else {
              await logo.mv(
                path.resolve("./src/assets/images/hospitals", logoName),
                async (error) => {
                  if (error) {
                    resolve({
                      errCode: 1,
                      message: error.message,
                    });
                  } else {
                    Hospital.findByIdAndUpdate(
                      {
                        _id: mongoose.Types.ObjectId(id),
                      },
                      {
                        image: `${process.env.BASE_URL}/images/hospitals/${imageName}`,
                        logo: `${process.env.BASE_URL}/images/hospitals/${logoName}`,
                        ...data,
                        location: {
                          province: data.location[0],
                          district: data.location[1],
                          wards: data.location[2],
                        },
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
                              message:
                                "Cập nhật thông tin cơ sở y tế thành công!",
                              data: result,
                            });
                          } else {
                            resolve({
                              errCode: 1,
                              message: "Không tìm thấy cơ sở y tế!",
                            });
                          }
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      } else {
        Hospital.findByIdAndUpdate(
          {
            _id: mongoose.Types.ObjectId(id),
          },
          {
            ...data,
            location: {
              province: data.location[0],
              district: data.location[1],
              wards: data.location[2],
            },
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
                  message: "Cập nhật thông tin cơ sở y tế thành công!",
                  data: result,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "Không tìm thấy cơ sở y tế!",
                });
              }
            }
          }
        );
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteHospital = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Hospital.findByIdAndDelete(
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
                message: "Xóa cơ sở y tế thành công!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không tìm thấy cơ sở y tế!",
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

const searchHospital = (keyword) => {
  return new Promise((resolve, reject) => {
    try {
      Hospital.find(
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
  createHospital,
  getAllHospitals,
  getDetailHospital,
  updateHospital,
  deleteHospital,
  searchHospital,
};
