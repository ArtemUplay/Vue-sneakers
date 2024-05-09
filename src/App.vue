<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://bdb6edabdaa78d24.mokky.dev/items', {
      params
    })

    items.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchItems)
watch(filters, fetchItems)
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />

    <main class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
            <option value="name">По названию</option>
            <option value="price">По цене (сначала дешёвые)</option>
            <option value="-price">По цене (сначала дорогие)</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3.5 cursor-pointer" src="/search.svg" alt="Search" />
            <input
              @input="onChangeSearchInput"
              type="text"
              class="border border-gray-200 rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>

      <CardList :items="items" />
    </main>
  </div>
</template>
