import { equal } from "node:assert";
import { prisma } from "../../lib/prisma.js";

const createMealDB = async (providerId: string, payload: any) => {
    return await prisma.meal.create({
        data: {
            name: payload.name,
            description: payload.description,
            price: payload.price,
            image: payload.image,
            isAvailable: payload.isAvailable ?? true,
            categoryId: payload.categoryId, 
            providerId: providerId,        
            cuisine: payload.cuisine,
            dietaryPreferences: payload.dietaryPreferences,
        }
    });
};


const updateMealDB = async (id:string, providerId: string, payload: any) => {
    return await prisma.meal.update({
        where: { 
            id,
            providerId 
        },
        data: payload
    });
};

const deleteMealDB = async (id: string, providerId: string) => {
    return await prisma.meal.delete({
        where: { 
            id,
            providerId 
        }
    });
};


const getAllMealDB = async (filter: any) => {
    const { cuisine, dietaryPreferences, price, page, limit } = filter;

   
    const p = Number(page) || 1;
    const l = Number(limit) || 10;
    const skip = (p - 1) * l;


    let where: any = {};

    if (cuisine) {
        where.cuisine = { equals: cuisine, mode: "insensitive" };
    }

    if (dietaryPreferences) {
        where.dietaryPreferences = { equals: dietaryPreferences, mode: "insensitive" };
    }

    const sortOrder = price === "desc" ? "desc" : "asc";

    const data = await prisma.meal.findMany({
        where,
        orderBy: { price: sortOrder },
        skip: skip,
        take: l,
        include: {
            category: true,
            provider: {
                select: {
                    businessName: true,
                    address: true
                }
            },
            reviews:{
                select:{
                    rating:true
                }
            }
        }
    });

   
    const count = await prisma.meal.count({ where });

    const totalPage = Math.ceil(count / l);

    return { 
        data, 
        meta: { 
            count, 
            totalPage, 
            currentPage: p 
        } 
    };
};

const getMealByIdDB = async (mealId: string) => {
    return await prisma.meal.findUnique({
        where: {
            id: mealId,
        },
        include: {
            category: {
                select: { name: true }
            },
            provider: {
                select: { 
                    businessName: true, 
                    coverImage:true
                    
                    
                }
            }
        }
    });
};



export const mealService = {
    createMealDB,
    updateMealDB,
    deleteMealDB,
    getAllMealDB,
    getMealByIdDB
};