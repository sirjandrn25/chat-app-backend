import { verifyMessageUser } from "./../middleware/auth.middleware";
import Router from "express";
import * as MessageController from "../controllers/message.controller";
import { verifyIsStaffOrSuperuser } from "../middleware/auth.middleware";

const messageRouter = Router();

messageRouter.get("", verifyIsStaffOrSuperuser, MessageController.list);
messageRouter.post("", verifyIsStaffOrSuperuser, MessageController.create);
messageRouter.delete(
	"/:id",
	verifyIsStaffOrSuperuser,
	MessageController.remove
);
messageRouter.put("/:id", verifyIsStaffOrSuperuser, MessageController.update);
messageRouter.get("/:id", verifyMessageUser, MessageController.retrieve);
messageRouter.delete(
	"/:id/trash",
	verifyMessageUser,
	MessageController.trashMessage
);
export default messageRouter;
