//index.js
//获取应用实例
const app = getApp()
const api = require('../../api/api.js')
Page({
    data: {
        motto: 'Hello World',
        postLoading: true,
        userInfo: {},
        hasUserInfo: false,
        heights: "",
        currentTab: 0,
        currentCat: 0,
        catActiveLeft: 0,
        postLoading: false,
        catMask: false,
        tabBar: [
            {
                name: '首页',
                id: "home",
                icon: 'home',
                url: ''
            }, {
                name: '收藏',
                id: "tag",
                icon: 'tag',
                url: ''
            },
            {
                name: '搜索',
                id: "search",
                icon: 'search',
                url: ''
            },
            {
                name: '我',
                id: "member",
                icon: 'member',
                url: ''
            }
        ],
        hotCategory: [
            {
                postTitle: "这座城市的风很大，孤独的人总是很晚才回家",
                postImg: 'http://mpic.tiankong.com/420/a1f/420a1f82dc1cdb5d6c4f0c6027ae8d52/640.jpg@!670w',
                postDate: '2018/12/12'
            },
            {
                postTitle: "这座城市的风很大，孤独的人总是很晚才回家",
                postImg: 'http://mpic.tiankong.com/f24/29e/f2429e13fcafcf66d39c340a3aa7aecc/640.jpg@!670w',
                postDate: '2018/12/12'
            }
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        console.log(app)
        this.setData({
            isPx: app.globalData.isPx
        })
        this.getPosts()
    },
    onShow: function (e) {
        // this.getPosts()
    },
    //滑动切换选项卡
    bindChange: function (e) {
        this.setData({ currentTab: e.detail.current })
    },
    getPosts: function (getMore) {
        let pageData = {}
        if (getMore) {
            const id = this.data.categories[this.data.currentCat].id
            let posts = this.data.posts
            const parmas = {
                page: this.data.postsPage + 1,
                per_page: 5,
                categories: id
            }
            api.posts(parmas).then((res) => {
                // console.log(posts.push(res.data))
                console.log(res)
                let newPosts = res.data
                if (res.statusCode==200) {
                    for (let item of newPosts) {
                        posts.push(item)
                    }
                    this.setData({
                        posts: posts,
                        postsPage: this.data.postsPage + 1,

                    })
                } else {
                    this.setData({
                        moreOver: true
                    })
                    
                }
            })
        } else {
            this.setData({
                postLoading: true
            })
            //分类
            api.categories().then((res) => {
                console.log(res)
                pageData.categories = res.data
                return res.data
            })
                .then((res) => {
                    const parmas = {
                        categories: res[0].id,
                        page: 1,
                        per_page: 5
                    }
                    //文章
                    return api.posts(parmas).then((res) => {
                        console.log("POSTS::", res)
                        pageData.posts = res.data
                        pageData.postsPage = 1
                        pageData.postLoading = false
                    })

                }).then((res) => {
                    const datas = Object.assign(this.data, pageData)
                    this.setData(datas)
                })
        }
    },
    togglePosts: function (e) {
        console.log(e)
        this.setData({
            postLoading: true,
            catMask: false
        })

        api.posts({ categories: e.target.id }).then((res) => {
            this.setData({
                posts: res.data,
                currentCat: e.target.dataset.index,
                catActiveLeft: e.target.offsetLeft,
                postLoading: false
            })
        })
    },
    touchTab:function(e){
       this.setData({
           page:e.detail.id
       })
    },
    showCat: function (e) {
        console.log(e)
        this.setData({
            catMask: !this.data.catMask
        })
    },
    toDdetail: function (e) {
        console.log(e.currentTarget.id)
        wx.navigateTo({
            url: '../../pages/sing/sing?id=' + e.currentTarget.id,
        })
    },
    onPullDownRefresh: function (e) {
        this.setData({
            downRefresh: true
        })

        setTimeout(() => {
            wx.stopPullDownRefresh() //停止下拉刷新
            this.setData({
                downRefresh: false
            })
        }, 2000)
    },
    onReachBottom: function (e) {
        this.setData({
            pageToBottom: true
        })
        this.getPosts(true)
    },
    searchPage:function(e){
        console.log(e)
        api.posts({serach:e.detail.value})
        .then(res => {
            console.log(res)
        })
    },
})
