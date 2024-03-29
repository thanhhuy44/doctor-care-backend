import express from "express";
import {
  handleCreateDoctor,
  handleGetDoctorById,
  handleUpdateDoctor,
  handleDeleteDoctor,
  handleGetAllDoctors,
  handleSearchDoctor,
  handleDoctorLogin,
  handleChangePasswordDoctor,
} from "../controllers/doctorControllers.js";
import {
  handleCreatePackage,
  handleDeletePackage,
  handleGetAllPackages,
  handleGetDetailPackage,
  handleSearchPackage,
  handleUpdatePackage,
} from "../controllers/healthyPackageControllers.js";

import {
  handleCreateHospital,
  handleGetAllHospitals,
  handleGetHospitalById,
  handleUpdateHospital,
  handleDeleteHospital,
  handleSearchHospital,
} from "../controllers/hospitalControllers.js";

import {
  handleCreateSpecialty,
  handleDeleteSpecialty,
  handleGetAllSpecialties,
  handleGetSpecialtyById,
  handleSearchSpecialty,
  handleUpdateSpecialty,
} from "../controllers/specialtyControllers.js";

import {
  handleCreateTypePackage,
  handleGetAllTypePackages,
  handleGetOneTypePackage,
  handleDeleteTypePackage,
  handleUpdateTypePackage,
  handleSearchTypePackage,
} from "../controllers/typePackageControllers.js";

import {
  handleCreateBooking,
  handleDeleteBooking,
  handleGetAllBookings,
  handleGetOneBooking,
  handleUpdateBooking,
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
  handleAdminChangePassword,
  handleAdminLogin,
  handleCreateAdmin,
  handleDeleteAdmin,
  handleGetAllAdmin,
  handleGetOneAdmin,
  handleSearchAdmin,
  handleUpdateAdmin,
} from "../controllers/adminControllers.js";
import {
  handleGetHomePage,
  handleSearch,
} from "../controllers/pageControllers.js";
import {
  handleCreatePost,
  handleDeletePost,
  handleGetAllPosts,
  handleGetDetailPost,
  handleSearchPost,
  handleUpdatePost,
} from "../controllers/postControllers.js";
import {
  handleCreateReview,
  handleGetAllReviews,
  handleSearchReview,
} from "../controllers/reviewControllers.js";

const router = express.Router();

