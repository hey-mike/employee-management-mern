import mongoose from "mongoose";
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
  id: Number,
  name: {
    type: String,
    required: true
  },
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
  nationality: String
}, { timestamps:  true });
employeeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});
const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;
