import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Event1 from '../components/event1.vue'
import Main from '../views/Main.vue'
import mHome from "../views/mHome.vue";
Vue.use(VueRouter)

const baseRoutes = [
  {
    path: '/',
    // name: 'Home',
    // component: Home,
    redirect: '/main',
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // {
  //   path:'/main',
  //   nam:'Main',
  //   // redirect:'/main/page1',
  //   component:Main,
  //   children:[
      // {
      //   path:"page1",
      //   name:"page1",
      //   component: Event1
      // },
      // {
      //   path:"page2",
      //   name:"Canvas",
      //   component: () => import ( '../components/event2.vue')
      // },
      // {
      //   path:"page3",
      //   name:"animation",
      //   component: () => import ( '../components/event3.vue')
      // }
    // ]
  // }
  
]

const testRoute = [
  {
    path:'/main',
    nam:'Main',
    // redirect:'/main/page1',
    component:Main,
    children:[
      {
        path:"page1",
        name:"page1",
        component: Event1
      },
      {
        path:"page2",
        name:"Canvas",
        component: () => import ( '../components/event2.vue')
      },
      {
        path:"page3",
        name:"animation",
        component: () => import ( '../components/event3.vue')
      }
    ]
  },
]

const musicRoute = [
  {
    path:'/main',
    nam:'Main',
    // redirect:'/main/page1',
    component:Main,
    children:[
      {
        path:"home",
        name:"home",
        component: mHome
      },
    ]
  },
]




const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes:baseRoutes
})

export default router
