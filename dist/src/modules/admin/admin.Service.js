import { prisma } from "../../lib/prisma.js";
const getAllUsersDB = async () => {
    const result = await prisma.user.findMany({
        include: {
            providerProfile: true
        }
    });
    return result;
};
const updateStatusDB = async (status, id) => {
    const result = await prisma.user.update({
        where: { id: id },
        data: { status: status }
    });
    return result;
};
const createCategoryDB = async (data) => {
    return await prisma.category.create({ data });
};
const getAllCategoriesDB = async () => {
    return await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });
};
const updateCategoryDB = async (id, data) => {
    return await prisma.category.update({
        where: { id },
        data
    });
};
const deleteCategoryDB = async (id) => {
    const category = await prisma.category.findUnique({
        where: { id },
        include: { _count: { select: { meals: true } } }
    });
    if (category?._count.meals && category._count.meals > 0) {
        throw new Error("Cannot delete category. There are meals assigned to it.");
    }
    return await prisma.category.delete({ where: { id } });
};
const getAllOrdersDB = async (query) => {
    const { status, page, limit } = query;
    const p = Number(page) || 1;
    const l = Number(limit) || 10;
    const skip = (p - 1) * l;
    const where = {};
    if (status) {
        where.status = status;
    }
    const [orders, total] = await prisma.$transaction([
        prisma.order.findMany({
            where,
            skip,
            take: l,
            orderBy: { createdAt: 'desc' },
            include: {
                customer: {
                    select: { name: true, email: true }
                },
                items: {
                    include: {
                        meal: {
                            select: { name: true, provider: { select: { businessName: true } } }
                        }
                    }
                }
            }
        }),
        prisma.order.count({ where })
    ]);
    return {
        orders,
        meta: {
            total,
            page: p,
            limit: l,
            totalPage: Math.ceil(total / l)
        }
    };
};
export const adminService = {
    getAllUsersDB,
    updateStatusDB,
    createCategoryDB,
    getAllCategoriesDB,
    updateCategoryDB,
    deleteCategoryDB,
    getAllOrdersDB
};
//# sourceMappingURL=admin.Service.js.map