import express from "express";
import { validationResult } from "express-validator/src/validation-result.js";
import {
  handleCreateDoctor,
  handleGetDoctorById,
  handleUpdateInfoDoctor,
  handleDeleteDoctor,
  handleGetAllDoctors,
  handleUpdateImageDoctor,
} from "../controllers/doctorControllers.js";
import {
  handleCreatePackage,
  handleDeletePackage,
  handleGetAllPackages,
  handleGetDetailPackage,
  handleUpdateImagePackage,
  handleUpdateInfoPackage,
} from "../controllers/healthyPackageControllers.js";

import {
  handleCreateHospital,
  handleGetAllHospitals,
  handleGetHospitalById,
  handleUpdateInfoHospital,
  handleDeleteHospital,
  handleUpdateImageHospital,
} from "../controllers/hospitalControllers.js";

import {
  handleCreateSpecialty,
  handleDeleteSpecialty,
  handleGetAllSpecialties,
  handleGetSpecialtyById,
  handleUpdateInfoSpecialty,
  handleUpdateImageSpecialty,
} from "../controllers/specialtyControllers.js";

import {
  handleCreateTypePackage,
  handleGetAllTypePackages,
  handleGetOneTypePackage,
  handleDeleteTypePackage,
  handleUpdateInfoTypePackage,
  handleUpdateImageTypePackage,
} from "../controllers/typePackageControllers.js";

import {
  handleCreateBooking,
  handleDeleteBooking,
  handleGetAllBookings,
  handleGetOneBooking,
} from "../controllers/bookingControllers.js";

import {
  handleChangeInfoUser,
  handleGetAllUser,
  handleSignupUser,
  handleUserChangePassword,
  handleUserLogin,
  handleDeleteUser,
} from "../controllers/userControllers.js";

import {
  checkHasImage,
  checkRegexEmail,
  checkRegexPhoneNumber,
  validateRegister,
  checkReNewPassword,
} from "../middleWares/middleWares.js";
import {
  handleAdminchangeImage,
  handleAdminChangeInfo,
  handleAdminChangePassword,
  handleAdminLogin,
  handleCreateAdmin,
} from "../controllers/adminControllers.js";
import { handleGetHomePage } from "../controllers/pageControllers.js";
import {
  handleCreatePost,
  handleDeletePost,
  handleGetAllPosts,
  handleGetDetailPost,
} from "../controllers/postControllers.js";

const router = express.Router();

