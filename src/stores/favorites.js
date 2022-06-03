import { acceptHMRUpdate, defineStore } from "pinia";
import { supabase } from "../supabase/init";
import {v4 as uuidv4} from 'uuid';

export const useFavorites = defineStore('favorites', {
  state: () => ({
    favorites: [],
    total: 0,
    user: supabase.auth.user(),
  }),
  actions: {
    async createFavorite(bookId) {
      const { data, error } = await supabase
        .from('favorites')
        .insert([
          {
            id: uuidv4(),
            book_id: bookId,
            user_id: this.user.id,
          }
        ]);
      this.fetchFavorite();
      this.total += 1;
      if (error) throw new Error('Failed to create favorite', error.message);
    },
    async fetchFavorite() {
      const { data, error, count } = await supabase
        .from('favorites')
        .select(`
          id,
          book_id (*)
        `, { count: 'exact' })
        .eq('user_id', this.user.id);
      this.total = count;
      this.favorites = [];
      for await (const value of data) {
        this.favorites.push(value);
      }
      if (error) throw new Error('Failed to fetch favorites', error.message);
    },
    async deleteFavorite(id) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .match({ id: id });
      this.fetchFavorite();
      if (error) throw new Error(`Can't delete favorite`, error.message);
    },
    isFavorite(bookId) {
      return this.favorites.some(book => book.book_id.id === bookId);
    }
  },
  getters: {
    getFavorites() {
      return this.favorites;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavorites, import.meta.hot));
}