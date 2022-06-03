<script setup>
defineProps({
  buttonType: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button :type="buttonType" class="button" :class="mode">
    <slot></slot>
  </button>
</template>