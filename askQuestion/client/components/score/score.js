
Component({
    properties:{
          star:{
              type: Number,
              value: 0
          },
          editable: {
              type: Boolean,
              value: true
          }
    },

    methods: {
        imageClick: function (e) {
            if (this.properties.editable) {
                let currentX = e.detail.x
                let parentX = e.currentTarget.offsetLeft
                let offset = currentX - parentX
                let score = offset / 125 * 5
                this.triggerEvent('scoreClick', score)    
            }
        }
    }
})