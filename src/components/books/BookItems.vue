<script setup>
const props = defineProps({
  bookData: {
    type: [Array, Object],
    required: true,
  }
});

const emits = defineEmits(['editBookId', 'detailBookId']);

</script>

<template>
  <div v-for="book in props.bookData[0]" :key="book.id" class="relative h-96 bg-white w-60 rounded-sm shadow-md">
    <div class="flex justify-center">
      <img class="h-64 w-52" :src="book.imgUrl" alt="Kaizen book">
    </div>
    <div class="text-xs my-2 ml-3.5">
      <h2 class="font-semibold">{{ book.title }}</h2>
      <div class="font-light pt-2">
        By {{ book.author }}
      </div>
    </div>
    <div class="flex absolute bottom-0 w-full pt-3 text-white">
      <button class="flex justify-center w-full py-1 bg-blue-sky transition hover:scale-105 rounded-bl-sm" @click="emits('detailBookId', book.id)">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
      </button>
      <button class="flex justify-center w-full py-1 bg-dark-color transition hover:scale-105 rounded-br-sm" @click="emits('editBookId', book.id)">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
  </div>
</template>