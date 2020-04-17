<template>
  <div>
    <label class="MenuButton" :class="{'MenuButton-s':this.siderbar}" @click="siderbarStatus">
      <span></span>
    </label>
    <!-- <div class="select-style-box">
      <select v-model="style_status">
        <option :value="0">A-Style</option>
        <option :value="1">B-Style</option>
      </select>
    </div> -->

    <div class="sidrbar" :class="{'sidrbar-s':this.siderbar}">
      <span class="cancel" @click="siderbarStatus"></span>
      <header>My APP</header>
      <ul>
        <!-- <li>
          <a href="#">
            <i @click="goTOPage('event1')">Event 1</i>
          </a>
        </li>
        <li>
          <a href="#">
            <i @click="goTOPage('event2')">Event 2</i>
          </a>
        </li>
        <li>
          <a href="#">
            <i >Event 3</i>
          </a>
        </li>
        <li>
          <a href="#">
            <i >Event 4</i>
          </a>
        </li>
        <li>
          <a href="#">
            <i >Event 5</i>
          </a>
        </li> -->
        <!-- <li v-for="(item,index) in this.$router.options.routes['1'].children" :key="index" @click="goTOPage(item.path)">
          <a href="#">
            <i >{{item.name}}</i>
          </a>
        </li> -->
        <router-link  tag="li" :to="`/main/${item.path}`" v-for="(item,index) in this.$router.options.routes['1'].children" :key="index">
          <a href="#">
            <i >{{item.name}}</i>
          </a></router-link>
      </ul>
    </div>
    <div class="bg" :class="{'bg-img':BGstyle == 0,'bg-music':BGstyle == 1,'bg-s':this.siderbar}">
      <router-view>
      </router-view>
      
    </div>
    

    
  </div>
</template>

<script>

export default {
  // name: "Main",
  data() {
    return {
      siderbar:false,
      style_status:0
    };
  },
  
  beforeRouteUpdate (to, from, next) {
    this.siderbar = false;
    next();
  },
  watch:{
    style_status(val){
      if(val == 0){
        document.body.className = "theme_default";
      }
      if(val == 1){
        document.body.className = "theme_darkgreen";
      }
    }
  },
  computed:{
    BGstyle(){
      if(this.$store.state.lock == 'music'){
        return 1;
      }
      return 0;
    }
  },
  created(){
    
  },
  mounted(){
    // console.log(this.$router)

  },
  methods:{
    siderbarStatus(){
      this.siderbar = !this.siderbar;
    },
    goTOPage(path){
      this.siderbar = false;

      this.$router.push(`/main/${path}`);
    }
  }
};
</script>

<style lang="less" scoped>

// .sidrbar{
//     position: fixed;
//     left: -250px;
//     width: 250px;
//     height: 100%;
//     background-color: #042331;
//     transition: all 1s ease;
//     header{
//         font-size: 22px;
//         color: white;
//         text-align: center;
//         line-height: 70px;
//         background-color: #063146;
//         user-select: none;//控制用户能否选中文本
//     }
//     ul a{
//         display: block;
//         width: 100%;
//         height: 100%;
//         line-height: 65px;
//         font-size: 20px;
//         color: white;
//         padding-left: 40px;
//         box-sizing: border-box;
//         border-top: 1px solid rgba(255, 255, 255, .1);
//         border-bottom: 1px solid black;
//     }
//     ul li:hover a{
//         padding-left: 50px;
//     }
//     .cancel{
//       position: absolute;
//       top:20px;
//       right: 15px;
//       width: 35px;
//       height: 35px;
//       background: #042331;
//       color: #0a5278;
//       box-sizing: border-box;
//       border-radius: 4px;
//       cursor: pointer;
//     }
//     .cancel:before,.cancel:after{
//       content: "";
//       position: absolute;
//       width: 24px;
//       top: 13px;
//       left: 2px;
//       border: 2px solid;
//       display: block;
     
//     }
//     .cancel:before{
//       transform: rotate(45deg);
//     }
//     .cancel:after{
//       transform: rotate(-45deg);
//     }

// }
// .MenuButton{
//   position: absolute;
//   left: 40px;
//   top: 40px;
//   padding: 10px;
//   width: 50px;
//   height: 45px;
//   display: block;
//   background-color: #042331;
//   box-sizing: border-box;
//   border-radius: 5px;
//   opacity: 1;
//   transition: all 1s ease;
//   cursor: pointer;
// }
// .MenuButton > span, .MenuButton > span:before, .MenuButton > span:after{
//   width: 30px;
//   height: 5px;
//   background-color: white;
//   display: inline-block;
// }
// .MenuButton > span:before, .MenuButton > span:after{
//   content: '';
//   position: absolute;
// }

// .MenuButton >  span:before{
//   margin-top: 10px;
// }

// .MenuButton >  span:after{
//   margin-top: -10px;
// }


// .sidrbar-s{
//   left: 0px;
// }

// .MenuButton-s{
//   left: 250px;
//   opacity: 0;
//   pointer-events: none;
// }
// .bg{
//   background-image: url('../assets/img/bg.jpg');
//   background-repeat: no-repeat;//	背景圖片不重覆出現，也就是只出現一次
//   background-position: center;//背景圖片水平位置與垂直位置均置中對齊
//   background-size: cover;
//   height: 100vh;
//   transition: all 1s ease;
// }
// .bg-s{
//   margin-left: 250px;
// }
</style>