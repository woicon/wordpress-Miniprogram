const API = 'https://ziranzhi.com/wp-json/wp/v2/'
function req(url, parmas) {
    return new Promise((res, rej) => wx.request({
        url: API + url,
        method: 'GET',
        data:parmas,
        success: (data) => {
            res(data)
        },
        fail: (error) => {
            rej(error)
        }
    })
    )
}
module.exports = {
    posts: parmas => req('posts/', parmas), //文章
    sing: id => req('posts/'+id), //文章详情
    media: parmas => req('media/', parmas), //素材
    categories: parmas => req('categories/', parmas), //分类
    tags: parmas => req('tags/', parmas), //标签
    comments: parmas => req('comments/', parmas), //留言
    users: parmas => req('users/', parmas), //用户
    pages: parmas => req('pages/', parmas), //页面
    types: parmas => req('types/', parmas), //类别
}