import mongoose from "mongoose";

export const AccountsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  accounts:  {
    type: [String], // Store an array of account names
    validate: {
      validator: function (accounts: string[]) {
        return new Set(accounts).size === accounts.length; // Ensure unique names
      },
      message: "Account names must be unique.",
    },
  }
});
