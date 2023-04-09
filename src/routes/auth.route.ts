import {
	userLogin,
	userRegister,
	handleRefreshToken,
} from "./../controllers/auth.controller";
import express from "express";
import { LoginValidator, RegisterValitor } from "../validators/user.validator";
import validate from "../validators";

const authRoute = express.Router();
authRoute.post("/login", LoginValidator(), validate, userLogin);
authRoute.post("/register", RegisterValitor(), validate, userRegister);
authRoute.post("/refresh_token", handleRefreshToken);

export default authRoute;
