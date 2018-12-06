Page({
    data: {
        departmentInfo: [{
                id: '1',
                iconName: '../../icon/radio-unchecked.png',
                iconSelectedName: '../../icon/radio-checked.png',
                departmentName: '锁',
                selected: false
            },
            {
                id: '2',
                iconName: '../../icon/radio-unchecked.png',
                iconSelectedName: '../../icon/radio-checked.png',
                departmentName: "刹车",
                selected: false
            },
            {
                id: '3',
                iconName: '../../icon/radio-unchecked.png',
                iconSelectedName: '../../icon/radio-checked.png',
                departmentName: '链条',
                selected: false
            },
            {
                iconName: '../../icon/radio-unchecked.png',
                iconSelectedName: '../../icon/radio-checked.png',
                departmentName: '脚踏',
                selected: false
            },
            {
                id: '4',
                iconName: '../../icon/radio-unchecked.png',
                iconSelectedName: '../../icon/radio-checked.png',
                departmentName: "二维码",
                selected: false
            },
            {
                id: '5',
                iconName: '../../icon/radio-unchecked.png',
                iconSelectedName: '../../icon/radio-checked.png',
                departmentName: '车把',
                selected: false
            },
            {
                id: '6',
                iconName: '../../icon/radio-unchecked.png',
                iconSelectedName: '../../icon/radio-checked.png',
                departmentName: '车轮',
                selected: false
            },
            {
                id: '7',
                iconName: '../../icon/radio-unchecked.png',
                iconSelectedName: '../../icon/radio-checked.png',
                departmentName: '其他',
                selected: false
            }
        ],
        bikeCode: null,
        showInput: false,
        reportDetail: '',
        imageResource: []
    },

    onShow: function () {
        wx.getStorage({
            key: "reportInputBikeCode",
            success: res => {
                this.setData({
                    bikeCode: res.data
                })
                //清空缓存
                wx.removeStorage({
                    key: "reportInputBikeCode",
                    fail: res => {
                        wx.setStorage({
                            key: "reportInputBikeCode",
                            data: ""
                        })
                    }
                })
            }
        })
    },

    enterCodeClick: function () {
        wx.showActionSheet({
            itemList: ["重新扫码", "手动输入编码"],
            success: res => {
                this.inputOrScan(res.tapIndex)
            },
            fail: res => {
                wx.showToast({
                    title: res.errMsg,
                    duration: 1500
                })
            }
        })
    },

    inputOrScan: function (index) {
        if (index == 0) {
            wx.scanCode({
                onlyFromCamera: true,
                success: res => {
                    this.setData({
                        bikeCode: res.result
                    })
                },
                fail: res => {
                    wx.showToast({
                        title: res.errMsg,
                        duration: 1500
                    })
                }
            })
        } else {
            wx.navigateTo({
                url: "../inputCode/inputCode"
            })
        }
    },

    departmenClick: function (event) {
        let departmentInfo= this.data.departmentInfo
        let departmentObject = departmentInfo[event.currentTarget.id]
        departmentObject.selected = !departmentObject.selected
        this.setData({
            departmentInfo: departmentInfo,
            showInput: this.isSelectDepartment(departmentInfo)

        })
    },

    isSelectDepartment: function (departmentInfo) {
        return departmentInfo.find((item, index) => {
            return item.selected == true
        }) != undefined
    },

    chooseImage: function () {
        wx.showActionSheet({
            itemList: ['相机', '从相册选取'],
            success: res => {
                wx.chooseImage({
                    count: 3 - this.data.imageResource.length,
                    sourceType: res.tapIndex == 0 ? ["camera"] : ["album"],
                    success: res => {
                        let imageResource = this.data.imageResource
                        res.tempFilePaths.map(item => {
                            imageResource.push(item)
                        })
                        this.setData({
                            imageResource: imageResource
                        })
                    }
                })
            }
        })
    },

    deleteImage: function (event) {
        let imageResource = this.data.imageResource
        imageResource.splice(event.currentTarget.id, 1)
        this.setData({
            imageResource: imageResource
        })
    },

    detailInput: function (event) {
        this.setData ({
            reportDetail: event.detail.value
        })
    },

    submitDetail: function () {
        const title = "code " + this.data.bikeCode + "\n" + "id" + this.getSelectIdString() + '\n' + "detail" + this.data.reportDetail

        wx.showToast({
            title: title,
            duration: 1500
        })
    },

    getSelectIdString: function () {
        let ids = ''
        this.data.departmentInfo.map((item, index) => {
            if (item.selected == true) {
                ids += item.id
            }
        })
        return ids
    }
})