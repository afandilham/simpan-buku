<script setup>
import { ref } from 'vue';
import { useAuth } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const auth = useAuth();
const router = useRouter();
const isOpen = ref(false);

const logout = async () => {
  try {
    await auth.signOut();
    router.push('/login');
    setTimeout(() => {
      location.reload();
    }, 0);
  } catch (error) {
    throw new Error('Logout error', error.message);
  }
};

</script>

<template>
  <nav class="flex justify-between items-center w-full bg-pale-blue border-b-4 border-blue-sky text-white px-3 py-2.5 shadow-md">
    <span class="text-xs text-dark-color dark:text-white font-semibold capitalize">Dashboard > {{ useRoute().name }}</span>
    <div class="relative">
      <button class="h-8 w-8 shadow-sm z-40" @click="isOpen = !isOpen">
        <img class="rounded-full" src="https://afandilham.github.io/assets/static/profile.c417f9d.d8342ea26470bffd85d90858040d1565.jpg" alt="profile">
      </button>
      <div v-show="isOpen" class="fixed inset-0 h-screen w-screen z-20" @click="isOpen = !isOpen"></div>
      <div v-show="isOpen" class="absolute right-0 flex flex-col items-center bg-white p-2 w-28 rounded-sm shadow-lg text-xs z-30">
        <router-link to="/profile" class="h-8 p-1 rounded-sm flex items-center w-full transition-colors text-dark-color hover:text-white hover:bg-dark-color">
          <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
          Profile
        </router-link>
        <button class="h-8 p-1 rounded-sm w-full flex items-center transition-colos text-dark-color hover:text-white hover:bg-dark-color" @click="logout">
            <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>