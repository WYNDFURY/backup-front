<template>
  <div class="flex place-content-between place-items-center rounded-lg shadow-md p-4 px-10">
    
    <div class="flex gap-5 place-content-between place-items-center">
    <h2 class="text-xl font-semibold">{{ project.attributes.name }} :</h2>
      <div>
        <p class="text-sm text-gray-500">Database Count: {{ project.attributes.databases_count }}</p>
        <p class="text-sm text-gray-500">Bucket Count: {{ project.attributes.buckets_count }}</p>
      </div>
    </div>
    <NuxtLink :to="{name:'projects-id', params:{id:project.attributes.id}}">
      <UtilsButton>
        View Project details
      </UtilsButton>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import type ProjectModel from '~/models/api/backup/projects/ProjectModel';

  const props = defineProps<{
    project: ProjectModel
  }>();

</script>

<style>
</style> 