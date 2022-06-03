<script setup>

defineProps({
  inputEmail: {
    type: String,
    required: true,
  },
  inputPassword: {
    type: String,
    required: true,
  },
  inputFullname: {
    type: String,
    required: true,
  },
  inputPhone: {
    type: String,
    required: true,
  },
});

defineEmits([
  "submit-form",
  "update:inputFullname",
  "update:inputEmail",
  "update:inputPassword",
  "update:inputPhone",
]);

</script>

<template>
  <form class="mt-6" @submit.prevent="$emit('submit-form')">
    <div class="flex flex-col py-2">
      <label
        for="fullname"
        class="text-dark-color dark:text-pale-blue text-sm font-semibold pb-2">
        Fullname
      </label>
      <input
        id="fullname"
        type="text"
        class="auth-input pl-3"
        name="fullname"
        placeholder="Frederick Jonathan"
        required
        :value="inputFullname"
        @input="$emit('update:inputFullname', $event.target.value)"
      />
    </div>
    <div class="flex flex-col py-2">
      <label
        for="email"
        class="text-dark-color dark:text-pale-blue text-sm font-semibold pb-2">
        Email
      </label>
      <input
        id="email"
        type="email"
        class="auth-input pl-3"
        name="email"
        placeholder="jonathan.f@gmail.com"
        required
        :value="inputEmail"
        @input="$emit('update:inputEmail', $event.target.value)"
      />
    </div>
    <div class="flex flex-col py-2">
      <label
        for="password"
        class="text-dark-color dark:text-pale-blue text-sm font-semibold pb-2">
        Password
      </label>
      <input
        id="password"
        type="password"
        class="auth-input pl-3"
        name="password"
        placeholder="Password"
        required
        :value="inputPassword"
        @input="$emit('update:inputPassword', $event.target.value)"
      />
    </div>
    <div class="flex flex-col py-2">
      <label
        for="phone"
        class="text-dark-color dark:text-pale-blue text-sm font-semibold pb-2">
        Phone
      </label>
      <input
        id="phone"
        type="text"
        class="auth-input pl-3"
        name="phone"
        placeholder="+62****"
        required
        :value="inputPhone"
        @input="$emit('update:inputPhone', $event.target.value)"
      />
    </div>
    <base-button class="mt-3" button-type="submit" mode="button-red">
      Register
    </base-button>
  </form>
</template>

