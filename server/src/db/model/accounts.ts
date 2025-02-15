import mongoose from "mongoose";
import { AccountsSchema } from "../schema/accounts";

export const AccountsModel = mongoose.model("Account", AccountsSchema);

export const getAllAccounts = (userId: string) => AccountsModel.findOne({userId});
export const getAccountById = (id: string) => AccountsModel.findById(id);
export const createAccount = (values: Record<string, any>) =>
  new AccountsModel(values).save().then((account) => account.toObject());
export const deleteAccountById = (id: string) => AccountsModel.findByIdAndDelete(id);
export const updateAccountById = (id: string, values: Record<string, any>) =>
  AccountsModel.findByIdAndUpdate(id, values, { new: true }).then((user) =>
    user.toObject(),
  );
