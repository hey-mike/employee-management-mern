import mongoose from "mongoose";
var Schema = mongoose.Schema;

var deparmentSchema = new Schema({
  id: Number,
  name: {type: String, required: true},
  location:String,
  createdAt: { type: Date, default: Date.now },
});

const Deparment = mongoose.model("deparments", deparmentSchema);
module.exports = Deparment;
