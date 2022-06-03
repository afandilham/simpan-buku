<script setup>
import AppSidebar from './AppSidebar.vue';
import AppNavbar from './AppNavbar.vue';

</script>

<template>
  <div id="dashboard" class="flex h-screen">
    <app-sidebar></app-sidebar>
    <div class="flex-1 flex flex-col overflow-hidden bg-white-grayish">
      <app-navbar></app-navbar>
      <transition name="fade" appear>
        <main class="flex-1 overflow-x-hidden overflow-y-auto mx-3 mt-2">
          <slot></slot>
        </main>
      </transition>
    </div>
  </div>
</template>