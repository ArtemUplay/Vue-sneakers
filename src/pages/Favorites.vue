<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://bdb6edabdaa78d24.mokky.dev/favorites')

    favorites.value = data.map((favoriteItem) => favoriteItem.item)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h1 class="text-3xl font-bold mb-8">Мои закладки</h1>
  <div>
    <CardList :items="favorites" isFavoritesPage />
  </div>
</template>
