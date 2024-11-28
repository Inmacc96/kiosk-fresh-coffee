import { z } from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "Tu nombre es obligatorio"),
  total: z.number().min(1, "Debes añadir al menos un producto"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
});
