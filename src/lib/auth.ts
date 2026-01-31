import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma/client.js";
import { prisma } from "./prisma.js";
import { phoneNumber, role } from "better-auth/plugins";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",

    }),
    trustedOrigins: [process.env.TRUSTED_AUTH_URL! , "https://foodhub-backend-a4-2.onrender.com"],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },

    // -------------------- better auth logic, like i am writing on controller and service
    databaseHooks: {
        user: {
            create: {
                before: async(user)=>{
                    const data = user as any;
                    if(data.role ==="ADMIN"){
                        throw new Error("UNAUTHORIZED_ROLE_REGISTRATION");
                    }
                    

                },

                after: async (user) => {
                    if (user.role ==="PROVIDER"){
                        await prisma.providerProfile.create({
                            data:{
                                userId:user.id,
                                businessName: `${user.name || 'New'}'s Kitchen `,

                            }
                        })
                    }
                    }
            }
        },
        session:{
            create:{
                before: async(session)=>{
                 
                    const user = await prisma.user.findUnique({
                        where:{
                            id: session.userId
                        }
                    })
                    if(user?.status==="SUSPENDED" || user?.isActive===false){
                        throw new Error("ACCOUNT_SUSPENDED")
                    }
                }
                
            }
        }
    },

    //------------------------------ additional fields -------------------------------
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "CUSTOMER"
            },
            phoneNumber: {
                type: "string",
                required: false,
            },
            isActive: {
                type: "boolean",
                required: false,
                defaultValue: true,
            },
            status: {
                type: "string",
                required: false,
                defaultValue: "ACTIVE"

            }
        }
    }
});