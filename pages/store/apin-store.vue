<template>
  <view class="apin-store p-tb-20 p-lr-30">
       <view class="card" v-for="(item,index) in  list" :key="item.id">
           <min-pcitem showPrice :isBorder="index !== list.length - 1 ? true : false" :list="item" @emitE="toEmint(item)">
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
          list:[],
          clue_id:''
      }
    },
    onLoad(option){
      console.log(option)
      this.clue_id = option.clue_id
      if(option.clue_id){
        // #ifdef APP-PLUS  
            var webView = this.$mp.page.$getAppWebview();  

            // 修改buttons  
            // index: 按钮索引, style {WebviewTitleNViewButtonStyles }  
            webView.setTitleNViewButtonStyle(0, {  
                text: '',  
            });  
        // #endif
        document.getElementsByClassName('uni-btn-icon')[1].innerText = '';
      }
    },
    onNavigationBarButtonTap(){
        this.$minRouter.push({
          name:'clue-management'
        })
    },
    methods:{
      toEmint(item){
        item.clue_id = this.clue_id
        this.$minRouter.push({
          name:'choose-table',
          params:{item}
        })
      }
    },
    mounted(){
      this.$minApi.apinStore().then(res=>{
        this.list = res.data
        this.list.map((item,index) =>{
                 
          if(!item.store_config){
            item.store_config = {}
          }
        })
        console.log(res)
      })
    }
}
</script>

<style lang="scss" scoped>

</style>