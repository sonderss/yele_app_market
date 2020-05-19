
// #ifdef APP-PLUS
const main = plus.android.runtimeMainActivity()
// 为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台
// plus.runtime.quit = function () {
//   main.moveTaskToBack(false)
// }
// 重写toast方法如果内容为 ‘再按一次退出应用’ 就隐藏应用，其他正常toast
plus.nativeUI.toast = function (str) {
  console.log(str)
  if (str === '再按一次退出ying用') {
    main.moveTaskToBack(false)
    return false
  } else {
    plus.nativeUI.toast("条码添加成功");
  }
}
// #endif
