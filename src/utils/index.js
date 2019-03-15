const api = require('./api.js')

console.log(api)

function wxLogin(callback) {
  // mpvue.setStorage({
  //   key: 'openid',
  //   data: '54654654654654654654654',
  //   complete: function () {
  //     console.log(mpvue.getStorageSync('openid'))
  //   }
  // })
  let openid = mpvue.getStorage('openid') || '11111'
  console.log('openid = ' + openid)
  if (openid) {
    callback && callback()
  } else {
    wx.login({
      success(result) {
        console.log(result)
        // return false
        wx.showLoading({
          mask: true
        })
        wx.request({
          url: api.wxlogin,
          method: 'post',
          data: {
            code: result.code
          },
          success: function (res) {
            // console.log(res)
            wx.hideLoading()

            // wx.navigateTo({
            //   // url: '/pages/store/store'
            //   url: `/pages/salesup/salesup?storeid=31960`
            //   // url: '/pages/login/login'
            //   // url: '/pages/travel/travel'
            //   // url: '/pages/attendance/attendance'
            // })

            if (res.data.code === 1) {
              // 1 表示已经登录
              // 保存用户信息
              mpvue.setStorage({
                key: 'openid',
                data: res.data.openid,
                complete: function () {
                  callback && callback()
                }
              })
            } else {
              // !1表示还没登录
              mpvue.setStorage({
                key: 'openid',
                data: res.data.openid,
                complete: function () {
                  wx.redirectTo({
                    url: '/pages/register/register'
                  })
                }
              })
            }
          },
          fail: function (res) {
            // alert('网络异常，请稍后重试')
            console.error(res)
            wx.hideLoading()
          }
        })
      }
    })
  }





}

// 封装wx.request方法
// 添加 isShowLoading isVerifyLogin isShowError 字段
function request(config) {
  let { url, method, data, header, dataType, responseType, success, fail, complete, isShowLoading = true, isVerifyLogin = true, isShowError = true } = config
  if (isShowLoading) {
    wx.showLoading({
      mask: true
    })
  }

  function post() {
    wx.request({
      url: url,
      method: method || 'GET',
      header: header || {},
      dataType: dataType || 'json',
      responseType: responseType || 'text',
      data: data,
      success(res) {
        success && success(res)
      },
      fail(res) {
        if (isShowError) {
          wx.showModal({
            title: '提示',
            content: '网络异常 请稍后重试',
            showCancel: false
          })
        }
        fail && fail(res)
      },
      complete(res) {
        if (isShowLoading) {
          wx.hideLoading()
        }
        complete && complete(res)
      }
    })
  }

  if (isVerifyLogin) {
    console.log('校验登录后发起请求')
    wxLogin(function () {
      post()
    })
  } else {
    console.log('没校验登录发起请求')
    post()
  }
}







// // 提示
// function alert(msg) {
//   wx.showModal({
//     title: '提示',
//     content: msg,
//     showCancel: false
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
//         url: api.getPhotoUrl,
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
  api,
  wxLogin,
  request
  // alert,
  // uploadImage,
  // compressImage: compressImage
}
