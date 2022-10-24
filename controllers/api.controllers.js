const Post = require("../models/posts.models");
const User = require("../models/user.models");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  static registerUser = async (req, res) => {
    try {
      const user = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(user.password, salt);
      user.password = hashPassword;
      await User.create(user);
      const { password, ...infoUser } = user;
      res.status(200).json({ user: infoUser });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  };
  static loginUser = async (req, res) => {
    const emailLogin = req.body.email;
    const user = await User.findOne({
      email: emailLogin,
    });
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    const rightPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!rightPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1day
    });

    res.status(201).json({ message: "login successfully" });
  };
  static logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
      maxAge: 0, // delete cookie
    });

    res.status(201).json({ message: "logout successfully" });
  };
  static userAuth = async (req, res) => {
    const cookie = req.cookies["jwt"];
    if (!cookie) {
      return res.status(400).json({ message: "unauthencated" });
    }
    const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({
      _id: claims._id,
    });
    const { password, ...data } = user.toJSON();
    res.send(data);
  };
}
module.exports = API;
