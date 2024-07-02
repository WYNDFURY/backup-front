import {z} from 'zod';

const databaseSchema = z.object({
  id: z.number(),
  db_name: z.string(),
  host: z.string(),
  port: z.string(),
  username: z.string(),
  password: z.string(),
  type: z.string(),
  project_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
});

export { databaseSchema };
export type DatabaseResponseSchema = z.infer<typeof databaseSchema>;