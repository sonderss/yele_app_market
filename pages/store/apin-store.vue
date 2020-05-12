<template>
  <view class="apin-store p-tb-20 p-lr-30">
       <view class="card" v-for="item in  list" :key="item.id">
           <min-pcitem showPrice :list="item" @emitE="toEmint(item)">
        </min-pcitem>
      </view>
  </view>
</template>

<script>
export default {
    name:"apin-store",
    navigate:["navigateTo"],
    data(){
      return {
          list:[]
      }
    },
    onNavigationBarButtonTap(){
        this.$minRouter.push({
          name:'clue-management'
        })
    },
    methods:{
      toEmint(item){
        this.$minRouter.push({
          name:'choose-table',
          params:{item}
        })
      }
    },
    mounted(){
      this.$minApi.apinStore().then(res=>{
        this.list = res.data
        console.log(res)
      })
    }
}
</script>

<style>

</style>