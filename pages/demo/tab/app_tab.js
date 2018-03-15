Page({
  data: {
    tabs: ['Java', 'Android', 'Python', 'React', 'Vue', 'Weex', 'Weex', 'Weex', 'Weex'],
    stv: {
      mwindowWidth:0,
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0
  },
  onLoad: function (options) {
    try {
      let { tabs } = this.data;
      var res = wx.getSystemInfoSync()
    
      
      this.windowWidth = (tabs.length * 80);
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = (tabs.length * 80);
      this.data.stv.mwindowWidth=res.windowWidth;

      this.setData({ stv: this.data.stv })
      this.tabsCount = tabs.length;
    } catch (e) {
    }
  },
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({ stv: this.data.stv })
  },
  handlerMove(e) {
    let { clientX, clientY } = e.touches[0];
    let { stv } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    if (stv.offset <= 0) {
      stv.offset = 0;
    } else if (stv.offset >= (tabs.length * 80) * (this.tabsCount - 1)) {
      stv.offset = (tabs.length * 80) * (this.tabsCount - 1);
    }
    this.setData({ stv: stv });
  },
  handlerCancel(e) {

  },
  handlerEnd(e) {
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    let { tabs, stv, activeTab } = this.data;
    let { offset, windowWidth } = stv;
    //快速滑动
    if (endTime - this.tapStartTime <= 300) {
      //向左
      // console.log("this.tapStartY:"+this.tapStartY +"clientY:"+clientY);
      // console.log("this.tapStartX:" + this.tapStartX + "clientX:" + clientX);

      console.log("moveY:"+Math.abs(this.tapStartY - clientY));
      console.log("moveX:" + Math.abs(this.tapStartX - clientX));
      let diff = Math.abs(Math.abs(this.tapStartY - clientY) - Math.abs(this.tapStartX - clientX)); 
      console.log("diff:"+diff);
      if (Math.abs(this.tapStartY - clientY) <120 &&diff>8) {
        if (this.tapStartX - clientX > 5) {
          if (activeTab < this.tabsCount - 1) {
            this.setData({ activeTab: ++activeTab })
          }
        } else {
          if (activeTab > 0) {
            this.setData({ activeTab: --activeTab })
          }
        }
        stv.offset = (tabs.length * 80) * activeTab;
      } else {
        //快速滑动 但是Y距离大于50 所以用户是左右滚动
        let page = Math.round(offset / (tabs.length * 80));
        if (activeTab != page) {
          this.setData({ activeTab: page })
        }
        stv.offset = (tabs.length * 80) * page;
      }
    } else {
      let page = Math.round(offset / (tabs.length * 80));
      if (activeTab != page) {
        this.setData({ activeTab: page })
      }
      stv.offset = (tabs.length*80) * page;
    }
    stv.tStart = false;
    console.log(JSON.stringify(this.data.stv));
    this.setData({ stv: this.data.stv })
  },
  _updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data;
    activeTab = page;
    this.setData({ activeTab: activeTab })
    stv.offset = (tabs.length * 80) * activeTab;
    this.setData({ stv: this.data.stv })
  },
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
  }
})