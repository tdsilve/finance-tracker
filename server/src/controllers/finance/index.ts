import express from "express";
import {
  getFinance,
  createFinance,
  deleteFinanceByIds,
  updateFinanceById,
  isFinancetExists
} from "../../db/model/finance";
import { SESSION_TOKEN } from "../../const";
import { getUserBySessionToken } from "../../db/model/users";

export const getFinanceFromUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sorted = parseInt(req.query.sorted as string) || "true";
    
   
const fieldsSearch = req.query.fieldsSearch ? req.query.fieldsSearch : "";
   
    const sessionToken = req.cookies[SESSION_TOKEN];
    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });
    const userFinance = await getFinance(user._id.toString(), fieldsSearch as string);
    if (!userFinance) {
      return res.status(404).json({ message: "No finance found" });
    }
    const startIndex = (page - 1) * limit;
    let finance = userFinance.finance;
    if (sorted === "true") {
      finance = finance.sort((a, b) => a.name.localeCompare(b.name));
    }
    const paginatedfinance = finance.slice(startIndex, startIndex + limit);

    const total = Math.ceil(finance.length / limit)

    return res.status(200).json({
      total: finance.length,
      totalPages: total,
      currentPage: page,
      content: paginatedfinance,
      last: page >= total,
      sorted: sorted === "true",
    });

  } catch (error) {

    return res.status(400).json({ message: error?.message });
  }
};

export const registerAccount = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { name , amount, notes, category, date} = req.body;
    if (!name){
      return res.status(400).json({ message: "Missing name" });
    }
    if (!amount){
      return res.status(400).json({ message: "Missing amount" });
    }
    if ( !date ) {
      return res.status(400).json({ message: "Missing date" });
    }
    if ( !category ) {
      return res.status(400).json({ message: "Missing category" });
    }
    if (category !== "Income" && category !== "Expense") {
      return res.status(400).json({ message: "Invalid category" });
    }
    const sessionToken = req.cookies[SESSION_TOKEN];

    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });

    const userAmount = !amount ? 0 : amount;
    await createFinance({ userId: user._id.toString(), name, amount: userAmount, category, notes, date });

    return res.status(200).json({ message: "Finance created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error?.message  });
  }
};

export const deleteFinance = async (
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
   
  
     await deleteFinanceByIds(user._id.toString(), ids);
 
    
    return res.status(200).json({ message: "finance deleted successfully" });
  } catch (error) {

    return res.status(400).json({ message: error?.message });
  }
};

export const updateFinance = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];

    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { name, _id, amount, category, date } = req.body;
    if (!_id) {
      return res.status(400).json({ message: "Missing  id" });
    }
    if  (!name && (amount == undefined || amount == null) && (category == undefined || category == null) && (date == undefined || date == null)) {
      return res.status(400).json({ message: "Missing  info" });
    }
    await updateFinanceById(user._id.toString(), _id, name, amount, category, date);
    return res.status(200).json({ message: "Finance updated" });
  } catch (error) {

    return res.status(400).json({ message: error?.message });
  }
};
