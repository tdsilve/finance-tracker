import mongoose from "mongoose";
import { UserAccountsSchema } from "../schema/accounts";
import { sanitizeStringToCompare } from "../../utils/string";

export const UserAccountsModel = mongoose.model(
  "UserAccounts",
  UserAccountsSchema,
);

export const getAccounts = async (id: string, fieldsSearch?: string) => {
  const userAccounts = await UserAccountsModel.findOne({ userId: id });
console.log("userAccounts", fieldsSearch);
  if (!userAccounts) {
    return null;
  };

  if (fieldsSearch) {
    userAccounts.accounts = userAccounts.accounts.filter((account) =>
    sanitizeStringToCompare(account.name).includes(sanitizeStringToCompare(fieldsSearch))
    );
  }

  return userAccounts;
};

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
      (account) => sanitizeStringToCompare(account.name) === sanitizeStringToCompare(name),
    );
    if (accountExists) {
      throw new Error("Account with this name already exists");
    }

    userAccounts.accounts.push({ name });
    await userAccounts.save();
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error(error.message);
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
