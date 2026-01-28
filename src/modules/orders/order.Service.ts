
import { prisma } from "../../lib/prisma.js"

const createOrderDB = async(customerId:string, payload:any)=>{
const orderNumber = `FH-${Math.floor(10000 + Math.random()*456)}`

  return await prisma.$transaction(async(tx)=>{
    let totalAmount = 0;
    const orderItemsData:any = [];
    for(const item of payload.items){
        const meal = await tx.meal.findUnique(
            {
                where:{
                    id:item.mealId
                }
            }
        )
        if (!meal) throw new Error(`Meal with ID ${item.mealId} not found`);
        totalAmount += meal.price * item.quantity
        orderItemsData.push({
            mealId:item.mealId,
            quantity: item.quantity,
            price: meal.price
        })
    }

  return await tx.order.create({
        data:{
            orderNumber,
            totalAmount,
            deliveryAddress:payload.deliveryAddress,
            customerId,
            items:{
                create: orderItemsData
            }
            
        },
        include :{
            items:true
        }
    })

    


  })


}

export const orderService = {
    createOrderDB
}