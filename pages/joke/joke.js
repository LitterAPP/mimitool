

Page({
 data:{
        tab_joke_txt_selected:true,
        tab_joke_pic_selected:false,         
        onPullDownRefresh:false,
        touchStartY:0,
        jokeTxtResultList:[],
        jokePicResultList:[]
 },
 onLoad:function(){
      var that = this;   
       that.requestJokeTxt();  
       that.requestJokePic();
 },
 tab_joke_txt:function(e){
    this.setData({
            tab_joke_txt_selected:true,
            tab_joke_pic_selected:false
        })
 },
 tab_joke_pic:function(e){
    this.setData({
            tab_joke_txt_selected:false,
            tab_joke_pic_selected:true
        })
 },
 jokeContainerTouchStart:function(event){
     var that = this;
     that.setData({
            touchStartY:event.touches[0].clientY
     });
 },
 jokeContainerTouchMove:function(event){
     var that = this; 
     if(event.touches[0].clientY-that.data.touchStartY>100){
        that.setData({
           // onPullDownRefresh:true
        }); 
     }
 },
 onPullDownRefresh: function(){
     var that = this;
     if(that.data.tab_joke_txt_selected){
        that.requestJokeTxt();
     }else if(that.data.tab_joke_pic_selected){
            that.requestJokePic();
     }

      wx.stopPullDownRefresh();
       that.setData({
                    onPullDownRefresh:false
       }); 
  },
  requestJokeTxt:function(){
       var that = this;
            wx.request({
            url: 'https://v.juhe.cn/joke/randJoke.php', 
            data: {
                type: '',
                key: '26d4bb240554b2bb13d5a5a686905c7a'
            },
            header: { 
                'content-type': 'application/json'
            },
            success: function(res) {               
                if(res.statusCode!=200 || res.data.error_code !=0) {
                   wx.showModal({
                    title: '提示',
                    content: '笑话大王此时很忙，稍再和你讲笑话...',
                    showCancel:false,
                    confirmText:'稍后再来' 
                    })
                }else{
                    that.setData(
                        {jokeTxtResultList:res.data.result}
                    );  
                }
                            
                              
                if(wx.canIUse('showLoading')){
                    wx.hideLoading();
                }
            }
        }) 
  },
  requestJokePic:function(){
       var that = this;
            wx.request({
            url: 'https://v.juhe.cn/joke/randJoke.php', 
            data: {
                type: 'pic',
                key: '26d4bb240554b2bb13d5a5a686905c7a'
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {  
                             
                if(res.statusCode!=200 || res.data.error_code !=0) {
                   wx.showModal({
                    title: '提示',
                    content: '趣图大王此时很忙，稍再和你讲笑话...',
                    showCancel:false,
                    confirmText:'稍后再来' 
                    })
                }else{    
                    that.setData(
                        {jokePicResultList:res.data.result}
                    );    
                }            
                if(wx.canIUse('showLoading')){
                    wx.hideLoading();
                }
            }
        }) 
  },
  
})