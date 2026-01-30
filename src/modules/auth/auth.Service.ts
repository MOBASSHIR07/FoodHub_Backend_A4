import { prisma } from "../../lib/prisma.js"

const getProfileDB = async(userId:string)=>{

    return await prisma.user.findUnique({
        where:{
            id:userId
        }
    })
}

export const authService = {
    getProfileDB
}