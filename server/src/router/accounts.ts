import express from "express";
import {
  getAccountsFromUser,
  registerAccount,
  deleteAccount,
  updateAccount,
} from "../controllers/account";
import { isAuthenticated } from "../middleware";

export default (router: express.Router) => {
  router.get("/accounts", isAuthenticated, getAccountsFromUser);
  router.post("/accounts", isAuthenticated, registerAccount);
  router.delete("/accounts", isAuthenticated, deleteAccount);
  router.put("/accounts", isAuthenticated, updateAccount);
};
