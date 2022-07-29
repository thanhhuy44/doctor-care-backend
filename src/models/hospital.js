import mongoose from "mongoose";

const Schema = mongoose.Schema;
const HospitalSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  alias: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
  strengths: { type: String, required: true },
  equipments: { type: String, required: true },
  address: { type: String, required: true },
  procedure: { type: String, required: true },
  image: { type: String, required: true },
  typeMedical: { type: Number, required: true, default: 2 },
});

const Hospital = mongoose.model("Hospital", HospitalSchema);
export default Hospital;
