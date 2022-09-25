import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PostSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    alias: { type: String, required: true },
    link: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    artist: { type: String, required: true },
    banner: { type: String, required: true },
    time: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform(doc, data) {
        delete data.__v;
      },
    },
  }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
