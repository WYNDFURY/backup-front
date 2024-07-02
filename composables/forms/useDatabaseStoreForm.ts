import { Field, useReactiveForm } from "@henrotaym/vue-3-forms";
import type { UnwrapNestedRefs } from "vue";
import { z } from "zod";
import type StoreDatabaseService from "~/services/api/backup/databases/StoreDatabaseService";

export const useDatabaseStoreForm = (
  service: UnwrapNestedRefs<StoreDatabaseService>
) => {
  const db_name = new Field({
    label: "Database Name",
    value: "",
    validation: z.string().min(1),
  })

  const host = new Field({
    label: "Host",
    value: "",
    validation: z.string().min(1),
  })

  const port = new Field({
    label: "Port",
    value: "",
    validation: z.string().min(1),
  })

  const username = new Field({
    label: "Username",
    value: "",
    validation: z.string().min(1),
  })

  const password = new Field({
    label: "Password",
    value: "",
    validation: z.string().min(1),
  })

  const type = new Field({
    label: "Type",
    value: "MYSQL",
    validation: z.string().min(1),
  })

  const project_id = new Field({
    label: "Project ID",
    value: Number(useRoute().query.project_id) || 1, 
    validation: z.number(),
  })

  const form = useReactiveForm({
    db_name,
    host,
    port,
    username,
    password,
    type,
    project_id,
  })

  form.onSubmit(async() => {
    await service.addDatabase(form);
    if(!service.model) return;
    navigateTo({
      name: "buckets-create",
      query: {
        project_id: useRoute().query.project_id,
      }
    })
  })
  return form;
}

export type StoreDatabaseForm = ReturnType<typeof useDatabaseStoreForm>