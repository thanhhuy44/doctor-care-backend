const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DoctorSchema = new Schema({
  name: String,
  age: { type: Number, min: 18, max: 65 },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;
