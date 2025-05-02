import { z } from "zod";
import { csvOrderFormSchema } from "./_schema";

// csv order type----------------
export type CsvOrderFormValues = z.infer<typeof csvOrderFormSchema>