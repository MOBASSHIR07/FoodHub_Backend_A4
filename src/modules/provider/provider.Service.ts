import { prisma } from "../../lib/prisma.js";

const getAllProvidersDB = async () => {
    return await prisma.providerProfile.findMany({
        include: {
          
            _count: {
                select: { meals: true }
            }
        }
    });
};

const getProviderByIdDB = async (providerId: string) => {
    return await prisma.providerProfile.findUnique({
        where: { id: providerId },
        include: {
            meals: {
                where: { isAvailable: true }, 
                include: { category: true }  
            }
        }
    });
};




export const providerService = {
    getAllProvidersDB,
    getProviderByIdDB
}