<script setup>
import { ref } from "vue";
import { useAuth } from "../../stores/auth";
import { useRouter } from "vue-router";
import AuthNav from "../../components/auth/AuthNav.vue";
import AuthCard from "../../components/auth/AuthCard.vue";
import AuthRoute from "../../components/auth/AuthRoute.vue";
import AuthFormRegister from "../../components/auth/AuthFormRegister.vue";
import AppFooter from "../../components/layout/AppFooter.vue";

const auth = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');
const fullname = ref('');
const phone = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

async function registerUser() {
  try {
    isLoading.value = true;
    await auth.signUp({
      email: email.value,
      password: password.value,
      fullname: fullname.value,
      phone: phone.value,
    });
    console.log('success');
    router.push('/confirmation');
  } catch(error) {
    errorMessage.value = error.message;
    setTimeout(() => {
      errorMessage.value = null;
    }, 6000);
  }
}
</script>

<template>
  <transition name="fade" appear>
    <div class="overflow-hidden">
      <auth-nav></auth-nav>
      <div class="container mx-auto max-w-xl px-4">
        <auth-route></auth-route>
        <p v-if="isLoading" class="text-white text-xl">Loading...</p>
        <div v-if="errorMessage" class="w-full bg-white dark:bg-dark-grayish text-red-color text-sm p-2 mb-4">{{ errorMessage }}</div>
        <auth-card>
          <h2
            class="
              text-dark-color
              dark:text-white-grayish
              text-sm
              font-semibold
              text-center
            "
          >
            Create your account right now!
          </h2>
          <auth-form-register
            v-model:inputFullname="fullname"
            v-model:inputEmail="email"
            v-model:inputPassword="password"
            v-model:inputPhone="phone"
            @submit-form="registerUser">
          </auth-form-register>
        </auth-card>
      </div>
      <app-footer mode="register"></app-footer>
    </div>
  </transition>
</template>