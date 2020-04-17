<template>
  <div class="page">
    <div class="center">
        <div  class="img-sider">
            <label v-for="n in 4" :key="n" @click="changeImg(n)"><img :class="{'change-1': change==n}" :src="require(`@/assets/img/event${n}.jpg`)" /></label>
        </div>
      <div class="img-card" :class="`img-card-${change}`">
         <img v-for="n in 4" :key="n" :src="require(`@/assets/img/event${n}.jpg`)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      change:1
    }
  },
  methods:{
    changeImg(status){
      this.change = status;
    }
  }
};
</script>

<style lang="less" scoped>
// .page {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   text-align: center;
//   justify-content: center; //主軸的對齊方式
//   .center {
//     position: relative;
//     width: 750px;
//     perspective: 1200px; //透視
//     .img-card {
//       position: relative;
//       width: 400px;
//       height: 350px;
//       // overflow: hidden;
//       transform-style: preserve-3d; //決定了元素的子元素是在 3D 空間中展開，還是在 2D 平面中展開
//       transition: transform .5s ease-in;
//       img {
//         position: absolute; //跳脫
//         height: 100%;
//         width: 100%;
//         object-fit: cover; //控制置換元素的內容填入的位置及大小 填滿元素的寬度及高度(維持原比例)，通常會剪掉部分的物件。
//       }
//     }
//     .img-card:nth-child(1){
//       margin-top: 0px;
//     }
//     .img-card img:nth-child(1) {
//       transform: rotateX(-270deg) translateY(-175px); //X翻轉-270度 向Y篇移-175px
//       transform-origin: top left; //物件的起始點
//     }
//     .img-card img:nth-child(2) {
//       transform: translateZ(175px);
//       // opacity: 0;
//     }
//     .img-card img:nth-child(3) {
//       transform: rotateX(-90deg) translateY(175px);
//       transform-origin: bottom center;
//     }
//     .img-card img:nth-child(4) {
//       transform: rotateX(-180deg) translateY(350px) translateZ(175px);
//       transform-origin: bottom center;
//     }
//     .img-card-1 {
//       transform: rotateX(-90deg);
//     }
//     .img-card-2 {
//       transform: rotateX(0deg);
//     }
//     .img-card-3 {
//       transform: rotateX(90deg);
//     }
//     .img-card-4 {
//       transform: rotateX(180deg);
//     }
//     .img-sider{
//       position: absolute;
//       display: block;
//       right: 0;
//       top:-30px;
//       label{
//         height: 100px;
//         width: 100px;
//         display: flex;
//         overflow: hidden;
//         cursor: pointer;
//         margin: 6px 0;
//         border: 1px solid rgba(255, 255, 255, .1);
//         img{
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           filter: grayscale(1);//濾鏡效果 - grayscale灰階,sepia懷舊,saturate飽和,hue-rotate色相旋轉,invert負片,opacity不透明,brightness亮度,contrast對比,blur模糊,drop-shadow下拉陰影
//           opacity: .9;
//         }
//         img:hover,
//         .change-1,.change-2,.change-3,.change-4{
//           filter: grayscale(0);
//           opacity: 1;
//         }
//       }

//     }

//   }
  
// }
</style>