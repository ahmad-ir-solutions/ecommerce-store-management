import { z } from 'zod'
import { profileSchema } from './_schema'

export type ProfileFormValues = z.infer<typeof profileSchema>