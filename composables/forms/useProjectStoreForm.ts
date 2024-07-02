import { Field, useReactiveForm } from "@henrotaym/vue-3-forms"
import type { UnwrapNestedRefs } from "vue"
import { z } from "zod"
import type StoreProjectService from "~/services/api/backup/projects/StoreProjectService"

export const useProjectStoreForm = (
  service: UnwrapNestedRefs<StoreProjectService>
) => {
  const name = new Field({
    label: "Name",
    value: "",
    validation: z.string().min(1),
  })

  const form = useReactiveForm({
    name,
  })

  form.onSubmit(async() => {
    await service.addProject(form);

    navigateTo({
      name: "databases-create",
      query: {
        project_id: service.model?.attributes.id,
      }
    });
  })
  return form;
}

export type StoreProjectForm = ReturnType<typeof useProjectStoreForm>