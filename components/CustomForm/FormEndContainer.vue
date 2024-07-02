<template>
  <form class="flex flex-col gap-6" @submit.prevent="form.submit">
    <slot />

    <div class="flex justify-end gap-2">
      <slot name="validateButton" />
      <button
        class="px-4 py-3 text-xs border-gray-100 rounded-md transition"
        :class="{
          'cursor-default text-slate-500 bg-slate-200': !form.isActive,
          'text-white  bg-blue-500 hover:bg-blue-600': form.isActive,
        }"
      >
        <span v-if="form.isLoading" class="block animate-bounce">...</span>
        <span v-else>Envoyer</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Form } from "@henrotaym/vue-3-forms";
import type { Reactive } from "@henrotaym/vue-3-forms";

defineProps<{ form: Reactive<Form> }>();
</script>