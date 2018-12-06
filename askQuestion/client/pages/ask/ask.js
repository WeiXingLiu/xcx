const config = require('../../config')
const util = require('../../utils/util')

Page({
    data: {
        question: '',
        row: 1,
        imageResource: [],
        imageUrlResource: []
    },

    onLoad: function () {
    },

    inputChanged: function (event) {
        this.setData({
            question: event.detail.value
        })
    },

    chooseImage: function () {
        wx.chooseImage({
            count: 9 - this.data.imageResource.length,
            sourceType: ['album', 'camera'],
            success: res => {
                let imageResource = this.data.imageResource
                res.tempFilePaths.map(item => {
                    imageResource.push(item)
                })
                this.setData({
                    imageResource: imageResource,
                    row: parseInt(imageResource.length / 3) + (imageResource.length < 9),
                })
            },
            fail: res => {
                wx.showToast({
                    title: '图片选择失败'
                })
            }
        })
    },

    previewImage: function (event) {
        wx.previewImage({
            current: event.currentTarget.id,
            urls: this.data.imageResource
        })
    },

    deleteImage: function (event) {
        let imageResource = this.data.imageResource
        imageResource.splice(event.currentTarget.id, 1)

        let imageUrlResource = this.data.imageUrlResource
        imageUrlResource.splice(event.currentTarget.id, 1)

        this.setData({
            imageResource: imageResource,
            row: parseInt(imageResource.length / 3) + 1,
            imageUrlResource: imageUrlResource
        })
    },

    submitBtn: function () {
        wx.showLoading({
            title: '上传中',
            mask: true
        })
        if (this.data.imageResource.length) {
            this.data.imageResource.map((item, index) => {
                this.uploadImage(item)
            })
        } else {
            this.submitInfo()
        }
    },

    uploadImage: function (item) {
        wx.uploadFile({
            url: config.service.uploadUrl,
            filePath: item,
            name: 'file',
            success: res => {
                const result = JSON.parse(res.data);
                this.uploadImageComplete(result.data.imgUrl)
            },
            fail: res => {
                this.uploadImageComplete('fail')
            }
        })
    },

    uploadImageComplete: function (imgUrl) {
        let imageUrlResource = this.data.imageUrlResource
        imageUrlResource.push(imgUrl)
        this.setData({
            imageUrlResource: imageUrlResource
        })
        this.submitInfo()
    },
     
    submitInfo: function () {
        if (this.data.imageResource.length == this.data.imageUrlResource.length) {
            wx.request({
                url: `${config.service.host}/weapp/submitQuestion`,
                method: 'POST',
                data: {
                    'photoUrls': this.data.imageUrlResource.filter(item => {
                        return item != 'fail'
                    }).join(','),
                    'title': this.data.question,
                    'asker': parseInt(Math.random() * 10),
                    'askDate': util.formatDateTime(new Date()) 
                },
                header: {
                    'content-type': 'application/json'
                },
                success: res => {
                    this.hideLoading()
                    wx.setStorageSync('shouldRefreshData', '1')

                    wx.navigateBack({
                        delta: 1
                    })
                }, 
                fail: res => {
                    this.hideLoading()
                    wx.showToast({
                        title: '提交失败',
                        mask: true
                    })
                }
            })
        }
    },

    hideLoading: function () {
        this.setData({
            imageUrlResource: []
        })
        wx.hideLoading()
    },

})