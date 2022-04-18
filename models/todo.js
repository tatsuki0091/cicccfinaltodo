var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date },
});

module.exports = mongoose.model("Todo", TodoSchema);
