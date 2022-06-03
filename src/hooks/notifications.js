import { ref, computed } from "vue";

export default function useNotifications() {
  const isSuccess = ref(false);
  const isFailed = ref(false);

  return [
    isSuccess,
    isFailed,
  ];
};