<template>
  <fieldset class="flex flex-col gap-1">
    <label class="text-sm text-gray-600 block" for="">Adresse</label>
    <input
      v-model="valueDisplayed"
      type="text"
      placeholder="Search address"
      class="px-3 py-2 text-sm rounded-md bg-white border placeholder-slate-400 focus:outline-none focus:ring-1"
      @input="autoCompleteService.search(valueDisplayed)"
    />

    <ul class="border-x rounded-lg shadow flex flex-col overflow-hidden">
      <li
        v-for="prediction in autoCompleteService.predictions"
        :key="prediction.place_id"
        class="hover:bg-blue-400 hover:text-white cursor-pointer px-3 py-2 border-b"
        @click="selectPrediction(prediction)"
      >
        {{ prediction.description }}
      </li>
    </ul>

    <div v-if="isSelected" class="flex gap-1">
      <input v-model="isManual" type="checkbox" />
      <h4>Activer mode manuel</h4>
    </div>

    <div v-if="isManual">
      <CustomFormField :form-field="formFieldStreetName" />
      <CustomFormField :form-field="formFieldStreetNumber" />
      <CustomFormField :form-field="formFieldCity" />
      <CustomFormField :form-field="formFieldPostalCode" />
      <CustomFormField :form-field="formFieldCountry" />
      <CustomFormNumber :form-field="formFieldLatitude" />
      <CustomFormNumber :form-field="formFieldLongitude" />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
// import { computed } from "vue";
import { Field } from "@henrotaym/vue-3-forms";
import type { Reactive } from "@henrotaym/vue-3-forms";
import Autocomplete from "~/services/Autocomplete";
import emitter from "~/services/Emitter";
import Geocoder from "~/services/Geocoder";
interface Props {
  formFieldStreetName: Reactive<Field>;
  formFieldStreetNumber: Reactive<Field>;
  formFieldCity: Reactive<Field>;
  formFieldPostalCode: Reactive<Field>;
  formFieldCountry: Reactive<Field>;
  formFieldLatitude: Reactive<Field>;
  formFieldLongitude: Reactive<Field>;
  formFieldDisplayAddress: Reactive<Field>;
}

const isManual = ref(false);
const isSelected = ref(false);

const autoCompleteService = new Autocomplete();
const geocoder = new Geocoder();

const props = defineProps<Props>();
const valueDisplayed = ref<string>(
  props.formFieldDisplayAddress.value as string,
);
const selectPrediction = async (
  prediction: google.maps.places.AutocompletePrediction,
) => {
  isSelected.value = true;
  autoCompleteService.resetPrediction();
  const geocodedAddress = await geocoder.find(prediction.description);
  props.formFieldStreetName.setValue(geocodedAddress?.streetName);
  props.formFieldStreetNumber.setValue(geocodedAddress?.streetNumber);
  props.formFieldPostalCode.setValue(geocodedAddress?.postalCode);
  props.formFieldCity.setValue(geocodedAddress?.city);
  props.formFieldCountry.setValue(geocodedAddress?.country);
  props.formFieldLongitude.setValue(geocodedAddress?.longitude);
  props.formFieldLatitude.setValue(geocodedAddress?.latitude);
  props.formFieldDisplayAddress.setValue(geocodedAddress?.display);
  valueDisplayed.value = prediction.description;
};

emitter.on("profiles:vat-selected", async function (adress: string) {
  valueDisplayed.value = adress;
  await autoCompleteService.search(valueDisplayed.value);
  if (!autoCompleteService.predictions) return;
  selectPrediction(autoCompleteService.predictions[0]);
});

// const value = computed({
//   get() {
//     return props.formField.value;
//   },
//   set(value) {
//     props.formField.setValue(value);
//   },
// });
</script>
