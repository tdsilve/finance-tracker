import express from "express";
import authentication from "./authentication";
import users from "./users";
import accounts from "./accounts";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  accounts(router);
  return router;
};
