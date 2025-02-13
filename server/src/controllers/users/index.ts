import express from "express";
import { SESSION_TOKEN } from "../../const";

import {
  deleteUserById,
  getUserBySessionToken,
  getUsers,
  updateUserById,
} from "../../db/model/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const users = await getUsers();
    if (!users || users.length === 0)
      return res.status(404).json({ message: "Could not find users" });
    return res.status(200).json(users);
  } catch (error) {
    console.log("getAllUsers error: ", error);
    return res.status(400).json(`getAllUsers error: ${error}`);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);
    return res.json(deleteUser);
  } catch (error) {
    console.log("deleteUser error", error);
    return res.status(500).json({ message: `Error: ${error}` });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: "Missing username" });
    const updatedUser = await updateUserById(id, { username });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("updateUser error", error);
    return res.status(500).json({ message: `Error: ${error}` });
  }
};

export const getMe = async (req: express.Request, res: express.Response) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];
    if (!sessionToken) return res.status(401).json({ message: "Missing token" });
    const user = await getUserBySessionToken(sessionToken);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({email: user.email, username: user.username, id: user._id});
  } catch (error) {
    console.log("updateUser error", error);
    return res.status(500).json({ message: `Error: ${error}` });
  }
}
