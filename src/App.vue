<script setup>
import { ref } from 'vue';
import { useAuth } from './stores/auth';
import { supabase } from './supabase/init';
import AppSidebar from './components/layout/AppSidebar.vue';

const auth = useAuth();
const appReady = ref(false);
auth.user = supabase.auth.user();

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    auth.user = session.user;
  }
  if (event == 'SIGNED_OUT') auth.user = {};
});

</script>

<template>
  <router-view></router-view>
</template>