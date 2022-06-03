<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  routeData: {
    type: [Array, Object],
    required: true,
  }
});
const emits = defineEmits(['update:modelValue']);

const router = useRouter();
const selectedLink = ref(props.modelValue);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});

const changeRoute = () => {
  router.push({ path: '/profile/' + selectedLink.value })
};

</script>

<template>
  <select v-bind="$attrs" :id="props.label" v-model="selectedLink" class="input-default mt-2 font-semibold" :name="props.label" @change="changeRoute">
    <option
      v-for="(input, key) in routeData"
      :key="key"
      :value="input"
      @change="selectedLink">
        {{ input }}
    </option>
  </select>
</template>