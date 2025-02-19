import express from "express";
import {
  getPaymentsFromUser,
  registerPayment,
  deletePayment,
  updatePayment,
} from "../controllers/payments";
import { isAuthenticated } from "../middleware";

export default (router: express.Router) => {
  router.get("/payments", isAuthenticated, getPaymentsFromUser);
  router.post("/payments", isAuthenticated, registerPayment);
  router.delete("/payments", isAuthenticated, deletePayment);
  router.put("/payments", isAuthenticated, updatePayment);
};
