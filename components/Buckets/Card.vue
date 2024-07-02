<template>
  <div>
    bucket name : {{ bucket.attributes.name }}
  </div>
</template>

<script lang="ts" setup>
import type BucketModel from '~/models/api/backup/buckets/BucketModel';
import type { UnwrapNestedRefs } from 'vue';

const props = defineProps<{
  bucket: UnwrapNestedRefs<BucketModel>
}>();

</script>

<style>

</style>