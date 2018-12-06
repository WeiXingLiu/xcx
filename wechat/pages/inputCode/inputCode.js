Page({
    data: {

    },

    inputCode: function (event) {
        if (event.detail.value.length == 8) {
            wx.setStorage({
                key: "reportInputBikeCode",
                data: event.detail.value,
                success: res => {
                    wx.navigateBack({
                        delta: 1
                    })        
                }
            })
        }
    }
})