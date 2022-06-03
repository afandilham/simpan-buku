import { acceptHMRUpdate, defineStore } from "pinia";
import { supabase } from "../supabase/init";
import {v4 as uuidv4} from 'uuid';

export const useBooks = defineStore('books', {
  state: () => ({
    books: [],
    total: 0,
  }),
  getters: {
    getBooks: (state) => {
      return state.books;
    },
  },
  actions: {
    async createBook(commit) {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from('books')
        .insert([
          {
            id: uuidv4(),
            user_id: user.id,
            title: commit.title,
            author: commit.author,
            imgUrl: commit.imgUrl,
            publisher: commit.publisher,
            category: commit.category,
            rating: commit.rating,
            status: commit.status,
            review: commit.review,
          }
        ]);
      this.books[0].push(data[0]);
      if (error) throw new Error('Failed to create book!', error);
    },
    async updateBook(commit) {
      const user = supabase.auth.user();
      const { error } = await supabase
        .from('books')
        .update({
          id: commit.id,
          user_id: user.id,
          title: commit.title,
          author: commit.author,
          imgUrl: commit.imgUrl,
          publisher: commit.publisher,
          category: commit.category,
          rating: commit.rating,
          status: commit.status,
          review: commit.review,
        })
        .match({ id: commit.id });
      this.loadBooks();
      if (error) throw new Error('Failed to update book!', error);
    },
    async loadBooks() {
      this.books = [];
      this.fetchBooks();
    },
    async fetchBooks() {
      const user = supabase.auth.user();
      const { data, error, count } = await supabase
        .from('books')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id);
        this.total = count;
        this.book = [];
        if (this.books.length <= 0) {
          this.setBooks(data);
        }
      if (error) throw new Error('Failed to fetch books!', error);
    },
    async deleteBook(bookId) {
      const { error } = await supabase
        .from('books')
        .delete()
        .match({ id: bookId });
      if (error) throw new Error('Failed to delete the book', error.message);
    },
    getFilteredBook(commit) {
      return this.books[0].filter(book => book.id.includes(commit));
    },
    errorLog(message, error) {
      if (error) throw new Error(message, error);
    },
    setBooks(commit) {
      this.books.push(commit);
    },
    clearBooks() {
      this.books.length = 0;
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBooks, import.meta.hot));
}