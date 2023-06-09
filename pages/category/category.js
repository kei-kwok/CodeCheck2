var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    navList: [],
    goodsList: [],
    id: "",
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10,
    totalPages: 1
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    if (options.id) {
      that.setData({
        id: options.id
      });
    }

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    this.test()
    //this.getCategoryInfo();

  },
  getCategoryInfo: function() {
    let that = this;
    util.request(api.GoodsCategory, {
        id: this.data.id
      })
      .then(function(res) {

        if (res.errno == 0) {
          that.setData({
            navList: res.data.brotherCategory,
            currentCategory: res.data.currentCategory
          });

          wx.setNavigationBarTitle({
            title: res.data.parentCategory.name
          })

          // 当id是L1分类id时，这里需要重新设置成L1分类的一个子分类的id
          if (res.data.parentCategory.id == that.data.id) {
            that.setData({
              id: res.data.currentCategory.id
            });
          }

          //nav位置
          let currentIndex = 0;
          let navListCount = that.data.navList.length;
          for (let i = 0; i < navListCount; i++) {
            currentIndex += 1;
            if (that.data.navList[i].id == that.data.id) {
              break;
            }
          }
          if (currentIndex > navListCount / 2 && navListCount > 5) {
            that.setData({
              scrollLeft: currentIndex * 60
            });
          }
          that.getGoodsList();

        } else {
          //显示错误信息
        }

      });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    console.log(1);
  },
  onHide: function() {
    // 页面隐藏
  },
  // getGoodsList: function() {
  //   var that = this;

  //   util.request(api.GoodsList, {
  //       categoryId: that.data.id,
  //       page: that.data.page,
  //       size: that.data.size
  //     })
  //     .then(function(res) {
  //       that.setData({
  //         goodsList: that.data.goodsList.concat(res.data.goodsList),
  //         totalPages: res.data.totalPages
  //       });
  //     });
  // },
  onUnload: function() {
    // 页面关闭
  },
  switchCate: function(event) {
    if (this.data.id == event.currentTarget.dataset.id) {
      return false;
    }
    var that = this;
    var clientX = event.detail.x;
    var currentTarget = event.currentTarget;
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
    this.setData({
      id: event.currentTarget.dataset.id,
      goodsList: [],
      page: 1,
      totalPages: 1
    });

    this.getCategoryInfo();
  }, 
  onReachBottom:function() {
	if (this.data.totalPages > this.data.page) {
	   this.setData({
	     page: this.data.page + 1
	   });
	} else {
	   wx.showToast({
	         title: '已经到底了!',
	         icon: 'none',
	         duration: 2000
	   });
	   return false;
	}
    this.getGoodsList();
   },
   test(){
    console.log("i'am coming !!!!!!")
    var that=this;
    wx.request({
      url: "https://624w0n2786.yicp.fun/cate",
      method: "GET",
      data: {
        page: that.data.page,
        varietyId: that.data.id
      },
      success: function (res) {
        // 一般在这一打印下看看是否拿到数据
        if (res.data.code === 200) {
          that.setData({
            goodsList: res.data.data
          })
          }
        },
        fail: function(){
          console.log("fail!!!")
        }
      })
  }
})