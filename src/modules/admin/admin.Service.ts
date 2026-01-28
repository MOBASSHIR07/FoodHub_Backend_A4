import { prisma } from "../../lib/prisma.js"

const getAllUsersDB = async () => {

    const result = await prisma.user.findMany(
        {
            include: {
                providerProfile: true
            }
        }
    )
    return result

}

const updateStatusDB = async (status: string, id: string) => {
    const result = await prisma.user.update({
        where: { id: id },
        data: { status: status }
    });
    return result;
};



const createCategoryDB = async (data: { name: string; image?: string }) => {
    return await prisma.category.create({ data });
};

const getAllCategoriesDB = async () => {
    return await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });
};

const updateCategoryDB = async (id: string, data: Partial<{ name: string; image: string }>) => {
    return await prisma.category.update({
        where: { id },
        data
    });
};

const deleteCategoryDB = async (id: string) => {

    const category = await prisma.category.findUnique({
        where: { id },
        include: { _count: { select: { meals: true } } }
    });

    if (category?._count.meals && category._count.meals > 0) {
        throw new Error("Cannot delete category. There are meals assigned to it.");
    }

    return await prisma.category.delete({ where: { id } });
};

export const adminService = {
    getAllUsersDB,
    updateStatusDB,
    createCategoryDB,
    getAllCategoriesDB,
    updateCategoryDB,
    deleteCategoryDB



}