<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
    }
  }
}
</script>

<template>
  <footer class="footer" :class="mode">
    <span class="text-sm md:text-base" :class="mode">Made with</span>
    <a href="https://github.com/afandilham" target="_blank">
      <svg class="w-4 h-4 md:w-6 md:h-6 mx-2" :class="mode" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>
    </a>
    <span class="text-sm md:text-base" :class="mode">in Malang</span>
  </footer>
</template>