const config = require('../../config')
Page ({
    data: {
        currentPage: 0,
        searchKey: '',
        questionList: [],
        hasMore: false
    },

    onShow: function () {
         wx.getStorage({
             key: 'shouldRefreshData',
             success:res => {
                if (parseInt(res.data)) {
                    this.fetchDataList()
                    this.removeStorage('shouldRefreshData')
                }        
             }
         })
    },

    removeStorage:function (key) {
        wx.removeStorage({
            key: key
        })
    },

    onLoad: function () {
        this.fetchDataList()
        this.removeStorage('shouldRefreshData')
    },

    fetchDataList: function () {
        wx.request({
            url:`${config.service.host}/weapp/getQuestionList`,
            method: 'POST',
            data: {
                currentPage: this.data.currentPage,
                searchKey: this.data.searchKey
            },
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                wx.stopPullDownRefresh()
                if (res['statusCode'] == 200) {
                    let questionList = this.data.questionList
                    if (this.data.currentPage == 0) {
                        questionList = []
                    }
                    res.data.data.list.map(item => {
                        let photoItem = item
                        photoItem['photoUrls'] = item.photoUrls ? item.photoUrls.split(',') : []
                        photoItem['row'] = parseInt(photoItem['photoUrls'].length / 3) + (photoItem['photoUrls'].length % 3 != 0)
                        questionList.push(photoItem)
                    })

                    this.setData({
                        questionList: questionList,
                        hasMore: res.data.data.hasMore
                    })
                }
            }
        })
    },

    searchKeyChanged: function (event) {
        this.setData({
            searchKey: event.detail.value
        })
    },

    inputSerachKeyComplete: function () {
        this.fetchDataList()
    },

    clearSearchKey: function () {
        if (this.data.searchKey) {
            this.setData({
                searchKey: ''
            })
            this.fetchDataList()    
        }
    },

    askQuestion: function () {
        wx.navigateTo({
            url: `../ask/ask`
        })
    },

    tapItem: function (event) {
        wx.navigateTo({
            url: `../detail/detail?id=${event.currentTarget.id}`
        })
    },

    onPullDownRefresh: function () {
        this.setData({
            currentPage: 0
        })
        this.fetchDataList()
    },

    onReachBottom: function () {
        if (this.data.hasMore) {
            this.setData({
                currentPage: ++this.data.currentPage
            })
            this.fetchDataList()    
        }
    },
})