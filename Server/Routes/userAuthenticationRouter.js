import express from "express";
import {
  userLogin,
  userLogout,
  userRegistration,
} from "../Controllers/userAuthenticationController.js";
import userVerifyToken from "../Middlewares/userAuthenticationMiddleware.js";
const userAuthenticationRouter = express.Router();

//POST Methods
userAuthenticationRouter.post("/userRegistration", userRegistration);
userAuthenticationRouter.post("/userLogin", userLogin);
userAuthenticationRouter.post("/userLogout", userVerifyToken, userLogout);

export default userAuthenticationRouter;
