const API = require('./api.js')

console.log(API)

function wxLogin(callback) {
  wx.login({
    success(result) {
      console.log(result)
      // return false
      // wx.showLoading({
      //   mask: true
      // })
      // wx.request({
      //   url: API.wxlogin,
      //   method: 'post',
      //   data: {
      //     code: result.code
      //   },
      //   success: function (res) {
      //     // console.log(res)
      //     wx.hideLoading()

      //     // wx.navigateTo({
      //     //   // url: '/pages/store/store'
      //     //   url: `/pages/salesup/salesup?storeid=31960`
      //     //   // url: '/pages/login/login'
      //     //   // url: '/pages/travel/travel'
      //     //   // url: '/pages/attendance/attendance'
      //     // })

      //     if (res.data.code === 1) {
      //       // 1 表示已经登录
      //       // 保存用户信息
      //       App.globalData.openid = res.data.openid
      //       App.globalData.userInfo = res.data.data
      //       callback && callback()
      //     } else {
      //       App.globalData.openid = res.data.openid
      //       // !1表示还没登录
      //       wx.redirectTo({
      //         url: '/pages/register/register'
      //       })
      //     }
      //   },
      //   fail: function (res) {
      //     // alert('网络异常，请稍后重试')
      //     console.error(res)
      //     wx.hideLoading()
      //   }
      // })
    }
  })
}

// 统一微信登录函数
// function wxLogin(App, callback, isVerifyUserInfo = true) {
//   // App.globalData.openid = 'ssss'
//   // console.log('openid', App.globalData.openid)
//   // console.log('userInfo', App.globalData.userInfo)
//   console.log('isVerifyUserInfo', isVerifyUserInfo)
//   if (isVerifyUserInfo ? (App.globalData.openid && App.globalData.userInfo) : App.globalData.openid) {
//     callback && callback()
//   } else {
//     wx.login({
//       success(result) {
//         // console.log(result)
//         // return false
//         wx.showLoading({
//           mask: true,
//         })
//         wx.request({
//           url: API.wxLogin,
//           method: 'post',
//           data: {
//             code: result.code
//           },
//           success: function (res) {
//             // console.log(res)
//             wx.hideLoading()

//             // wx.navigateTo({
//             //   // url: '/pages/store/store'
//             //   url: `/pages/salesup/salesup?storeid=31960`
//             //   // url: '/pages/login/login'
//             //   // url: '/pages/travel/travel'
//             //   // url: '/pages/attendance/attendance'
//             // })

//             if (res.data.code === 1) {
//               // 1 表示已经登录
//               // 保存用户信息
//               App.globalData.openid = res.data.openid
//               App.globalData.userInfo = res.data.data
//               callback && callback()
//             } else {
//               App.globalData.openid = res.data.openid
//               // !1表示还没登录
//               wx.redirectTo({
//                 url: '/pages/register/register'
//               })
//             }
//           },
//           fail: function (res) {
//             // alert('网络异常，请稍后重试')
//             console.error(res)
//             wx.hideLoading()
//           }
//         })
//       }
//     })
//   }
// }





// // 提示
// function alert(msg) {
//   wx.showModal({
//     title: '提示',
//     content: msg,
//     showCancel: false
//   })
// }



// // 请求接口
// function request(config) {
//   let { api, apiName, data, callback, hideFail } = config
//   let APP = getApp()
//   let globalData = APP.globalData

//   wxLogin(APP, function () {
//     data.openid = globalData.openid
//     data.openId = globalData.openid
//     wx.showLoading({
//       mask: true,
//     })
//     wx.request({
//       url: `${globalData.host}/${api}`,
//       method: 'POST',
//       data: data,
//       success(res) {
//         wx.hideLoading()
//         if (res.data.code === 1) {
//           callback && callback(res)
//         } else {
//           if (!hideFail) {
//             alert(`${apiName}失败`)
//           }
//           res.data.openid = globalData.openid
//           res.data.data = data
//           wx.getSystemInfo({
//             success(res2) {
//               res.data.version = res2.SDKVersion
//             }
//           })
//         }
//       },
//       fail() {
//         wx.hideLoading()
//         if (!hideFail) {
//           alert('网络异常，请稍后重试')
//         }
//       }
//     })
//   })
// }

