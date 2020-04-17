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
          children:[
            
          ]
        },
      ]
    },
  ]