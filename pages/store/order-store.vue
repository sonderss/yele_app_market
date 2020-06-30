<template>
  <view class="order-store p-tb-20 p-lr-30">
       <view class="card" v-for="(item,index) in  list" :key="item.id">
           <min-pcitem  showAddarse :isBorder="index !== list.length - 1 ? true : false" :list="item" @emitE="toEmint(item)"></min-pcitem>
      </view>
  </view>
</template>

<script>
export default {
    name:"order-store",
    navigate:["navigateTo"],
    data(){
      return {
          list:[{store_config:{business_start_time:''}}],
          i:Number,
          c:{},
          longitude:'', // 当前位置的经度
          latitude:'' // 当前位置的纬度
      }
    },
    watch:{
      i(a){
        console.log(a);
        if(a*1 === a){
           this.list.splice(a,1)
           this.list.unshift(this.c)
        }
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
        this.$store.dispatch('status/setId',item.id)
      //  console.log(this.$store.state.status.id)
      }
    },
    mounted(){
       if(!this.longitude && !this.latitude){
            this.$showToast('没有地理位置')
            this.$minApi.chooseStoreLG().then(res=>{
                this.list = res.data
                this.list.map((item,index) =>{
                  if(item.id === this.$store.state.status.id){
                       this.$set(item,'isPrv',true)
                       this.c = item
                       this.i = index
                  }
                  if(!item.store_config){
                    item.store_config = {}
                  }
                })
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

<style lang="scss" scoped>

</style>