<template>
  <div class="p-8">
    <div class="flex justify-center items-center">
      <div class="border rounded-lg px-4 py-8 shadow-lg">
        <CustomFormContainer v-if="form" :form="form"> 
          <CustomFormField :form-field="form.fields.db_name" />
          <CustomFormField :form-field="form.fields.host" />
          <CustomFormField :form-field="form.fields.port" />
          <CustomFormField :form-field="form.fields.username" />
          <CustomFormField :form-field="form.fields.password" />
          <CustomFormField :form-field="form.fields.type" />
          <CustomFormField :form-field="form.fields.project_id" />
        </CustomFormContainer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const storeService = useStoreDatabaseService();
const form = useDatabaseStoreForm(storeService);

</script>

<style>

</style>