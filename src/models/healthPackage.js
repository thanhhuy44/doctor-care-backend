import mongoose from "mongoose";

const Schema = mongoose.Schema;
const HealthPackageSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    alias: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    elements: { type: String, required: true },
    hospital: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Hospital",
    },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    procedure: { type: String, required: true },
    typePackage: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TypePackage",
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

const HealthPackage = mongoose.model("HealthPackage", HealthPackageSchema);
export default HealthPackage;
