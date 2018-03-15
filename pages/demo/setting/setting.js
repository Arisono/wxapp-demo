// pages/demo/setting/setting.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  userInfo:{},
  items:'',
  itemsLeftImage:'http://ayipic.ayibang.com/2f0b167ece331e74e88fcec9ec4278df.png',
  itemsRightDesc:'13266699268',
  itemsMenus:[
    {
     menus:'选项卡'
    },
    { menus: '分页功能'},
    { menus: '搜索功能'},
    { menus: '地理位置'},
    { menus: '表格布局'},
    { menus: '面板布局'}
  ]
  },



  clickDetail:function(event){
    console.log(event.currentTarget.dataset);
    console.log(event.currentTarget.dataset.id);
    console.log(event.currentTarget.dataset.menus);
    switch (event.currentTarget.dataset.id){
      case 0:
          wx.showToast({
            title: event.currentTarget.dataset.menus,
          });
          wx.navigateTo({
            url: '../tab/tab_type/tab_type',
          });
      break;
      case 1:
        wx.showToast({
          title: event.currentTarget.dataset.menus,
        })
        break;
      case 2:
        wx.showToast({
          title: event.currentTarget.dataset.menus,
        })
        break;
      case 3:
        wx.showToast({
          title: event.currentTarget.dataset.menus,
        })
        break;
      case 4:
        wx.showToast({
          title: event.currentTarget.dataset.menus,
        })
        break;
      case 5:
        wx.showToast({
          title: event.currentTarget.dataset.menus,
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  app.getUserInfo((data)=>{
    console.log(JSON.stringify(data));
    this.setData({
      userInfo:data
    })
  });
  wx.request({
    url: 'http://192.168.253.200:8080/Chapter/data/mylist',
    method:'',
    data:{},
    header:{
      'Accept': 'application/json'
    },
    success:(res)=>{
      console.log(JSON.stringify(res));
      this.setData({
        items:res.data.data.item
      });
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