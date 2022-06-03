<script setup>
import AuthNav from '../../components/auth/AuthNav.vue';
import AuthCard from '../../components/auth/AuthCard.vue';
</script>

<template>
  <div class="overflow-hidden">
    <auth-nav></auth-nav>
    <div class="container mx-auto max-w-xl mt-32 px-4">
      <auth-card>
        <h2 class="text-dark-color dark:text-white text-2xl">Registration success</h2>
        <p class="text-dark-color dark:text-white text-xs md:text-sm font-normal py-2 mb-5">Please check your email for confirmation!</p>
        <router-link to="/login" class="button bg-red-color text-white text-sm">Go back</router-link>
      </auth-card>
    </div>
  </div>
</template>