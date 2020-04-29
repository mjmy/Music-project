<template>
  <div class="page">
    <div class="listbody">
      <div class="favoritelist">
        <div class="textbox">
            <h2>我的歌單</h2>
            <div class="list-text">
                <span class="title">收藏的歌單</span>
                <span>共 : 0 張</span>
            </div>
        </div>

        <div class="listitem">
            <!-- 播放清單 -->
          <div class="favoriteitem">
            <img class="title-icon" src="../../assets/img/music_icon.png">
            <div class="item">
              <span class="title" @click="editStatus =true">新增清單</span>
            </div>
          </div>
          <div class="favoriteitem" v-for="(item,key) in favoritelist" :key="key"  >
            <img class="title-icon" src="../../assets/img/music_icon.png">
            <div class="item" @click="showListItem(key)">
              <span class="title">{{item.name}}</span>
              <span>共 : {{item.count}} 首</span>
              <span class="uptime" >更新時間 : {{item.time}}</span>
            </div>
          </div>
          <!-- <div class="favoriteitem" v-for="(n) in 15" :key="n">
            <img class="title-icon" src="../../assets/img/music_icon.png">
            <div class="item">
              <span class="title">清單{{(n)}}</span>
              <span>共 : 10 首</span>
              <span class="uptime" >更新時間 : 2020/04/27</span>
            </div>
          </div> -->
            <!-- 清單內容 -->
            <main v-if="action.itemShow">
              <nav>
                <em>{{favoritelist[action.index]['name']}} - 歌單</em>
              </nav>
              <ul>
                <li v-for="(obj , key) in listItem" :key="key">
                  <div>{{obj.title}}</div>
                </li>
              </ul>
            </main>
        </div>
      </div>
      
      <EditList @editStatus="EditStatus" @savaData="NewList" v-if="editStatus"></EditList>
    </div>
   
  </div>
</template>

<script>
import EditList from "./edit/edit.vue"
export default {
  name: "List",
  data() {
    return {
      favoritelist: [],
      action:{
        itemShow:false,
        index:-1,
      },
      editStatus:false
    };
  },
  components:{
    EditList
  },
  computed:{
    listItem(){
      let contant = [];
      if(this.action.index == -1){
        return [];
      }
      
      return this.favoritelist[this.action.index]['item']
    }
  },
  mounted() {},
  methods:{
    NewList(data){
      this.favoritelist.push(data)
      this.editStatus = status;
    },
    EditStatus(status){
      this.editStatus = status;
    },
    showListItem(key){
      console.log(key)
      this.action.index = key;
      this.$nextTick(()=>{
        this.action.itemShow = true;
      })
      
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  flex-direction: column;
  justify-content: flex-start !important;
    overflow-y: auto;
  .listbody {
    margin-bottom: 7rem;
    width: 900px;
    .favoritelist {
      display: block;
      width: 100%;
      // margin: 5px;
      // background: #a9a4a40f;
      .textbox{
        position: sticky;
        top: 0;
        background: #191919;
        z-index: 5;
        h2 {
            color: #fff;
            text-align: left;
            padding: 15px;
        }
        .list-text {
            color: #ffffff;
        }
      }
      .listitem{
        margin-top: 1rem;
        main{
          margin: 5px;
          background: #ffffff;
          border-radius: 10px 10px 5px 5px;
          nav{
            color: #004dd8;
            padding: 10px;
          }
          ul{
            li{
                background: #b7b7b7;
                margin: 7px;
                line-height: 2;
                border-radius: 15px;
              div{
                  
                  background: #ffffffb0;
              }
            }
          }
        }
      }
      .favoriteitem {
        display: flex;
        margin: 5px;
        background: #a9a4a40f;
        .title-icon {
          width: 100px;
          background: #a9a4a40f;
          margin: 5px;
          -webkit-filter:grayscale(1);
        }
        .item {
          display: block;
          text-align: left;
          width: 100%;
          .title:hover {
            cursor: pointer;
            color: #da6767;
          }
          .title {
            margin-bottom: 1rem;
            color: #ffffff;
            font-size: 18px;
            font-family: "DFKai-sb";
          }
          .uptime{
            font-size: 13px;
          }
          span {
            display: block;
            line-height: 35px;
            color: #aaa;
            margin: 0 10px;
          }
        }
      }
    }
    
  }
}
</style>