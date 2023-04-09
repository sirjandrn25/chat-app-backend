import type { Request, Response } from "express";
import * as userService from "../services/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
	const params = req.query || {};

	const data = await userService.getAllUsers(params);
	res.status(200).send(data);
};
export const getUserById = async (req: Request, res: Response) => {
	const { id = 1 } = req.params;
	const user = await userService.getUserById(+id);
	if (!user) {
		res.status(404).send({
			status: "failed",
			message: "not found",
		});
		return;
	}
	res.status(200).send(user);
};
export const getUserProfile = async (req: any, res: Response) => {
	const { id = 1 } = req?.user || {};
	const user = await userService.getUserById(+id);
	if (!user) {
		res.status(404).send({
			status: "failed",
			message: "not found",
		});
		return;
	}
	res.status(200).send(user);
};
export const createOneUser = async (req: Request, res: Response) => {
	const data = req.body;

	try {
		const user = await userService.createOneUser(data);
		
		res.status(201).send({ status: "Ok", data: user });
	} catch (error) {
		res.status(500).send({
			status: "failed",
			message: "something is wrong",
			error: error,
		});
	}
};

export const updateOneUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user: any = await userService.updateOneUser(+id, req.body);
		return res.status(200).send({
			data: user,
		});
	} catch (error) {
		return res.status(404).send({
			error: "not found !!",
		});
	}
};
export const deleteOneUser = (req: Request, res: Response) => {
	res.send("delete One User");
};
