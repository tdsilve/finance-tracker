import mongoose from "mongoose";
import { PaymentsSchema } from "../schema/payments";
import { sanitizeStringToCompare } from "../../utils/string";

export const PaymentsModel = mongoose.model(
  "PaymentsModel",
  PaymentsSchema,
);

export const getPayments = async (id: string, name?: string) => {
  const userPayments = await PaymentsModel.findOne({ userId: id });

  if (!userPayments || !userPayments.payments) {
    return null;
  };

  if (name) {
    userPayments.payments = userPayments.payments.filter((account) =>
    sanitizeStringToCompare(account.name) === (sanitizeStringToCompare(name))
    );
  }

  return userPayments;
};

export const createPayment = async ({
  userId,
  name,
  amount,
  status,
  email,
}: {
  userId: string;
  name: string;
  amount: number;
  status: string;
  email: string;
}) => {
  try {
    const userPayments = await getPayments(userId);
    if (!userPayments) {
      PaymentsModel.create({ userId, payments: [{ name, amount, status, email }] });
    }
    const paymentsExists = userPayments.payments.some(
      (paymentsExists) => sanitizeStringToCompare(paymentsExists.name) === sanitizeStringToCompare(name),
    );
    if (paymentsExists) {
      throw new Error("Payment with this name already exists");
    }

    userPayments.payments.push({ name, amount, status, email });
    await userPayments.save();
  } catch (error) {
    console.error("Error creating payment:", error);
    throw new Error(error.message);
  }
};

export const deletePaymentById = (id: string) =>
  PaymentsModel.findByIdAndDelete(id);

export const deletePaymentsByIds = async (userId: string, ids: string[]) => {
  const userPayments = await getPayments(userId);

  if (!userPayments) {
    throw new Error("User payments not found");
  }

  userPayments.payments = userPayments.payments.filter(
    (account) => !ids.includes(account._id.toString()),
  );

  await userPayments.save();
  return userPayments;
};

export const updatePaymentstById = (id: string, values: Record<string, any>) =>
  PaymentsModel.findByIdAndUpdate(id, values, { new: true }).then((user) =>
    user.toObject(),
  );
