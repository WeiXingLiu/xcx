
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: ['red', 'blue', 'orange'],
    text: "this is first line\nthis is second line"
  },

  addLine: function () {
    console.log('addLine', this, this.data.text)
    if (this.data.text) {
      var textArray = this.data.text.split('\n')
      textArray.push('new line')

      this.setData({
        text: textArray.join('\n')
      })
    }
  },

  removeLine: function () {
    if (this.data.text) {
      var textArray = this.data.text.split('\n')
      if (textArray.length) {
        textArray.pop()

        this.setData({
          text: textArray.join('\n')
        })
      } else {
        this.setData({
          text: "no data"
        })
      }
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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