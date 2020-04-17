export default [
    {
      path:'/main',
      nam:'Main',
      // redirect:'/main/page1',
      component:() => import ('../views/Main.vue'),
      children:[
        {
          path:"page1",
          name:"page1",
          component: () => import ('../components/event1.vue')
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