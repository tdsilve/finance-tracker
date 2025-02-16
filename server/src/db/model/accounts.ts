import mongoose from "mongoose";
import { UserAccountsSchema } from "../schema/accounts";

export const UserAccountsModel = mongoose.model(
  "UserAccounts",
  UserAccountsSchema,
);

export const getAccounts = (id: string) =>
  UserAccountsModel.findOne({ userId: id });
export const createAccount = async ({
  userId,
  name,
}: {
  userId: string;
  name: string;
}) => {
  try {
    const userAccounts = await getAccounts(userId);
    if (!userAccounts) {
      UserAccountsModel.create({ userId, accounts: [{ name }] });
    }
    const accountExists = userAccounts.accounts.some(
      (account) => account.name === name,
    );
    if (accountExists) {
      throw new Error("Account with this name already exists");
    }

    userAccounts.accounts.push({ name });
    await userAccounts.save();
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error("Could not create account");
  }
};

export const deleteAccountById = (id: string) =>
  UserAccountsModel.findByIdAndDelete(id);

export const deleteAccountsByIds = async (userId: string, ids: string[]) => {
  const userAccounts = await getAccounts(userId);

  if (!userAccounts) {
    throw new Error("User accounts not found");
  }

  userAccounts.accounts = userAccounts.accounts.filter(
    (account) => !ids.includes(account._id.toString()),
  );

  await userAccounts.save();
  return userAccounts;
};

export const updateAccountById = (id: string, values: Record<string, any>) =>
  UserAccountsModel.findByIdAndUpdate(id, values, { new: true }).then((user) =>
    user.toObject(),
  );
