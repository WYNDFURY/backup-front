<template>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <TrustupIoToasteo :toasteo="toasteo"/>
</template>

<script lang="ts" setup>
const toasteo = useToasteo();
</script>