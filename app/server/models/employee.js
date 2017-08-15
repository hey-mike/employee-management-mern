import mongoose from "mongoose";


var employeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("employees", employeeSchema);
module.exports = Employee;
