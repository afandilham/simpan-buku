<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  }
});
</script>

<template>
  <div class="bg-dark-color w-full p-4 mt-6 md:my-0 rounded-sm shadow-md">
    <h1 class="text-xl text-white">{{ title }}</h1>
    <slot></slot>
  </div>
</template>