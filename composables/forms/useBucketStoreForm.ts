import { Field, useReactiveForm } from "@henrotaym/vue-3-forms";
import type { UnwrapNestedRefs } from "vue";
import { z } from "zod";
import type StoreBucketService from "~/services/api/backup/buckets/StoreBucketService";

export const useBucketStoreForm = (
  service: UnwrapNestedRefs<StoreBucketService>
) => {
  const name = new Field({
    label: "Bucket Name",
    value: "",
    validation: z.string().min(1),
  })

  const type = new Field({
    label: "Type",
    value: "s3",
    validation: z.string().min(1),
  })

  const provider = new Field({
    label: "Provider",
    value: "",
    validation: z.string().min(1),
  })

  const endpoint = new Field({
    label: "Endpoint",
    value: "",
    validation: z.string().min(1),
  })

  const access_key_id = new Field({
    label: "Access Key ID",
    value: "",
    validation: z.string().min(1),
  })

  const secret_access_key = new Field({
    label: "Secret Access Key",
    value: "",
    validation: z.string().min(1),
  })

  const project_id = new Field({
    label: "Project ID",
    value: Number(useRoute().query.project_id) || 1, 
    validation: z.number(),
  })

  const form = useReactiveForm({
    name,
    type,
    provider,
    endpoint,
    access_key_id,
    secret_access_key,
    project_id,
  })

  form.onSubmit(async() => {
    await service.addBucket(form);
    if(!service.model) return;
    navigateTo({
      name: "configurations-create",
    })
  })
  return form;
}

export type StoreBucketForm = ReturnType<typeof useBucketStoreForm>