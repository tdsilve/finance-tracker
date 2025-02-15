import express from "express";
import { getAllAccounts, createAccount, deleteAccountById, updateAccountById } from "../../db/model/accounts";
import { SESSION_TOKEN } from "../../const";
import { getUserBySessionToken } from "../../db/model/users";

export const getAccounts = async (req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies[SESSION_TOKEN];
        if (!sessionToken) return res.status(401).json({ message: "Missing token" });
        const user = await getUserBySessionToken(sessionToken);
        if (!user) return res.status(404).json({ message: "User not found" });
        const accounts = await getAllAccounts(user._id.toString());
        if (!accounts) {
            return res.status(404).json({ message: "No accounts found" });
        }
        return res.status(200).json(accounts);
    } catch (error) {
        console.log("getAccounts error: ", error);
        return res.status(500).json({ message: "Could not get accounts" });
    }
}

export const registerAccount = async (req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies[SESSION_TOKEN];
        if (!sessionToken) return res.status(401).json({ message: "Missing token" });
        const user = await getUserBySessionToken(sessionToken);
        if (!user) return res.status(404).json({ message: "User not found" });
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Missing name" });
        }

         await createAccount({ name, userId: user._id });
        return res.status(200).json({ message: "Account created" });
    } catch (error) {
        console.log("registerAccount error: ", error);
        return res.status(500).json({ message: "Could not register account" });
    }
}

export const deleteAccount = async (req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies[SESSION_TOKEN];
        if (!sessionToken) return res.status(401).json({ message: "Missing token" });
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing id" });
        }
        await deleteAccountById(id);
        return res.status(200).json({ message: "Account deleted" });
    } catch (error) {
        console.log("deleteAccount error: ", error);
        return res.status(500).json({ message: "Could not delete account" });
    }
}

export const updateAccount = async (req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies[SESSION_TOKEN];
        if (!sessionToken) return res.status(401).json({ message: "Missing token" });
        const user = await getUserBySessionToken(sessionToken);
        if (!user) return res.status(404).json({ message: "User not found" });
        const { name} = req.body;
        if ( !name) {
            return res.status(400).json({ message: "Missing  name" });
        }
        await updateAccountById( user._id.toString(), name);
        return res.status(200).json({ message: "Account updated" });
    } catch (error) {
        console.log("updateAccount error: ", error);
        return res.status(500).json({ message: "Could not update account" });
    }
}