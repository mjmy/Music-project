<template>
  <div class="page-2">
    <div class="header">
      <h2>圖片編輯</h2>
    </div>
    <div class="canvas-box">
      <canvas
        id="canva"
        width="700"
        height="500"
        ref="canva"
        @mousemove="clacOriginalRectangle($event)"
        @mouseout="drawBackGround()"
      ></canvas>
      <div class="set-sider">
        <button class="uploader" @click="UpLoad()">
          <input type="file" id=""  accept="image/*"   ref="uploadFile"/>
          UpLoad
        </button>
        
        <button @click="downLoad()">Save</button>
        <button @click="setStatus = 0, filterStatus=''">放大檢視</button>
        <div class="select-box"  @click="setStatus = 1">
          <select v-model="filterStatus" >
            <option selected value>---请选择--</option>
            <option v-for="(item,key) in selectList" :key="key" :value="item.filter" >{{item.name}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  data() {
    return {
      setStatus: -1, //動作選擇
      filterStatus: "", //选择的滤镜处理数组
      imgData: 0,
      setImgScale: 0, //比例縮放
      canvaData: {
        context: "",
        centerPoint: {}, // 圖片被放大區域的中心點，也是放大鏡的中心點
        originalRadius: 50, // 圖片被放大區域的半徑
        originalRectangle: {}, // 圖片被放大區域
        scale: 2, // 放大倍數
        scaleGlassRectangle: 0 // 放大後區域
      },
      selectList: [
        { filter: 1, name: "灰色調" },
        { filter: 2, name: "黑白滤镜" },
        { filter: 3, name: "反向滤镜" },
        { filter: 4, name: "去色滤镜" },
        { filter: 5, name: "单色滤镜" }
      ],
      bufferImg:{}
    };
  },
  watch: {
    filterStatus(val){
      if(val !== ""){
        this.setStatus = 1;
        this.FilterEffect();
      }
    }
  },
  computed: {},
  mounted() {
    // this.imgData = new Image();
    // this.imgData.src = require("@/assets/img/medo.jpg");
    // this.imgData.onload = () => {
    //   if (this.setStatus == 0) {
    //     this.canvasStart(); //初始化
    //   }
    // };
  },
  methods: {
    UpLoad(){//上傳檔案
      this.$refs["uploadFile"].addEventListener('change', (e) => {
        // get file object
        let file = e.target.files[0];

        //使用 fileReade
        const reader = new FileReader();
        // 使用 readAsDataURL 將圖片轉成 Base64
        reader.readAsDataURL(file);

        let self = this;
        reader.onload = function (event) {
          self.imgData = new Image();
          self.imgData.src = event.target.result;
          
          self.imgData.onload = () => { 
            self.canvasStart(); //初始化
          };
        };
      });

    },
    downLoad(){//下載檔案
      let downImg = new Image();
      downImg.src = this.$refs["canva"].toDataURL();
      const dataURL = downImg.src;
      const link = document.createElement('a');
      link.download = 'save_img';
      link.href = dataURL;
      link.dispatchEvent(new MouseEvent('click'));//觸發事件
    },
    canvasStart() {
      var canvas = this.$refs["canva"];
      this.canvaData.context = canvas.getContext("2d");
      
      //比例縮放
      this.setImgScale = Math.min(    
        this.$refs["canva"].width / this.imgData.width,
        this.$refs["canva"].height / this.imgData.height
      );

      this.$refs["canva"].width = this.imgData.width * this.setImgScale;
      this.$refs["canva"].height = this.imgData.height * this.setImgScale;
      
      // this.drawBackGround();
      //drawImage() 方法在画布上绘制图像、画布或视频。
      //方法也能够绘制图像的某些部分，以及/或者增加或减少图像的尺寸。
      this.canvaData.context.drawImage(
        this.imgData,
        0,
        0,
        this.imgData.width * this.setImgScale,
        this.imgData.height * this.setImgScale
      );
    },
    drawBackGround() {
      //畫背景圖片
      if (this.setStatus == 0) {
        //清空
        this.canvaData.context.clearRect(
          0,
          0,
          this.$refs["canva"].width,
          this.$refs["canva"].height
        );

        //drawImage() 方法在画布上绘制图像、画布或视频。
        //方法也能够绘制图像的某些部分，以及/或者增加或减少图像的尺寸。
        this.canvaData.context.drawImage(
          this.imgData,
          0,
          0,
          this.imgData.width * this.setImgScale,
          this.imgData.height * this.setImgScale
        );
      }
     
    },
    clacOriginalRectangle(point) {

      //計算圖片被放大的區域的範圍
      if (this.setStatus == 0) {
        
      
      
      //轉換坐標
      var bbox = this.$refs["canva"].getBoundingClientRect(); //返回元素的大小及其相对于视口的位置
      point = { x: point.x - bbox.left, y: point.y - bbox.top };

      this.drawBackGround(); //重畫

      this.canvaData.originalRectangle.x =
        point.x - this.canvaData.originalRadius;
      this.canvaData.originalRectangle.y =
        point.y - this.canvaData.originalRadius;
      this.canvaData.originalRectangle.width =
        this.canvaData.originalRadius * 2;
      this.canvaData.originalRectangle.height =
        this.canvaData.originalRadius * 2;
      this.canvaData.centerPoint.x = point.x;
      this.canvaData.centerPoint.y = point.y;

      this.canvaData.context.save(); //保存当前环境的状态
      this.canvaData.context.beginPath(); //开始一条路径，或重置当前的路径
      this.canvaData.context.arc(
        this.canvaData.centerPoint.x,
        this.canvaData.centerPoint.y,
        this.canvaData.originalRadius,
        0,
        Math.PI * 2,
        false
      ); //创建弧/曲线
      this.canvaData.context.clip(); //原始画布剪切任意形状和尺寸的区域

      //計算放大鏡區域
      this.scaleGlassRectangle();

      // 繪製圖片
      this.draw();

      this.canvaData.context.restore();
      }
    },

    draw() {
      this.canvaData.context.drawImage(
        this.$refs["canva"],
        this.canvaData.originalRectangle.x,
        this.canvaData.originalRectangle.y,
        this.canvaData.originalRectangle.width,
        this.canvaData.originalRectangle.height,
        this.canvaData.scaleGlassRectangle.x,
        this.canvaData.scaleGlassRectangle.y,
        this.canvaData.scaleGlassRectangle.width,
        this.canvaData.scaleGlassRectangle.height
      );

      //繪製放大邊緣
      this.canvaData.context.beginPath();
      //创建放射状/圆形渐变对象
      var gradient = this.canvaData.context.createRadialGradient(
        this.canvaData.centerPoint.x,
        this.canvaData.centerPoint.y,
        this.canvaData.originalRadius - 5,
        this.canvaData.centerPoint.x,
        this.canvaData.centerPoint.y,
        this.canvaData.originalRadius
      );
      //方法规定 gradient 对象中的颜色和位置
      gradient.addColorStop(0, "rgba(0,0,0,0.2)");
      gradient.addColorStop(0.8, "silver");
      gradient.addColorStop(0.9, "silver");
      gradient.addColorStop(1.0, "rgba(150,150,150,0.9)");
      // 属性设置用于笔触的颜色、渐变或模式
      this.canvaData.context.strokeStyle = gradient;
      this.canvaData.context.lineWidth = 5; //设置当前的线条宽度
      this.canvaData.context.arc(
        this.canvaData.centerPoint.x,
        this.canvaData.centerPoint.y,
        this.canvaData.originalRadius,
        0,
        Math.PI * 2,
        false
      );
      this.canvaData.context.stroke(); //绘制已定义的路径
    },
    scaleGlassRectangle() {
      this.canvaData.scaleGlassRectangle = {
        x:
          this.canvaData.centerPoint.x -
          (this.canvaData.originalRectangle.width * this.canvaData.scale) / 2,
        y:
          this.canvaData.centerPoint.y -
          (this.canvaData.originalRectangle.height * this.canvaData.scale) / 2,
        width: this.canvaData.originalRectangle.width * this.canvaData.scale,
        height: this.canvaData.originalRectangle.height * this.canvaData.scale
      };
    },
    async FilterEffect() {

      this.bufferImg = {}
      this.canvaData.context.drawImage(
        this.imgData,
        0,
        0,
        this.imgData.width * this.setImgScale,
        this.imgData.height * this.setImgScale
      );
    
      this.bufferImg = await Object.assign({}, this.canvaData);
      
      //濾鏡效果
      //getPixels
      
      let pixeis = await this.getPixels();
      await this.chooseFilter(pixeis.data, this.bufferImg.context, pixeis); // 根据选择的滤镜处理数组
      this.bufferImg.context.putImageData(pixeis, 0, 0); // 将处理的原图像的数据绘制到新图像的 canvas 中
     
      
    },
    getPixels() {
      return new Promise(resolve => {
        // do something...
        resolve(
          this.bufferImg.context.getImageData(
            0,
            0,
            this.$refs["canva"].width,
            this.$refs["canva"].height
          )
        );
      });
    },
    chooseFilter(data, context, pixeis) {
      //选择的滤镜处理数组
      //灰度滤镜 , 取三种颜色的平均值
      if (this.filterStatus == 1) {
        for (var i = 0; i < data.length; i += 4) {
          var grey = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = grey;
        }
      } else if (this.filterStatus == 2) {
        // 黑白滤镜
        for (var i = 0; i < data.length; i += 4) {
          var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg >= 100 ? 255 : 0;
        }
      } else if (this.filterStatus == 3) {
        // 反向滤镜
        for (var i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
      } else if (this.filterStatus == 4) {
        // 去色
        for (var i = 0; i < data.length; i++) {
          var avg = Math.floor(
            (Math.min(data[i], data[i + 1], data[i + 2]) +
              Math.max(data[i], data[i + 1], data[i + 2])) /
              2
          );
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
      } else if (this.filterStatus == 5) {
        // 单色滤镜
        for (var i = 0; i < canvas.height * canvas.width; i++) {
          data[i * 4 + 2] = 0;
          data[i * 4 + 1] = 0;
        }
      }
      
    }
    
  }
};
</script>

<style lang="less" scoped>
// .page-2 {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: flex-start; //主軸的對齊方式
//   flex-direction: column;
//   .header {
//     position: relative;
//     width: 100%;
//     height: 100px;
//     text-align: center;
//     top: 8%;
//     h2 {
//       height: 100%;
//       line-height: 4;
//     }
//   }
//   .canvas-box {
//     position: relative;
//     top: 10%;
//     margin: 0 10%;
//     display: flex;
//     // width: 80%;
//     box-sizing: border-box;
//     #canva {
//       border: 1px solid #ffffff;
//       background-color: #cac2c2e6;
//     }
//     .set-sider {
//       text-align: center;
//       border: 1px solid #57577347;
//       width: 200px;
//       margin-left: 3rem;
//       button,div{
//         margin: 5px;
//       }
//       button{
//         border-radius: 10px;
//         position: relative;
//         width: 100%;
//         transform: rotateY(30deg);
//         padding: 4px 10px;
//       }
//       .uploader{
//           position: relative;
//           display: inline-block;
//           // // background: #D0EEFF;
//           border: 1px solid #99D3F5;
//           overflow: hidden;
//           // color: #1E88C7;
//           text-decoration: none;
//           text-indent: 0;
//           // line-height: 20px;
          
//         }
//         .uploader input {
//             position: absolute;
//             font-size: 100px;
//             right: 0;
//             top: 0;
//             opacity: 0;
//         }
//         button:hover {
//             // background: #AADFFD;
//             // border-color: #78C3F3;
//             color: #004974;
//             text-decoration: none;
//         }
//       .select-box {
//         select {
//           /*将默认的select选择框样式清除*/
//           appearance: none;
//           -moz-appearance: none;
//           -webkit-appearance: none;
//           /*在选择框的最右侧中间显示小箭头图片*/
//            background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
//               linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
//           background-repeat: no-repeat, repeat;
//           background-position: right .7em top 50%, 0 0;
//           background-size: .65em auto, 100%;

//           padding-right: 14px;
//           position: relative;
//           width: 100%;
//           border: 1px solid #ffff;
//           border-radius: 10px;
//           padding-left: 30%;
//           transform: rotateY(30deg);
//         }
//         select option{
//           background: #00000038;
//         }
//       }
//     }
//   }
// }
</style>