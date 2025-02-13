import express from "express";
import { deleteUser, getAllUsers, updateUser, getMe } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middleware";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
  router.get("/users/me", isAuthenticated, getMe);
};
