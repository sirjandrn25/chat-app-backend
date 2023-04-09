import { getUserProfile } from "./../controllers/user.controller";
import express from "express";
import { RegisterValitor,UserUpdateValidator} from '../validators/user.validator'
import validate from "../validators";

import {
	getAllUsers,
	getUserById,
	createOneUser,
	updateOneUser,
	deleteOneUser,
} from "./../controllers/user.controller";

const userRoute = express.Router();
userRoute.get("/", getAllUsers);
userRoute.post("/",RegisterValitor(),validate, createOneUser);
userRoute.get("/:id", getUserById);
userRoute.get("/:id", getUserById);
userRoute.get("/profile/me", getUserProfile);
userRoute.put("/:id",UserUpdateValidator(),validate, updateOneUser);
userRoute.delete("/:id", deleteOneUser);

export default userRoute;