<script setup>
import DrawerHead from './DrawerHead.vue'
import CartListItem from './CartIListItem.vue'
import InfoBlock from './InfoBlock.vue'

const emit = defineEmits(['createOrder'])

defineProps({
  totalPrice: Number,
  vatPrice: Number,
  disabledButton: Boolean
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <InfoBlock
      v-if="totalPrice === 0"
      title="Корзина пустая"
      description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
      imageUrl="package-icon.png"
    />

    <div v-if="totalPrice > 0" class="flex flex-col justify-between mt-6">
      <CartListItem />

      <div class="flex flex-col gap-5 pb-8 my-6">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} ₽</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} ₽</b>
        </div>
        <button
          :disabled="disabledButton"
          @click="() => emit('createOrder')"
          class="bg-lime-500 w-full rounded-xl py-3 text-white transition disabled:bg-slate-300 disabled:cursor-default hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
