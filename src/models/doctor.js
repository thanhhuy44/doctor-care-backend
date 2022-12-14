import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const DoctorSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    birth: { type: Date, required: true, default: Date.now },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      default: "12345678x@X",
    },
    phoneNumber: { type: String, required: true },
    alias: { type: String, required: true },
    link: { type: String, required: true },
    specialty: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Specialty",
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Hospital",
    },
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
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
  let doctor = this;
  bcrypt.hash(doctor.password, 10, (error, hash) => {
    doctor.password = hash;
    next();
  });
});
const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
