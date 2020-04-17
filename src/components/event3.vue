<template>
    <div class="page-3">
        <div class="center">
            
        </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
    getList(){
      console.log(this.$store)
      let playload = {
        key : this.$store.state.KEY,
        channelId  : 'UC4R8DWoMoI7CAwX8_LjQHig',
        maxResults : 50,
        part : 'snippet'
      }
      this.$_ajaxGet(this.$store.state.API.Youtube,'playlists',playload,res=>{

      })
    }
  }
}
</script>
<style lang="less" scoped>
.page-3 {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
//   justify-content: center; //主軸的對齊方式
  .center{

  }
  
}
</style>