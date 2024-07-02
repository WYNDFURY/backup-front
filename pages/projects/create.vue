<template>
  <div class="p-8">
    <div class="flex justify-center items-center">
      <div class="border rounded-lg px-4 py-8 shadow-lg">
        <CustomFormContainer v-if="form" :form="form"> 
          <CustomFormField :form-field="form.fields.name" />
        </CustomFormContainer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const storeService = useStoreProjectService();
const form = useProjectStoreForm(storeService);


</script>

<style>

</style>