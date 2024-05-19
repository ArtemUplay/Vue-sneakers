<script setup>
import { computed, provide, ref, watch } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const drawerActive = ref(false)
const cartItems = ref([])

const addToCart = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== item.id)
  item.isAdded = false
}

const totalPrice = computed(() =>
  cartItems.value.reduce((sumPrice, cartItem) => sumPrice + cartItem.price, 0)
)
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerActive.value = false
}

const openDrawer = () => {
  drawerActive.value = true
}

watch(
  cartItems,
  () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  },
  {
    deep: true
  }
)

provide('cart', {
  cartItems,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <Drawer v-if="drawerActive" :totalPrice="totalPrice" :vatPrice="vatPrice" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :totalPrice="totalPrice" @openDrawer="openDrawer" />

    <main class="p-10">
      <RouterView />
    </main>
  </div>
</template>
