<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavoritesPage: Boolean,
  addToFavorite: Function
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <ul class="grid grid-cols-4 gap-5 mt-10" v-auto-animate>
    <Card
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :onClickFavorite="!isFavoritesPage ? () => emit('addToFavorite', item) : null"
      :onClickAdd="!isFavoritesPage ? () => emit('addToCart', item) : null"
      :isAdded="item.isAdded"
    />
  </ul>
</template>
