import { z } from 'zod';
import { warehouseSchema } from './_schema';

// Define the warehouse type
export type WarehouseFormValues = z.infer<typeof warehouseSchema>