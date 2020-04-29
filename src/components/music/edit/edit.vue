<template>
  <div class="edit-page">
      <div class="edit-box">
            <div class="title"><i>列表名稱</i></div>
            <div class="input">
                <input type="text" v-model="objData.name"/>
            </div>
            <div class="button-box">
                <button class="cencle" @click="cancel()">取消</button>
                <button class="save" @click="save()">保存</button>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'edit',
    data(){
        return{
            objData:{
                name:'',
                count:0,
                item:[{id:123,title:'test'},{id:123,title:'aaa'},{id:123,title:'vvv'}],
                time:0
            }
        }
    },
    methods:{
        save(){
            if(this.objData.name !== ''){
                this.$emit('savaData',this.objData);
            }
        },
        cancel(){
            this.$emit('editStatus',false);
        }
    }
}
</script>

<style lang="less" scoped>
.edit-page{
    width: inherit;
    height: 100%;
    position: fixed;
    top: 0;
    background: #22222270;
    .edit-box{
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 10%;
        border: 1px solid #ffffff;
        border-radius: 25px;
        background: #53606d;
        div{
            float: left;
            display: block;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 2rem;
        }
        .title{
            color: #fff;        
        }
        .input{
            width: 70%;
           
            border-bottom: 1px solid #d8d4d4b8;
            input{
                color: #fff;
                width: 100%;
                background:none;
                outline:none;
                border:0px;
            }
        }
        .button-box{
            margin-top: 20%;
            width: -webkit-fill-available;
            button{
                width: 7rem;
                border: 1px solid #ffff;
                border-radius: 10px;
                line-height: 2;
                color: #ffffff;
                cursor: pointer;
            }
            .cencle{
                margin-right: 5rem;
                background: #d66464;
            }
            .cencle:hover{
                background: #d66464bf;
            }
            .save{
                margin-left: 5rem;
                background: #95de91;
            }
            .save:hover{
                background: #95de91c7;
            }
        }
    }
}

</style>