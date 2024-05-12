<script setup>
import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'

const { addToCart, removeFromCart, cartItems } = inject('cart')
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
const items = ref([])

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const onClickAddCart = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        productId: item.id,
        item
      }

      const { data } = await axios.post('https://bdb6edabdaa78d24.mokky.dev/favorites', obj)

      item.isFavorite = true
      item.favoriteId = data.id
    } else {
      await axios.delete(`https://bdb6edabdaa78d24.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://bdb6edabdaa78d24.mokky.dev/favorites')

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.productId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  }
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

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCartItems = localStorage.getItem('cartItems')
  cartItems.value = localCartItems ? JSON.parse(localCartItems) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => {
    return { ...item, isAdded: cartItems.value.some((cartItem) => cartItem.id === item.id) }
  })
})

watch(filters, fetchItems)
</script>

<template>
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

  <CardList :items="items" @addToFavorite="addToFavorite" @addToCart="onClickAddCart" />
</template>
