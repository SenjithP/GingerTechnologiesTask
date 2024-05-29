import express from "express";
import {
  adminLogin,
  adminLogout,
} from "../Controllers/adminAuthenticationController.js";
import adminVerifyToken from "../Middlewares/adminAuthenticationMiddleware.js";

const adminAuthenticationRouter = express.Router();

//POST Methods
adminAuthenticationRouter.post("/adminLogin", adminLogin);
adminAuthenticationRouter.post("/adminLogout", adminVerifyToken, adminLogout);

export default adminAuthenticationRouter;
