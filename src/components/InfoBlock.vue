<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center w-72 mx-auto">
    <img class="w-9/12" height="w-9/12" :src="imageUrl" alt="Empty cart" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400 mt-2">{{ description }}</p>
  </div>
</template>
