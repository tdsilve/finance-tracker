import express from "express";
import {
  getPayments,
  createPayment,
  deletePaymentsByIds,
  updatePaymentstById,
} from "../../db/model/payments";
import { SESSION_TOKEN } from "../../const";
import { getUserBySessionToken } from "../../db/model/users";

export const getPaymentsFromUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
   console.log("limit", req.query.limit);
    const nameSearch = req.query.nameSearch ? req.query.nameSearch : "";
   
    const sessionToken = req.cookies[SESSION_TOKEN];
    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });
    const userPayments = await getPayments(user._id.toString(), nameSearch as string);
    if (!userPayments) {
      return res.status(404).json({ message: "No payments found" });
    }
    const startIndex = (page - 1) * limit;
   
    const paginatedPayments = userPayments.payments.slice(startIndex, startIndex + limit);

    const total = Math.ceil(userPayments.payments.length / limit)

    return res.status(200).json({
      total: userPayments.payments.length,
      totalPages: total,
      currentPage: page,
      content: paginatedPayments,
      last: page >= total,
    });

  } catch (error) {
    console.log("getPaymentsFromUser error", error);
    return res.status(500).json({ message: error });
  }
};

export const registerPayment = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { name, amount, email, status } = req.body;
    if (!name && !amount && !email && !status) {
      return res.status(400).json({ message: "Missing information" });
    }
    const sessionToken = req.cookies[SESSION_TOKEN];

    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });
    const paymentsExists = await getPayments(user._id.toString(), name);
   
    if (paymentsExists?.payments.length > 0) {
      return res.status(400).json({ message: "Payment with this name already exists" });
    }
    await createPayment({ userId: user._id.toString(), name, amount, email, status });

    return res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    console.log("registerPayment error", error);
    return res.status(500).json({ message: error });
  }
};

export const deletePayment = async (
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
    const del = await deletePaymentsByIds(user._id.toString(), ids);
    if (!del) {
      return res.status(404).json({ message: "Payments not found" });
    }
    return res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.log("deletePayment error", error);
    return res.status(500).json({ message: error });
  }
};

export const updatePayment = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];

    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { name, amount, status } = req.body;
    if (!name || !amount || !status) {
      return res.status(400).json({ message: "Missing  information" });
    }
    await updatePaymentstById(user._id.toString(), name);
    return res.status(200).json({ message: "Account updated" });
  } catch (error) {
    console.log("updatePayment error", error);
    return res.status(500).json({ message: error });
  }
};
