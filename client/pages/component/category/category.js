Page({
    data: {
        category: null,

        detail: null,
        curIndex: 0,
        isScroll: false,
        toView: "guowei"
    },

    onLoad: function (options) {
      var allCategory = getApp().globalData.category;
      var details = [];

      for (var i = 0; i < allCategory.length; i++)
      {
        var detailGoods = [];
        var goods = getApp().globalData.goods.filter(function (g) {
          return g.category == allCategory[i].id;
        });
        for(var j = 0; j < goods.length; j++)
        {
          var good = {
            "thumb": goods[j].image,
            "name": goods[j].title,
            "id": goods[j].id
          };
          detailGoods.push(good);
        }

        var detail = {
          "category": allCategory[i],
          "detail": detailGoods
        };

        details.push(detail);
      }

      this.setData({
        category: allCategory,
        detail: details
      })
    },

    // onReady(){
    //     var self = this;
    //     wx.request({
    //         // url:'data/cate-detail.txt',
    //         success(res){
    //             self.setData({
    //                 detail : res.data
    //             })
    //         }
    //     });
    // },

    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
        
    }
    
})