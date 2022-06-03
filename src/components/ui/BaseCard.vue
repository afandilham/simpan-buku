<script setup>
import { computed } from "vue";
const props = defineProps({
  bgColor: {
    type: String,
    required: true,
  },
});

const backgroundColor = computed(() => {
  switch(props.bgColor) {
    case 'dark':
      return 'bg-dark-color';
      break;
    case 'blue':
      return 'bg-blue-sky';
      break;
    case 'red':
      return 'bg-red-color';
      break;
    default:
      return 'bg-dark-color';
  }
});

</script>

<template>
  <div class="p-3 h-24 rounded-sm flex items-center shadow-md" :class="backgroundColor">
    <slot name="icon"></slot>
    <div class="flex flex-col ml-3.5 text-dark-color">
      <span class="text-2xl font-semibold">
        <slot name="data"></slot>
      </span>
      <div class="text-sm font-normal">
        <slot name="title"></slot>
      </div>
    </div>
  </div>
</template>