const webRoutes = (app) => {
  router.get("/", (req, res) => {
    res.render("signup");
  });
  router.use("/api/doctor/create", checkHasImage); // kiem tra du lieu co image?
  router.post("/api/doctor/create", handleCreateDoctor); //Thêm 1 bác sĩ

  router.get("/api/doctors", handleGetAllDoctors); //Lấy dữ liệu tất cả bác sĩ

  router.get("/api/doctor/:id", handleGetDoctorById); //Lấy dữ liệu 1 bác sĩ

  router.post("/api/doctor/update-info/:id", handleUpdateInfoDoctor); //Sửa dữ liệu 1 bác sĩ
  router.post("/api/doctor/update-image/:id", handleUpdateImageDoctor); //Sửa avatar 1 bác sĩ

  router.post("/api/doctor/delete/:id", handleDeleteDoctor); //Xóa 1 bác sĩ

  // router.use("/api/create-doctor", validateData); // Validate form

  //////////////
  // router.use("/api/hospital/create", checkHasImage); //kiểm tra xem có ảnh không

  router.post("/api/hospital/create", handleCreateHospital); //Thêm 1 bệnh viện

  router.get("/api/hospitals", handleGetAllHospitals); //Xem dữ liệu tất cả bệnh viện

  router.get("/api/hospital/:id", handleGetHospitalById); //Xem 1 bệnh viện

  router.post("/api/hospital/update-info/:id", handleUpdateInfoHospital); //Sửa info 1 bệnh viện

  router.use("/api/hospital/update-image/:id", checkHasImage); //kiểm tra xem có ảnh không

  router.post("/api/hospital/update-image/:id", handleUpdateImageHospital); //Sửa image 1 bệnh viện

  router.post("/api/hospital/delete/:id", handleDeleteHospital); //Xóa 1 bệnh viện

  ///////////////
  router.use("/api/specialty/create", checkHasImage);

  router.post("/api/specialty/create", handleCreateSpecialty); //Thêm 1 chuyên khoa

  router.get("/api/specialty/:id", handleGetSpecialtyById); //Xem 1 chuyên khoa

  router.get("/api/specialties", handleGetAllSpecialties); //Xem tất cả chuyên khoa

  router.post("/api/specialty/update/info/:id", handleUpdateInfoSpecialty); //Sửa thong tin 1 chuyên khoa

  router.use("api/specialty/update/image/:id", checkHasImage);
  router.post("api/specialty/update/image/:id", handleDeleteSpecialty); //Sua image 1 chuyen khoa

  router.post("/api/specialty/delete/:id", handleDeleteSpecialty); //Xóa 1 chuyên khoa

  /////////////////

  router.use("/api/package/create", checkHasImage);
  router.post("/api/package/create", handleCreatePackage); //Thêm 1 gói khám

  router.get("/api/package/:id", handleGetDetailPackage); //Xem 1 gói khám

  router.get("/api/packages", handleGetAllPackages); //Xem tất cả gói khám

  router.post("/api/package/update/info/:id", handleUpdateInfoPackage); //Sửa thong tin 1 gói khám

  router.use("/api/package/update/image/:id", checkHasImage);
  router.post("/api/package/update/image/:id", handleUpdateImagePackage); //Sửa hinh anh 1 gói khám

  router.post("/api/delete-package/:id", handleDeletePackage); //Xóa 1 gói khám

  /////////////////

  router.use("/api/type-package/create", checkHasImage);
  router.post("/api/type-package/create", handleCreateTypePackage); //Thêm 1 loại gói khám

  router.get("/api/type-package/:id", handleGetOneTypePackage); //Xem 1 loại gói khám

  router.get("/api/type-packages", handleGetAllTypePackages); //Xem tất cả loại gói khám

  router.post("/api/type-package/update/info/:id", handleUpdateInfoTypePackage); //Sửa thong tin loại gói khám

  router.use("/api/type-package/update/image/:id", checkHasImage);
  router.post(
    "/api/type-package/update/image/:id",
    handleUpdateImageTypePackage
  ); //Sửa thong tin loại gói khám

  router.post("/api/type-package/delete/:id", handleDeleteTypePackage); //Xóa loại gói khám

  ////////////////

  router.post("/api/create-booking", handleCreateBooking); //Thêm 1 đơn hàng

  router.get("/api/bookings", handleGetAllBookings); //Xem tất cả đơn hàng

  router.get("/api/booking/:id", handleGetOneBooking); //Xem 1 đơn hàng

  router.post("/api/update-booking"); //Sửa 1 đơn hàng

  router.post("/api/delete-booking/:id", handleDeleteBooking); //Xóa 1 đơn hàng

  ////////////////

  router.use("/api/signup-user", checkRegexPhoneNumber);
  router.use("/api/signup-user", checkRegexEmail);
  router.use("/api/users", handleGetAllUser);
  router.post("/api/signup-user", handleSignupUser); //Đăng ký - Tạo 1 user
  router.post("/api/update-user/:id", handleChangeInfoUser); //Chỉnh sửa thông tin - Update user
  router.post("/api/user/login", handleUserLogin); //Đăng nhập -
  router.post("/api/users", handleGetAllUser);
  router.use("/api/change-password", checkReNewPassword);
  router.post("/api/change-password", handleUserChangePassword); //Đổi mật khẩu

  ////////////////

  router.post("/api/admin/create", handleCreateAdmin); //Thêm một admin
  router.post("/api/admin/login", handleAdminLogin); //Đăng nhập
  router.post("/api/admin/change-info/:id", handleAdminChangeInfo); //Thay đổi thông tin admin
  router.post("/api/admin/change-image", handleAdminchangeImage); //Thay đổi hình ảnh admnin
  router.post("/api/admin/change-password", handleAdminChangePassword); //Thay đổi mật khẩu admin

  ////////////////

  router.post("/api/post/create", handleCreatePost);
  router.get("/api/posts", handleGetAllPosts);
  router.get("/api/post/:id", handleGetDetailPost);
  router.post("/api/post/delete/:id", handleDeletePost);

  ///////////////
  router.get("/api/home", handleGetHomePage);

  return app.use("/", router);
};

export default webRoutes;
