import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const HospitalSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    alias: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    strengths: { type: String },
    equipments: { type: String },
    address: { type: String, required: true },
    location: {
      province: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      wards: {
        type: String,
        required: true,
      },
    },
    procedure: { type: String, required: true },
    logo: { type: String, required: true },
    image: { type: String, required: true },
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    healthPackages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthPackage",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, data) {
        delete data.__v;
      },
    },
  }
);

HospitalSchema.pre("save", function (next) {
  let hospital = this;
  bcrypt.hash(hospital.password, 10, (error, hash) => {
    hospital.password = hash;
    next();
  });
});

const Hospital = mongoose.model("Hospital", HospitalSchema);
export default Hospital;
