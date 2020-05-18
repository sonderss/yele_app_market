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
        console.log(res)
      })
    }
}
</script>

<style lang="scss" scoped>

</style>