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
  router.post("/api/doctor/create", handleCreateDoctor); //Th??m 1 b??c s??

  router.get("/api/doctors", handleGetAllDoctors); //L???y d??? li???u t???t c??? b??c s??

  router.get("/api/doctor/search", handleSearchDoctor); //L???y d??? li???u t???t c??? b??c s??

  router.get("/api/doctor/:id", handleGetDoctorById); //L???y d??? li???u 1 b??c s??

  router.post("/api/doctor/update/:id", handleUpdateDoctor); //S???a d??? li???u 1 b??c s??

  router.post("/api/doctor/delete/:id", handleDeleteDoctor); //X??a 1 b??c s??

  router.post("/api/doctor/login", handleDoctorLogin); //B??c s?? ????ng nh???p

  router.post("/api/doctor/change-password/:id", handleChangePasswordDoctor);

  // router.use("/api/create-doctor", validateData); // Validate form

  //////////////
  // router.use("/api/hospital/create", checkHasImage); //ki???m tra xem c?? ???nh kh??ng

  router.post("/api/hospital/create", handleCreateHospital); //Th??m 1 b???nh vi???n

  router.get("/api/hospitals", handleGetAllHospitals); //Xem d??? li???u t???t c??? b???nh vi???n

  router.get("/api/hospital/:id", handleGetHospitalById); //Xem 1 b???nh vi???n

  router.post("/api/hospital/update/:id", handleUpdateHospital); //S???a 1 b???nh vi???n

  router.post("/api/hospital/delete/:id", handleDeleteHospital); //X??a 1 b???nh vi???n
  router.post("/api/hospital/search", handleSearchHospital); //X??a 1 b???nh vi???n

  ///////////////
  router.use("/api/specialty/create", checkHasImage);

  router.post("/api/specialty/create", handleCreateSpecialty); //Th??m 1 chuy??n khoa

  router.get("/api/specialty/:id", handleGetSpecialtyById); //Xem 1 chuy??n khoa

  router.get("/api/specialties", handleGetAllSpecialties); //Xem t???t c??? chuy??n khoa

  router.post("/api/specialty/update/:id", handleUpdateSpecialty); //S???a thong tin 1 chuy??n khoa

  router.post("/api/specialty/delete/:id", handleDeleteSpecialty); //X??a 1 chuy??n khoa
  router.post("/api/specialty/search", handleSearchSpecialty);

  /////////////////

  router.use("/api/package/create", checkHasImage);
  router.post("/api/package/create", handleCreatePackage); //Th??m 1 g??i kh??m

  router.get("/api/package/:id", handleGetDetailPackage); //Xem 1 g??i kh??m

  router.get("/api/packages", handleGetAllPackages); //Xem t???t c??? g??i kh??m

  router.post("/api/package/update/:id", handleUpdatePackage); //S???a thong tin 1 g??i kh??m

  router.post("/api/package/delete/:id", handleDeletePackage); //X??a 1 g??i kh??m
  router.post("/api/package/search", handleSearchPackage); //Tiem kiem g??i kh??m

  /////////////////

  router.use("/api/type-package/create", checkHasImage);
  router.post("/api/type-package/create", handleCreateTypePackage); //Th??m 1 lo???i g??i kh??m

  router.get("/api/type-package/:id", handleGetOneTypePackage); //Xem 1 lo???i g??i kh??m

  router.get("/api/type-packages", handleGetAllTypePackages); //Xem t???t c??? lo???i g??i kh??m

  router.post("/api/type-package/update/:id", handleUpdateTypePackage); //S???a thong tin lo???i g??i kh??m

  router.post("/api/type-package/search", handleSearchTypePackage); //Tim kiem loai goi kham

  router.post("/api/type-package/delete/:id", handleDeleteTypePackage); //X??a lo???i g??i kh??m

  ////////////////

  router.post("/api/booking/create", handleCreateBooking); //Th??m 1 ????n h??ng

  router.get("/api/bookings", handleGetAllBookings); //Xem t???t c??? ????n h??ng

  router.get("/api/booking/:id", handleGetOneBooking); //Xem 1 ????n h??ng

  router.post("/api/booking/update/:id", handleUpdateBooking); //S???a 1 ????n h??ng

  router.post("/api/booking/delete/:id", handleDeleteBooking); //X??a 1 ????n h??ng

  ////////////////

  router.use("/api/signup-user", checkRegexPhoneNumber);
  router.use("/api/signup-user", checkRegexEmail);
  router.use("/api/users", handleGetAllUser);
  router.post("/api/signup-user", handleSignupUser); //????ng k?? - T???o 1 user
  router.post("/api/update-user/:id", handleChangeInfoUser); //Ch???nh s???a th??ng tin - Update user
  router.post("/api/user/login", handleUserLogin); //????ng nh???p -
  router.post("/api/users", handleGetAllUser);
  router.use("/api/change-password", checkReNewPassword);
  router.post("/api/change-password", handleUserChangePassword); //?????i m???t kh???u

  ////////////////

  router.post("/api/admin/create", handleCreateAdmin); //Th??m m???t admin
  router.get("/api/admins", handleGetAllAdmin); //Th??m m???t admin
  router.get("/api/admin/:id", handleGetOneAdmin); //Th??m m???t admin
  router.post("/api/admin/login", handleAdminLogin); //????ng nh???p
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
