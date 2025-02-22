import mongoose from "mongoose";
import { UserAccountsSchema } from "../schema/accounts";
import { sanitizeStringToCompare } from "../../utils/string";

export const UserAccountsModel = mongoose.model(
  "UserAccounts",
  UserAccountsSchema,
);

export const isAccountExists = async (id: string, name: string) => {
  const userAccounts = await UserAccountsModel.findOne({ userId: id });

  if (!userAccounts) {
    return null;
  };

  const accountExists = userAccounts.accounts.some(
    (account) => sanitizeStringToCompare(account.name) === sanitizeStringToCompare(name),
  );

  return accountExists;
};

export const getAccounts = async (id: string, fieldsSearch?: string) => {
  const userAccounts = await UserAccountsModel.findOne({ userId: id });

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
  amount
}: {
  userId: string;
  name: string;
  amount: number;
}) => {
  try {
    const userAmount = !amount ? 0 : amount;
    const userAccounts = await getAccounts(userId);
    if (!userAccounts) {
      UserAccountsModel.create({ userId, accounts: [{ name, amount: userAmount }] });
    }
    const accountExists = userAccounts.accounts.some(
      (account) => sanitizeStringToCompare(account.name) === sanitizeStringToCompare(name),
    );
    if (accountExists) {
      throw new Error("Account with this name already exists");
    }


    userAccounts.accounts.push({ name, amount: userAmount });
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

  const isAccountExists = ids.some((id) =>
    userAccounts.accounts.some((account) => account._id.toString() === id),
  );

  if (!isAccountExists) {
    throw new Error("Account not found");
  }

  userAccounts.accounts = userAccounts.accounts.filter(
    (account) => !ids.includes(account._id.toString()),
  );
  

  await userAccounts.save();
  return userAccounts;
};

export const updateAccountById = async (userId: string, id: string, name?: string, amount?: number) => {
  const userAccounts = await getAccounts(userId);

  if (!userAccounts) {
    throw new Error("User accounts not found");
  }

  if (!id) {
    throw new Error("No account id provided");
  }

  const index = userAccounts.accounts.findIndex((account) => account._id.toString() === id);


  if (index === -1) {
    throw new Error("Account not found");
  }

  if (name) {
    userAccounts.accounts[index].name = name;
  }

  if (amount) {
    userAccounts.accounts[index].amount = amount;
  }

  await userAccounts.save();
  return userAccounts;
}
 
