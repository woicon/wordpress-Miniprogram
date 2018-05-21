// component/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabBar:{
        type:Array,
        value: [
            {
                name: 'my',
                id:"home",
                icon: 'home',
                url: ''
            }, {
                name: 'order',
                id: "tag",
                icon: 'tag',
                url: ''
            }, {
                name: 'my',
                id: "search",
                icon: 'search',
                url: ''
            }, {
                name: 'my',
                id: "member",
                icon: 'member',
                url: ''
            },
        ],
        observer: function (newVal, oldVal) {

        }
    },
    isPx:{
        type:Boolean,
        value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      currTab:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
      touchTabBar:function(e){
          console.log(e)
          this.setData({
              currTab: e.currentTarget.id,
          })
          var myEventDetail = e.currentTarget.dataset.detail
           // detail对象，提供给事件监听函数
          var myEventOption = {
             
          } // 触发事件的选项
          this.triggerEvent('touchTabBar', myEventDetail, myEventOption)
      }
  }
})
