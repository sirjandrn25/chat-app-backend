import { body } from "express-validator";

export const MessageValidator = () => {
	return [
		body("author_id").isInt(),
		body("chat_id").isInt(),
		body("content").isString(),
	];
};
