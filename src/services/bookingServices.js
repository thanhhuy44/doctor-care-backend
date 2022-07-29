import mongoose from "mongoose";
import path from "path";
import Booking from "../models/booking.js";

const createBooking = (data) => {
  return new Promise((resolve, reject) => {
    try {
      Booking.create(
        {
          data,
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
                message: "Create sucessful!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Error!",
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

const getAllBookings = () => {
  return new Promise((resolve, reject) => {
    try {
      Booking.find({}, (error, result) => {
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
      Booking.find(
        {
          customer: mongoose.Types.ObjectId(userId),
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
        }
      );
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

export { createBooking, getAllBookings, getBookingsOfUser, cancelBooking };
