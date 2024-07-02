<template>
  <fieldset class="flex flex-col gap-2">
    <label class="text-sm text-gray-600 block" for="">{{
      formField.label
    }}</label>
    <select
      v-model="value"
      class="px-3 py-2 rounded-md bg-white border placeholder-slate-400 focus:outline-none focus:ring-1 w-full"
      :class="{
        'border-slate-300 hover:border-sky-500 focus:border-sky-500 focus:ring-sky-500':
          !formField.validator.isValidated,
        'border-red-600 hover:border-red-700 focus:ring-red-600':
          formField.validator.hasError,
        'border-green-500 hover:border-green-500 focus:ring-green-500':
          formField.validator.isValid,
      }"
      @change="resetAndValidate"
    >
      <option value="">
        Select a {{ selectables[0]?.attributes?.type || selectables[0]?.type }}
      </option>
      <option
        v-for="selectable in selectables"
        :key="selectable.key"
        :value="selectable.attributes?.id"
      >
        {{ selectable.label }}
      </option>
    </select>
    <div v-if="formField.validator.hasError" class="text-red-600 text-xs">
      {{ formField.validator.error }}
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Field } from "@henrotaym/vue-3-forms";
import type { Reactive } from "@henrotaym/vue-3-forms";

interface Props {
  formField: Reactive<Field>;
  selectables: Array<any>;
}

const props = defineProps<Props>();

const value = computed({
  get() {
    return props.formField.value;
  },
  set(value) {
    props.formField.setValue(value);
  },
});

const resetAndValidate = () => {
  props.formField.validate();
  props.formField.resetValidation();
};
</script>
