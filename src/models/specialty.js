import mongoose from "mongoose";
import Doctor from "./doctor.js";

const Schema = mongoose.Schema;
const SpecialtySchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    alias: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, specialty) {
        delete specialty.__v;
      },
    },
  }
);

const Specialty = mongoose.model("Specialty", SpecialtySchema);
export default Specialty;
