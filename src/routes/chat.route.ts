import { Router } from "express";
import * as ChatController from "../controllers/chat.controller";
import { verifyChatUser } from "../middleware/auth.middleware";
import validate from "../validators";
import {
	chatBaseValidator,
	chatUserUpdate,
	chatUserValidator,
} from "./../validators/chat.validator";
const chatRouter = Router();

chatRouter.get("", ChatController.list);
chatRouter.post("", ChatController.create);
chatRouter.get("/:id", verifyChatUser, ChatController.retrieve);
chatRouter.put(
	"/:id",
	verifyChatUser,
	chatBaseValidator,
	validate,
	ChatController.update
);
chatRouter.delete(
	"/:id",
	verifyChatUser,
	chatUserValidator,
	validate,
	ChatController.remove
);
chatRouter.put(
	"/:id/remove_users",
	verifyChatUser,
	ChatController.chatUsersRemove
);
chatRouter.put(
	"/:id/add_users",
	verifyChatUser,
	chatUserValidator,
	validate,
	ChatController.ChatUsersAdd
);
chatRouter.put(
	"/:id/update_user",
	verifyChatUser,
	chatUserUpdate(),
	validate,
	ChatController.ChatUsersUpdate
);
chatRouter.delete("/:id/leave", verifyChatUser, ChatController.leaveFromChat);
chatRouter.get("/:id/messages", verifyChatUser, ChatController.ChatMessages);
chatRouter.post(
	"/:id/messages",
	verifyChatUser,

	ChatController.SendChatMessage
);

export default chatRouter;
