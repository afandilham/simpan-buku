<script setup>
import { ref } from 'vue';
import { useFavorites } from '../../stores/favorites';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const favorites = useFavorites();

</script>

<template>
  <div class="w-full flex justify-between gap-4 bg-white rounded-sm shadow-sm">
    <div class="flex flex-col md:flex-row gap-2">
      <img class="flex-none rounded-br-sm rounded-bl-sm w-20 hidden md:block" :src="imgUrl" :alt="title">
      <div class="flex flex-col justify-start md:justify-between my-2 ml-2 md:ml-0">
        <div class="pb-4 md:pb-0">
          <h2 class="text-xs md:text-lg font-semibold">{{ title }}</h2>
          <span class="text-sm">{{ author }}</span>
        </div>
        <p class="text-xs">{{ status }}</p>
      </div>
    </div>
    <div class="flex flex-col justify-start my-2 mr-2">
      <button type="submit" class="bg-red-color text-white p-2 rounded-full" @click="favorites.deleteFavorite(id)">
        <svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
  </div>
</template>