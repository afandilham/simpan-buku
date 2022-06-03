<script setup>
import { ref, reactive } from 'vue';
import { useAuth } from '../../stores/auth';
import { useRoute } from 'vue-router';
import AppDashboard from '../../components/layout/AppDashboard.vue';
import ProfileSelect from '../../components/profile/ProfileSelect.vue';

const auth = useAuth().getUser;
const route = useRoute();
const profilePath = ref(route.name);
const routeData = reactive([
  'basic',
  'account'
]);
</script>

<template>
  <app-dashboard>
    <h1 class="text-base md:text-lg font-bold"><span class="text-blue-sky">{{ auth.user_metadata.fullname }}'s</span> Settings</h1>
    <div class="flex flex-col md:flex-row my-4">
      <div class="hidden md:flex flex-col">
        <router-link :to="{ name: 'basic' }" class="profile-link flex items-center">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="pl-1.5">Basic</span>
        </router-link>
        <router-link :to="{ name: 'account' }" class="profile-link flex items-center">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span class="pl-1.5">Account</span>
        </router-link>
      </div>
      <div class="block md:hidden w-full">
        <profile-select
          :model-value="profilePath"
          :route-data="routeData">
        </profile-select>
      </div>
      <div class="flex-1 ml-0 md:ml-12">
        <slot></slot>
      </div>
    </div>
  </app-dashboard>
</template>