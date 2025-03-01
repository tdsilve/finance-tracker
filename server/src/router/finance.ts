import express from "express";
import {
  getFinanceFromUser,
  registerAccount,
  deleteFinance,
  updateFinance,
} from "../controllers/finance";
import { isAuthenticated } from "../middleware";

export default (router: express.Router) => {
  router.get("/finance", isAuthenticated, getFinanceFromUser);
  router.post("/finance", isAuthenticated, registerAccount);
  router.delete("/finance", isAuthenticated, deleteFinance);
  router.put("/finance", isAuthenticated, updateFinance);
};
