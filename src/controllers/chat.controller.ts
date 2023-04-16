import type { Request, Response } from "express";
import { LIMIT, PAGE } from "../constants/filter.constant";
import * as ChatService from "../services/chat.service";
import * as MessageService from "../services/message.service";

export const list = async (req: Request | any, res: Response) => {
  const { params } = req;
  const { page = PAGE, limit = LIMIT, search = "" } = params || {};

  const { id } = req.user || {};
  try {
    const results = await ChatService.getAuthenticatedUserChats({
      user_id: id,
      page: +page,
      limit: +limit,
      search,
    });
    return res.status(200).send(results);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const retrieve = async (req: Request, res: Response) => {
  const { id } = req.params;
  const exist_chat = await ChatService.retrieve(+id);
  if (!exist_chat) return res.status(404).send("not found !!");
  return res.send(exist_chat);
};
// mapping one array to other array like objects
const mappingATOA = ({
  arr,
  from_key,
  to_key,
}: {
  arr: any[];
  from_key?: string;
  to_key?: string;
}) => {
  if (!from_key && !to_key) return arr;
  if (!from_key && to_key) {
    const result: any = [];
    arr.forEach((el: any, index: number) => {
      result.push({ [to_key]: el });
    });
    return result;
  }
  if (from_key && to_key) {
    const result: any = [];
    arr.forEach((el: any, index: number) => {
      result.push({ [to_key]: el[from_key] });
    });
    return result;
  }
  if (from_key && !to_key) {
    const result: any = [];
    arr.forEach((el: any, index: number) => {
      result.push(el[from_key]);
    });
    return result;
  }
};
// remove duplicate values from array
const removeDuplicateValues = (arr: any[]) => {
  const set = new Set(arr);
  return Array.from(set);
};

const sanitizeChatUsers = (data: any, to_key: string = "user_id") => {
  let users = removeDuplicateValues(data);
  users = mappingATOA({ arr: data, to_key: to_key });
  return users;
};

export const create = async (req: Request | any, res: Response) => {
  const data = req.body;
  const user = req.user;
  data["users"] = sanitizeChatUsers([...data.users, user.id]);

  if (data.users.length < 2)
    return res.status(400).send("atleast 1 users required !!!");
  if (!data?.is_group && data.users.length === 2) {
    data["users"] = data["users"].map((user: any) => ({
      ...user,
      is_admin: true,
    }));
  } else {
    data["users"] = data["users"].map((user: any) => {
      if (user.user_id === req.user.id) {
        return {
          ...user,
          is_admin: true,
        };
      }

      return { user_id: user?.user_id?.user_id };
    });
  }
  console.log({ users: data["users"] });

  try {
    const jsonRes = await ChatService.create(data);
    return res.status(201).send(jsonRes);
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const exist_chat = await ChatService.retrieve(+id);
  if (!exist_chat) return res.status(404).send("not found !!");
  const data = req.body;
  const update_data = {
    title: data.title || "",
    is_group: data.is_group || false,
  };
  try {
    const jsonRes = await ChatService.update(+id, update_data);
    return res.status(200).send(jsonRes);
  } catch (err) {
    return res.status(404).send(err);
  }
};
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const exist_chat = await ChatService.retrieve(+id);
  if (!exist_chat) return res.status(404).send("not found !!");
  try {
    await ChatService.remove(+id);
    return res.status(204).send("success fully delete the chat");
  } catch (err) {
    return res.status(500).send("something wrong !!");
  }
};

export const chatUsersRemove = async (req: Request, res: Response) => {
  const { users = [] } = req.body;
  const { id } = req.params;
  const exist_chat = await ChatService.retrieve(+id);
  if (!exist_chat) return res.status(404).send("not found !!");
  const sanitize_users = sanitizeChatUsers(users, "user_id");

  try {
    const data = await ChatService.chatUsersRemove(+id, sanitize_users);

    return res.status(200).send(data);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const GetObjectFromArray = (arr: any[], key: string, value: any) => {
  for (let element of arr) {
    if (element[key] === value) return element;
  }
};

export const ChatUsersAdd = async (req: Request, res: Response) => {
  const { users = [] } = req.body;
  const { id } = req.params;
  const exist_chat = await ChatService.retrieve(+id);
  if (!exist_chat) return res.status(404).send("not found !!");

  const sanitize_users = sanitizeChatUsers(
    users.filter(
      (id: number) => !GetObjectFromArray(exist_chat.users, "user_id", id) // remove existing users
    ),
    "user_id"
  );
  if (!sanitize_users.length) return res.status(200).send(exist_chat);

  try {
    const data = await ChatService.ChatUsersAdd(+id, sanitize_users);
    return res.status(201).send(data);
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const leaveFromChat = async (req: any, res: Response) => {
  const { id } = req.params;
  const exist_chat = await ChatService.retrieve(+id);
  if (!exist_chat) return res.status(404).send("not found !!");
  const user_id = req.user.id;
  try {
    const chat = await ChatService.chatUsersRemove(+id, [{ user_id }]);
    return res.status(204).send(chat);
  } catch (err) {
    return res.status(400).send(err);
  }
};
export const ChatUsersUpdate = async (req: any, res: Response) => {
  const { id } = req.params;
  const { user_id, is_admin } = req.body;
  const exist_chat = await ChatService.retrieve(+id);
  if (!exist_chat) return res.status(404).send("not found !!");
  const user_exist = GetObjectFromArray(exist_chat.users, "user_id", +user_id);

  if (!user_exist)
    return res.status(400).send("user_id not belongs to this chat!!");

  try {
    const chat = await ChatService.ChatUsersUpdate({
      user_id: +user_id,
      chat_id: +id,
      is_admin: is_admin,
    });
    return res.status(200).send(chat);
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const ChatMessages = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist_chat = await ChatService.retrieve(+id);
    if (!exist_chat) return res.status(404).send("not found !!");
    const messages = await MessageService.listByChatId(+id);
    return res.status(200).send({ ...exist_chat, messages: messages });
  } catch (error) {
    return res.status(500).send();
  }
};
export const SendChatMessage = async (req: Request | any, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const message_data: any = {
    chat_id: +id,
    author_id: req.user.id,
    content: data.content,
  };
  try {
    const exist_chat = await ChatService.retrieve(+id);
    if (!exist_chat) return res.status(404).send("not found !!");
    const message = await MessageService.create(message_data);
    return res.status(200).send(message);
  } catch (error) {
    return res.status(500).send();
  }
};
