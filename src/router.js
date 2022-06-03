import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "./stores/auth";
import { supabase } from "./supabase/init";

import AuthLogin from './pages/auth/AuthLogin.vue';
import AuthRegister from './pages/auth/AuthRegister.vue';
import AuthConfirmation from './pages/auth/AuthConfirmation.vue';
import BookLists from './pages/books/BookLists.vue';
import BookFavorites from './pages/books/BookFavorites.vue';
import ProfileUser from './pages/profile/ProfileUser.vue';
import ProfileBasic from './pages/profile/ProfileBasic.vue';
import ProfileAccount from './pages/profile/ProfileAccount.vue';
import NotFound from './pages/NotFound.vue';

const routes = [
  { path: '/', redirect: { name: 'books' } },
  {
    path: '/login',
    name: 'login',
    component: AuthLogin,
    meta: { requireAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: AuthRegister,
    meta: { requireAuth: false },
  },
  {
    path: '/confirmation',
    name: 'confirm',
    component: AuthConfirmation,
    meta: { requireAuth: false },
  },
  {
    path: '/books',
    name: 'books',
    component: BookLists,
    meta: { requireAuth: true },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: BookFavorites,
    meta: { requireAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileUser,
    meta: { requireAuth: true },
  },
  {
    path: '/profile/basic',
    name: 'basic',
    component: ProfileBasic,
    meta: { requireAuth: true },
  },
  {
    path: '/profile/account',
    name: 'account',
    component: ProfileAccount,
    meta: { requireAuth: true },
  },
  {
    path: '/:NotFound(.*)*',
    name: 'notFound',
    component: NotFound,
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, _, next) => {
  const user = supabase.auth.user();

  if (to.meta.requireAuth && !user) {
    next('/login');
  } else if (!to.meta.requireAuth && user) {
    next('/');
  } else {
    next();
  }
});

export default router;