import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const UserSchema = new Schema(
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
      transform(doc, data) {
        delete data.password, delete data.__v;
      },
    },
  }
);

UserSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});
const User = mongoose.model("User", UserSchema);
export default User;
