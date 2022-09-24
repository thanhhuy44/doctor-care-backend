import HealthPackage from "../models/healthPackage.js";
import Doctor from "../models/doctor.js";
import Hospital from "../models/hospital.js";
import Specialty from "../models/specialty.js";
import Post from "../models/post.js";

const SchemaArr = [Specialty, Doctor, Hospital, HealthPackage];

const getHome = () => {
  const data = [];
  return new Promise(async (resolve, reject) => {
    try {
      await Doctor.find({})
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

export { getHome };
