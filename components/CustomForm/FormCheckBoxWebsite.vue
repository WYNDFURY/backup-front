<template>
  <fieldset class="flex flex-col gap-2">
    <label class="text-sm text-gray-600" for="">{{ formField.label }}</label>
    <div v-for="data in dataset" :key="data.id" class="flex gap-2">
      <input
        :id="data.title"
        v-model="value"
        type="checkbox"
        :value="data.id"
        :checked="checkIfAlreadyChecked(data)"
        @input="formField.validator.resetValidation"
        @blur="formField.validator.validate"
      />
      <label class="text-sm text-gray-600" :for="data.title">{{
        data.title
      }}</label>
    </div>
    <div v-if="!dataset.length" class="text-sm">
      <i class="fa-solid fa-empty-set"></i> Aucuns albums disponible
    </div>

    <div v-if="formField.validator.hasError" class="text-red-600 text-xs">
      <!-- {{ $t("forms.validation.field") }} -->
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { Field } from "@henrotaym/vue-3-forms";
import type { Reactive } from "@henrotaym/vue-3-forms";

interface Props {
  formField: Reactive<Field>;
  dataset: Array<{
    id: number;
    projects: number[];
    title: string;
  }>;
}

const props = defineProps<Props>();

const checkIfAlreadyChecked = (album: (typeof props.dataset)[0]) => {
  if (
    album.projects.find(
      (project) => project.toString() === useRoute().params.id,
    )
  )
    return true;
  return false;
};

const value = computed({
  get() {
    return props.formField.value;
  },
  set(value) {
    props.formField.setValue(value);
  },
});
</script>
