import mongoose from "mongoose";
import path from "path";
import Hospital from "../models/hospital.js";

const createHospital = (data, image, descImages) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Xử lý ảnh mô tả bệnh viện
      console.log(image);
      let descImageFiles = (files) => {
        let result = [];
        files.forEach((img) => {
          img.mv(
            path.resolve(
              "./src/assets/images/hospitals",
              img.name.split(" ").join("-")
            )
          );
          result.push({
            name: img.name,
            alias: img.name.split(" ").join("-"),
            link: `${process.env.BASE_URL}/images/hospitals/${img.name
              .split(" ")
              .join("-")}`,
          });
        });
        return result;
      };

      let fileName = image.name.split(" ").join("-");

      await image.mv(
        path.resolve("./src/assets/images/hospitals", fileName),
        async (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: "Error",
            });
          } else {
            let id = mongoose.Types.ObjectId();
            let aliasName = data.name.split(" ").join("-");
            await Hospital.create(
              {
                _id: id,
                ...data,
                address: {
                  province: data.address[0],
                  district: data.address[1],
                  wards: data.address[2],
                },
                image: `${process.env.BASE_URL}/images/hospitals/${fileName}`,
                descImages: descImageFiles(descImages),
                alias: aliasName,
                link: `/hospital/${aliasName}/${id}`,
              },
              (error, result) => {
                if (result) {
                  resolve({
                    errCode: 0,
                    message: "Create hospital successful",
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

const getAllHospitals = () => {
  return new Promise((resolve, reject) => {
    try {
      Hospital.find({})
        .select("-doctors -healthPackages")
        .exec((error, result) => {
          if (result) {
            resolve({
              errCode: 0,
              message: "Successful",
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
          select: "_id firstName lastName image specialty hospital alias link",
        })
        .populate({
          path: "healthPackages",
          select: "_id name image typePackage hospital alias link",
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
                message: "Hospital not found!",
              });
            }
          }
        });
    } catch (e) {
      reject(e);
    }
  });
};

const updateInfoHospital = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      Hospital.findByIdAndUpdate(
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
                message: "Upadate successfully!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Hospital not found!",
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

const updateImageHospital = (id, image) => {
  return new Promise((resolve, reject) => {
    try {
      let fileName = image.name.split(" ").join("-");
      image.mv(
        path.resolve("./src/assets/images/hospitals", fileName),
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
                image: `${process.env.BASE_URL}/images/hospitals/${fileName}`,
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
                      message: "Update image hospital successfully!",
                      data: result,
                    });
                  } else {
                    resolve({
                      errCode: 1,
                      message: "Hospital not found",
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
                message: "Delete Hospital successfully!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Hospital not found!",
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
  updateInfoHospital,
  updateImageHospital,
  deleteHospital,
};
