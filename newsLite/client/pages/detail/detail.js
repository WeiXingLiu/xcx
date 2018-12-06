const config = require('../../config')

Page({
    data: {
        detail: {}
    },

    onLoad: function (option) {
        wx.request({
            url: `${config.service.host}/weapp/detail`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                newsId: option.newsId
            },
            success: res => {
                this.setData({
                    detail: res.data.data
                })
            }
        })
    },

    previewImage: function (e) {
        wx.previewImage({
            current: this.data.detail.newsUrl,
            urls: [this.data.detail.newsUrl]
        })
    },

    back: function () {
        wx.navigateBack({
            delta: 1
        })
    }
})