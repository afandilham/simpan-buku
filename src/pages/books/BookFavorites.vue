<script setup>
import { useFavorites } from '../../stores/favorites'; 
import AppDashboard from '../../components/layout/AppDashboard.vue';
import BookFavoriteItems from '../../components/books/BookFavoriteItems.vue';

const favorites = useFavorites();

favorites.fetchFavorite();

</script>

<template>
  <app-dashboard>
    <div class="grid grid-cols-1 gap-4">
      <book-favorite-items
        v-for="(favorite, index) of favorites.getFavorites" 
        :id="favorite.id"
        :key="index"
        :book-id="favorite.book_id.id"
        :title="favorite.book_id.title"
        :img-url="favorite.book_id.imgUrl"
        :author="favorite.book_id.author"
        :status="favorite.book_id.status">
      </book-favorite-items>
    </div>
  </app-dashboard>
</template>