const mongoose = require("mongoose");
const Doctor = require("../models/doctor");
mongoose.connect("mongodb://localhost/doctorCareDb", {
  useNewUrlParser: true,
});
Doctor.create(
  {
    name: "Thanh Huy dep trai nhat vu tru",
    age: 22,
  },
  (error, doctor) => {
    console.log(error, doctor);
  }
);
