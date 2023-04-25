var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    orderAdd:{ 
      "shopId": "-1283564874953968", 
    "money": 99, 
    "remark": "于七更斗土同九地同机定见外千属离养。", 
    "status": 1, 
    "orderDish": [ 
        { 
            "dishId": "2677265376064928", 
            "amount": 82, 
            "money": "87", 
            "flavor": "看", 
            "name": "采" 
        } 
    ], 
    "orderCombo": [ 
        { 
            "comboId": "4547769405706530", 
            "amount": 77, 
            "money": 96, 
            "flavor": "内" 
        }, 
        { 
            "comboId": "5914440355776684", 
            "amount": 76, 
            "money": 95, 
            "flavor": "布" 
        }, 
        { 
            "comboId": "6224291080717350", 
            "amount": 35, 
            "money": 96, 
            "flavor": "基" 
        }, 
        { 
            "comboId": "1282253261001748", 
            "amount": 22, 
            "money": 66, 
            "flavor": "设" 
        }, 
        { 
            "comboId": "86526656880054", 
            "amount": 14, 
            "money": 97, 
            "flavor": "交" 
        } 
    ] 
    }, 
    shopList:[], 
    name:'', 
    Id:0,
    orderList: [],
    showType: 0,
    page: 1,
    size: 10,
    totalPages: 1,
    customerId:1,
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this
    try {
      var tab = wx.getStorageSync('tab');
      this.setData({
        showType: tab
      });
    } catch (e) {}

  },
  addOrder: function(){
    let that = this;
    wx.request({
      // 注意，如果小程序开启校验合法域名时必须使用https协议
      //在测试的情况下可以不开启域名校验
      url: 'https://624w0n2786.yicp.fun/order', 
      method: "POST", 
      data:{ 
        "shopId": "-1283564874953968", 
        "money": 99, 
        "remark": "于七更斗土同九地同机定见外千属离养。", 
        "status": 1, 
        "orderDish": [ 
            { 
                "dishId": "2677265376064928", 
                "amount": 82, 
                "money": "87", 
                "flavor": "看", 
                "name": "采" 
            } 
        ], 
        "orderCombo": [ 
            { 
                "comboId": "4547769405706530", 
                "amount": 77, 
                "money": 96, 
                "flavor": "内" 
            }, 
            { 
                "comboId": "5914440355776684", 
                "amount": 76, 
                "money": 95, 
                "flavor": "布" 
            }, 
            { 
                "comboId": "6224291080717350", 
                "amount": 35, 
                "money": 96, 
                "flavor": "基" 
            }, 
            { 
                "comboId": "1282253261001748", 
                "amount": 22, 
                "money": 66, 
                "flavor": "设" 
            }, 
            { 
                "comboId": "86526656880054", 
                "amount": 14, 
                "money": 97, 
                "flavor": "交" 
            } 
        ] 
      },
  	  // 请求成功时的处理
      success: function (res) {
        // 一般在这一打印下看看是否拿到数据
        console.log(res.data.data) 
        if (res.data.code === 200) {
          that.setData({
            // 将res.data保存在listDate方便我们去循环遍历
            orderList: res.data.data,            
          })
        }
      },
      // 请求失败时的一些处理
      fail: function () {
      	wx.showToast({
            icon: "none",
            mask: true,
          	title: "接口调用失败，请稍后再试。",
         });
      }
    })
  },
  getOrderList() {
    let that = this;
    wx.request({ 
      url: "https://624w0n2786.yicp.fun/order"+"/"+that.data.customerId, 
      method: "GET",         
      success: function (res) { 
        // 一般在这一打印下看看是否拿到数据 
        if (res.data.code === 200) { 
          that.setData({ 
            orderList: res.data.data 
          }) 
          console.log(res.data.data) 
          } 
        }, 
        fail: function(){ 
          console.log("fail!!!") 
        } 
      }) 
    // util.request(api.OrderList, {
    //   showType: that.data.showType,
    //   page: that.data.page,
    //   size: that.data.size
    // }).then(function(res) {
    //   if (res.errno === 0) {
    //     console.log(res.data);
    //     that.setData({
    //       orderList: that.data.orderList.concat(res.data.data),
    //       totalPages: res.data.totalPages
    //     });
    //   }
    // });
  },
  getOrderid() { 
    let that = this; 
    wx.request({ 
      url: "https://624w0n2786.yicp.fun/restaurant", 
      method: "GET",    
      data:{ 
        id: 3, 
      },      
      success: function (res) { 
        // 一般在这一打印下看看是否拿到数据 
        if (res.data.code === 200) { 
          that.setData({ 
            shopList: res.data.data, 
            // name:that.data.shopList.name 
          }) 
          console.log(res.data.data) 
          } 
        }, 
        fail: function(){ 
          console.log("fail!!!") 
        } 
      }) 
  }, 
  onReachBottom() {
    if (this.data.totalPages > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
      this.getOrderList();
    } else {
      wx.showToast({
        title: '没有更多订单了',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },
  switchTab: function(event) {
    let showType = event.currentTarget.dataset.index;
    this.setData({
      orderList: [],
      showType: showType,
      page: 1,
      size: 10,
      totalPages: 1
    });
    this.getOrderList();
  },
  // “去付款”按钮点击效果
  payOrder: function (e) {
    let that = this;
    let orderId = e.currentTarget.dataset.index;
    util.request(api.OrderPrepay, {
      orderId: orderId
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        const payParam = res.data;
        console.log("支付过程开始");
        wx.requestPayment({
          'timeStamp': payParam.timeStamp,
          'nonceStr': payParam.nonceStr,
          'package': payParam.packageValue,
          'signType': payParam.signType,
          'paySign': payParam.paySign,
          'success': function (res) {
            console.log("支付过程成功");
            util.redirect('/pages/ucenter/order/order');
          },
          'fail': function (res) {
            console.log("支付过程失败");
            util.showErrorToast('支付失败');
          },
          'complete': function (res) {
            console.log("支付过程结束")
          }
        });
      }
    });

  },
  // “取消订单”点击效果
  cancelOrder: function (e) {
    let that = this;
    let orderId = e.currentTarget.dataset.index;

    wx.showModal({
      title: '',
      content: '确定要取消此订单？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.OrderCancel, {
            orderId: orderId
          }, 'POST').then(function (res) {
            if (res.errno === 0) {
              wx.showToast({
                title: '取消订单成功'
              });
              util.redirect('/pages/ucenter/order/order');
            } else {
              util.showErrorToast(res.errmsg);
            }
          });
        }
      }
    });
  },
  // “取消订单并退款”点击效果
  refundOrder: function (e) {
    let that = this;
    let orderId = e.currentTarget.dataset.index;

    wx.showModal({
      title: '',
      content: '确定要取消此订单？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.OrderRefund, {
            orderId: orderId
          }, 'POST').then(function (res) {
            if (res.errno === 0) {
              wx.showToast({
                title: '取消订单成功'
              });
              util.redirect('/pages/ucenter/order/order');
            } else {
              util.showErrorToast(res.errmsg);
            }
          });
        }
      }
    });
  },
  // “删除”点击效果
  deleteOrder: function (e) {
    let that = this;
    let orderId = e.currentTarget.dataset.index;

    wx.showModal({
      title: '',
      content: '确定要删除此订单？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.OrderDelete, {
            orderId: orderId
          }, 'POST').then(function (res) {
            if (res.errno === 0) {
              wx.showToast({
                title: '删除订单成功'
              });
              util.redirect('/pages/ucenter/order/order');
            } else {
              util.showErrorToast(res.errmsg);
            }
          });
        }
      }
    });
  },
  // “确认收货”点击效果
  confirmOrder: function (e) {
    let that = this;
    let orderId = e.currentTarget.dataset.index;

    wx.showModal({
      title: '',
      content: '确认收货？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.OrderConfirm, {
            orderId: orderId
          }, 'POST').then(function (res) {
            if (res.errno === 0) {
              wx.showToast({
                title: '确认收货成功！'
              });
              util.redirect('/pages/ucenter/order/order');
            } else {
              util.showErrorToast(res.errmsg);
            }
          });
        }
      }
    });
  },
  detailExpress:function(e){
    let orderId = e.currentTarget.dataset.index;
    wx.navigateTo({url:'/pages/ucenter/expressInfo/expressInfo?orderId=' + orderId});
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    this.setData({
      orderList: [],
      page: 1,
      size: 10,
      totalPages: 1
    });
    this.getOrderList();
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})