<script setup>
import Card from './Card.vue'

const props = defineProps({
  items: Array,
  addToFavorite: Function
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <ul class="grid grid-cols-4 gap-5 mt-10">
    <Card
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :onClickAdd="() => emit('addToCart', item)"
      :isAdded="item.isAdded"
    />
  </ul>
</template>
