export default [
    {
      path:'/main',
      nam:'Main',
      redirect:'/main/home',
      component:() => import ('../views/Main.vue'),
      children:[
        {
          path:"home",
          name:"home",
          component: () => import ('../views/mHome.vue'),
        },
        {
          path:"list",
          name:"list",
          component: () => import ('../components/music/FavoriteList.vue'),
        },
      ]
    },
  ]