import {z} from 'zod';

export const thingSchema = z.object({
  createdAt: z.string().datetime(),
  description: z.string(),
  id: z.string(),
  name: z.string(),
  updatedAt: z.string().datetime().nullable().optional(),
});

export type Thing = z.infer<typeof thingSchema>;
