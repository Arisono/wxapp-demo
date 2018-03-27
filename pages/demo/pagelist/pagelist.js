// pages/demo/pagelist/pagelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_count:'',
    items:[],
    langugelist:[
      {
        value:'Java'
      },
      {
        value: 'C'
      },
      {
        value: 'C++'
      }
      , {
        value: 'JavaScript'
      }
      , {
        value: 'Python'
      }
      , {
        value: 'Go'
      }
      , {
        value: 'Scale'
      }
      , {
        value: 'C#'
      }
      , {
        value: 'CSS'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let q ="stars:>5+language:java+created:>2000-09-09";
    let sort ="stars";
    let page=1;
    let per_page=30;
    
    this.getRepositories(q,sort,page,per_page);
  },

 searchRepositories:function(e){
   var value = e.detail.value;
   let q = value + "+stars:>5+language:" + value + "+created:>2000-09-09";
   if(value==null||value==''){
     q = "stars:>5+created:>2000-09-09";
   }else{
     q = value + "+stars:>5+created:>2000-09-09";
   }

   let sort = "stars";
   let page = 1;
   let per_page = 30;
   this.getRepositories(q, sort, page, per_page);
 },

  getRepositories: function (q,sort,page,per_page){
   wx.showLoading({
     title: '请稍等...',
   })
   wx.request({
     url: 'https://api.github.com/search/repositories'+'?q='+q,
     data:{
    
      sort:sort,
      page,page,
      per_page:per_page
     },
     method: 'GET',
     header:{
       'content-type': 'application/x-www-form-urlencoded'
     },
     success:(res)=>{
       wx.hideLoading();
       console.log(JSON.stringify(res));
       this.setData({
         items:res.data.items
       })
     },
     fail:(res)=>{
       wx.hideLoading();
     }
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})