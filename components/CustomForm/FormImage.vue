<template>
  <fieldset>
    <label
      v-if="!image"
      class="bg-gray-200 hover:bg-gray-300 cursor-pointer h-[200px] rounded-lg flex justify-center items-center"
      :for="`images-${formField.label}`"
      ><i class="fa-light fa-image text-gray-600 text-5xl"></i
    ></label>
    <input
      :id="`images-${formField.label}`"
      type="file"
      class="px-3 py-2 hidden"
      @change="pushImage"
      @input="formField.validator.resetValidation"
      @blur="formField.validator.validate"
    />
    <div v-if="formField.validator.hasError" class="text-red-600 text-xs">
      {{ formField.validator.error }}
    </div>

    <div v-if="image" class="relative">
      <div class="absolute right-2 top-2 flex gap-2 text-xs">
        <i
          class="fa-regular fa-circle-arrow-left bg-white hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
          @click="rotateImage(270)"
        ></i>

        <i
          class="fa-regular fa-circle-arrow-right bg-white hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
          @click="rotateImage(90)"
        ></i>

        <i
          class="fa-solid fa-xmark bg-white hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
          @click="deleteImage()"
        ></i>
      </div>

      <img
        :src="image"
        alt="image"
        class="rounded-lg h-[200px] object-cover w-full"
      />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Field } from "@henrotaym/vue-3-forms";
import type { Reactive } from "@henrotaym/vue-3-forms";
import { ImageUploader } from "@deegital/js-trustup-io-uploads"; // switch to ts

interface Props {
  formField: Reactive<Field<string | null>>;
}

const props = defineProps<Props>();

const imageUploader = new ImageUploader();

const image = ref<string | null>(null);

const pushImage = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  const file = target?.files[0];
  const response = await imageUploader.get(file);

  image.value = response.source;
  props.formField.setValue(image.value);
};

const value = computed({
  get() {
    return props.formField.value;
  },
  set(value) {
    props.formField.setValue(value);
  },
});

image.value = value.value;

const deleteImage = () => {
  image.value = null;
  props.formField.setValue(image.value);
};

const rotateImage = async (degrees: number) => {
  const newSource = await imageUploader.rotate(image.value, degrees);
  image.value = newSource;
  props.formField.setValue(image.value);
};

value.value = image.value;
</script>
