import { prisma } from "../../lib/prisma.js";
const getProfileDB = async (userId) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
};
export const authService = {
    getProfileDB
};
//# sourceMappingURL=auth.Service.js.map