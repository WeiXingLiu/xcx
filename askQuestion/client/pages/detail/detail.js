const config = require('../../config')

Page({
    data: {
        hasMore: false,
        currentPage: 0,
        detail: {},
        commentsList: [],
        hideCommnet: true,
        comment: '',
        star: 0
    },

    onLoad: function (options) {

        wx.request({
            url: `${config.service.host}/weapp/getDetail`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                id: options.id
            },
            success: res => {
                const detail = res.data.data
                detail['photoUrls'] = detail.photoUrls ? detail.photoUrls.split(',') : []
                detail['row'] = parseInt(detail['photoUrls'].length / 3) + (detail['photoUrls'].length % 3 != 0)

                this.setData({
                    detail: detail,
                })

                this.fetchComments(options.id, this.data.currentPage)
            }
        })
    },

    fetchComments: function (questionId, row) {
        wx.request({
            url: `${config.service.host}/weapp/getComments`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                questionId: questionId,
                row: row
            },
            success: res => {
                wx.stopPullDownRefresh()
                
                let commentsList = this.data.commentsList
                if (row == 0) {
                    commentsList = []
                }
                res.data.data.list.map(item => {
                    commentsList.push(item)
                })
                this.setData({
                    currentPage: row,
                    commentsList: commentsList,
                    hasMore: res.data.data.hasMore
                })
            }
        })
    },

    clickTool: function (event) {
        switch (parseInt(event.currentTarget.id)) {
            case 0:
                this.likeClick()
            break
            case 1:
             this.commentClick()
            break
            default:
                this.shareClick()
            break
        }
    },

    likeClick: function () {
        wx.request({
            url: `${config.service.host}/weapp/like`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                'id': this.data.detail.id
            },
            success:res => {
                let detail = this.data.detail
                detail['likeStatus'] = res.data.data.likeStatus
                detail['likeCount'] = res.data.data.likeCount
                this.setData({
                    detail: detail
                })
            }
        })
    },

    commentClick: function () {
        this.setData({
            hideCommnet: false
        })
    },
    
    shareClick: function () {

    },

    sendCommnet: function () {
        wx.request({
            url: `${config.service.host}/weapp/comments`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                'questionId': this.data.detail.id,
                'comment': this.data.comment
            },
            success: res => {
            
                if (res.data.code == '200') {
                    this.setData({
                        hideCommnet: true,
                        comment: ''
                    })
                    this.fetchComments(this.data.detail.id, 0)
                }
            },
            complete: res => {
                wx.showToast({
                    title: res.data.msg,
                    duration: 1500
                })           
             }
        })
    },

    inputChanged: function (e) {
        this.setData({
            comment: e.detail.value
        })
    },

    onPullDownRefresh: function () {
        this.fetchComments(this.data.detail.id, 0)
    },

    onReachBottom: function () {
        if (this.data.hasMore) {
            this.fetchComments(this.data.detail.id, ++this.data.currentPage)
        }
    },

    imageClick: function (e) {
        this.setData({
            star: e.detail
        })
    }
})