import mongoose from "mongoose";
var Schema = mongoose.Schema;

var deparmentSchema = new Schema({
  id: Number,
  name: {type: String, required: true},
  location:String,
}, { timestamps:  true });

const Deparment = mongoose.model("deparments", deparmentSchema);
module.exports = Deparment;
