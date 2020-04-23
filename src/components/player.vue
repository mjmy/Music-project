<template>
    <div class="play-box" v-if="videoId!='' || playerVars.list != ''">
        <youtube class="youtub"  width="200" height="100" :video-id="videoId" :player-vars="playerVars" @playing="playing" @ready="onReady" @ended="onEnded"  ref="youtube"></youtube>
        <div class="info">
          <span  v-if="info.data.length != 0"><em ref="marquee">{{info.data.title}}</em></span>
          <div >{{info.currentTime }} / {{info.totalTime}}</div>
        </div>
        <div class="play-controls">
          <div class="play-btn" @click="previousVideo">
            <span class="prev-1"></span>
            <span class="prev-2"></span>
          </div>
          <div class="play-btn" @click="play_paused">
            <span class="b1" :class="{'paused':controlStatus==false}"></span>
            <span class="b2" :class="{'playing':controlStatus==true}"></span>
          </div>
          <div class="play-btn" @click="nextVideo">
            <span class="next-1"></span>
            <span class="next-2"></span>
          </div>
          <div class="volume-box">
            <h2>vol</h2>
            <span class="vol">
              <input class="volume" type="range" min="0" max="100" step="1" v-model="volume" >
            </span>
           
          </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"",
    data() {
    return {
      videoId: '',
      playerVars: {
        autoplay: 0,
        controls:0,
        showinfo:0,
        rel:0,
        modestbranding:1,
        listType:'playlist',//playlist
        list: '',
        iv_load_policy:3,
        enablejsapi:1
      },
      info:{
        data:[],
        currentTime: "00 : 00",
        totalTime :"00 : 00"
      },
      controlStatus:false, //0 :onPaused 1:onPlay
      volume:100,
      marquee:{}
    }
  },
  watch:{
    getList(val){

      if(val[0]==0){
        this.videoId = val[1];
        // this.playerVars.listType = "search"
        this.playerVars.autoplay = 1
      }
      if(val[0]==1){
        
        this.videoId = "";
        this.playerVars.listType = "playlist"
        this.playerVars.list = val[1];
        this.$nextTick(()=>{
          this.$refs.youtube.player.cuePlaylist({
            listType:'playlist',//playlist
            list:  this.playerVars.list,
            index:0,
          })
          this.nextVideo()
        })
        
      }
      this.controlStatus = true;

    },
    volume(vol){
      if(this.player!=undefined){
         this.player.setVolume(vol);
      }
     
    }
  },
  computed:{
      getList(){
        this.controlStatus = false;
        if(this.$store.state.voideID != ''){
          return [0,this.$store.state.voideID];
        }
        if(this.$store.state.playList != ''){
          return [1,this.$store.state.playList];
        }
        
      },
      player() {
        return this.$refs.youtube.player;
      },

  },
  mounted(){

  },
  updated(){

  },
  forceUpdate(){
    
  },
  methods: {

    onReady(event){
      let infoId =  this.videoId;
      this.controlStatus = true;
      this.player.playVideo()
    },
    onEnded(event){
      this.controlStatus = false;
    },
    play_paused(){
      if(this.controlStatus){
        this.controlStatus = false;
        this.player.pauseVideo();
      }else{
        this.controlStatus = true;
        this.player.playVideo();
      }
    },
    nextVideo(){
      this.player.nextVideo()
    },
    previousVideo(){
      this.player.previousVideo()
    },
    playing(even) {
      this.info.data = even.playerInfo.videoData;
      // this.$set(this.info,"currentTime",'00 : 00')
      //playing time
      this.player.getDuration().then((val)=>{
        let num = parseInt(val);
        let m = parseInt(num/60).toString();
        let s =  parseInt(val%60).toString()
        m = m<10 ? `0${m}` : m;
        s = s<10 ? `0${s}` : s;
       this.info.totalTime = `${m} : ${s}`;
      })
      setInterval(() => {
        this.$refs.youtube.player.getCurrentTime().then((val)=>{
          let m = parseInt(val/60).toString();
          let s = parseInt(val%60).toString()

          m = m<10 ? `0${m}` : m;
          s = s<10 ? `0${s}` : s;
          this.info.currentTime =  `${m} : ${s}`
        })
      }, 1000);

      //play soung name marquee
      setTimeout(()=>{this.setMarquee();},1000)
      

    },
    setMarquee(){
      clearInterval(this.marquee)
      this.$nextTick(()=>{
        let eW = this.$refs['marquee'].offsetWidth;
        let offset = 0;
        this.marquee = setInterval(()=>{
          if(this.$refs['marquee'] == undefined){
            clearInterval(this.marquee)
          }
          offset -= 1; 
          this.$refs['marquee'].style.left = `${offset}px`;
          if((eW+offset) == 0){
            offset = eW;
          }
        
        },30)
        
      })
      
    }
  }
}
</script>
<style lang="less" scoped>
.play-box{
    position: sticky;
    bottom: 0;
    width: 100%;
    text-align: left;
    display: flex;
    background: #40484c;
    z-index: 50;
    background: linear-gradient(0deg, #40484c, #191919, #40484c);
    .youtub{    pointer-events: none;}
    .info{
      width: 500px;
      color: #fff;
      max-width: 30%;
      min-width: 30%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 1rem;
      span{
        width: 180px;
        max-width: 180px;
        overflow: hidden;
        border-radius: 100%;
        line-height: 25px;
        em{
          white-space: nowrap;
          position: relative;
          width: 100%;
          // animation-name:name;
          // animation-duration:20s;
          // animation-iteration-count:infinite ;
          // animation-timing-function:initial;
        }
        // @keyframes name {
        //   from {
        //     left: 180px;
        //   }
        //   to {
        //     left: -280px;
        //   }
        // }
      }

    }
    .play-controls{
        width: 30%;
        display: flex;
        justify-content: space-evenly;
        position: relative;
        height: min-content;
        top: 1.5rem;
        .play-btn{
            width: 50px;
            height: 50px;
            display: flex;
            border-radius: 50%;
            border: 1px solid #667e84;
            box-shadow: 8px 4px 20px 0px;
            background: linear-gradient(-10deg, #4985a085, #04233175);
            .b1,.b2,.prev-1,.prev-2,.next-1,.next-2{
              position: absolute;
              top: 0%;
              width: inherit;
              height: inherit;
              display: flex;
              
            }
            .prev-1::after,.prev-1::before,.prev-2::after,.prev-2::before,
            .next-1::after,.next-1::before,.next-2::after,.next-2::before{
              position: relative;
              border: 1px solid #ffff;
              height: 20px;
            }
           
            .next-1::after,.prev-1::after{
              content: "";
              top: 30%;
              left: 60%;
            }
            .next-1::before,.prev-1::before{
              content: "";
              top: 30%;
              left: 25%;
            }
            .prev-2::after{
              content: "";
              top: 30%;
              left: 45%;
              transform: rotate(-60deg) translateX(-5px);
            }
            .prev-2::before{
                content: "";
                top: 30%;
                left: 50%;
                transform: rotate(60deg) translateX(-5px);
            }
            .next-2::after{
                content: "";
                top: 30%;
                left: 45%;
                -webkit-transform: rotate(-60deg) translateX(-5px);
                transform: rotate(-120deg) translateX(-3px)translateY(-5px);
            }
            .next-2::before{
                content: "";
                top: 30%;
                left: 50%;
                -webkit-transform: rotate(60deg) translateX(-5px);
                transform: rotate(120deg) translateX(-3px)translateY(5px);
            }

            .b1::after,.b1::before,.b2::after,.b2::before{
              position: relative;
              border: 1px solid #ffff;
              height: 20px;
              display: block;
              transition: all .5s ease-in;
            }
            .b1::after{
              content: "";
              top: 30%;
              left: 30%;
              transform: rotate(60deg) translateY(-45px) translateX(8px);
              opacity: 0;
            }
            .b1::before{
              content: "";
              top: 30%;
              left: 60%;
              transform:rotate(-60deg) translateY(-40px) translateX(2px);
              opacity: 0;
            }
            .b2::after{
              content: "";
              top: 23%;
              left: 60%;
              // transform: translateY(40px);
              opacity: 0;
            }
            .b2::before{
              content: "";
              top: 30%;
              left: 30%;
            }
            .playing,.playing::after{
              transform: translateY(0px);
              opacity: 1;
            }
            .paused::after{
              transform:rotate(60deg) translateY(-5px) translateX(8px);
              opacity: 1;
            }
            .paused::before{
              transform: rotate(-60deg) translateY(-8px) translateX(2px);
              opacity: 1;
            }
        }
      .volume-box{
          display: inline-flex;
          align-items: center;
          position: relative;
        h2{
          background: linear-gradient(-10deg, #4985a085, #04233175);
          border-radius: 20%;
          padding: .1rem .3rem;
          color: #ffff;

        }
        .vol{
          position: relative;
          left: 5px;
          top: 0px;
          width:80px;
          overflow: hidden;
          opacity: 0;
          transition: al 1s ease-in;
        }
       
        .volume{
          width: 100%;
        }
        input[type="range"]{
          -webkit-appearance: none;
           border-radius: 10px;
        }
        input[type="range"]::-webkit-slider-thumb{
          -webkit-appearance: none;
          height: 15px;
          width: 15px;
          margin-top: -2px; /*使滑块超出轨道部分的偏移量相等*/
          background: #ffffff; 
          border-radius: 50%; /*外观设置为圆形*/
          border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
          box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
        }
        input[type=range]::-webkit-slider-runnable-track {
          height: 10px;
          border-radius: 10px; 
          box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; 
        }
        
      }
      .volume-box:hover{
        .vol{  opacity: 1;}
       
      }
    }
}
</style>