module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 0,
    'vue/no-v-html': 0
  },
  parser: "vue-eslint-parser",
}