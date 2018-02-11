Page({

   data: {
      dreamResult: { },
      hasData:false
    },

    queryDreamFormSumbit:function(e){
        if(wx.canIUse('showLoading')){
            wx.showLoading({
                "title":"QQ神仙连线中...",
                "mask":true
            });
        }
        var that = this;
        wx.request({
            url: 'https://japi.juhe.cn/qqevaluate/qq', 
            data: {
                qq: e.detail.value.dreamKeyword,
                key: '57f295067d4ff9edfe89cf9269dc5e74'
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {               
                if(res.statusCode!=200 || res.data.error_code !=0) {
                   wx.showModal({
                    title: '提示',
                    content: 'QQ神仙此时很忙，请稍后再来...',
                    showCancel:false,
                    confirmText:'稍后再来' 
                    })
                }             
                that.setData(
                    {dreamResult:res.data,hasData:true}
                );

                console.log(res.data.result);
                
                if(wx.canIUse('showLoading')){
                    wx.hideLoading();
                }
            }
        }) 
    }
})