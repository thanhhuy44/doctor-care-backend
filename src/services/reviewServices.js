import mongoose from "mongoose";
import Doctor from "../models/doctor.js";
import HealthPackage from "../models/healthPackage.js";
import Review from "../models/review.js";

const createReview = (data) => {
  return new Promise((resolve, reject) => {
    try {
      let id = mongoose.Types.ObjectId();
      Review.create(
        {
          _id: id,
          ...data,
        },
        (error, result) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (result) {
              if (data.doctor) {
                Doctor.findByIdAndUpdate(mongoose.Types.ObjectId(data.doctor), {
                  $push: { reviews: id },
                }).exec((error) => {
                  if (error) {
                    resolve({
                      errCode: 1,
                      message: error.message,
                    });
                  } else {
                    resolve({
                      errCode: 0,
                      message: "Đánh giá thành công!",
                      data: result,
                    });
                  }
                });
              } else if (data.package) {
                HealthPackage.findByIdAndUpdate(
                  mongoose.Types.ObjectId(data.package),
                  {
                    $push: { reviews: id },
                  }
                ).exec((error) => {
                  if (error) {
                    resolve({
                      errCode: 1,
                      message: error.message,
                    });
                  } else {
                    resolve({
                      errCode: 0,
                      message: "Đánh giá thành công!",
                      data: result,
                    });
                  }
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "Không thành công!",
                });
              }
            } else {
              resolve({
                errCode: 1,
                message: "Không thành công!",
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

const getAllReviews = () => {
  return new Promise((resolve, reject) => {
    try {
      Review.find({}).exec((error, result) => {
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
              message: "Lỗi!",
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const searchReview = (keyword, doctor) => {
  return new Promise((resolve, reject) => {
    try {
      Review.find(
        {
          name: { $regex: keyword, $options: "i" },
          doctor: mongoose.Types.ObjectId(doctor),
        },
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

export { createReview, getAllReviews, searchReview };
