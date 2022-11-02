import mongoose from "mongoose";
import Booking from "../models/booking.js";
import Doctor from "../models/doctor.js";
import HealthPackage from "../models/healthPackage.js";

const createBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = mongoose.Types.ObjectId();
      await Booking.create({ _id: id, ...data }, (error, result) => {
        if (error) {
          resolve({
            errCode: 1,
            message: error.message,
          });
        } else {
          if (result) {
            if (data.doctor) {
              Doctor.findByIdAndUpdate(mongoose.Types.ObjectId(data.doctor), {
                $push: { booking: id },
              }).exec((error) => {
                if (error) {
                  resolve({
                    errCode: 1,
                    message: error.message,
                  });
                } else {
                  resolve({
                    errCode: 0,
                    message: "Create successfully!",
                    data: result,
                  });
                }
              });
            } else if (data.package) {
              HealthPackage.findByIdAndUpdate(
                mongoose.Types.ObjectId(data.package),
                {
                  $push: { booking: id },
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
                    message: "Create successfully!",
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
          } else {
            resolve({
              errCode: 1,
              message: "Error!",
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllBookings = () => {
  return new Promise((resolve, reject) => {
    try {
      Booking.find({}).exec((error, result) => {
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
              message: "Error!",
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getBookingsOfUser = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      Booking.find({
        customer: mongoose.Types.ObjectId(userId),
      })
        .populate({
          path: "doctor",
          select: "_id firstName lastName image specialty hospital alias link",
        })
        .populate({
          path: "package",
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
                message: "Not found booking",
              });
            }
          }
        });
    } catch (e) {
      reject(e);
    }
  });
};

const updateBooking = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      Booking.findByIdAndUpdate(
        {
          _id: mongoose.Types.ObjectId(id),
        },
        { ...data }
      ).exec((error, result) => {
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
              message: "Not found booking",
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const cancelBooking = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Booking.findByIdAndDelete(
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
                message: "Cancel Sucessfully!",
              });
            } else {
              resolve({
                errCode: 1,
                message: "Not found booking",
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
  createBooking,
  getAllBookings,
  getBookingsOfUser,
  cancelBooking,
  updateBooking,
};
