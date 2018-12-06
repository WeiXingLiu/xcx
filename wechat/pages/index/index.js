Page({
    data: {
        latitude: null,
        longitude: null,
        markers: []    
    },

    getCurrentLocation: function () {
        wx.getLocation({
            type: "gcj02",
            success: res => {
                this.makeMarkers(res, true)
            },
            fail: res => {

            },
            complete: res => {

            }
        })
    },

    getCenterLocation: function () {
        this.mapCtx.getCenterLocation({
            success: res => {
                this.makeMarkers(res, false)
            },
            fail: res => {
            },
            complete: res => {
            }
        })
    },

    makeMarkers: function (res, isCurrentLocation) {
        let markers = [1, 2, 3, 4, 5].map((item ,index) => {
            const value = Math.ceil(Math.random() * 10) * 0.00008 * (index % 2 ? 1 : -1)
            return {
                "id": index + 1,
                "latitude": res.latitude + value,
                "longitude": res.longitude + value,
                "iconPath": "../../icon/marker.png",
                "title": index + 1
            }
        })
        if (isCurrentLocation) {
            this.setData({
                latitude: res.latitude,
                longitude: res.longitude,
                markers: markers
            })
        } else {
            this.setData({
                markers: markers
            })
        }
        
    },

    onReady: function () {
        this.mapCtx = wx.createMapContext('myMap', this)
    },

    onLoad: function () {
        this.getCurrentLocation()
    },

    tapBlueTooth: function () {

    },
    report: function () {
        wx.navigateTo({
            url: '../report/report',
        })
    },
    location: function () {
        this.getCurrentLocation()
    },
    bindupdated: function () {
        this.getCenterLocation()
    },
    scanCode: function () {
        wx.scanCode({
            success: res => {
                console.log('res', res)
                wx.showToast({
                    title: res.result,
                })
            }, 
            fail: res => {
                console.log('res', res)
                wx.showToast({
                    title: res.errMsg,
                })
            }, 
            complete: res => {
                // wx.showToast({
                //     title: 'complete' + res,
                // })
            }
        })
    }
})