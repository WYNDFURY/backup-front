import { z } from "zod";
import { databaseSchema } from "../databases/DatabaseSchema";
import { bucketSchema } from "../buckets/BucketSchema";

const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  databases: databaseSchema.array(),
  databases_count: z.number(),
  buckets: bucketSchema.array(),
  buckets_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
});

export { projectSchema };
export type ProjectResponseSchema = z.infer<typeof projectSchema>;
