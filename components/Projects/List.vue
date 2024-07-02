<template>
  <div>
    <ProjectsCard
      v-for="(project, id) in projects"
      :key="id"
      :project="project"
    />
  </div>
</template>

<script lang="ts" setup>
import type ProjectModel from '~/models/api/backup/projects/ProjectModel';

const props = defineProps<{
  projects: ProjectModel[]
}>();

</script>

<style>

</style>