const mongoose = require("mongoose");

 const FinanceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
      default: Date.now, 
    },
    notes: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    }
    });

export const UserFinanceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  finance: {
    type: [FinanceSchema]
  },
});