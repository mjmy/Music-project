<template>
  <div class="page">
    <div class="head-box" v-if="headerInfo">
      <div class="item-1" v-if="information_Data['icon']!== undefined">
        <img :src="information_Data['icon']['default']['url']" />
      </div>
      <div class="item-2" v-if="information_Data['localizations']!== undefined">
        <p>{{information_Data['localizations']['description']}}</p>
      </div>
    </div>
    <div class="search-box" v-if="headerInfo==false">
      <input type="text" v-model="searchData.searchKey"/>
      <button @click="getSearchList">Search</button>
    </div>
    <div class="list-body" :class="{'minHigth':searchData.list.length == 0}">
      <div class="list-item" v-for="(item , key ) in playlist" :key="key" :class="{'outwin':listStatus}" ref="dataList" >
        <div class="item-title" @click="playMusicList(item)">
          <span>{{item.title}}</span>
        </div>
        <div class="list-item-btn-p" @click="next(key,0)"><</div>
        <ul class="item-box" ref="listItem" v-if="item.items.length != 0">
          <li v-for="(items , keys ) in item.items" :key="keys">
            <div class="item" @click="playMusic(items.contentDetails.videoId)">
              <img :src="items.snippet.thumbnails.medium.url" />
              <div class="play"></div>
            </div>
            <span>{{items.snippet.title}}</span>
          </li>
        </ul>
        <ul class="not-item-box " v-else>
          <li   :class="'flexl'+n" v-for=" n in 3" :key="n">
            <div class="not-item" >
              <img src="" />
              <div class="not-play"></div>
            </div>
            <span></span>
          </li>
        </ul>
        <div class="list-item-btn-n" @click="next(key,1)">></div>
      </div>
      <div class="searchItem" v-if="listStatus">

        <div calss="search-list" v-for="(items , keys ) in searchData.list" :key="keys">

          <img :src="items.snippet.thumbnails.medium.url"  @click="playMusic(items.id.videoId)"/>
          <div >
            <span class="title" style="font-size: 18px;font-family: DFKai-sb;"  @click="playMusic(items.id.videoId)">{{items.snippet.title}}</span>
            <span>{{items.snippet.publishedAt | getTime}}</span>
            <span style="font-size: 13px;">{{items.snippet.description}}</span>
          </div>

        </div>

      </div>
    </div>

    <!-- music player -->
    <player class="player-box"></player>
  </div>
