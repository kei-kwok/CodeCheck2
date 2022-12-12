const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');

//获取应用实例
const app = getApp();

Page({
  onShow() {},
  data: {
    item:{
    },
    msg1:'1',
    noramalData: [
    {
      index:"0",
      tuijian:"",
      cover:"//tse3-mm.cn.bing.net/th/id/OIP-C.e4LeYaIf0ol6CacP9ZwQagHaLG?w=203&h=304&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title:"美食",
      tx:"//tse3-mm.cn.bing.net/th/id/OIP-C.e4LeYaIf0ol6CacP9ZwQagHaLG?w=203&h=304&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      name:"美食",
      love:"111",
      num:"111",
    },
    {
      index:"1",
      cover:"//tse3-mm.cn.bing.net/th/id/OIP-C.e4LeYaIf0ol6CacP9ZwQagHaLG?w=203&h=304&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title:"美食",
      tx:"//tse3-mm.cn.bing.net/th/id/OIP-C.e4LeYaIf0ol6CacP9ZwQagHaLG?w=203&h=304&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      name:"美食",
      love:"111",
      num:"111",
    },
    ],
    // 轮播图
    banner: [ 
      {url:"//tse4-mm.cn.bing.net/th/id/OIP-C.WCqeGtPisiaW77NrCdANbgHaE8?w=298&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
      {url:"//tse3-mm.cn.bing.net/th/id/OIP-C.KkPqg6uB5i98OKrhDpkfmQHaEY?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
      {url:"//tse4-mm.cn.bing.net/th/id/OIP-C.QBFNFDqiU2F2oFn0OyOCdAHaEc?w=298&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
      // {
      //   id:"106383857430822913"
      // }
    ],
    channel: [
      {
        id:"clothes",
        name:"服装",
        iconUrl:"https://tse1-mm.cn.bing.net/th/id/OIP-C.57yjdcY4y824n7zPiTawBwHaLH?w=200&h=300&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      },
      {
        id:"jewelry",
        name:"饰品",
        iconUrl:"https://tse1-mm.cn.bing.net/th/id/OIP-C.VKFEZZhGnB9DopYpRAjEegHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      },
      {
        id:"electronics",
        name:"电子产品",
        iconUrl:"https://tse1-mm.cn.bing.net/th/id/OIP-C.NisxpXe4ceIupr_bBSQvpgHaEK?w=301&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      },
      {
        id:"tea",
        name:"茶饮",
        iconUrl:"https://tse1-mm.cn.bing.net/th/id/OIP-C.kxU-riMn3zinJ6d18I7YiAHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      },
      {
        id:"facility",
        name:"便民设施",
        iconUrl:"https://tse2-mm.cn.bing.net/th/id/OIP-C.QqxRlmiJGgwk2JykgtNdIwHaHa?w=209&h=208&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      },
      {
        id:"food",
        name:"食品",
        iconUrl:"https://tse2-mm.cn.bing.net/th/id/OIP-C.7tl8xXNvneFqZjmwX8bIjwHaE8?w=298&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      },
    ],
    comList: [{
      img: "https://tse3-mm.cn.bing.net/th/id/OIP-C.sz0z2jR--3aelpZ5g42htwHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      name: '商品的名称，可以很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
      commdityPrice: 100
  }, {
      img: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
      name: '商品名称会在超出两行时候自动折叠',
      commdityPrice: 100
  },
  {
      img: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
      name: '只有一行标题时高度为39',
      commdityPrice: 100
  }, {
      img: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
      name: '具体样式您可以自定义',
      commdityPrice: 100
  }, {
      img: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
      name: 'vue的H5页面也是如此使用',
      commdityPrice: 100
  }
], //商品列表
    indicatorDots: false,
    window: false,
    colseCoupon:false
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {
    
  // },

  onShareAppMessage: function() {
    let userInfo = wx.getStorageSync('userInfo');
    let shareUserId = 1;
    if (userInfo){
      shareUserId = userInfo.userId;
    }
    console.log('/pages/index/index?shareUserId=' + shareUserId);
    return {
      title: 'MOON商城',
      desc: '欢迎使用MOON商城',
      path: '/pages/index/index?shareUserId=' + shareUserId
    }
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getIndexData();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  getIndexData: function() {
    let that = this;
    util.request(api.IndexUrl).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          banner: res.data.banner,
          channel: res.data.channel,
          noramalData: res.data.noramalData,
        });
      }
    });
    util.request(api.GoodsCount).then(function (res) {
      that.setData({
        goodsCount: res.data.goodsCount
      });
    });
  },
  onLoad: function(options) {
    this.setData({
      colseCoupon: false
    });
    // 1.发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://624w0n2786.yicp.fun/main/swiper',
    //   success: (result) => {
    //     console.log(result);
    //   }
    // })
    //如果有分享用户，则设置
    if (options.shareUserId){
      wx.setStorageSync('shareUserId', options.shareUserId);
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.scene) {
      //这个scene的值存在则证明首页的开启来源于朋友圈分享的图,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      var scene = decodeURIComponent(options.scene);
      console.log("scene:" + scene);

      let info_arr = [];
      info_arr = scene.split(',');
      let _type = info_arr[0];
      let id = info_arr[1];

      let shareUserId = null;//默认用户
      if (info_arr.length == 4 && info_arr[2] == 'user'){
    	  shareUserId = info_arr[3];
      } else if (_type == 'user'){
    	  shareUserId = id;
      }

	  if (shareUserId != null){
	  	 wx.setStorageSync('shareUserId', id);
	  }
  	
      if (_type == 'goods') {
        wx.navigateTo({
          url: '../goods/goods?id=' + id
        });
      } else if (_type == 'groupon') {
        wx.navigateTo({
          url: '../goods/goods?grouponId=' + id
        });
      } else if (_type == 'brand') {
          wx.navigateTo({
              url: '../brandDetail/brandDetail?id=' + id
            });
      } else if (_type == 'topic') {
           wx.navigateTo({
               url: '../topicDetail/topicDetail?id=' + id
             });
      } else {
        wx.navigateTo({
          url: '../index/index'
        });
      }
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.grouponId) {
      //这个pageId的值存在则证明首页的开启来源于用户点击来首页,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?grouponId=' + options.grouponId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.goodId) {
      //这个goodId的值存在则证明首页的开启来源于分享,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?id=' + options.goodId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.orderId) {
      //这个orderId的值存在则证明首页的开启来源于订单模版通知,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../ucenter/orderDetail/orderDetail?id=' + options.orderId
      });
    }

    this.getIndexData();
  },
  onReady: function() {
    // 页面渲染完成
    let that = this;
    let userInfo = wx.getStorageSync('userInfo');
    if (!that.data.colseCoupon && userInfo && that.data.coupon.length > 0) {
      that.setData({ window: true });
    };
    // 商家推荐
    const db= wx.cloud.database();
    db.collection('index').where({
      name:'tuijian'
    })
    .get({
      success: (res)=>{
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data);
        console.log(this);
        
        this.setData({
          noramalData:res.data[0]
        })
        console.log(res.data[0]);
        this.setData({
        item:{
        }
      })
      }
    });
  },
})