import mongoose from "mongoose";
const Schema = mongoose.Schema;
const DoctorSchema = new Schema({
  name: String,
  age: { type: Number, min: 18, max: 65 },
});
const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
