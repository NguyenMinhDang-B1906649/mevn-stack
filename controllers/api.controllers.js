const Post = require("../models/posts.models");
const fs = require("fs");
class API {
  // fetch all post
  static fetchAllPost = async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  // fetch post by ID
  static fetchPostByID = async (req, res) => {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  // create post
  static createPost = async (req, res) => {
    const post = req.body;
    const imgName = req.file.filename;
    console.log(imgName);
    post.image = imgName;
    try {
      await Post.create(post);
      res.status(201).json({ message: "post created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  // update a post
  static updatePost = async (req, res) => {
    const id = req.params.id;
    let newImg = "";
    if (req.file) {
      newImg = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_img);
      } catch (error) {
        console.log(error);
      }
    } else {
      newImg = req.body.old_img;
    }
    const newPost = req.body;
    newPost.image = newImg;
    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(200).json({ message: "post updated successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  // delete All a post
  static deletePost = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Post.findByIdAndDelete(id);
      console.log(result);
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (error) {
          console.log(error);
        }
      }
      res.status(200).json({ message: "post deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
module.exports = API;
