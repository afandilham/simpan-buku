<script setup>
defineProps({
  label: {
    type: String,
    default: '',
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  labelColor: {
    type: String,
    default: '',
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <label class="font-semibold text-xs md:text-sm capitalize" :class="labelColor" :for="label">{{ label }}</label>
  <input 
    v-bind="$attrs"
    :id="label"
    class="input-default mt-2"
    :value="modelValue"
    :name="label"
    required
    @input="$emit('update:modelValue', $event.target.value)">
</template>