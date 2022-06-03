<script setup>
import { ref, watch } from 'vue';
import { useBooks } from '../../stores/books';
import { useFavorites } from '../../stores/favorites';
import useNotifications from '../../hooks/notifications';
import BookCard from '../ui/books/BookCard.vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["close"]);

const books = useBooks();
const favorites = useFavorites();
const id = ref("");
const title = ref("");
const author = ref("");
const imgUrl = ref("");
const publisher = ref("");
const category = ref("");
const rating = ref("");
const status = ref("");
const review = ref("");
const [ isSuccess ] = useNotifications();

watch(() => props.bookId, (newValue) => {
  let detailBook = books.getFilteredBook(newValue);
  id.value = detailBook[0].id;
  title.value = detailBook[0].title;
  author.value = detailBook[0].author;
  imgUrl.value = detailBook[0].imgUrl;
  publisher.value = detailBook[0].publisher;
  category.value = detailBook[0].category;
  rating.value = detailBook[0].rating;
  status.value = detailBook[0].status;
  review.value = detailBook[0].review;
});

const addFavorite = (bookId) => {
  favorites.createFavorite(bookId);
  isSuccess.value = true;
  setTimeout(() => {
    isSuccess.value = false;
  }, 3000);
};

const deleteBook = (bookId) => {
  books.deleteBook(bookId);
  setTimeout(() => {
    location.reload();
  }, 2000);
};

const close = () => {
  isSuccess.value = false;
};
</script>

<template>
  <teleport to="body">
    <base-notification
      v-if="isSuccess"
      mode="success"
      message="Favorite saved!"
      @close="close">
    </base-notification>
    <transition name="fade">
      <div v-if="showModal">
        <div class="fixed top-0 left-0 h-full w-full shadow-lg bg-dark-grayish opacity-70 overflow-hidden z-20" @click="$emit('close')"></div>
        <book-card class="flex-col">
          <template #default>
            <div class="flex justify-between pb-6">
              <div class="flex justify-start">
                <button class="hover:opacity-60 transition pr-2" @click="deleteBook(id); $emit('close');">
                  <svg class="w-6 h-6 text-red-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                </button> 
                <button v-if="!favorites.isFavorite(id)" class="hover:opacity-60 transition" @click="addFavorite(id); $emit('close');">
                  <svg class="w-6 h-6 text-yellow-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                </button>
              </div>
              <button>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div class="flex flex-col items-center md:flex-row md:items-start">
              <img class="w-32 h-32 md:w-56 md:h-56" :src="imgUrl" :alt="title">
              <div class="pl-2 text-center md:text-left pt-4 md:pt-0">
                <h1 class="text-sm md:text-lg font-bold text-dark-color">{{ title }}</h1>
                <p class="text-dark-grayish text-xs md:text-sm pt-2">{{ author }}</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 py-4 gap-4">
              <base-card bg-color="dark">
                <template #icon>
                  <div class="flex justify-between items-center">
                    <svg class="w-12 h-12 rounded-full bg-white p-2 text-yellow-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>
                </template>

                <template #data>
                  <span class="text-lg text-white font-semibold">
                    {{ rating }}
                  </span>
                </template>

                <template #title>
                  <span class="text-white font-light">
                    Rating
                  </span>
                </template>
              </base-card>
              <base-card bg-color="red">
                <template #icon>
                  <div class="flex justify-between items-center">
                    <svg class="w-12 h-12 rounded-full bg-dark-color p-2 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                  </div>
                </template>

                <template #data>
                  <span class="text-lg font-semibold">
                    {{ status }}
                  </span>
                </template>

                <template #title>
                  <span class="font-light">
                    Status
                  </span>
                </template>
              </base-card>
              <base-card bg-color="blue">
                <template #icon>
                  <div class="flex justify-between items-center">
                    <svg class="w-12 h-12 rounded-full bg-dark-color p-2 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                  </div>
                </template>

                <template #data>
                  <span class="text-lg font-semibold">
                    {{ publisher }}
                  </span>
                </template>

                <template #title>
                  <span class="font-light">
                    Publisher
                  </span>
                </template>
              </base-card>
              <base-card bg-color="red">
                <template #icon>
                  <div class="flex justify-between items-center">
                    <svg class="w-12 h-12 rounded-full bg-dark-color p-2 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                  </div>
                </template>

                <template #data>
                  <span class="text-lg font-semibold">
                    {{ category }}
                  </span>
                </template>

                <template #title>
                  <span class="font-light">
                    Category
                  </span>
                </template>
              </base-card>
            </div>
          </template>
        </book-card>
      </div>
    </transition>
  </teleport>
</template>