import { acceptHMRUpdate, defineStore } from "pinia";
import { supabase } from "../supabase/init";

export const useAuth = defineStore('auth', {
  state: () => ({
    user: {},
  }),
  actions: {
    async signUp(commit) {
      const { error } = await supabase.auth.signUp({
        email: commit.email,
        password: commit.password
      },
      {
        data: {
          fullname: commit.fullname,
          phone: commit.phone,
        },
      });
      if (error) throw error;
    },
    async signIn(commit) {
      const { error } = await supabase.auth.signIn({
        email: commit.email,
        password: commit.password
      });
      if (error) throw error;
    },
    async updateUser(commit) {
      const { error } = await supabase.auth.update({
        data: {
          username: commit.username,
          fullname: commit.fullname,
          github: commit.github,
          twitter: commit.twitter,
          website: commit.website,
        }
      });
      if (error) throw new Error('Failed to update user', error.message);
    },
    async updatePassword(newPassword) {
      const { error } = await supabase.auth.update({
        password: newPassword, 
      });
      if (error) throw new Error('Failed to update user password', error.message);
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      this.user = null;
      if (error) throw error;
    },
    setUser(commit) {
      this.user.push(commit);
    }
  },
  getters: {
    getUser() {
      return this.user;
    },
    isAuthenticated() {
      return this.user !== null;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}