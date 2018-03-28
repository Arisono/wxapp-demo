// pages/demo/pagelist/pagelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_count: '',
    querykey:'',
    querylanguge:'Java',
    querytimes:'2000-01-01',
    choice_menu: true,
    choice_languge: false,
    choice_date: false,
    languge_value:'Java',
    date_value:'今日',
    items: [],
    langugelist: [
      {
        value: 'Java'
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
    ],
    times: [
      {
        value: '今日'
      },
      {
        value: '最近一周'
      }
      ,
      {
        value: '最近一月'
      }
      ,
      {
        value: '最近三月'
      },

      {
        value: '最近一年'
      }
      ,
      {
        value: '最近两年'
      }
      ,
      {
        value: '最近三年'
      }
      ,
      {
        value: '最近五年'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let q = "stars:>5+language:java+created:>2000-09-09";
    let sort = "stars";
    let page = 1;
    let per_page = 30;

    this.getRepositories(q, sort, page, per_page);
  },


click_languges:function(e){
  var languge = e.currentTarget.dataset.value;
  this.setData({
    languge_value: languge,
    querylanguge:languge,
    choice_languge:false
  });
  let q = this.data.querykey+"+stars:>5+language:"+languge+"+created:>"+
  this.data.querytimes;
  let sort = "stars";
  let page = 1;
  let per_page = 30;

  this.getRepositories(q, sort, page, per_page);
},

click_times:function(e){
  var date = e.currentTarget.dataset.value;
  switch(date){
   case this.data.times[0].value:

      this.data.querytimes="2018-03-27";
   break;
   case this.data.times[1].value:
      this.data.querytimes = "2018-03-21";
     break;
   case this.data.times[2].value:
      this.data.querytimes = "2018-02-28";
     break;
   case this.data.times[3].value:
      this.data.querytimes = "2018-01-28";
     break;
   case this.data.times[4].value:
      this.data.querytimes = "2017-03-28";
     break;
   case this.data.times[5].value:
      this.data.querytimes = "2015-03-28";
     break;
   case this.data.times[6].value:
      this.data.querytimes = "2012-03-28";
     break;
   case this.data.times[6].value:
     this.data.querytimes = "2000-03-28";
     break;
  };
  this.setData({
    date_value:date,
    choice_date:false
  });
  let q;
  if (this.data.querykey == "" || this.data.querykey==null){
     q = "stars:>0+language:" + this.data.querylanguge + "+created:>" + this.data.querytimes;
}else{
     q = this.data.querykey + "+stars:>0+language:" + this.data.querylanguge + "+created:>" + this.data.querytimes;
}

  let sort = "stars";
  let page = 1;
  let per_page = 30;

  this.getRepositories(q, sort, page, per_page);
},
  choiceItem: function (e) {
    console.log(e.currentTarget.dataset.item);
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.choice_languge) {
          console.log(this.data.choice_languge);
          this.setData({
      
            choice_date: false,
            choice_languge: false
          });
        } else {
          console.log(this.data.choice_languge);
          this.setData({
  
            choice_date: false,
            choice_languge: true

          });
        }
        break;
      case "2":
        if (this.data.choice_date) {
          console.log(this.data.choice_date);
          this.setData({
 
            choice_date: false,
            choice_languge: false
          });
        } else {
          console.log(this.data.choice_date);
          this.setData({
        
            choice_date: true,
            choice_languge: false
          });
        }
        break;
    }
  },

  searchRepositories: function (e) {
    var value = e.detail.value;
    this.data.querykey=value;
    let q = value + "+stars:>5+language:" + value + "+created:>2000-09-09";
    if (value == null || value == '') {
      q = "stars:>5+created:>2000-09-09";
    } else {
      q = value + "+stars:>5+created:>2000-09-09";
    }

    let sort = "stars";
    let page = 1;
    let per_page = 30;
    this.getRepositories(q, sort, page, per_page);
  },

  getRepositories: function (q, sort, page, per_page) {
    console.log("q:"+q);
    wx.showLoading({
      title: '请稍等...',
    })
    wx.request({
      url: 'https://api.github.com/search/repositories' + '?q=' + q,
      data: {

        sort: sort,
        page, page,
        per_page: per_page
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        wx.hideLoading();
        // console.log(JSON.stringify(res));
        this.setData({
          items: res.data.items
        })
      },
      fail: (res) => {
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