// pages/sing/sing.js
const app = getApp()
const api = require('../../api/api.js')
const WxParse = require('../../wxParse/wxParse.js')
Page({
    data: {
        html: "",
        loading: true,
        favSing: false
    },
    onShow: function () {
        console.log("show")
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {



        let that = this
        let html = this.data.html

        this.setData({
            isPx: app.globalData.isPx
        })
        api.sing(options.id).then((res) => {
            console.log("sing::::", res)
            const sing = res.data
            this.setData({
                title: sing.title.rendered,
                // article: sing.content.rendered,
                time: sing.date,
                loading: false
            })
            const article = sing.content.rendered
            WxParse.wxParse('article', 'html', article, that, 5);
            wx.setNavigationBarTitle({
                title: sing.title.rendered,
            })
        })
    },
    favSing: function (e) {
        let fav = this.data.favSing
        this.setData({
            favSing: !fav
        })
    },
    shareSing: function (e) {
     
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            console.log(res.target)
        }

        return {
            title: '自定义转发标题4234234234234234234',
            path: '/page/user?id=123'
        }
    },
    onReady: function () {

    },

    onShow: function () {

    },
    onUnload: function () {

    },
    onShareAppMessage: function () {

    }
})