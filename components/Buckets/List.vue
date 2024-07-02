<template>
  <div>
    <!-- <div>{{ buckets }}</div> -->
    <BucketsCard
      v-for="(bucket, id) in buckets"
      :key="id"
      :bucket="bucket"
    />
  </div>
</template>

<script lang="ts" setup>
import type BucketModel from '~/models/api/backup/buckets/BucketModel';
import type { UnwrapNestedRefs } from 'vue';

const props = defineProps<{
  buckets: UnwrapNestedRefs<BucketModel[]>
}>();

</script>

<style>

</style>