Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    topimg: [],
    city: '',
    topimg: '',
    serverlist: [],
    title: '',
    desc: '',
    clean: [],
    image: '',
    hot: '',
    recomlist: []
  },


  clickImage:function(event){
    console.log(event.currentTarget.dataset.index);
    console.log(event.currentTarget.dataset.url);

  }
,

  gotoserver:function(event){

  },
  onLoad: function (options) {
      this.loadHomeData(0, 0);
  },

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
  
  },

  loadHomeData: function (longitude, latitude){
    //加载主页数据
    wx.request({
      url: 'http://192.168.253.200:8080/Chapter/data/home',
      method:'GET',
      data:{},
      header:{
        'Accept': 'application/json'
      },

      success:(res)=>{
        console.log(JSON.stringify(res));
        this.setData({
          topimg: res.data.topimg,
          serverlist: res.data.serverlist,
          title: res.data.title,
          desc: res.data.desc,
          image: res.data.image,
          clean: res.data.clean
          // hot: res.data.hot,
          // recomlist: res.data.recomlist
        })
      },
      fail: (res) => {
        console.log(JSON.stringify(res)); 
      }
    })
  }
})