import { z } from "zod";

// csv order Form schema----------------
export const csvOrderFormSchema = z.object({
    channel: z.string().min(1, "Channel is required"),
    files: z.any().optional(),
  })
  

