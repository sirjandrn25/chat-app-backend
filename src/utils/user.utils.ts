import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const saltRounds = 10;
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

export const makeHashPassword = async (plainTextPassword: string) => {
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(plainTextPassword, salt);
};

export const comparePassword = async (
	plainPassword: string,
	hashPassword: string
) => {
	return await bcrypt.compare(plainPassword, hashPassword);
};

export const generateAccessToken = async (info: any) => {
	const expire_duration = "180s";
	const token = await jwt.sign(info, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: expire_duration,
	});
	return token;
};
export const generateRefreshToken = async (info: any) => {
	const expire_duration = "1hr";
	const token = await jwt.sign(info, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: expire_duration,
	});
	return token;
};

export enum gender_type {
	M,
	F,
	O,
}
