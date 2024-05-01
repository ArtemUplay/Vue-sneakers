<script setup>
import Card from './Card.vue'

const onClickAdd = () => {
  alert('Добавить')
}
</script>

<template>
  <ul class="grid grid-cols-4 gap-5">
    <Card
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      imageUrl="/sneakers/sneakers-1.jpg"
      :price="5000"
      :isFavorite="false"
      :isAdded="false"
      :onClickAdd="onClickAdd"
    />
  </ul>
</template>
