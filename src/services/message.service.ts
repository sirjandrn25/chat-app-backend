import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const list = async () => {
	const data = await prisma.message.findMany();
	return data;
};
export const retrieve = async (id: number) => {
	const data = await prisma.message.findUnique({
		where: {
			id: id,
		},
	});
	return data;
};
export const create = async ({
	chat_id,
	author_id,
	content,
}: {
	chat_id: number;
	author_id: number;
	content: string;
}) => {
	const message = await prisma.message.create({
		data: {
			content: content,
			chat_user: {
				connect: {
					user_id_chat_id: {
						user_id: author_id,
						chat_id: chat_id,
					},
				},
			},
		},
	});
	return message;
};
export const update = async (id: number, data: any) => {
	const message = await prisma.message.update({
		data: data,
		where: {
			id: id,
		},
	});
	return message;
};
export const remove = async (id: number) => {
	const message = await prisma.message.delete({
		where: {
			id: id,
		},
	});
	return message;
};

export const listByChatId = async (chat_id: number) => {
	const messages = await prisma.message.findMany({
		where: {
			chat_id: chat_id,
			is_deleted: false,
		},
		orderBy: {
			created_at: "desc",
		},
	});
	return messages;
};

export const trashMessage = async (id: number) => {
	const message = await prisma.message.update({
		where: {
			id,
		},
		data: {
			is_deleted: true,
		},
	});
	return message;
};

export const getMessageByUser = async (id: number, user_id: number) => {
	const message = await prisma.message.findFirst({
		where: {
			id: id,
			author_id: user_id,
		},
	});
	return message;
};
