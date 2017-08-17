import mongoose from "mongoose";
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
  fullName: String,
  managerId: Number,
  reports: Number,
  managerName: String,
  age: Number,
  sex: String,
  title: String,
  department: String,
  email: String,
  phone: String,
  address: String,
  zipcode: String,
  salary: Number,
  isCurrent: Boolean,
  startDate: Date,
  leaveData: Date,
  nationality: String,
  createdAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("employees", employeeSchema);
module.exports = Employee;
