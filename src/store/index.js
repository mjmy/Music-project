import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import testRoute  from "../router/testRoute.js";
import musicRoute  from "../router/musicRoute.js";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lock:'music',
    // KEY:"AIzaSyAqN6VL6KOTl6A-RbgGN3YRP7NQIGKYqCk",
    KEY:"AIzaSyBmt8Sp_evZZn_g5rfzYQ3AIy-2EpODGVA",
    API:{
      'Youtube':"https://www.googleapis.com/youtube/v3/"
    },
    voideID:"",
    playList:"",
    playListItem:[],
    favoriteList:[],
    route:{
      testRoute,musicRoute
    }
  },
  mutations: {
    addRoute:state=>{
      console.log()
      let child = [];
      if(state.lock == 'music'){
        child = state.route.musicRoute;
      }else{
        child = state.route.testRoute;
      }
       
      const newRouter = router.options.routes.concat(child);
      router.options.routes = newRouter
      router.addRoutes(newRouter)
    },
    addPlay:(state,data)=>{
      // state.playList = '';
      state.playListItem = [];
      state.playListItem.push(data[1]);
      state.voideID = data[0];
    },
    addList:(state,data)=>{

      state.voideID = '';
      state.playListItem = [];
      for(let i in data.items){
        state.playListItem.push(data.items[i]['snippet']['title']);
      }
      state.playList = data.playlistId;
    },
    addMuicToList:(state,data)=>{
      state.favoriteList.push({title:data.title,id:data.id})  
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    getVoideID: function (state) {
      return state.voideID
    },

  }
})
