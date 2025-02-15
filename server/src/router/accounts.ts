import express from "express";
import { getAccounts, registerAccount, deleteAccount, updateAccount } from "../controllers/account";
import { isAuthenticated } from "../middleware";

export default (router: express.Router) => {
  router.get("/accounts", isAuthenticated,  getAccounts);
  router.post("/accounts", isAuthenticated,  registerAccount);
  router.delete("/accounts", isAuthenticated,  deleteAccount);
  router.put("/accounts", isAuthenticated,  updateAccount);
};