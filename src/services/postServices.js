import mongoose from "mongoose";
import path from "path";
import Post from "../models/post.js";

const createPost = (data, banner) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = banner.name.split(" ").join("-");
      await banner.mv(
        path.resolve("./src/assets/images/posts", fileName),
        async (error) => {
          if (error) {
            resolve({
              errCode: 1,
              message: "Error",
            });
          } else {
            let id = mongoose.Types.ObjectId();
            let aliasName = data.title.split(" ").join("-");
            await Post.create(
              {
                _id: id,
                ...data,
                banner: `${process.env.BASE_URL}/images/posts/${fileName}`,
                alias: aliasName,
                link: `/post/${aliasName}/${id}`,
              },
              (error, result) => {
                if (result) {
                  resolve({
                    errCode: 0,
                    message: "Create Post successfully!",
                    data: result,
                  });
                } else {
                  resolve({
                    errCode: 1,
                    message: error.message,
                  });
                }
              }
            );
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getAllPosts = () => {
  return new Promise((resolve, reject) => {
    try {
      Post.find({}, (error, result) => {
        if (result) {
          resolve({
            errCode: 0,
            message: "Successfully!",
            data: result,
          });
        } else {
          resolve({
            errCode: 1,
            message: "Error!",
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailPost = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      Post.findById({ _id: mongoose.Types.ObjectId(id) }).exec(
        (error, post) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (post) {
              resolve({
                errCode: 0,
                message: "Successful!",
                data: post,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Doctor not found",
              });
            }
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Post.findByIdAndDelete(
        {
          _id: mongoose.Types.ObjectId(id),
        },
        (error, result) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (result) {
              resolve({
                errCode: 0,
                message: "Delete post successfully!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Post not found!",
              });
            }
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

export { createPost, getAllPosts, getDetailPost, deletePost };
