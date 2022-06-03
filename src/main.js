import {
  createApp
} from 'vue'
import App from './App.vue';
import router from './router';
import {
  createPinia
} from 'pinia';
import './assets/css/main.css';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { useAuth } from './stores/auth';
import { supabase } from './supabase/init';

import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseError from './components/ui/BaseError.vue';
import BaseInput from './components/ui/forms/BaseInput.vue';
import BaseNotification from './components/ui/BaseNotification.vue';
import BaseSearch from './components/ui/BaseSearch.vue';
import BaseSelect from './components/ui/forms/BaseSelect.vue';
import BaseTheme from './components/ui/BaseTheme.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(CKEditor);

app
  .component('BaseButton', BaseButton)
  .component('BaseCard', BaseCard)
  .component('BaseError', BaseError)
  .component('BaseInput', BaseInput)
  .component('BaseNotification', BaseNotification)
  .component('BaseSearch', BaseSearch)
  .component('BaseSelect', BaseSelect)
  .component('BaseTheme', BaseTheme);

const auth = useAuth();
auth.user = supabase.auth.user();

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    auth.user = session.user;
  }
  if (event == 'SIGNED_OUT') auth.user = {};
});

app.mount('#app');