const webRoutes = (app) => {
  router.get("/", (req, res) => {
    res.render("home");
  });
  router.post("/api/doctor/create", handleCreateDoctor); //Thêm 1 bác sĩ

  router.get("/api/doctors", handleGetAllDoctors); //Lấy dữ liệu tất cả bác sĩ

  router.get("/api/doctor/search", handleSearchDoctor); //Lấy dữ liệu tất cả bác sĩ

  router.get("/api/doctor/:id", handleGetDoctorById); //Lấy dữ liệu 1 bác sĩ

  router.post("/api/doctor/update/:id", handleUpdateDoctor); //Sửa dữ liệu 1 bác sĩ

  router.post("/api/doctor/delete/:id", handleDeleteDoctor); //Xóa 1 bác sĩ

  router.post("/api/doctor/login", handleDoctorLogin); //Bác sĩ đăng nhập

  router.post("/api/doctor/change-password/:id", handleChangePasswordDoctor);

  // router.use("/api/create-doctor", validateData); // Validate form

  //////////////
  // router.use("/api/hospital/create", checkHasImage); //kiểm tra xem có ảnh không

  router.post("/api/hospital/create", handleCreateHospital); //Thêm 1 bệnh viện

  router.get("/api/hospitals", handleGetAllHospitals); //Xem dữ liệu tất cả bệnh viện

  router.get("/api/hospital/:id", handleGetHospitalById); //Xem 1 bệnh viện

  router.post("/api/hospital/update/:id", handleUpdateHospital); //Sửa 1 bệnh viện

  router.post("/api/hospital/delete/:id", handleDeleteHospital); //Xóa 1 bệnh viện
  router.post("/api/hospital/search", handleSearchHospital); //Xóa 1 bệnh viện

  ///////////////
  router.use("/api/specialty/create", checkHasImage);

  router.post("/api/specialty/create", handleCreateSpecialty); //Thêm 1 chuyên khoa

  router.get("/api/specialty/:id", handleGetSpecialtyById); //Xem 1 chuyên khoa

  router.get("/api/specialties", handleGetAllSpecialties); //Xem tất cả chuyên khoa

  router.post("/api/specialty/update/:id", handleUpdateSpecialty); //Sửa thong tin 1 chuyên khoa

  router.post("/api/specialty/delete/:id", handleDeleteSpecialty); //Xóa 1 chuyên khoa
  router.post("/api/specialty/search", handleSearchSpecialty);

  /////////////////

  router.use("/api/package/create", checkHasImage);
  router.post("/api/package/create", handleCreatePackage); //Thêm 1 gói khám

  router.get("/api/package/:id", handleGetDetailPackage); //Xem 1 gói khám

  router.get("/api/packages", handleGetAllPackages); //Xem tất cả gói khám

  router.post("/api/package/update/:id", handleUpdatePackage); //Sửa thong tin 1 gói khám

  router.post("/api/package/delete/:id", handleDeletePackage); //Xóa 1 gói khám
  router.post("/api/package/search", handleSearchPackage); //Tiem kiem gói khám

  /////////////////

  router.use("/api/type-package/create", checkHasImage);
  router.post("/api/type-package/create", handleCreateTypePackage); //Thêm 1 loại gói khám

  router.get("/api/type-package/:id", handleGetOneTypePackage); //Xem 1 loại gói khám

  router.get("/api/type-packages", handleGetAllTypePackages); //Xem tất cả loại gói khám

  router.post("/api/type-package/update/:id", handleUpdateTypePackage); //Sửa thong tin loại gói khám

  router.post("/api/type-package/search", handleSearchTypePackage); //Tim kiem loai goi kham

  router.post("/api/type-package/delete/:id", handleDeleteTypePackage); //Xóa loại gói khám

  ////////////////

  router.post("/api/booking/create", handleCreateBooking); //Thêm 1 đơn hàng

  router.get("/api/bookings", handleGetAllBookings); //Xem tất cả đơn hàng

  router.get("/api/booking/:id", handleGetOneBooking); //Xem 1 đơn hàng

  router.post("/api/booking/update/:id", handleUpdateBooking); //Sửa 1 đơn hàng

  router.post("/api/booking/delete/:id", handleDeleteBooking); //Xóa 1 đơn hàng

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
  router.get("/api/admins", handleGetAllAdmin); //Thêm một admin
  router.get("/api/admin/:id", handleGetOneAdmin); //Thêm một admin
  router.post("/api/admin/login", handleAdminLogin); //Đăng nhập
  router.post("/api/admin/update/:id", handleUpdateAdmin);
  router.post("/api/admin/change-password/:id", handleAdminChangePassword);
  router.post("/api/admin/delete/:id", handleDeleteAdmin);
  router.post("/api/admin/search", handleSearchAdmin);

  ////////////////

  router.post("/api/post/create", handleCreatePost);
  router.get("/api/posts", handleGetAllPosts);
  router.get("/api/post/:id", handleGetDetailPost);
  router.post("/api/post/update/:id", handleUpdatePost);
  router.post("/api/post/delete/:id", handleDeletePost);
  router.post("/api/post/search", handleSearchPost);

  ///////////////

  router.post("/api/review/create", handleCreateReview);
  router.post("/api/review/search", handleSearchReview);
  router.get("/api/reviews", handleGetAllReviews);

  ///////////////
  router.get("/api/home", handleGetHomePage);
  router.post("/api/search", handleSearch);

  ///////////////

  router.get("/api/search", handleSearch);

  router.get("*", (req, res) => {
    res.render("errorPage");
  });

  return app.use("/", router);
};

export default webRoutes;
