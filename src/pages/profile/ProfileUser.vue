<script setup>
import { useAuth } from '../../stores/auth';
import { reactive } from 'vue';
import AppDashboard from '../../components/layout/AppDashboard.vue';

const auth = useAuth().getUser;
const users = {
  avatar: auth.user_metadata,
  fullname: auth.user_metadata.fullname,
  github: auth.user_metadata.github,
  twitter: auth.user_metadata.twitter,
  website: auth.user_metadata.website,
  joined: auth.created_at,
};

</script>

<template>
  <app-dashboard>
    <div class="relative w-full my-10 bg-dark-color rounded-md p-8">
      <div class="flex justify-center">
        <img class="absolute -top-8 w-20 h-20 md:w-24 md:h-24 rounded-md" src="https://avatars.githubusercontent.com/u/43521754?v=4" alt="User profile">
      </div>
      <div class="flex justify-center md:justify-end mt-8 mb-3 md:mt-0 md:mb-3">
        <router-link :to="{ name: 'basic' }" class="text-white bg-red-color rounded-sm px-4 py-2 hover:opacity-90 transition">Edit Profile</router-link>
      </div>
      <div class="flex flex-col items-center">
        <h1 class="text-white font-semibold text-sm md:text-xl capitalize">{{ users.fullname }}</h1>
        <div class="flex gap-x-3 pt-2">
          <a v-if="users.github" :href="`https://www.github.com/${users.github}`" target="_blank" class="hover:scale-110 transition">
            <svg class="fill-blue-sky" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a v-if="users.twitter" :href="`https://www.twitter.com/${users.twitter}`" target="_blank" class="hover:scale-110 transition">
            <svg class="fill-blue-sky" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/></svg>
          </a>
          <a v-if="users.website" :href="`https://${users.website}`" target="_blank" class="hover:scale-110 transition">
            <svg class="fill-blue-sky" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/></svg>
          </a>
        </div>
        <svg class="fill-white mt-5 mb-1" width="30" height="30" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 9v-1.974h2v1.974h5v-4h2v4h5v-2h2v2h.755c1.803.091 3.243 1.646 3.243 3.519 0 .961-.382 1.829-.998 2.458v9.023h-22v-9.02c-.43-.438-.747-.993-.9-1.621-.067-.276-.1-.558-.1-.841 0-2.009 1.629-3.479 3.242-3.518h.758zm17 11h-18v2h18v-2zm-18-4.027v2.027h18v-2.027l-.407.025c-.775 0-1.541-.27-2.154-.79-.576.488-1.333.789-2.155.789-.812 0-1.566-.295-2.142-.779-.581.487-1.341.78-2.136.78-.807 0-1.575-.292-2.149-.78-.586.491-1.346.78-2.137.78-.775 0-1.526-.26-2.16-.79-.561.479-1.328.79-2.154.79l-.406-.025zm.29-4.973c-.627.049-1.243.635-1.288 1.421-.051.887.632 1.585 1.454 1.576 1.176-.014 1.915-.86 2.117-1.997.217.88.986 1.975 2.145 1.996 1.156.021 1.99-.959 2.161-1.958l.008-.038c.199 1.04.99 1.996 2.109 1.996 1.155 0 1.917-.872 2.172-1.996.248 1.138 1.035 1.994 2.117 1.997 1.108.003 1.955-.928 2.203-1.997.188.828.804 1.985 2.051 1.998.759.008 1.46-.65 1.46-1.483 0-.837-.649-1.481-1.318-1.517l-17.391.002zm.863-4.451c-1.897-.621-1.351-3.444.89-4.523.08 1.422 1.957 1.566 1.957 3.002 0 .602-.441 1.274-1.084 1.521.154-.509-.186-1.416-.88-1.809-.702.407-1.063 1.302-.883 1.809zm13.999-.026c-1.896-.621-1.35-3.444.891-4.523.08 1.422 1.957 1.566 1.957 3.002 0 .602-.441 1.274-1.084 1.521.153-.509-.186-1.416-.88-1.809-.702.407-1.063 1.302-.884 1.809zm-6.999-2c-1.897-.621-1.351-3.444.89-4.523.08 1.422 1.957 1.566 1.957 3.002 0 .602-.441 1.274-1.084 1.521.153-.509-.186-1.416-.88-1.809-.702.407-1.063 1.302-.883 1.809z"/></svg>
        <p class="text-white text-xs md:text-sm">Joined on {{ new Date(users.joined).toLocaleDateString('en', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'}) }}</p>
      </div>
    </div>
  </app-dashboard>
</template>