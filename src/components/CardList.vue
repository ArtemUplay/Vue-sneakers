<script setup>
import Card from './Card.vue'

defineProps({
  items: Array
})
</script>

<template>
  <ul class="grid grid-cols-4 gap-5 mt-10">
    <Card
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :onClickAdd="onClickAdd"
    />
  </ul>
</template>
