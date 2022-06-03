<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  inputData: {
    type: [Array, Object],
    required: true,
  }
});
const emits = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});

</script>

<template>
  <label class="font-semibold text-xs md:text-sm capitalize" :for="label">{{ label }}</label>
  <select v-bind="$attrs" :id="props.label" v-model="value" class="input-default mt-2" :name="props.label">
    <option value="" selected disabled>Choose {{ props.label }}</option>
    <option
      v-for="(input, key) in inputData"
      :key="key"
      :value="input">{{ input }}</option>
  </select>
</template>