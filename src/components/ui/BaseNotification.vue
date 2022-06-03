<script setup>
const props = defineProps({
  mode: {
    validator(value) {
      return ['success', 'failed'].includes(value);
    },
    required: true,
  },
  message: {
    type: String,
    validator(value) {
      return value.length <= 30
    },
    required: true,
  }
});

const emits = defineEmits(['close']);
</script>

<template>
  <teleport to='body'>
    <transition name="scale">
      <div class="absolute right-0 left-0 top-14 my-10 mx-2 h-auto overflow-auto md:mx-auto p-3 max-w-lg bg-dark-color rounded-md shadow-sm z-40" :class="mode === 'success' ? 'bg-dark-color' : 'bg-red-color'">
        <div class="relative flex items-center text-white h-14">
          <svg v-if="mode === 'success'" class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <svg v-if="mode === 'failed'" class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <p class="text-xs md:text-sm font-medium">{{ message }}</p>
          <button class="absolute right-0" @click="emits('close')">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
    </transition>
  </teleport>
</template>