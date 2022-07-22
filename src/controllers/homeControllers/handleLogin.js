import mongoose from "mongoose";
import Doctor from "../../models/doctor.js";

mongoose.connect("mongodb://localhost/doctorCareDb", {
  useNewUrlParser: true,
});

const handleLogin = (req, res) => {
  let data;
  Doctor.find(
    {
      name: "Thanh Huy",
    },
    (error, doctor) => {
      res.send(doctor);
    }
  );
};

export default handleLogin;
