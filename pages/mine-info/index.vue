<template>
  <view class="mine-info">
    <view class="cell-wrap p-lr-30 p-tb-20">
      <min-cell :card="false">
        <min-cell-item
          :img="userInfo.head_img"
          :title="userInfo.store_name"
          tail="编辑头像"
          imgSize="sm"
          :border="true"
           @eventParent="changeHeadImg"
          arrow
        ></min-cell-item>
        <min-cell-item
          title="名字" :tail="userInfo.user_name"
          :border="true" arrow
        ></min-cell-item>
        <picker @change="bindPickerChange" :value="index" :range="sex">
        <min-cell-item
          title="性别"  :tail="sex[index]"
          :border="true" arrow
        ></min-cell-item>
        </picker>
        <picker @change="bindPickerChange1" :value="index1" :range="minzu">
          <min-cell-item
            title="民族" :tail="minzu[index1]"
            :border="true" arrow
          ></min-cell-item>
        </picker>
        <picker mode="date"  @change="bindPickerChange2" >
          <min-cell-item
            title="出生日期" :tail="date"
            :border="true" arrow
          ></min-cell-item>
        </picker>
        <min-cell-item
          title="手机" :tail="userInfo.mobile"
          :border="false" arrow
          @eventParent="setPhone"
        ></min-cell-item>
      </min-cell>
      <view class="m-top-20"></view>
      <min-cell :card="false">
        <min-cell-item
          title="实名认证" :tail="userInfo.is_certify === 1 ? '已认证':'未认证'"
          :border="true" arrow
          tailType="red"
           @eventParent="toFace"
        ></min-cell-item>
        <min-cell-item
          title="提现方式"
          :border="false" arrow
          @eventParent="payMethods"
        ></min-cell-item>
      </min-cell>
    </view>
    <view class="m-top-30 p-lr-30">
      <min-btn type="white" @click="quit">退出登录</min-btn>
    </view>
    <min-modal ref="show"></min-modal>
  </view>
</template>

<script>
export default {
  name: 'mine-info',
  navigate: ['navigateTo'],
  data () {
    return {
      minzu: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '土家族', '彝族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族', '哈尼族',
        '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族', '东乡族', '高山族', '拉祜族', '水族', '佤族', '纳西族', '羌族', '土族', '仫佬族', '锡伯族',
        '柯尔克孜族', '达斡尔族', '景颇族', '毛南族', '撒拉族', '布朗族', '塔吉克族', '阿昌族', '普米族', '鄂温克族', '怒族', '京族', '基诺族', '德昂族', '保安族',
        '俄罗斯族', '裕固族', '乌孜别克族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族', '珞巴族'],
      sex: ['不限', '男', '女'],
      index: 0,
      index1: 0,
      date: '2020/3/20',
      userInfo: {},
      phone: ''
    }
  },
  onLoad () {
    // this.phone = this.$store.state.user.userInfo.mobile
  },
  mounted () {
    this.$minApi.userInfo().then(res => {
      console.log(res)
      this.userInfo = res
      this.userInfo.birthday = this.userInfo.birthday.replace(/00:00:00/g, '')
      this.minzu.map((item, index) => {
        if (item === this.userInfo.nation) {
          this.index1 = index
        }
      })
      this.sex.map((item, index) => {
        this.index = this.userInfo.sex
      })
      this.date = this.userInfo.birthday.replace(/-/g, '/')
    })
  },
  methods: {
    bindPickerChange1 (e) {
      this.index1 = e.target.value
      this.setUserInfo()

    },
    bindPickerChange: function (e) {
      this.index = e.target.value
      this.setUserInfo()

    },
    bindPickerChange2: function (e) {
      this.date = e.target.value.replace(/-/g, '/')
      this.setUserInfo()
    },
    setPhone () {
      this.$minRouter.push({
        name: 'modify-mobile',
        params: { mobile: this.userInfo.mobile }
      })
    },
    changeHeadImg(){
      uni.chooseImage({
          count: 1, //默认9
          success: (chooseImageRes) => {
              const tempFilePaths = chooseImageRes.tempFilePaths;
              uni.uploadFile({
                  url: 'http://api.app-market.dev.yeleonline.com/api/5ebdf239b49c2',
                  filePath: tempFilePaths[0],
                  name: 'file',
                  header:{
                      "access-token" : 'AQtlDwvmBDqWFcebiSpFAJCoUeKeTjtp',
                      "api-auth": this.$store.state.user.userInfo.apiAuth
                  },
                  success: (uploadFileRes) => {
                        this.$showToast(JSON.parse(uploadFileRes.data).msg)
                        this.userInfo.head_img =JSON.parse(uploadFileRes.data).data[0].http_dir
                        this.setUserInfo()
                  }
              });
          }
      });
      //   uni.chooseImage({
      //     count: 1, //默认9
      //     success:  res=> {
      //         console.log(JSON.stringify(res.tempFilePaths[0]));
      //         // 调用上传文件接口 提交到远程服务器保存文件
      //           this.$minApi.fileUpLoad({
      //             image:JSON.stringify(res.tempFilePaths[0])
      //           }).then(res=>{
      //             console.log(res)
      //           })
      //         this.userInfo.head_img =res.tempFilePaths[0]
      //         console.log(this.userInfo.head_img)
      //         this.setUserInfo()
      //     },
      //     fail:err=>{
      //       console.log(err)
      //     }
      // }); 
    },
    toFace () {
      // verify-name 实名认证
        this.$minRouter.push({
          name: 'verify-name',
          params: { id_card: this.userInfo.id_card, is_certify: this.userInfo.is_certify, name: this.userInfo.user_name, phone: this.userInfo.mobile }
        })
      
      
    },
    // payMethods drawing-way
    payMethods () {
      this.$minRouter.push({
        name: 'drawing-way'
      })
    },
    // 修改个人资料
    setUserInfo(){
        let data = {
          head_img:this.userInfo.head_img,
          sex:this.index,
          nation:this.minzu[ this.index1],
          birthday: new Date(this.date).getTime()/1000
        }
        // uoDateuserInfo  API
        this.$minApi.uoDateuserInfo(data).then(res=>{
          this.$showToast('重新登录后，修改生效')
        })
    },
    quit () {
      this.$refs.show.handleShow({
        title: '确认退出？',
        success: function (res) {
          if (res.id === 1) {
            uni.removeStorage({
              key: 'minvuexcache',
              success: function (res) {
                console.log('success')
              }
            })
            uni.reLaunch({
              url: '../login/index'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
