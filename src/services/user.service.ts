import { PrismaClient } from "@prisma/client";
import { makeHashPassword } from "../utils/user.utils";
import { exclude } from "../utils/common.utils";
import { LIMIT, PAGE } from "../constants/filter.constant";

const prisma = new PrismaClient();

export const getAllUsers = async (params?: any) => {
	const {
		limit = LIMIT,
		page = PAGE,
		search = "",
		role,
		gender = "",
	} = params;
	let filters: any = {};
	if (gender) {
		filters["profile"] = {};
		filters["profile"]["gender"] = gender;
	}

	if (role) {
		if (role === "admin") {
			filters["is_superuser"] = true;
		} else if (role === "staff") {
			filters["is_staff"] = true;
		}
	}
	let skip = +page;
	let take = +limit;
	const users = await prisma.user.findMany({
		where: {
			profile: {
				first_name: {
					contains: search,
				},
			},
		},
		include: {
			profile: true,
		},
		take: take,
		skip: skip <= 0 ? 0 : skip - 1,
	});

	// remove hasing password
	const sanitize_users = users?.map((user) => exclude(user, "password"));
	return {
		limit: take,
		page: skip,
		count: sanitize_users.length,
		next: take > sanitize_users.length ? null : skip + 1,
		prev: skip <= 1 ? null : skip - 1,
		data: sanitize_users,
	};
};
export const getUserById = async (userId: number) => {
	const user: any = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			profile: true,
		},
	});
	return exclude(user, "password");
};

export const createOneUser = async (data: any) => {
	const hashPassword = await makeHashPassword(data?.password);

	const newData = {
		...data,
		password: hashPassword,
	};
	const { profile = {} } = newData;

	const user: any = await prisma.user.create({
		data: {
			...(newData || {}),
			profile: {
				create: {
					...profile,
				},
			},
		},
		include: {
			profile: true,
		},
	});
	return exclude(user, "password");
};

export const updateOneUser = async (userId: number, data: any) => {
	const { profile = {} } = data;
	delete data["profile"];
	const user = await prisma.user.update({
		where: { id: userId },
		data: {
			...data,
			profile: {
				upsert: {
					create: {
						...profile,
					},
					update: {
						...profile,
					},
				},
			},
		},
		include: {
			profile: true,
		},
	});
	return exclude(user, "password");
};
export const deleteOneUser = async (userId: number) => {
	return await prisma.user.delete({
		where: {
			id: userId,
		},
	});
};
