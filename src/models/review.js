import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ReviewSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    package: { type: mongoose.Schema.Types.ObjectId, ref: "HealthPackage" },
    phoneNumber: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, data) {
        delete data.password, delete data.__v;
      },
    },
  }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
