import { z } from 'zod';

export const SearchDto = z.object({
  email: z.string().optional(),
});

export type SearchDto = z.infer<typeof SearchDto>;
