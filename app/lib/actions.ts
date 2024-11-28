"use server";

import { prisma } from "./prisma";
import { OrderSchema } from "./schema";

export const createOrder = async (data: unknown) => {
  const result = OrderSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  const { name, total, order } = result.data;
  try {
    await prisma.order.create({
      data: {
        name,
        total,
        orderProducts: {
          create: order.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
