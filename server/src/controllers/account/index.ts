import express from "express";
import {
  getAccounts,
  createAccount,
  deleteAccountsByIds,
  updateAccountById,
} from "../../db/model/accounts";
import { SESSION_TOKEN } from "../../const";
import { getUserBySessionToken } from "../../db/model/users";

export const getAccountsFromUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
   
const fieldsSearch = req.query.fieldsSearch ? req.query.fieldsSearch : "";
   
    const sessionToken = req.cookies[SESSION_TOKEN];
    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });
    const userAccounts = await getAccounts(user._id.toString(), fieldsSearch as string);
    if (!userAccounts) {
      return res.status(404).json({ message: "No accounts found" });
    }
    const startIndex = (page - 1) * limit;
   
    const paginatedAccounts = userAccounts.accounts.slice(startIndex, startIndex + limit);

    const total = Math.ceil(userAccounts.accounts.length / limit)

    return res.status(200).json({
      totalAccounts: userAccounts.accounts.length,
      totalPages: total,
      currentPage: page,
      content: paginatedAccounts,
      last: page >= total,
    });

  } catch (error) {
    console.log("getAccountsFromUser error", error);
    return res.status(500).json({ message: error });
  }
};

export const registerAccount = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Missing name" });
    }
    const sessionToken = req.cookies[SESSION_TOKEN];

    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });
    const accountExists = await getAccounts(user._id.toString(), name);
    console.log("accountExists", accountExists);
    if (accountExists?.accounts.length > 0) {
      return res.status(400).json({ message: "Account with this name already exists" });
    }
    await createAccount({ userId: user._id.toString(), name });

    return res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    console.log("registerAccount error", error);
    return res.status(500).json({ message: error });
  }
};

export const deleteAccount = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || !ids.length) {
      return res.status(400).json({ message: "Missing ids" });
    }
    const sessionToken = req.cookies[SESSION_TOKEN];

    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });
    const del = await deleteAccountsByIds(user._id.toString(), ids);
    if (!del) {
      return res.status(404).json({ message: "Accounts not found" });
    }
    return res.status(200).json({ message: "Accounts deleted successfully" });
  } catch (error) {
    console.log("deleteAccount error", error);
    return res.status(500).json({ message: error });
  }
};

export const updateAccount = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];

    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Missing  name" });
    }
    await updateAccountById(user._id.toString(), name);
    return res.status(200).json({ message: "Account updated" });
  } catch (error) {
    console.log("updateAccount error", error);
    return res.status(500).json({ message: error });
  }
};
