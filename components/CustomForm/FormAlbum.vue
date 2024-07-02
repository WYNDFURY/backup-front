<template>
  <fieldset class="grid grid-cols-3 gap-3">
    <label
      class="bg-gray-200 hover:bg-gray-300 cursor-pointer h-[200px] rounded-lg flex justify-center items-center"
      :for="uniqueName"
      ><i class="fa-light fa-image text-gray-600 text-5xl"></i
    ></label>
    <input
      :id="uniqueName"
      type="file"
      class="px-3 py-2 hidden"
      @change="pushImage"
      @input="formField.validator.resetValidation"
      @blur="formField.validator.validate"
    />
    <div v-if="formField.validator.hasError" class="text-red-600 text-xs">
      {{ formField.validator.error }}
    </div>

    <div v-for="image in images" :key="image.name" class="relative">
      <div class="absolute right-2 top-2 flex gap-2 text-xs">
        <i
          class="fa-regular fa-circle-arrow-left bg-white hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
          @click="rotateImage(270, image)"
        ></i>

        <i
          class="fa-regular fa-circle-arrow-right bg-white hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
          @click="rotateImage(90, image)"
        ></i>

        <i
          class="fa-solid fa-xmark bg-white hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
          @click="deleteImage(image.name)"
        ></i>
      </div>

      <img
        :src="image.source"
        alt="image"
        class="rounded-lg h-[200px] object-cover w-full"
      />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { computed } from "vue";
import { Field } from "@henrotaym/vue-3-forms";
import type { Reactive } from "@henrotaym/vue-3-forms";
import { ImageUploader } from "@deegital/js-trustup-io-uploads"; // switch to ts
import type { ImageStoreData } from "~/types";

interface Props {
  formField: Reactive<Field>;
}

const uniqueName = uuidv4();

const imageUploader = new ImageUploader();

const images = ref<ImageStoreData[]>([]);

const pushImage = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  const file = target?.files[0];
  const response = await imageUploader.get(file);
  images.value.push({
    source: response.source,
    name: response.name,
    description: response.description,
    file,
    is_focused: false,
  });
};

const props = defineProps<Props>();

const value = computed({
  get() {
    return props.formField.value;
  },
  set(value) {
    props.formField.setValue(value);
  },
});

images.value = value.value as ImageStoreData[];

// const callToMedia = async (image: ImageStoreData) => {

// };

const deleteImage = (name: string) => {
  const index = images.value.findIndex((image) => image.name === name);

  if (index === -1) return;

  images.value.splice(index, 1);
};

const rotateImage = async (degrees: number, image: ImageStoreData) => {
  // if (image.source.startsWith("https")) {
  //   await callToMedia(image);
  // }
  const newSource = await imageUploader.rotate(image.source, degrees);
  image.source = newSource;
};

value.value = images;
</script>
