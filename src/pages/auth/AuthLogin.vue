<script setup>
import { ref } from 'vue';
import { useAuth } from '../../stores/auth';
import { useRouter } from 'vue-router';
import useNotifications from '../../hooks/notifications';
import AuthNav from "../../components/auth/AuthNav.vue";
import AuthCard from "../../components/auth/AuthCard.vue";
import AuthRoute from "../../components/auth/AuthRoute.vue";
import AppFooter from "../../components/layout/AppFooter.vue";

const auth = useAuth();
const router = useRouter();
const email = ref('');
const password = ref('');
const [ isFailed ] = useNotifications();
const errorMessage = ref('');

async function submitLogin() {
  try {
    await auth.signIn({
      email: email.value,
      password: password.value
    });
    router.push('/');
  } catch(error) {
    errorMessage.value = error.message;
    isFailed.value = true;
    setTimeout(() => {
      errorMessage.value = null;
      isFailed.value = false;
    }, 6000);
  }
}

const close = () => {
  isFailed.value = false;
};
</script>

<template>
  <transition name="fade" appear>
    <div class="overflow-hidden">
      <base-notification
        v-if="isFailed"
        mode="failed"
        :message="errorMessage"
        @close="close">
      </base-notification>
      <auth-nav></auth-nav>
      <div class="container mx-auto max-w-lg px-4">
        <auth-route></auth-route>
        <auth-card>
          <h2 class="text-dark-color dark:text-white-grayish text-sm font-semibold text-center">
            Login to manage your books
          </h2>
          <form class="mt-6" @submit.prevent="submitLogin">
            <div class="flex flex-col">
              <div class="py-3">
                <div class="relative">
                  <div class="absolute top-1 left-2 md:top-2 flex items-center">
                    <svg
                      class="text-dark-grayish w-4 h-4 md:w-5 md:h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <div class="border-r-2 border-light-color">&nbsp;</div>
                  </div>
                  <input 
                    v-model="email"
                    type="email" 
                    class="auth-input pl-10 md:pl-12" 
                    placeholder="Email" />
                </div>
              </div>
              <div class="py-3">
                <div class="relative">
                  <div class="absolute top-1 left-2 md:top-2 flex items-center">
                    <svg class="text-dark-grayish w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd"></path></svg>
                    <div class="border-r-2 border-light-color">&nbsp;</div>
                  </div>
                  <input 
                    v-model="password"
                    type="password" 
                    class="auth-input pl-10 md:pl-12" 
                    placeholder="Password" />
                </div>
              </div>
            </div>
            <base-button class="mt-3" button-type="submit" mode="button-dark">Login</base-button>
          </form>
        </auth-card>
      </div>
      <app-footer mode="login"></app-footer>
    </div>
  </transition>
</template>