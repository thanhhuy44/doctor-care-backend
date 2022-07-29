import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TypePackageSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const TypePackage = mongoose.model("TypePackage", TypePackageSchema);
export default TypePackage;
