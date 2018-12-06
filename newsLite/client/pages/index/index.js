
const config = require('../../config')

Page({
    data: {
        swiper: [],
        newsList: [],
        hasMore: false,
        row: 0
    },

    onLoad: function () {
        this.fetchDataList(true)
        this.fetchDataList(false)
    },

    swiperItemClick: function (e) {
        const newsItem = this.data.swiper[e.currentTarget.id]
        this.jumpToDetail(newsItem)
    },

    listItemClick: function (e) {
        const newsItem = this.data.newsList[e.currentTarget.id]
        this.jumpToDetail(newsItem)
    },

    jumpToDetail: function (item) {
        wx.navigateTo({
            url: `../detail/detail?newsId=${item.newsId}`
        })    
    },

    fetchDataList: function (isSwiper) {
        wx.request({
            url: `${config.service.host}/weapp/newsList`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                isSwiper,
                row: this.data.row
            },
            success: res => {
                if (isSwiper) {
                    this.setData({
                        swiper: res.data.data.list
                    })
                } else {
                    this.setData({
                        newsList: this.data.row == 0 ? res.data.data.list : this.data.newsList.concat(res.data.data.list),
                        hasMore: res.data.data.hasMore
                    })    
                }
            }
        })
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    onReachBottom: function () {
        if (this.data.hasMore) {
            this.setData({
                row: ++this.data.row
            })
            this.fetchDataList(false)
        }
    }
})