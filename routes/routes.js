const express = require("express");
const router = express.Router();
const API = require("../controllers/api.controllers");
const upload = require("../middlewere/multer.middlewere");

router.get("/", API.fetchAllPost);
router.get("/:id", API.fetchPostByID);
router.post("/", upload, API.createPost);
router.patch("/:id", upload, API.updatePost);
router.delete("/:id", API.deletePost);

module.exports = router;
