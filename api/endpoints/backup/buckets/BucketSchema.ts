import { z } from "zod";

const bucketSchema = z.object({
  id: z.number(),
  type: z.string(),
  provider: z.string(),
  project_id: z.number(),
  access_key_id: z.string(),
  secret_access_key: z.string(),
  name: z.string(),
  endpoint: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
});

export { bucketSchema };
export type BucketResponseSchema = z.infer<typeof bucketSchema>;
