import mongoose from "mongoose";
import { UserFinanceSchema } from "../schema/finance";
import { sanitizeStringToCompare } from "../../utils/string";

export const FinanceAccountsModel = mongoose.model(
  "Finance",
  UserFinanceSchema,
);

export const isFinancetExists = async (id: string, name: string) => {
  const userData = await FinanceAccountsModel.findOne({ userId: id });

  if (!userData) {
    return null;
  };

  const financeExists = userData.finance.some(
    (finance) => sanitizeStringToCompare(finance.name) === sanitizeStringToCompare(name),
  );

  return financeExists;
};

export const getFinance = async (id: string, fieldsSearch?: string) => {
  const userData = await FinanceAccountsModel.findOne({ userId: id });

  if (!userData) {
    return null;
  };

  if (fieldsSearch) {
    userData.finance = userData.finance.filter((account) =>
    sanitizeStringToCompare(account.name).includes(sanitizeStringToCompare(fieldsSearch))
    );
  }

  return userData;
};

export const createFinance = async ({
  userId,
  name,
  amount,
  date,
  notes,
  category,
}: {
  userId: string;
  name: string;
  amount: number;
  date: Date,
  notes: string,
  category: "Income" | "Expense";
}) => {
  try {
    const userAmount = !amount ? 0 : amount;
    if (!name || !amount || !date || !category) {
      throw new Error("Missing required fields");
    }
    const userFinance = await getFinance(userId);
    if (!userFinance) {
      FinanceAccountsModel.create({ userId, finance: [{ name, amount: userAmount, date, notes, category }] });
    }


    userFinance.finance.push({ name, amount: userAmount, date, notes, category });
    await userFinance.save();
  } catch (error) {
    console.error("Error creating finance:", error);
    throw new Error(error.message);
  }
};

export const deleteFinanceById = (id: string) =>
  FinanceAccountsModel.findByIdAndDelete(id);

export const deleteFinanceByIds = async (userId: string, ids: string[]) => {
  const userFinance = await getFinance(userId);

  if (!userFinance) {
    throw new Error("User finance not found");
  }

  const isFinanceExists = ids.some((id) =>
    userFinance.finance.some((finance) => finance._id.toString() === id),
  );

  if (!isFinanceExists) {
    throw new Error("Account not found");
  }

  userFinance.finance = userFinance.finance.filter(
    (finance) => !ids.includes(finance._id.toString()),
  );
  

  await userFinance.save();
  return userFinance;
};

export const updateFinanceById = async (userId: string, id: string, name?: string, amount?: number, date?: Date, notes?: string, category?: "Income" | "Expense") => {
  const userFinance = await getFinance(userId);

  if (!userFinance) {
    throw new Error("User finance not found");
  }

  if (!id) {
    throw new Error("No finance id provided");
  }

  const index = userFinance.finance.findIndex((finance) => finance._id.toString() === id);


  if (index === -1) {
    throw new Error("Finance not found");
  }

  if (name) {
    userFinance.finance[index].name = name;
  }

  if (amount) {
    userFinance.finance[index].amount = amount;
  }

  if (category) {
    userFinance.finance[index].category = category;
  }

  if (date) {
    userFinance.finance[index].date = date;
  }
  if (notes) {
    userFinance.finance[index].notes = notes;
  }

  await userFinance.save();
  return userFinance;
}

export const getBalance = async (userId: string) => {
  const userFinance = await getFinance(userId);

  if (!userFinance) {
    throw new Error("User not found");
  }

 

  const totalIncome = userFinance.finance.reduce((acc, item) => {
    return item.category === "Income" ? acc + item.amount : acc + 0;
  }, 0);

  const totalExpense = userFinance.finance.reduce((acc, item) => {
    return item.category === "Expense" ? acc + item.amount : acc + 0;
  }, 0);

  const totalBalance = totalIncome - totalExpense;

  return {totalBalance, totalIncome, totalExpense};
};

 
