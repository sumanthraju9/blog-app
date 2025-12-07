var mongoose = require("mongoose");



const blogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  }
});

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;
