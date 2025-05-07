import { z } from "zod"
import { companySchema } from "./_schema"

export type Company = z.infer<typeof companySchema>
