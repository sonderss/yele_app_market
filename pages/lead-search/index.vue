<template>
  <view class="lead-search p-lr-20 p-tb-20">
    <min-search v-model="testVaue" placeholder="请输入营销姓名/手机号搜索" style="border-radius:5px;"></min-search>
    <view class="main">
      <view class="title-view">
        <text class="t">姓名</text>
        <text class="t">贡献</text>
        <text class="t">分成比例</text>
      </view>
      <view class="main-content min-border-top" v-for="(item,index) in getValuea" :key="index">
        <view class="creat-info t">
          <text v-html="item.user_name"></text>
          <text class="p-top-10 p-left-20">{{item.mobile}}</text>
        </view>

        <view class="creat-info t">
          <text>{{item.count}}</text>
          <text class="p-top-10">￥{{item.performance}}</text>
        </view>

        <view class="t">
          <text>{{item.share_ratio}}%</text>
          <image
            @click="edit(index)"
            style="width: 34rpx;height: 34rpx;"
            class="m-left-20"
            src="../../static/images/set.png"
          />
          <!-- <text class="iconfont icon-xiugai" style="font-size: 34rpx;">&#xe66f;</text> -->
        </view>
      </view>
    </view>
    <min-modal ref="show">
      <view>线索用户：{{name}}</view>
      <view class="content_model m-top-20">
        <input type="number" @input="getValue" maxlength="3" :placeholder="price" />
        <text>%</text>
      </view>
    </min-modal>
    <min-404 v-if="getValuea.length === 0" />
  </view>
</template>

<script>
export default {
  name: "lead-search",
  navigate: ["navigateTo"],
  computed: {
    getValuea () {
      let data = []
      if (this.testVaue) {
      this.$parseURL().data.clue_list.filter(item => {
          if (item.user_name.includes(this.testVaue) || item.mobile.includes(this.testVaue) ) {
            data.push(item)
          }
        })
      } else {
        data = this.$parseURL().data.clue_list;
      }
      return data
    }
  },
  mounted() {
    this.newData = this.$parseURL().data.clue_list;
    this.data = this.data.concat(this.$parseURL().data.clue_list);
  },
  watch: {
    keyword(a) {
      if (a.length === 0) {
        return (this.newData = this.data);
      } // clone_item.user_name.replace(this.keyword,`<text style='color:red'>${this.keyword}</text>`)
      let content = "";
    //   if (this.data.length <= 0) return;
      if (this.keyword.length !== 0) {
        this.newData = this.newData.filter(this.test);
        this.newData.map(item => {
          item.user_name = item.user_name.replace(
            this.keyword,
            `<text style='color:red'>${this.keyword}</text>`
          );
        });
      }
    }
  },
  methods: {
    test(item) {
      console.log();
    //   let data = item.user_name.split("");
      return item.user_name.includes(this.keyword);
    },
    getSearch(e) {
      console.log(e);
      this.keyword = e;
    },
    getValue(e) {
      this.value = e.target.value;
    },
    edit(n) {
      this.name = this.$parseURL().data.clue_list[n].user_name;
      this.price = this.$parseURL().data.clue_list[n].share_ratio + "";
      this.$refs.show.handleShow({
        title: "修改分成比例",
        success: e => {
          if (e.id === 1) {
            if (!this.value) return;
            // 确认修改
            this.$minApi
              .commissionProportion({
                ids: this.$parseURL().data.clue_list[n].id,
                proportion: this.value
              })
              .then(res => {
                console.log(res);
                this.$showToast("修改成功");
                setTimeout(() => {
                  uni.navigateTo({
                    url: "../lead-users/index"
                  });
                }, 2000);
              });
          }
        }
      });
    }
  },
  data() {
    return {
      newData: [],
      price: "",
      name: "",
      keyword: "",
      value: "",
      data: [],
	  testVaue:""
    };
  }
};
</script>

<style lang="scss" scoped>
uni-page-body {
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.main {
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  margin: 20rpx 10rpx 15rpx 10rpx;
  padding: 0 20rpx;
  .title-view {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .t {
      width: 170rpx;
      text-align: center;
    }
  }
  .main-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .t {
      width: 170rpx;
      text-align: center;
      padding: 20rpx 0;
    }
    .creat-time {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .creat-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
.content_model {
  width: 100%;
  display: flex;
  height: 70rpx;
  line-height: 70rpx;
  input {
    width: 400rpx;
    height: 70rpx;
    background: rgba(255, 255, 255, 1);
    border: 1rpx solid rgba(204, 204, 204, 1);
    margin-right: 20rpx;
    padding: 0 20rpx;
  }
}
</style>
