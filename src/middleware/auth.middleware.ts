import { Request, Response } from "express";
import * as ChatService from "../services/chat.service";
import * as MessageService from "../services/message.service";
const jwt = require("jsonwebtoken");

export const verifyJWT = (
  req: Request | any,
  res: Response,
  next: Function
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(403);
      req.user = decoded;

      next();
    }
  );
};

export const verifyIsSuperuser = async (
  req: Request | any,
  res: Response,
  next: Function
) => {
  const user = req.user;
  if (user?.is_superuser) return next();
  return res.status(403).send("not authorized");
};
export const verifyIsStaff = async (
  req: Request | any,
  res: Response,
  next: Function
) => {
  const user = req.user;
  if (user?.is_staff) return next();
  return res.status(403).send("not authorized");
};
export const verifyIsStaffOrSuperuser = async (
  req: Request | any,
  res: Response,
  next: Function
) => {
  const user = req.user;
  if (user?.is_staff || user?.is_superuser) return next();
  return res.status(403).send("not authorized");
};

export const verifyChatUser = async (
  req: Request | any,
  res: Response,
  next: Function
) => {
  const { id } = req.params;
  if (!id) return res.status(500).send("not allowed");
  const user = req.user;
  try {
    const chat_user = await ChatService.getChatByUser(+id, user.id);

    if (!chat_user) return res.status(403).send("not authorization");
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
};
export const verifyMessageUser = async (
  req: Request | any,
  res: Response,
  next: Function
) => {
  const { id } = req.params;
  if (!id) return res.status(500).send("not allowed");
  const user = req.user;
  try {
    const message_user = await MessageService.getMessageByUser(+id, user.id);

    if (!message_user) return res.status(403).send("not authorization");
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
};
