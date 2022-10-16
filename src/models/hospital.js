import mongoose from "mongoose";

const Schema = mongoose.Schema;
const HospitalSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    alias: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    strengths: { type: String, required: true },
    equipments: { type: String, required: true },
    address: {
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
    image: { type: String, required: true },
    descImages: [
      {
        name: { type: String, required: true },
        alias: { type: String, required: true },
        link: {
          type: String,
          required: true,
        },
      },
    ],
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
    typeMedical: { type: Number, required: true, default: 2 },
  },
  {
    toJSON: {
      transform(doc, data) {
        delete data.__v;
      },
    },
  }
);

const Hospital = mongoose.model("Hospital", HospitalSchema);
export default Hospital;
