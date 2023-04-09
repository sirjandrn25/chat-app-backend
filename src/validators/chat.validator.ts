import { body } from "express-validator";

export const chatBaseValidator = (() => {
	return [
		body("title").isString().isEmpty(),
		body("is_group").isBoolean().isEmpty(),
	];
})();

export const chatUserValidator = (() => {
	return [body("users").isArray().isInt()];
})();

export const createChatValidator = () => {
	return [...chatBaseValidator, ...chatUserValidator];
};

export const chatUserUpdate = () => {
	return [body("user_id").isInt(), body("is_admin").isBoolean()];
};
