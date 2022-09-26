import mongoose from "mongoose";

const Schema = mongoose.Schema;
const BookingSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    numberPhone: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    package: { type: mongoose.Schema.Types.ObjectId, ref: "HealthPackage" },
    time: { type: Date, required: true },
    shift: { type: Number, required: true },
    reason: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, data) {
        delete data.__v;
      },
    },
  }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
