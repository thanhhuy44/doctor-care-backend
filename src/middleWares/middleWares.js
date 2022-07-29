const validateData = (req, res, next) => {
  if (req.body === {} || !req.files) {
    return res.send({
      errCode: 1,
      message: "Please complete all information!",
    });
  } else {
    next();
  }
};

const checkRegexUserName = (req, res, next) => {
  let isUserName = /^[a-zA-Z0-9]+$/.test(req.body.userName);
  if (isUserName) {
    next();
  } else {
    return res.json({
      errCode: 1,
      message: "Wrong userName!",
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
  checkRegexUserName,
  checkRegexEmail,
  checkRegexPhoneNumber,
  checkReNewPassword,
};
