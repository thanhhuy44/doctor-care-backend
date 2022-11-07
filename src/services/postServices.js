import mongoose from "mongoose";
import path from "path";
import Post from "../models/post.js";
import fs from "fs";

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
              message: "Lỗi",
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
                    message: "Thêm bài viết vào hệ thống thành công!",
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
            message: "Thành công!",
            data: result,
          });
        } else {
          resolve({
            errCode: 1,
            message: "Lỗi!",
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

const updatePost = (id, banner, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (banner === 0) {
        Post.findByIdAndUpdate(
          { _id: mongoose.Types.ObjectId(id) },
          data,
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
                  message: "Cập nhật bài viết thành công!",
                  data: result,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "Không tìm thấy bài viết trên hệ thống!",
                });
              }
            }
          }
        );
      } else {
        let fileName = banner.name.split(" ").join("-");
        await banner.mv(
          path.resolve("./src/assets/images/typePackages", fileName),
          (error) => {
            if (error) {
              resolve({
                errCode: 1,
                message: error.message,
              });
            } else {
              TypePackage.findByIdAndUpdate(
                {
                  _id: mongoose.Types.ObjectId(id),
                },
                {
                  ...data,
                  banner: `${process.env.BASE_URL}/images/typePackages/${fileName}`,
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
                        message: "Cập nhật loại gói khám thành công!",
                        data: result,
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        message: "Không tìm thấy loại gói khám trên hệ thống!",
                      });
                    }
                  }
                }
              );
            }
          }
        );
      }
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
              const path = result.banner.replace(
                process.env.BASE_URL,
                "./src/assets"
              );
              fs.unlink(path, (error) => {
                if (error) {
                  resolve({
                    errCode: 1,
                    message: error.message,
                  });
                } else {
                  resolve({
                    errCode: 0,
                    message: "Xóa bài viết khỏi hệ thống thành công!",
                    data: result,
                  });
                }
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không tìm thấy bài viết trên hệ thống!",
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

const searchPost = (keyword) => {
  return new Promise((resolve, reject) => {
    try {
      Post.find(
        { title: { $regex: keyword, $options: "i" } },
        (error, data) => {
          if (error) {
            resolve({
              errCode: 1,
              message: error.message,
            });
          } else {
            if (data) {
              resolve({
                errCode: 0,
                message: "Thành công!",
                data: data,
              });
            } else {
              resolve({
                errCode: 1,
                message: "Không có kết quả!",
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

export {
  createPost,
  getAllPosts,
  getDetailPost,
  updatePost,
  deletePost,
  searchPost,
};
