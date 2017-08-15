import mongoose from "mongoose";


var employeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("employees", employeeSchema);
module.exports = Employee;
