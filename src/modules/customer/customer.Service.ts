import { prisma } from "../../lib/prisma.js";


const updateCustomerProfileDB = async (userId: string, data: any) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            name: data.name ?? undefined,
            phoneNumber: data.phoneNumber ?? undefined,
            image: data.image ?? undefined,
        },
    });
};

export const customerService = {
    updateCustomerProfileDB,
};