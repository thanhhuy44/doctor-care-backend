import HealthPackage from "../models/healthPackage.js";
import Doctor from "../models/doctor.js";
import Hospital from "../models/hospital.js";
import Specialty from "../models/specialty.js";
import Post from "../models/post.js";

const getHome = () => {
  const data = [];
  return new Promise(async (resolve, reject) => {
    try {
      await Doctor.find({})
        .populate({
          path: "hospital",
          select: "_id name alias link address",
        })
        .limit(10)
        .exec((err, result) => {
          if (result) {
            data.push({ title: "Bác sĩ nổi bật", data: result });
            Hospital.find({})
              .limit(10)
              .exec((err, result) => {
                if (result) {
                  data.push({
                    title: "Cơ sở y tế",
                    data: result,
                  });
                  HealthPackage.find({})
                    .limit(10)
                    .exec((err, result) => {
                      if (result) {
                        data.push({
                          title: "Gói khám phổ biến",
                          data: result,
                        });
                        Specialty.find({})
                          .limit(10)
                          .exec((err, result) => {
                            if (result) {
                              data.push({
                                title: "Chuyên khoa",
                                data: result,
                              });
                              Post.find({})
                                .limit(10)
                                .exec((err, result) => {
                                  if (result) {
                                    data.push({
                                      title: "Bài viết nổi bật",
                                      data: result,
                                    });
                                    resolve({
                                      errCode: 0,
                                      message: "Successful!",
                                      data: data,
                                    });
                                  } else {
                                    resolve({
                                      errCode: 1,
                                      message: "Error!",
                                      data: err.message,
                                    });
                                  }
                                });
                            } else {
                              resolve({
                                errCode: 1,
                                message: "Error!",
                                data: err.message,
                              });
                            }
                          });
                      } else {
                        resolve({
                          errCode: 1,
                          message: "Error!",
                          data: err.message,
                        });
                      }
                    });
                } else {
                  resolve({
                    errCode: 1,
                    message: "Error!",
                    data: err.message,
                  });
                }
              });
          } else {
            resolve({
              errCode: 1,
              message: "Error!",
              data: err.message,
            });
          }
        });
    } catch (e) {
      reject(e);
    }
  });
};

const search = (keyword) => {
  return new Promise((resolve, reject) => {
    try {
      var promises = [];
      promises.push(
        Doctor.find({ name: { $regex: keyword, $options: "i" } })
          .lean()
          .exec()
      );
      promises.push(
        Hospital.find({ name: { $regex: keyword, $options: "i" } })
          .lean()
          .exec()
      );
      promises.push(
        Specialty.find({ name: { $regex: keyword, $options: "i" } })
          .lean()
          .exec()
      );
      promises.push(
        HealthPackage.find({ name: { $regex: keyword, $options: "i" } })
          .lean()
          .exec()
      );
      promises.push(
        Post.find({ title: { $regex: keyword, $options: "i" } })
          .lean()
          .exec()
      );
      Promise.all(promises)
        .then((results) => {
          resolve({
            errCode: 0,
            message: "Thành công!",
            data: [
              { name: "Bác sĩ", data: results[0] },
              { name: "Cơ sở y tế", data: results[1] },
              { name: "Chuyên khoa", data: results[2] },
              { name: "Gói khám", data: results[3] },
              { name: "Bài viết", data: results[4] },
            ],
          });
        })
        .catch((error) => {
          resolve({
            errCode: 1,
            message: error.message,
          });
        });
    } catch (error) {
      reject(error);
    }
  });
};

export { getHome, search };
