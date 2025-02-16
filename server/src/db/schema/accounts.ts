const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const UserAccountsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  accounts: {
    type: [AccountSchema],
    validate: {
      validator: function (value) {
        const names = value.map((account) => account.name);
        return names.length === new Set(names).size;
      },
      message: "Account names must be unique within a user.",
    },
  },
});
