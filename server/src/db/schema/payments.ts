const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const PaymentsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  payments: {
    type: [PaymentSchema],
    validate: {
      validator: function (value) {
        const names = value.map((account) => account.name);
        return names.length === new Set(names).size;
      },
      message: "Account names must be unique within a user.",
    },
  },
});
