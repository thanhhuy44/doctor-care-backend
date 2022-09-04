import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const AdminSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true, dropDups: true },
    birth: { type: Date, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    alias: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, admin) {
        delete admin.password, delete admin.__v;
      },
    },
  }
);

AdminSchema.pre("save", function (next) {
  let admin = this;
  bcrypt.hash(admin.password, 10, (error, hash) => {
    admin.password = hash;
    next();
  });
});
const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
