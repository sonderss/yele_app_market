<template>
  <view class="order-store p-tb-20 p-lr-30">
       <view class="card" v-for="item in  list" :key="item.id">
           <min-pcitem  showAddarse  :list="item" @emitE="toEmint(item)">
        </min-pcitem>
      </view>
  </view>
</template>

<script>
export default {
    name:"order-store",
    navigate:["navigateTo"],
    data(){
      return {
          list:[],
          longitude:'', // 当前位置的经度
          latitude:'' // 当前位置的纬度
      }
    },
    onShow(){
        uni.getLocation({
            type: 'wgs84',
            success:  (res) =>  {
                console.log('当前位置的经度：' + res.longitude);
                console.log('当前位置的纬度：' + res.latitude);
                this.longitude =  res.longitude
                this.latitude = res.latitude
                  console.log(this.longitude)
            }
        });
    },
    methods:{
      toEmint(item){
        this.$minRouter.push({
          name:'chioce-table',
          params:{store_name:item.store_name,address:item.address,head_img:item.head_img,id:item.id}
        })
      }
    },
    mounted(){
       if(!this.longitude && !this.latitude){
            this.$showToast('没有地理位置')
            this.$minApi.chooseStoreLG().then(res=>{
                this.list = res.data
                this.$set(this.list[0],'isPrv',true)
                console.log(res)
            })
            return
        } 
      this.$minApi.chooseStoreLG({
          lng:this.longitude,
          lat:this.latitude
      }).then(res=>{
        this.list = res.data
        this.$set(this.list[0],'isPrv',true)
        console.log(res)
      })
    }
}
</script>

<style>

</style>