Page({

   data: {
      dreamResult: 
      { }
    },

    queryDreamFormSumbit:function(e){
        if(wx.canIUse('showLoading')){
            wx.showLoading({
                "title":"周公连线中...",
                "mask":true
            });
        }
        var that = this;
        wx.request({
            url: 'https://v.juhe.cn/dream/query', //仅为示例，并非真实的接口地址
            data: {
                q: e.detail.value.dreamKeyword,
                key: '735adb92fc99c4e943a153e476bc794d'
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) { 

                if(res.statusCode!=200 || res.data.error_code !=0) {
                   wx.showModal({
                    title: '提示',
                    content: '周公此时在做梦，请稍后再来...',
                    showCancel:false,
                    confirmText:'稍后再来',
                    success: function(res) {
                        if (res.confirm) {
                        console.log('用户点击确定')
                        } else if (res.cancel) {
                        console.log('用户点击取消')
                        }
                    }
                    })
                }    


                that.setData(
                    {dreamResult:res.data}
                );
            if(wx.canIUse('showLoading')){
                wx.hideLoading();
            }
            }
        }) 
    }
})