</template>
<script>
import player from "../components/player.vue";
export default {
  data() {
    return {
      playlist: [
        {
          title: "熱門曲目 - 台灣",
          playlistId: "PLFgquLnL59amN9tYr7o2a60yFUfzQO3sU",
          items: []
        },
        {
          title: "最新影片 - 音樂",
          playlistId: "PLFgquLnL59alOwE-wZfEygqgABT2yRD9V",
          items: []
        },
        {
          title: "熱門曲目 - 韓語流行樂",
          playlistId: "PLTDluH66q5mpm-Bsq3GlwjMOHITt2bwXE",
          items: []
        }
      ],
      searchData:{
        searchKey:'',
        list:[]
      },
      listStatus:false,//0:playlist,1:search
      information_Data: {},
      headerInfo: true,
    };
  },
  components: {
    player
  },
  filters:{
    getTime(val){
      let now = new Date();
      let today = now.getFullYear()+"-"+(now.getMonth()+1) + "-"+ now.getDate();
      let date = val.match(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/g);
      let cunt = Math.abs(new Date(today) - new Date(date))/(1000*60*60*24)
      cunt = parseInt(cunt)
      let text = "";
      if(cunt==0){
        text =`更新時間 : 今天`;
      }
      else if(cunt<=29){
         text =`更新時間 : ${cunt}天前`;
      }
      else if(cunt==30 || cunt==31){
        text =`更新時間 : 1個月前`;
      }
      else if(cunt==181){
        text =`更新時間 : 半個月前`;
      }
      else if(cunt>181){
        text =`更新時間 : ${parseInt(Math.abs(cunt/365))}年前`
      }

      return text;
    }
  },
  computed: {
    
  },
  mounted() {

    this.getList();
    setTimeout(() => {
      this.headerInfo = false;
    }, 2000);
  },
  updated() {},
  methods: {
    setoutPlaylist(){
      this.listStatus = true;
      setTimeout(() => {
        for(let i in this.$refs["dataList"]){
          this.$refs["dataList"][i].style.display = 'none';
        }
        
      }, 1000);
    },
    getSearchList(){
      this.setoutPlaylist()
      this.searchData.list = [];
      let playload = {
        key: this.$store.state.KEY,
        q:this.searchData.searchKey,
        type:"video",
        order:"relevance",
        maxResults:50,
        part: "snippet",
        regionCode:"TW",
        relevanceLanguage:"zh-Hant"
      };
      this.$_ajaxGet(
        this.$store.state.API.Youtube,
        "search",
        playload,
        res => {

          this.searchData.list = res.items
          this.searchData.nextPage = res.nextPageToken
        }
      );
    },
    getList() {
      this.getChannel();
      // this.getPlaylist();
      // this.getPlaylistItems();
    },
    getChannel() {
      // return new Promise((resolve, reject)=>{
      let playload = {
        key: this.$store.state.KEY,
        id: "UC-9-kyTW8ZkZNDHQJ6FgpwQ",
        part: "snippet,contentDetails,statistics,localizations"
      };
      this.$_ajaxGet(
        this.$store.state.API.Youtube,
        "channels",
        playload,
        res => {
          this.information_Data.localizations =
            res.items[0]["localizations"]["zh-TW"];
          this.information_Data.icon = res.items[0]["snippet"]["thumbnails"];
          this.information_Data.id = res.items[0]["id"];

          this.$set(this.information_Data);
          this.getPlaylistItems();
        }
      );
      // });
    },
    getPlaylist() {
      // return new Promise((resolve, reject)=>{
      let playload = {
        key: this.$store.state.KEY,
        channelId: this.information_Data.id,
        hl: "zh-TW",
        part: "snippet,contentDetails"
      };
      this.$_ajaxGet(
        this.$store.state.API.Youtube,
        "channelSections",
        playload,
        res => {
          this.information_Data.channelItems = res.items.filter(
            (item, index, array) => {
              if (item.snippet.type) {
                return item.snippet.type == "singlePlaylist";
              }
            }
          );
          this.getPlaylistItems();
          // resolve();
        }
      );
      // });
    },
    getPlaylistItems() {
      for (let i in this.playlist) {
        let playload = {
          key: this.$store.state.KEY,
          playlistId: this.playlist[i].playlistId,
          hl: "zh-TW",
          maxResults: 50,
          part: "snippet,contentDetails,status"
        };
        this.$_ajaxGet(
          this.$store.state.API.Youtube,
          "playlistItems",
          playload,
          res => {
            this.$set(this.playlist[i], "items", res.items);
          }
        );
      }
    },
    playMusic(item) {
      this.$store.commit("addPlay", item);
    },
    playMusicList(item) {
      this.$store.commit("addList", item.playlistId);
    },
    next(event, key) {
      if(this.$refs["listItem"] == undefined){return}
      let addCount = this.$refs["listItem"][event]["firstElementChild"][
        "clientWidth"
      ];
      if (key == 0) {
        //pro
        this.$refs["listItem"][event]["scrollLeft"] -= addCount * 2;
      } else {
        //next
        this.$refs["listItem"][event]["scrollLeft"] += addCount * 2;
      }
      this.btnNext(key, event);
    },
    btnNext(status, key) {
      //list-item-btn-p
      if (this.$refs["listItem"][key]["scrollLeft"] == 0) {
        this.$refs["dataList"][0]["childNodes"][1]["style"]["display"] = "none";
      } else {
        this.$refs["dataList"][0]["childNodes"][1]["style"]["display"] =
          "block";
      }
      //list-item-btn-n

      if (
        this.$refs["listItem"][key]["scrollLeft"] ==
        this.$refs["listItem"][key]["scrollWidth"] -
          this.$refs["listItem"][key]["clientWidth"]
      ) {
        this.$refs["dataList"][0]["childNodes"][3]["style"]["display"] = "none";
      } else {
        this.$refs["dataList"][0]["childNodes"][3]["style"]["display"] = "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  flex-direction: column;
  justify-content: flex-start !important;
  overflow: auto;
  .search-box {
    width: 900px;
    line-height: 100px;
    padding: 5px;
    background: #a5a5a514;
    max-width: -webkit-fill-available;
    input{
      background:none;  
      outline:none;  
      border:0px;
      width: 45%;
      color: #ffff;
      line-height: 30px;
      border-radius: 5px 0 0 5px;
      border: 1px solid #b5b5b5d1;
    }
    button{
      cursor: pointer;
      border: 0;
      background-color: #ffffff21;
      color: #fff;
      outline: none;
      border-radius: 0px 5px 5px 0px;
      line-height: 30px;
      padding: 3px 14px;
    }

  }
  .head-box {
    width: 900px;
    padding: 5px;
    background: beige;
    display: grid;
    grid-template-columns: 1fr 7fr;
    grid-column-gap: 10px;
    border-radius: 10px;

    transition: all 5s ease-in-out;
    div {
      background: #4042421f;
      height: 100px;
    }
    img {
      width: 100%;
      height: 100%;
    }
    p {
      line-height: 26px;
      text-align: left;
      padding: 8px;
    }
    .item-1 {
      border-radius: 30px;
      overflow: hidden;
    }
  }

  .list-body {
    width: 900px;
    .searchItem{
      width: 100%;
      div{
        display: flex;
        margin: 5px;
        background: #a9a4a40f;
        .title:hover{
          cursor: pointer;
          color: #da6767;
        }
        .title{
          margin-bottom: 1rem;
          color: #ffffff;
        }
        img{cursor: pointer;margin: 5px 0;}
        div{
          display: block;
          text-align: left;
          width: 100%;
          span{
            display: block;
            line-height: 35px;
            
            color: #aaa;
            margin: 0 10px;
          }
        }
      }
     
    }
    .list-item {
      position: relative;
      left: 0px;
      opacity: 1;
      transition: all 1s ease-in;

      ul {
        display: flex;
        overflow-x: auto;
        li {
          margin: 10px;
          span {
            width: 100%;
            display: block;
            line-height: 20px;
            color: white;
          }
          .item {
            position: relative;
          }
          .play {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #292727;
            opacity: 0;
            // display: none;
            transition: all 0.5s ease;
          }
          .item:hover .play {
            opacity: 0.8;
            cursor: pointer;
          }
          .play::before {
            content: "";
            display: block;
            width: 50px;
            height: 50px;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-25px, -25px);
            border: 1px solid;
            border-color: aliceblue;
            border-radius: 10px;
          }
          .play::after {
            content: "";
            display: inline-block;
            width: 0px;
            height: 0px;
            position: inherit;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-10px, -10px);
            transform: translate(-10px, -10px);
            border-top: 10px solid #ffffff00;
            border-bottom: 10px solid #ffffff00;
            border-left: 25px solid aliceblue;
            display: inline-block;
          }
            
        }
      }
      .list-item-btn-p {
        cursor: pointer;
        width: 35px;
        height: 35px;
        position: absolute;
        top: 50%;
        left: 0;
        z-index: 99;
        transform: translate(0px, -35px);
        color: #fffdfdad;
        font-family: fantasy; //字型
        line-height: 35px;
        font-size: 22px;
        background: #191919bf;
        border: 1px solid;
        border-color: #c1c1c161;
        border-radius: 25px;
        display: none;
      }
      .list-item-btn-n {
        cursor: pointer;
        color: #fffdfdad;
        font-family: fantasy; //字型
        width: 35px;
        height: 35px;
        line-height: 35px;
        font-size: 22px;
        background: #191919bf;
        border: 1px solid;
        border-color: #c1c1c161;
        border-radius: 25px;
        position: absolute;
        top: 50%;
        right: 0;
        z-index: 20;
        transform: translate(20px, -35px);
      }
      .item-title {
        color: #fff;
        text-align: left;
        margin: 1rem;
        span:hover {
          cursor: pointer;
        }
      }
      /*-------滾動條整體樣式----*/
      .item-box::-webkit-scrollbar-track {
        // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        // border-radius: 10px;
        // background-color: #F5F5F5;
        display: none;
      }
      /*滾動條裡面小方塊樣式*/
      .item-box::-webkit-scrollbar {
        width: 0px;
        height: 0px;
        // background-color: #f5f5f500;
      }
      /*滾動條裡面軌道樣式*/
      .item-box::-webkit-scrollbar-thumb {
        // border-radius: 10px;
        // box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        // background-color: #9c827d7a;
        display: none;
      }
    }
    .outwin{
      left: -600px;
      opacity: 0;
    }
    //nigthing
    .not-item-box{
      .not-item,span{
        max-width: 80%;
        max-height: 70%;
      }
    
      .not-item{
        width: 300px;
        height: 180px;
        background:-webkit-linear-gradient(50deg, #d2d2d296 29%, #ffffff)
      }
      span{
        width: 200px;
        height: 20px;
        margin-top: 10px;
        background:-webkit-linear-gradient(50deg, #d2d2d296 29%, #ffffff)
      }

    }
    /*-------滾動條整體樣式----*/
    .not-item-box::-webkit-scrollbar-track {
      // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      // border-radius: 10px;
      // background-color: #F5F5F5;
      display: none;
    }
    /*滾動條裡面小方塊樣式*/
      .not-item-box::-webkit-scrollbar {
      width: 0px;
      height: 0px;
      // background-color: #f5f5f500;
    }
    /*滾動條裡面軌道樣式*/
    .not-item-box::-webkit-scrollbar-thumb {
      // border-radius: 10px;
      // box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      // background-color: #9c827d7a;
      display: none;
    }
    .flexlii li{
      animation-name:flexli;
      animation-duration:2s;
      animation-iteration-count:infinite;
      div,span{
        max-width: 80%;
        max-height: 70%;
      }
    }
    .flexlii li:nth-child(1)  { animation-delay: .5s }
    .flexlii :nth-child(2) { animation-delay: 1s }
    .flexlii :nth-child(3) { animation-delay: 1.5s }
    @keyframes flexli{

        from{
            transform: translate3d(0px, 0px, 0px);
            box-shadow: 0px 0px 0px #505050;
        }
        to{
            transform: translate3d(10px, -10px, 0px);
            box-shadow: -8px 10px 12px #505050;
        }
    }

  }
  .minHigth{
    min-height: min-content;
    max-width: 80%;
  }
  .player-box {
    position: sticky;
    bottom: 0;
  }
}
</style>