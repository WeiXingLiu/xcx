
Component({
    properties: {
        imageResource: {
            type: Array,
            value: []
        },
        row: {
            type: Number,
            value: 1
        },
        canEdit: {
            type: Boolean,
            value: true
        }
    },
    
    data: {

    },

    methods: {    
        previewImage: function (event) {
            wx.previewImage({
                current: this.properties.imageResource[parseInt(event.currentTarget.id)],
                urls: this.properties.imageResource
            })
        },
    
        deleteImage: function (event) {
            this.triggerEvent('deleteImage', {current: this.properties.imageResource[parseInt(event.currentTarget.id)], urls: this.properties.imageResource})
        },

        chooseImage: function (event) {
            this.triggerEvent('chooseImage', {current: this.properties.imageResource[parseInt(event.currentTarget.id)], urls: this.properties.imageResource})
        }
    }
})