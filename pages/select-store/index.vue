<template>
  <view class="select-store p-tb-20 p-lr-30">
    <view class="card" v-for="item in  list" :key="item.id">
      <min-pcitem :list="item" @emitE="toEmint(item)">
      </min-pcitem>
    </view>
  </view>
</template>

<script>
export default {
  name: "select-store",
  navigate: ["navigateTo"],
  data() {
    return {
      list: []
    };
  },
  methods: {
    toEmint(item){
      console.log(item)
      this.$minRouter.push({
        name:"submit-leads",
        params:{item}
      })
    }
  },
  mounted() {
    this.$minApi.getSeletStore().then(res => {
      this.list = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>

uni-page-body {
  width: 100%;
  height: 100%;
}

</style>