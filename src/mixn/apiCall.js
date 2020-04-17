export const apiCall = {
    methods:{
        $_ajaxPost(url  ,payload , callback , errorCb = null){
            this.$http.post(url ,payload).then(result => {
                let data = result.data
                if(data.s){ //成功
                    callback(data);
                }else{
                    console.log(data)
                }
            });
        },
        $_ajaxGet(url ,activite , payload , callback , errorCb = null){
            this.$http.get(url+activite ,{params : payload}).then(result => {
                let data = result.data
                if(result.status){ //成功
                    callback(data);
                }else{
                    console.log(data)
                   
                }
            });
        },
    }
}
