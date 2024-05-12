<script setup>
import { computed, provide, ref, watch } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const drawerActive = ref(false)
const cartItems = ref([])
const isCreatingOrder = ref(false)

const addToCart = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== item.id)
  item.isAdded = false
}

const cartIsEmpty = computed(() => cartItems.value.length === 0)
const buttonCreateOrderDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://bdb6edabdaa78d24.mokky.dev/orders', {
      items: cartItems.value,
      totalPrice: totalPrice.value
    })

    cartItems.value = []

    return data
  } catch (error) {
    console.error(error)
  } finally {
    isCreatingOrder.value = false
  }
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
  <Drawer
    v-if="drawerActive"
    :totalPrice="totalPrice"
    :vatPrice="vatPrice"
    @createOrder="createOrder"
    :disabledButton="buttonCreateOrderDisabled"
  />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :totalPrice="totalPrice" @openDrawer="openDrawer" />

    <main class="p-10">
      <RouterView />
    </main>
  </div>
</template>
