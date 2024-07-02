<template>
  <div>
    db_name : {{ database.attributes.db_name }}
  </div>
</template>

<script lang="ts" setup>
import type DatabaseModel from '~/models/api/backup/databases/DatabaseModel';
import type { UnwrapNestedRefs } from 'vue';
defineProps<{
  database: UnwrapNestedRefs<DatabaseModel>
}>();
</script>

<style>

</style>