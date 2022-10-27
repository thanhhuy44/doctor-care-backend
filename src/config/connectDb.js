import mongoose from "mongoose";
const URL =
  "mongodb+srv://thanhhuy44:Thanhhuy28062001@cluster-doctor-care.zhj8oku.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Çonnected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
