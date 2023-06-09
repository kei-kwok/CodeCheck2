var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp()
Page({
  data: {
    keywrod: '',
    searchStatus: false,
    goodsList: [],
    helpKeyword: [],
    historyKeyword: [],
    categoryFilter: false,
    currentSort: 'name',
    currentSortType: 'default',
    currentSortOrder: 'desc',
    filterCategory: [],
    defaultKeyword: {},
    hotKeyword: [],
    page: 1,
    size: 10,
    categoryId: 0,
    totalPages: 1
  },
  //事件处理函数
  closeSearch: function() {
    wx.navigateBack()
  },
  clearKeyword: function() {
    this.setData({
      keyword: '',
      searchStatus: false
    });
  },
  onLoad: function() {

    this.getSearchKeyword();
  },

  getSearchKeyword() {
    let that = this;
    util.request(api.SearchIndex).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          historyKeyword: res.data.historyKeywordList,
          defaultKeyword: res.data.defaultKeyword,
          hotKeyword: res.data.hotKeywordList
        });
      }
    });
  },

  inputChange: function(e) {
    this.setData({
      keyword: e.detail.value,
      searchStatus: false
    });

    if (e.detail.value) {
      this.getHelpKeyword();
    }
  },
  getHelpKeyword: function() {
    let that = this;
    util.request(api.SearchHelper, {
      page:1,
      query: that.data.keyword
    }).then(function(res) {
      console.log("res")
      console.log(res)
      if (res.code === 200) {
        var list =res.data;
        for(var i=0;i<list.length;i++){
          console.log(list[i].name)
          list[i].name=list[i].name.replace("<em>","")
          list[i].name=list[i].name.replace("</em>","")
        }
        that.setData({
          helpKeyword: list
        });
        console.log("helpKey")
        console.log(that.data.helpKeyword);
      }
    });
  },
  inputFocus: function() {
    this.setData({
      searchStatus: false,
      goodsList: []
    });

    if (this.data.keyword) {
      this.getHelpKeyword();
    }
  },
  clearHistory: function() {
    this.setData({
      historyKeyword: []
    })

    util.request(api.SearchClearHistory, {}, 'POST')
      .then(function(res) {
        console.log('清除成功');
      });
  },
  getGoodsList: function() {
    let that = this;
    util.request(api.GoodsList, {
      keyword: that.data.keyword,
      page: that.data.page,
      size: that.data.size,
      sort: that.data.currentSort,
      order: that.data.currentSortOrder,
      categoryId: that.data.categoryId
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          searchStatus: true,
          categoryFilter: false,
          goodsList: that.data.goodsList.concat(res.data.goodsList),
          filterCategory: res.data.filterCategoryList,
          totalPages: res.data.totalPages
        });
      }

      //重新获取关键词
      that.getSearchKeyword();
    });
  },
  onKeywordTap: function(event) {

    // this.getSearchResult(event.target.dataset.keyword);
    console.log("event")
    console.log(event)
    wx.navigateTo({
      url: '/pages/business/business?id='+event.target.dataset.keyword.id,
    })

  },
  getSearchResult(keyword) {
    if (keyword === '') {
      keyword = this.data.defaultKeyword.keyword;
    }
    this.setData({
      keyword: keyword,
      page: 1,
      totalPages: 1,
      categoryId: 0,
      goodsList: []
    });

    this.getGoodsList();
  },
  openSortFilter: function(event) {
    let currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          categoryFilter: !this.data.categoryFilter,
          currentSortType: 'category',
          currentSort: 'add_time',
          currentSortOrder: 'desc'
        });
        break;
      case 'priceSort':
        let tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        }
        this.setData({
          currentSortType: 'price',
          currentSort: 'retail_price',
          currentSortOrder: tmpSortOrder,
          categoryFilter: false
        });

        this.getGoodsList();
        break;
      default:
        //综合排序
        this.setData({
          currentSortType: 'default',
          currentSort: 'name',
          currentSortOrder: 'desc',
          categoryFilter: false,
          categoryId: 0,
        });
        this.getGoodsList();
    }
  },
  selectCategory: function(event) {
    let currentIndex = event.target.dataset.categoryIndex;
    let filterCategory = this.data.filterCategory;
    let currentCategory = null;
    for (let key in filterCategory) {
      if (key == currentIndex) {
        filterCategory[key].selected = true;
        currentCategory = filterCategory[key];
      } else {
        filterCategory[key].selected = false;
      }
    }
    this.setData({
      filterCategory: filterCategory,
      categoryFilter: false,
      categoryId: currentCategory.id,
      page: 1,
      totalPages: 1,
      goodsList: []
    });
    this.getGoodsList();
  },
  onKeywordConfirm(event) {
    this.getSearchResult(event.detail.value);
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
   }
})