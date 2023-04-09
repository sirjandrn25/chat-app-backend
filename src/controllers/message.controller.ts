import * as MessageService from "../services/message.service";
import { Request, Response } from "express";

export const list = async (req: Request, res: Response) => {
	try {
		const data = await MessageService.list();
		return res.status(200).send(data);
	} catch (err) {
		res.status(500).send("something is wrong");
	}
};
export const retrieve = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const data = await MessageService.retrieve(+id);
		if (!data) return res.status(404).send("not found");
		return res.status(200).send(data);
	} catch (err) {
		return res.status(500).send(err);
	}
};
export const create = async (req: Request, res: Response) => {
	try {
		const data = await MessageService.create(req.body);
		return res.status(201).send(data);
	} catch (err) {
		// console.log(err);
		return res.status(500).send(err);
	}
};
export const update = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const data = await MessageService.update(+id, req.body);
		return res.status(200).send(data);
	} catch (err) {
		return res.status(500).send(err);
	}
};
export const remove = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const data = await MessageService.remove(+id);
		return res.status(204).send(data);
	} catch (err) {
		return res.status(500).send(err);
	}
};

export const trashMessage = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const exist_message = await MessageService.retrieve(+id);
		if (!exist_message) return res.status(404).send("not found !!");
		await MessageService.trashMessage(+id);
		return res.status(204).send();
	} catch (err) {
		res.status(500).send(err);
	}
};
