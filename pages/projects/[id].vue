<template>
  <p></p>
  <div class="grid grid-flow-col gap-5 p-4 border-2" >
    <div class="border-r-2">
      <DatabasesList v-if="showProjectService.isReady()" :databases="showProjectService.databases!"/>
    </div>
    <div>
      <BucketsList v-if="showProjectService.isReady()" :buckets="showProjectService.buckets!"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
const showProjectService = useShowProjectService();
showProjectService.getProject(Number(useRoute().params.id));
</script>

<style>

</style>