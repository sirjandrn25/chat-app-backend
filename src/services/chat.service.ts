import { PrismaClient } from "@prisma/client";
import { LIMIT, PAGE } from "../constants/filter.constant";
import { CreateChatInterface } from "../types/chat.types";
import { ListFilterInterface } from "../types/common.types";

const prisma = new PrismaClient();

export const list = async (params: ListFilterInterface) => {
	const { search = "", limit = LIMIT, page = PAGE } = params;
	

	const chats = await prisma.chat.findMany({
		
		include: {
			users: {
				include: {
					user: {
						include: {
							profile: true,
						},
					},
				},
			},
		},
		skip: page <= 0 ? 0 : page - 1,
		take: limit,
	});
	return {
		count: chats.length,
		page: page,
		limit: limit,
		data: chats,
	};
};

export const getAuthenticatedUserChats = async ({user_id,search,page=PAGE,limit=LIMIT}:{user_id:number,search?:string,page?:number,limit?:number})=>{
	
	const chats = await prisma.chat.findMany({
		where:{
			users:{
				some:{
					user_id:user_id
				}
			}
		},
		include: {
			users: {
				include: {
					user: {
						include: {
							profile: true,
						},
					},
				},
			},
		},
		skip: page <= 0 ? 0 : page - 1,
		take: limit,
	});
	return {
		count: chats.length,
		page: page,
		limit: limit,
		data: chats,
	};
}

export const retrieve = async (id: number) => {
	const chat = await prisma.chat.findUnique({
		where: {
			id: id,
		},
		include: {
			users: {
				include: {
					user: {
						include: {
							profile: true,
						},
					},
				},
			},
		},
	});
	return chat;
};

export const create = async (data: CreateChatInterface) => {
	const { users = [], admin_users = [], ...rest } = data;

	const chat = await prisma.chat.create({
		data: {
			...rest,
			users: {
				create: users,
			},
		},
		include: {
			users: true,
		},
	});
	return chat;
};

export const update = async (id: number, data: any) => {
	const chat = await prisma.chat.update({
		where: {
			id: id,
		},
		data: {
			...data,
		},
		include: {
			users: true,
		},
	});
	return chat;
};

export const remove = async (id: number) => {
	const chat = await prisma.chat.delete({
		where: {
			id: id,
		},
	});
	return chat;
};

export const chatUsersRemove = async (id: number, users: any[]) => {
	const data = await prisma.chat.update({
		where: {
			id: id,
		},
		data: {
			users: {
				deleteMany: users,
			},
		},
		include: {
			users: true,
		},
	});
	return data;
};

export const ChatUsersAdd = async (id: number, users: any[]) => {
	const data = await prisma.chat.update({
		where: {
			id: id,
		},
		data: {
			users: {
				createMany: {
					data: users,
				},
			},
		},
		include: {
			users: true,
		},
	});
	return data;
};

export const ChatUsersUpdate = async ({
	chat_id,
	user_id,
	is_admin = false,
}: {
	chat_id: number;
	user_id: number;
	is_admin?: boolean;
}) => {
	const data = await prisma.chatUsers.update({
		where: {
			user_id_chat_id: {
				user_id: user_id,
				chat_id: chat_id,
			},
		},
		data: {
			is_admin: is_admin,
		},
	});
	const chat = await retrieve(chat_id);
	return chat;
};

export const getChatByUser = async (chat_id: number, user_id: number) => {
	const data = await prisma.chatUsers.findUnique({
		where: {
			user_id_chat_id: {
				user_id: user_id,
				chat_id: chat_id,
			},
		},
	});
	return data;
};
