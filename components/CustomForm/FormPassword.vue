<template>
  <fieldset class="flex flex-col gap-1">
    <label class="text-sm text-gray-600 block" for="">{{
      formField.label
    }}</label>
    <input
      v-model="value"
      type="password"
      :placeholder="formField.label"
      class="px-3 py-2 text-sm rounded-md bg-white border placeholder-slate-400 focus:outline-none focus:ring-1"
      :class="{
        'border-slate-300 hover:border-sky-500 focus:border-sky-500 focus:ring-sky-500':
          !formField.validator.isValidated,
        'border-red-600 hover:border-red-700 focus:ring-red-600':
          formField.validator.hasError,
        'border-green-500 hover:border-green-500 focus:ring-green-500':
          formField.validator.isValid,
      }"
      @input="formField.validator.resetValidation"
      @blur="formField.validator.validate"
    />
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
</script>
