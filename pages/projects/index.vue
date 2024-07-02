<template>
  <div>
    <div class="flex justify-center items-center p-4 shadow-lg">
      <NuxtLink :to="{name: 'projects-create'}">
      <UtilsButton >
        Create project
      </UtilsButton>
    </NuxtLink>
    </div>
    <ProjectsList v-if="indexProjectService.isReady()" :projects="indexProjectService.models"/>
  </div>
</template>

<script lang="ts" setup>
const indexProjectService = useIndexProjectService();
indexProjectService.getProjects();
</script>

<style>

</style>