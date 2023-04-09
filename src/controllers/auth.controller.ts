import {
	comparePassword,
	generateAccessToken,
	generateRefreshToken,
} from "./../utils/user.utils";
import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { createOneUser } from "../services/user.service";

const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

export const userLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (!user) {
		return res.status(401).send({
			errors: [
				{
					email: "email address not found !!!",
				},
			],
		});
	}
	const isMatched = await comparePassword(password, user.password);
	if (!isMatched) {
		return res.status(401).send({
			errors: [
				{
					password: "password is not matched !!!",
				},
			],
		});
	}

	try {
		const save_user_info = {
			id: user.id,
			email: user.email,
			is_superuser: user.is_superuser,
			is_staff: user.is_staff,
		};
		const access_token = await generateAccessToken(save_user_info);
		const refresh_token = await generateRefreshToken(save_user_info);

		res.status(200).send({
			user: user,
			access_token,
			refresh_token,
		});

		// res.cookie("jwt", refresh_token_info, {
		// 	httpOnly: true,
		// 	maxAge: 60 * 60 * 1000,
		// });
		return;
	} catch (error) {
		res.status(500).send({
			errors: [
				{
					unknown: "something is wrong",
				},
			],
		});
	}
};

export const userRegister = async (req: Request, res: Response) => {
	try {
		const user = await createOneUser(req.body);

		res.status(201).send(user);
		return;
	} catch (error) {
		res.status(401).send(error);
		return;
	}
};

export const handleRefreshToken = (req: Request | any, res: Response) => {
	const { token } = req.body;

	if (!token) {
		res.sendStatus(400);
		return;
	}

	jwt.verify(
		token,
		process.env.REFRESH_TOKEN_SECRET,
		async (err: any, decoded: any) => {
			if (err) return res.sendStatus(403);
			const { id, email, is_superuser, is_staff } = decoded;
			// req.user = decoded;
			const access_token = await generateAccessToken({ id, email });

			res.status(200).send({
				user: { id, email, is_staff, is_superuser },
				access_token,
				refresh_token: token,
			});
		}
	);
};
