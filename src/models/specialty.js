import mongoose from "mongoose";

const Schema = mongoose.Schema;
const SpecialtySchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    alias: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
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

const Specialty = mongoose.model("Specialty", SpecialtySchema);
export default Specialty;
