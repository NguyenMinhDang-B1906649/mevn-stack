import axios from "axios";
const url = "/api/post";

export default class API {
  // get all the post from the server
  static async getAllPost() {
    const res = await axios.get(url);
    return res.data;
  }
  // get post by id
  static async getPostById(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }
  //add post
  static async addPost(post) {
    const res = await axios.post(`${url}`, post);
    return res.data;
  }
}
