const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: String,
    email: { type: String, required: true },
    altEmail: String,
    status: { type: String, required: true },
    qualification: { type: String, required: true },
    interestField: { type: String, required: true },
    source: { type: String, required: true },
    assignedTo: { type: String, required: true },
    jobInterest: String,
    state: String,
    city: String,
    passoutYear: String,
    heardFrom: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema); 