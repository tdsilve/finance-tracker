import express from "express";
import { getUserBySessionToken } from "../db/model/users";
import { SESSION_TOKEN } from "../const";
import { get, merge } from "lodash";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];
    if (!sessionToken) {
      return res.status(404).json({ message: "No sessionToken found" });
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "No user found with this session token" });
    }
    merge(req, { user: existingUser });

    return next();
  } catch (error) {
    console.log("isAuthenticated error:", error);
    return res.status(400).json({ message: `Authentication error: ${error}` });
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "user._id") as object;

    if (!currentUserId) return res.status(403).json({ message: "No id" });

    if (id !== currentUserId.toString())
      return res.status(403).json({ message: "No current user" });
    next();
  } catch (error) {
    console.log("isOwner error:", error);
    return res.status(400).json({ message: `isOwner error: ${error}` });
  }
};
