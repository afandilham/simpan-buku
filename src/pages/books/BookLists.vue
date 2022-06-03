<script setup>
import { ref, reactive } from 'vue';
import { useBooks } from '../../stores/books';
import { useFavorites } from '../../stores/favorites';
import AppDashboard from '../../components/layout/AppDashboard.vue';
import BookItems from '../../components/books/BookItems.vue';
import BookForm from '../../components/books/BookForm.vue';
import BookDetail from '../../components/books/BookDetail.vue';

const books = useBooks();
const favorites = useFavorites();
const editBookId = ref('');
const detailBookId = ref('');
const openEditModal = ref(false);
const openDetailModal = ref(false);
const isEdit = reactive({
  mode: false
});

const closeEdit = () => {
  openEditModal.value = false;
};

const closeDetail = () => {
  openDetailModal.value = false;
};

const getEditBookId = (bookId) => {
  openEditModal.value = true;
  editBookId.value = bookId;
  isEdit.mode = true;
};

const getDetailBookId = (bookId) => {
  openDetailModal.value = true;
  detailBookId.value = bookId;
};

const addBook = () => {
  openEditModal.value = true;
  isEdit.mode = false;
};

books.fetchBooks();
favorites.fetchFavorite();
</script>

<template>
  <app-dashboard>
    <book-form 
      :show-form="openEditModal" 
      :is-edit="isEdit.mode" 
      :book-id="editBookId" 
      @close="closeEdit">
    </book-form>
    <book-detail
      :show-modal="openDetailModal"
      :book-id="detailBookId"
      @close="closeDetail">
    </book-detail>
    <h1 class="text-xl">Overview</h1>
    <div class="relative grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-4 mt-4">
      <base-card bg-color="blue">
        <template #icon>
          <svg class="w-12 h-12 rounded-full bg-dark-color p-2 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path></svg>
        </template>
        
        <template #title>
          Books
        </template>
        
        <template #data>
          {{ books.total }}
        </template>
      </base-card>
      <base-card bg-color="red">
        <template #icon>
          <svg class="w-12 h-12 rounded-full bg-dark-color p-2 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        </template>
        
        <template #title>
          Favorites
        </template>
        
        <template #data>
          {{ favorites.total }}
        </template>
      </base-card>
    </div>
    <div class="flex gap-2 text-sm my-6">
      <button class="flex items-center p-2 bg-dark-color text-white outline-none rounded-sm hover:-translate-y-0.5 transition ease-in-out" @click="addBook">
        <svg class="w-6 h-6 text-blue-sky mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
        <span>Add book</span>
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-5 my-6">
      <book-items
        :book-data="books.getBooks" @edit-book-id="getEditBookId" @detail-book-id="getDetailBookId">
      </book-items>
    </div>
  </app-dashboard>
</template>