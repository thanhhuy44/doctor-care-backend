import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const DoctorSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birth: { type: Date, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    password: { type: String, required: true, select: false },
    phoneNumber: { type: Number, required: true },
    alias: { type: String, required: true },
    link: { type: String, required: true },
    specialty: {
      type: String,
      required: true,
      ref: "Specialty",
    },
    hospital: {
      type: String,
      required: true,
      ref: "Hospital",
    },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    typeMedical: { type: Number, required: true, default: 1 },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, doctor) {
        delete doctor.password, delete doctor.__v;
      },
    },
  }
);

DoctorSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});
const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
