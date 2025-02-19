import express from "express";
import authentication from "./authentication";
import users from "./users";
import accounts from "./accounts";
import payments from "./payments";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  accounts(router);
  payments(router);
  return router;
};
