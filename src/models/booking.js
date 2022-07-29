import mongoose from "mongoose";

const Schema = mongoose.Schema;
const BookingSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  doctor: { type: mongoose.Types.ObjectId, ref: "Doctor" },
  package: { type: mongoose.Types.ObjectId, ref: "HealthPackage" },
  customer: { type: String, required: true, ref: "User" },
  timeStart: { type: Date, required: true, default: new Date() },
  timeEnd: {
    type: Date,
    required: true,
    default: new Date(),
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
