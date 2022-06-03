<script setup>
import { ref } from 'vue';
import { useAuth } from '../../stores/auth';
import useNotifications from '../../hooks/notifications';
import AppProfile from '../../components/layout/AppProfile.vue';
import ProfileCard from '../../components/profile/ProfileCard.vue';

const auth = useAuth();
const userData = auth.getUser;
const username = ref(userData.user_metadata.username || '');
const email = ref(userData.email);
const fullname = ref(userData.user_metadata.fullname);
const github = ref(userData.user_metadata.github || '');
const twitter = ref(userData.user_metadata.twitter || '');
const website = ref(userData.user_metadata.website || '');
const [ isSuccess ] = useNotifications();

const close = () => {
  isSuccess.value = false;
};

const updateUser = async () => {
  try {
    isSuccess.value = true;
    auth.updateUser({
      username: username.value,
      fullname: fullname.value,
      github: github.value,
      twitter: twitter.value,
      website: website.value,
    });
    setTimeout(() => {
      location.reload();
    }, 3000);
  } catch (error) {
    throw new Error(error.message);
  }
};

</script>

<template>
  <base-notification
    v-if="isSuccess"
    mode="success"
    message="Book saved!"
    @close="close">
  </base-notification>
  <app-profile>
    <form @submit.prevent="updateUser">
      <profile-card title="User">
        <div class="py-2">
          <base-input
            v-model="username"
            label="username"
            label-color="text-white"
            type="text"
            placeholder="Username">
          </base-input>
        </div>
        <div class="py-2 text-white">
          <label for="email" class="text-sm font-medium capitalize">Email</label>
          <p class="text-sm md:text-base pt-2 font-light">{{ email }}</p>
        </div>
        <div class="py-2">
          <base-input
            v-model="fullname"
            label="fullname"
            label-color="text-white"
            type="text"
            placeholder="Fullname">
          </base-input>
        </div>
      </profile-card>
      <div class="my-7">
        <profile-card title="Social Media">
          <div class="py-2">
            <base-input
              v-model="github"
              label="github"
              label-color="text-white"
              type="text"
              placeholder="Github">
            </base-input>
          </div>
          <div class="py-2">
            <base-input
              v-model="twitter"
              label="twitter"
              label-color="text-white"
              type="text"
              placeholder="Twitter">
            </base-input>
          </div>
          <div class="py-2">
            <base-input
              v-model="website"
              label="website (https only)"
              label-color="text-white"
              type="text"
              placeholder="Website">
            </base-input>
          </div>
        </profile-card>
      </div>
      <base-button button-type="submit" mode="button-dark">Save changes</base-button>
    </form>
  </app-profile>
</template>