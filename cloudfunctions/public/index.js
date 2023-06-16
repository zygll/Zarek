// 云函数入口文件
const cloud = require('wx-server-sdk')
console.log(cloud);
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('成功获取用户信息')
  console.log(wxContext)
  console.log(event.action)
  switch (event.action) {
    case 'getUrlScheme': {
      return getUrlScheme()
    }
  }

  return 'action not found'
}

async function getUrlScheme() {
  return cloud.openapi.urlscheme.generate({
    jumpWxa: {
      path: '/pages/index2/index2', // <!-- replace -->
      query: '',
    },
    // 如果想不过期则置为 false，并可以存到数据库
    isExpire: false,
    // 一分钟有效期
    expireTime: parseInt(Date.now() / 1000 + 60),
  })
}
