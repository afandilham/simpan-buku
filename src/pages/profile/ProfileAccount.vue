<script setup>
import { ref } from 'vue';
import { useAuth } from '../../stores/auth';
import useNotifications from '../../hooks/notifications';
import AppProfile from '../../components/layout/AppProfile.vue';
import ProfileCard from '../../components/profile/ProfileCard.vue';

const auth = useAuth();
const password = ref('');
const [ isSuccess ] = useNotifications();

const updatePassword = async () => {
  try {
    isSuccess.value = true;
    await auth.updatePassword(password.value);
    await auth.signOut();
    setTimeout(() => {
      location.reload();
    }, 3000);
  } catch (error) {
    throw new Error('Update failed', error.message);
  }
};

const close = () => {
  isSuccess.value = false;
};
</script>

<template>
  <base-notification
      v-if="isSuccess"
      mode="success"
      message="Data changed!"
      @close="close">
    </base-notification>
  <app-profile>
    <profile-card title="Setup new password">
      <form @submit.prevent="updatePassword">
        <div class="py-5">
          <base-input
            v-model="password"
            label="New Password"
            label-color="text-white"
            type="password"
            placeholder="New Password">
          </base-input>
        </div>
        <base-button button-type="submit" mode="button-red">Set new password</base-button>
      </form>
    </profile-card>
    <div class="py-2 md:py-5">
      <profile-card title="Delete account (Warning)">
        <details>
          <summary class="text-xs text-white dark:text-dark-color py-2">See details</summary>
          <ul class="list-disc pl-4 text-white dark:text-dark-grayish text-xs p-2">
            <li class="py-1">Doing this action will lose your account</li>
            <li class="py-1">Delete all save books</li>
            <li class="py-1">Can’t retrieve back your account after you delete it</li>
          </ul>
          <form>
            <base-button button-type="submit" mode="button-gray">Delete Account</base-button>
          </form>
        </details>
      </profile-card>
    </div>
  </app-profile>
</template>