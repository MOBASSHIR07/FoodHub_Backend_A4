import { prisma } from "../../lib/prisma.js"

const getAllUsersDB = async()=>{

  const result = await prisma.user.findMany(
    {
        include :{
            providerProfile:true
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

export const adminService = {
    getAllUsersDB,
    updateStatusDB
}