<template>
  <div>
    <DatabasesCard
      v-for="(database, id) in databases"
      :key="id"
      :database="database"
    />
  </div>
</template>

<script lang="ts" setup>
import type DatabaseModel from '~/models/api/backup/databases/DatabaseModel';
import type { UnwrapNestedRefs } from 'vue';
const props = defineProps<{
  databases:  UnwrapNestedRefs<DatabaseModel[]>
  
}>();
</script>

<style>

</style>