// // 请求接口
// function post(config) {
//   let { url, data, success, fail } = config
//   let App = getApp()
//   data.openid = App.globalData.openid
//   wxLogin(App, function () {
//     wx.showLoading({
//       mask: true,
//     })
//     wx.request({
//       url: url,
//       method: 'POST',
//       data: data,
//       success(res) {
//         wx.hideLoading()
//         success && success(res)
//       },
//       fail(res) {
//         wx.hideLoading()
//         alert('网络异常，请稍后重试')
//         fail && fail(res)
//       }
//     })
//   })
// }

// // 图片上传
// function uploadImage(config) {
//   let { picUrl, callback, hideFail, fail } = config
//   let APP = getApp()
//   let globalData = APP.globalData
//   if (globalData.openid) {
//     let data = {
//       openid: globalData.openid
//     }
//     wxLogin(APP, function () {
//       wx.showLoading({
//         mask: true,
//       })
//       wx.uploadFile({
//         url: API.getPhotoUrl,
//         filePath: picUrl,
//         name: 'photo',
//         formData: data,
//         success(res) {
//           wx.hideLoading()
//           res.data = JSON.parse(res.data)
//           if (res.data.code === 1) {
//             callback && callback(res)
//           } else {
//             fail && fail()
//             if (!hideFail) {
//               alert('图片上传失败')
//             }
//             res.data.openid = globalData.openid
//             res.data.data = data
//             wx.getSystemInfo({
//               success(res2) {
//                 res.data.version = res2.SDKVersion
//               }
//             })
//           }
//         },
//         fail() {
//           fail && fail()
//           wx.hideLoading()
//           if (!hideFail) {
//             alert('网络异常，请稍后重试')
//           }
//         }
//       })
//     }, false)
//   }
// }

// const formatDate = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   return [year, month, day].map(formatNumber).join('-')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

// const postUrl = (url, data, callBack) => {
//   wx.showLoading({
//     mask: true,
//   })
//   wx.request({
//     url: url,
//     data: data,
//     method: 'POST',
//     success: function (res) {
//       wx.hideLoading()
//       if (callBack) {
//         callBack(res)
//       }
//     },
//     fail: function (error) {
//       wx.hideLoading()
//     }
//   })
// }

// // 图片压缩
// function compressImage(imageUrl, callback, quality) {
//   wx.getSystemInfo({
//     success: function (res) {
//       var version = res.SDKVersion
//       version = version.replace(/\./g, '')
//       if (parseInt(version) < 193) {
//         callback && callback({
//           tempFilePath: imageUrl
//         })
//       } else {
//         var canvas = wx.createCanvasContext('compressImage')
//         wx.getImageInfo({
//           src: imageUrl,
//           success: function (res) {
//             var width = res.width
//             var height = res.height
//             var bit = 500 / (width > height ? width : height)
//             var desW = parseInt(bit * width), desH = parseInt(bit * height)
//             canvas.drawImage(imageUrl, 0, 0, desW, desH)
//             canvas.draw(false, function () {
//               wx.canvasToTempFilePath({
//                 canvasId: 'compressImage',
//                 fileType: 'jpg',
//                 quality: quality || 0.1,
//                 width: desW,
//                 height: desH,
//                 destWidth: desW,
//                 destHeight: desH,
//                 success: function (res) {
//                   wx.hideLoading()
//                   callback && callback(res)

//                   // wx.saveImageToPhotosAlbum({
//                   //   filePath: res.tempFilePath,
//                   //   success: function (res) {
//                   //     console.log('this save file is ===> ', res)
//                   //   },
//                   //   fail: function (res) {
//                   //     console.log('save fail => ', res)
//                   //   }
//                   // })
//                 },
//                 fail: function (res) {
//                   wx.hideLoading()
//                   console.log('fail => ', res)
//                 }
//               })
//             })
//           }
//         })
//       }
//     }
//   })
// }

module.exports = {
  API,
  wxLogin,
  aaa: '56757465'
  // wxLogin,
  // post,
  // alert,
  // request,
  // postUrl,
  // uploadImage,
  // formatDate: formatDate,
  // compressImage: compressImage
}
