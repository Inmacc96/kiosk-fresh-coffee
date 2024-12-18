"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { OrderSchema, ProductSchema } from "./schema";

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

export const completeOrder = async (id: number) => {
  try {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now()),
      },
    });
    revalidatePath("/admin/orders");
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (data: unknown) => {
  const result = ProductSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  try {
    await prisma.product.create({
      data: result.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id: number, data: unknown) => {
  const result = ProductSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: result.data,
    });
  } catch (error) {
    console.log(error);
  }
};
