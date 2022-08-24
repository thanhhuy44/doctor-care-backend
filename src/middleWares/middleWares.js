import { check } from "express-validator";

const validateRegister = () => {
  return [
    check("username", "username does not Empty").not().isEmpty(),
    check("username", "username must be Alphanumeric").isAlphanumeric(),
    check("username", "username more than 6 degits").isLength({ min: 6 }),
    check("email", "Invalid does not Empty").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("numberPhone", "Invalid Number Phone").isMobilePhone,
    check("birthday", "Invalid birthday").isISO8601("yyyy-mm-dd"),
    check("password", "password more than 6 degits").isLength({ min: 6 }),
  ];
};

const checkHasImage = (req, res, next) => {
  if (req.files) {
    next();
  } else {
    res.json({
      errCode: 1,
      message: "Image is required!",
    });
  }
};

const checkRegexEmail = (req, res, next) => {
  let isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email);
  if (isEmail) {
    next();
  } else {
    return res.json({
      errCode: 1,
      message: "Wrong Email!",
    });
  }
};

const checkRegexPhoneNumber = (req, res, next) => {
  let isPhoneNumber = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(
    req.body.phoneNumber
  );
  if (isPhoneNumber) {
    next();
  } else {
    return res.json({
      errCode: 1,
      message: "Wrong Phone Number!",
    });
  }
};

const checkReNewPassword = (req, res, next) => {
  if (req.body.newPassword === req.body.password) {
    return res.json({
      errCode: 1,
      message: "New password must be different old password!",
    });
  } else {
    if (req.body.newPassword === req.body.reNewPassword) {
      next();
    } else {
      return res.json({
        errCode: 1,
        message: "New password is not correct!",
      });
    }
  }
};

export {
  validateRegister,
  checkRegexEmail,
  checkRegexPhoneNumber,
  checkReNewPassword,
  checkHasImage,
};
