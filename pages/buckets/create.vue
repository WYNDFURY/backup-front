<template>
  <div class="p-8">
    <div class="flex justify-center items-center">
      <div class="border rounded-lg px-4 py-8 shadow-lg">
        <CustomFormContainer v-if="form" :form="form"> 
          <CustomFormField :form-field="form.fields.name" />
          <CustomFormField :form-field="form.fields.type" />
          <CustomFormField :form-field="form.fields.provider" />
          <CustomFormField :form-field="form.fields.endpoint" />
          <CustomFormField :form-field="form.fields.access_key_id" />
          <CustomFormField :form-field="form.fields.secret_access_key" />
          <CustomFormField :form-field="form.fields.project_id" />
        </CustomFormContainer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const storeService = useStoreBucketService();
const form = useBucketStoreForm(storeService);

</script>

<style>

</style>