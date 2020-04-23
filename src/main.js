import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import {apiCall} from './mixn/apiCall'
import VueYoutube from 'vue-youtube'

 
Vue.use(VueYoutube)

Vue.config.productionTip = false

Vue.prototype.$http = axios;

Vue.mixin(apiCall)
 new Vue({
  router:router,
  store,
  render: h => h(App),
  data(){
    return{
      
    }
  },
  created(){
    // document.body.className = "theme_default";
    if(process.env.VUE_APP_STYLE == "B"){
      document.body.className = "theme_darkgreen";
    }else{
      document.body.className = "theme_default";
    }


    store.commit('addRoute');

  }
}).$mount('#app')

router.beforeEach((to, from, next) => {
  
  next();
});

import './assets/css/pubic.css'
import '@/assets/css/theme.less'//引入css