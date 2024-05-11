<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cartItems, removeFromCart } = inject('cart')
</script>

<template>
  <ul class="flex flex-col gap-5" v-auto-animate>
    <CartItem
      v-for="cartItem in cartItems"
      :id="cartItem.id"
      :key="cartItem.id"
      :title="cartItem.title"
      :price="cartItem.price"
      :imageUrl="cartItem.imageUrl"
      @onClickRemove="() => removeFromCart(cartItem)"
    />
  </ul>
</template>
