<template>
<view class="product-details p-tb-20 p-lr-30">
    <swiper class="swiper" :indicatorDots="false" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration" v-if="!noData">
        <swiper-item v-for="(item,index) in itemsss" :key="index">
            <view class="swiper-item">
                <image :src="item" @error="imgerr" />
            </view>
        </swiper-item>
    </swiper>
    <view class="goods-item p-lr-20 m-bottom-20" v-if="!noData">
        <view class="top-view f28 m-top-10 f28">{{list.product_name}}</view>
        <!-- <view class="top-view f28 m-top-10 f28">{{list.service_name}}</view> -->
        <view class="botm-view">
            <view class="f22">
                <text class="price" v-if="product_type === 'product' ">￥{{list.sku.length === 0 ? '暂无数据': list.sku[chioceIndex].sku_price}}</text>
                <text class="price" v-if="product_type === 'service' ">￥{{list.price}}</text>
            </view>
            <!-- @change="alDel($event,n)"
        <min-stepper  v-if="selArr.length > 0"  v-model="product_num" @change="goodsChange($event)"></min-stepper>-->
            <min-stepper v-model="list.step" @change="goodsChange($event)"></min-stepper>
        </view>
    </view>
    <min-describe @chincesku="selSku" sku="750ml*2010年/瓶" leftTxt="规格" v-if="product_type === 'product' "></min-describe>
    <view class="introduction m-top-20 p-lr-20" v-if="!noData">
        <view class="title min-border-bottom m-bottom-30">详细介绍</view>
        <view class="content p-bottom-30">{{list.info}}</view>
        <!-- <view class="content p-bottom-30" v-if="type === 2 || type=== 5">{{list.service_info}}</view> -->
    </view>
    <min-goods-submit v-if="type != 1 && type != 2 " icon="../../static/images/cart.png" :goodsCount="countNums" :totalAmount="totalAmountE " buttonText="去下单" @leftClick="leftClick" @submit="submit"></min-goods-submit>
    <!-- 选择规格 -->
    <min-popup :show="isSelSku" @close="closeSelectedSkuPop" :heightSize="skuObj.sku.length <3 ? '700' : '830' ">
        <view class="skuPop">
            <view class="skuTop">
                <view class="leftView">
                    <view class="img-view">
                        <image :src="skuObj.sku[chioceIndex].sku_img" @error="imgerrsssss" />
                    </view>
                    <!-- sku信息 -->
                    <view class="sku-view">
                        <text class="f22">{{skuObj.product_name}}</text>
                        <text class="f22 m-tb-10">已选："{{skuObj.sku[chioceIndex].sku_full_name}}"</text>
                        <text class="f22 m">
                            ￥
                            <text class="money">{{skuObj.sku[chioceIndex].sku_price}}</text>
                        </text>
                    </view>
                </view>
            </view>
            <view class="min-border-bottom m-lr-30"></view>
            <scroll-view :class=" skuObj.sku.length < 3 ? 'sku-item-num' : 'sku-item'" scroll-y :style="{ transition: top === 0 ? 'transform 300ms' : '',transform: 'translateY(' + top + 'rpx' + ')'}">
                <!-- 可选择规格项 -->
                <view>
                    <view class="f26">规格</view>
                    <view class="item-view">
                        <view :class="chioceIndex ===index ?   'item-active f26' : 'item f26' " @click="chioceO(index)" v-for="(item,index) in skuObj.sku" :key="index">{{item.sku_full_name}}</view>
                    </view>
                </view>
            </scroll-view>
            <view class="min-border-bottom m-lr-30"></view>
            <!-- 数量 -->
            <view class="sku-item">
                <view class="f26">数量</view>
                <view class="m-tb-30">
                    <min-stepper v-model="list.step" :isAnimation="false" :min="1" @change="goodsChange($event)"></min-stepper>
                </view>
            </view>
            <view class="min-border-bottom m-lr-30"></view>
            <view class="btn-sku" @click="skuChioce">确定</view>
        </view>
    </min-popup>
    <!-- 已选商品 -->
    <min-popup :show="selected" @close="closeSelectedSkuPop1">
        <view class="popview">
            <view class="p-lr-20">
                <view class="top-view min-border-bottom">
                    <text>已选商品</text>
                    <view class="right-view" @click="delAll">
                        <view class="icon-del m-right-10">
                            <image src="/static/images/del.png" />
                        </view>
                        <text class="f22 clear">清空</text>
                    </view>
                </view>
            </view>
            <view class="main-sel-view p-lr-30 m-top-20" style="margin-bottom:300rpx" @touchstart="start" @touchmove="move" @touchend="end">
                <scroll-view scroll-y :style="{ transition: top === 0 ? 'transform 300ms' : '',transform: 'translateY(' + top + 'rpx' + ')','height':'600rpx'}">
                    <view class="item" v-for="(item2,n) in selArr" :key="n">
                        <!-- <view v-if="!item2.test"> -->
                        <image :src="item2.type !== 'setmeal' ? (item2.sku.sku_img ? item2.sku.sku_img  : item2.product_img  ):item2.product_img " @error="imgerrss($event,n)" />
                        <view class="content-view">
                            <view class="right-view-title">
                                <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                                <text class="f26 t  m-top-10" style="color:#666666;display:block;font-weight:normal" v-if="item2.type === 'product'">规格：{{item2.sku.sku_full_name}}</text>
                                <text class="f24 t  m-top-10" style="color:#666666;display:block;font-weight:normal" v-if="item2.type === 'setmeal'">
                                    规格：
                                    <template v-for="(desc,aa) in item2.combination">
                                        <span :key="aa">
                                            <template v-for="(desc1,abc) in desc.combination_detail">
                                                <span :key="abc" class="m-left-10">{{desc1.name}}*{{desc1.quantity}}</span>
                                            </template>
                                        </span>
                                    </template>

                                </text>
                                <text class="f26 t  m-top-10" style="color:#666666;display:block;font-weight:normal" v-if="item2.type === 'service'">规格：{{ item2.info }}</text>
                            </view>
                            <view class="right-view-bottom">
                                <view class="right-view-bottom-desc">
                                    <text class="f20 t" v-if="item2.type === 'product'">

                                        <text style="color:#FF0000;font-size:30">￥{{item2.sku.sku_price}}</text>
                                    </text>
                                    <text class="f20 t" v-if="item2.type === 'service'">

                                        <text style="color:#FF0000;font-size:30">￥{{item2.price}}</text>
                                    </text>
                                    <text class="f20 t" v-if="item2.type === 'setmeal'"><text style="color:#FF0000;font-size:30">￥{{item2.price}}</text></text>
                                </view>
                                <view class="steper">
                                    <min-stepper v-model="item2.step" :isAnimation="false" :min="0" @change="aleradyGood($event,n)"></min-stepper>
                                    <!-- <view v-if="!isDel" @click="delItem(n)">删除</view> -->
                                </view>
                            </view>
                        </view>
                        <!-- </view> -->
                    </view>
                </scroll-view>
            </view>
            <!-- <view class="empty-view"></view> -->
            <view class="bottom-view-t">
                <min-goods-submit style="position:fixed" leftText="已选" :totalAmount="totalAmountE" :goodsCount="countNums" buttonText="选好了" @submit="submit"></min-goods-submit>
            </view>
        </view>
    </min-popup>
    <min-404 v-if="noData" id="none"></min-404>
</view>
</template>

<script>
export default {
    name: 'product-details',
    navigate: ['navigateTo'],
    data() {
        return {
            itemsss: [],
            autoplay: true,
            interval: 2000,
            duration: 500,
            count: 0,
            product_id: Number,
            type: Number,
            product_type: 'product',
            lastY: '',
            top: '',
            list: {
                sku: []
            },
            isSelSku: false,
            skuObj: {
                sku: [{
                    sku_full_name: ''
                }]
            },
            chioceIndex: 0,
            noData: false,
            selected: false,
            selArr: [],
            errImg: false,
            lastStep: 0,
            flag: true,
            store_id: '',
            delArr: [],
        }
    },
    watch: {
        // selArr: {
        //     handler(a, b) {
        //         a.map((item, index) => {
        //             if (item.step === 0) {
        //                 // this.delArr.push(index)
        //                 this.$nextTick(() => {
        //                     a.splice(index, 1)
        //                     this.$store.dispatch('goods/setOrderSelArr', a)
        //                 })

        //             }
        //         })
        //        this.$store.dispatch('goods/setOrderSelArr', a)

        //     },
        //     deep: true,
        // },
        // delArr(a) {
        //     a.map(item => {
        //         this.selArr.splice(item, 1)
        //     })

        // },
    },
    computed: {
        // 合计金额
        totalAmountE() {
            let sum = 0
            this.selArr.map(item => {
                if (item.type === 'product') {
                    sum += item.step * item.sku.sku_price
                } else {
                    sum += item.step * item.price
                }
                // this.$store.dispatch('goods/setOrderSelArr', this.selArr)
                // console.log('已选商品全局数据改变', this.$store.state.goods.orderSelArr)
            })
            return sum.toFixed(2)
        },
        // 监听所选数量
        countNums() {
            let num = 0
            for (let i = 0; i < this.selArr.length; i++) {
                num += this.selArr[i].step
            }
            return num
        },
        // 详情商品初始值
        product_num: {
            get() {
                let num = 1
                // num = this.list.step
                // 这里是商品有sku
                if (this.selArr.length > 0) {
                    if (this.product_type === 'service') {
                        console.log('服务商品')
                        this.selArr.map(item => {
                            if (item.id === this.list.id) {
                                num = this.list.step
                                console.log(num)
                            }
                        })
                    }
                    if (this.product_type === 'product') {
                        if (this.list.sku.length > 0) {
                            this.list.sku.map(item => {
                                this.selArr.map(item2 => {
                                    if (item2.type === 'product') {
                                        if (item.id === item2.sku.id) {
                                            num = item2.step
                                        }
                                    }
                                })
                            })
                        }
                    }
                }

                return num
            },
            set(v) {},
        },
    },
    onLoad() {
        // type为1时  电子菜单商品详情
        this.product_id = this.$parseURL().product_id
        this.product_type = this.$parseURL().product_type
        this.store_id = this.$parseURL().store.id
        console.log(' this.$parseURL()', this.$parseURL())
        // this.type = this.$parseURL().type
        console.log('商品信息', this.$parseURL())
        if (this.$store.state.goods.orderSelArr.length > 0) {
            this.selArr = this.$store.state.goods.orderSelArr
        }
    },
    mounted() {
        console.log(this.product_type)
        if (this.product_type === 'product') {
            // store_id=3&product_id=11
            this.$minApi
                .getOriderProductDetail({
                    store_id: this.store_id,
                    product_id: this.product_id,
                })
                .then(res => {
                    this.list = res.info
                    this.list.step = 0
                    this.list.type = 'product'
                    console.log(this.list)
                    this.itemsss = []
                    this.itemsss.push(this.list.product_img)
                })
                .catch(() => {
                    this.noData = true
                })
        } else if (this.product_type === 'service') {
            this.$minApi
                .getOriderServeDetail({
                    store_id: this.store_id,
                    service_id: this.product_id,
                })
                .then(res => {
                    this.list = res.info
                    this.list.step = 0
                    this.list.type = 'service'
                    console.log(this.list)
                    this.itemsss = []
                    this.itemsss.push(this.list.product_img)
                })
                .catch(() => {
                    this.noData = true
                })
        }
    },
    methods: {
        // 选择规格事件
        selSku(index, index2) {
            this.isSelSku = true
            this.skuObj = this.list
            // this.skuObj.step = 1
        },
        /**  关闭选择规格弹出层 */
        closeSelectedSkuPop() {
            this.isSelSku = false
        },
        // 选择规格确定
        skuChioce() {
            this.closeSelectedSkuPop()
            const obj = {}
            Object.assign(obj, this.skuObj)
            obj.sku = this.skuObj.sku[this.chioceIndex]
            this.addGoods(obj)
        },
        // 选择规格
        chioceO(index) {
            this.chioceIndex = index
        },
        // 已选商品关闭
        closeSelectedSkuPop1() {
            this.selected = false
        },
        // 已选商品统一列表方法
        addGoods(obj) {
            if (this.selArr.length === 0) return this.selArr.push(obj)
            const result = this.selArr.some(item => {
                if (obj.type === 'service') {
                    if (item.id === obj.id) {
                        item.step = obj.step
                        return true
                    }
                } else if (obj.type === 'product') {
                    if (item.type === 'product') {
                        if (item.sku.id === obj.sku.id) {
                            item.step = obj.step
                            return true
                        }
                    }
                }
            })
            if (!result) {
                this.selArr.push(obj)
                this.$store.dispatch('goods/setOrderSelArr', this.selArr)
            }
            // this.selArr.map((item, index) => {
            //   this.list.sku.map((item2, index2) => {
            //     if (item.sku.sku_id === item2.sku_id) {
            //       this.indexL = index
            //     }
            //   })
            // })
        },
        // 已选商品删除事件
        aleradyGood(e, index) {
            let id = Number
            if (this.selArr[index].type === 'service') {
                id = this.selArr[index].id
            }
            if (this.selArr[index].type === 'product') {
                id = this.selArr[index].sku.id
            }
            console.log('  this.list', this.list)
            if (this.list.type === 'service' && id === this.list.id) {
                this.$set(this.list, 'step', e)
            }
            if (
                this.list.type === 'product' &&
                this.list.sku.length === 1 &&
                id === this.list.sku[0].id
            ) {
                this.$set(this.list, 'step', e)
            }
            if (
                this.list.type === 'product' &&
                this.list.sku.length > 1 &&
                id === this.list.sku[this.chioceIndex].id
            ) {
                this.$set(this.list, 'step', e)
            }
        },
        // 图片错误
        imgerr(e) {
            if (e.type === 'error') {
                this.itemsss = []
                this.itemsss.push('../../static/images/bid-goods.png')
            }
        },
        imgerrss(e, n) {
            if (e.type === 'error') {
                this.$set(this.selArr[n], 'product_img', '/static/images/goods.png')
            }
        },
        imgerrsssss(e) {
            if (e.type === 'error') {
                this.skuObj.sku[this.chioceIndex].sku_img = '/static/images/goods.png'
            }
        },
        // 已选商品
        leftClick() {
            this.selected = true
        },
        // 已选商品清空
        delAll() {
            let arr = []
            for (let i = this.selArr.length - 1; i >= 0; i--) {
                arr.push(i)
            }
            arr.map(item => {
                this.selArr.splice(item, 1)
                this.$store.dispatch('goods/setOrderSelArr', this.selArr)
            })
            // this.selArr = []
            // this.$store.dispatch('goods/setOrderSelArr', this.selArr)
            // this.selArr.map((item, index) => {
            //     this.selArr.splice(index, 1)
            // })
            this.list.step = 0
        },
        // 提交
        submit() {
            console.log('已选商品')
            console.log(this.$parseURL())
            if (this.selArr.length === 0) return this.$showToast('请选择商品')
            console.log('准备提交', this.selArr)
            // [{"id":1,"type":"service","quantity":1,"sku_id":0,"combination":[]}
            const products = []
            this.selArr.map(item => {
                const obj = {}
                // 类型为商品
                if (item.type === 'product') {
                    obj.id = item.id
                    obj.type = item.type
                    obj.quantity = item.step
                    obj.combination = []
                    obj.sku_id = item.sku.id
                }
                // 类型为服务商品
                if (item.type === 'service') {
                    obj.id = item.id
                    obj.type = item.type
                    obj.quantity = item.step
                    obj.combination = []
                }
                // 类型为套餐
                if (item.type === 'setmeal') {
                    obj.id = item.id
                    obj.type = item.type
                    obj.quantity = item.step
                    obj.combination = item.combination
                }
                products.push(obj)
            })
            this.$minApi
                .setOrder({
                    desk_id: this.$parseURL().desk.id,
                    products: JSON.stringify(products),
                })
                .then(res => {
                    // this.$store.dispatch('goods/setOrderSelArr', [])
                    // this.selArr = []
                    // this.$store.dispatch('goods/setOrderSelArr', this.selArr)
                    this.selArr.map((item, index) => {
                        this.selArr.splice(index, 1)
                    })
                    // this.delAll()
                    if (res.orderId) {
                        this.$showToast('提交成功')
                        setTimeout(() => {
                            console.log(this.$parseURL())
                            this.$minRouter.push({
                                name: 'order-make',
                                params: {
                                    store: this.$parseURL().store,
                                    desk: this.$parseURL().desk,
                                    orderId: res.orderId,
                                },
                            })
                        }, 2000)
                    }
                })
        },
        // 商品详情计数器
        goodsChange(e) {
            this.$set(this.list, 'step', e)
            if (this.product_type === 'service') {
                const obj = {}
                Object.assign(obj, this.list)
                console.log(obj)
                this.addGoods(obj)
                return
            }
            if (this.list.sku.length > 0) {
                const obj = {}
                const skuOne = this.list.sku[this.chioceIndex]
                Object.assign(obj, this.list)
                obj.sku = skuOne
                console.log(obj)
                this.addGoods(obj)
                console.log(this.selArr)
            }
        },
        start(e) {
            this.lastY = e.changedTouches[0].pageY
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY
            if (this.top < currentY - this.lastY) {
                // 像下滚动
                this.top = currentY - this.lastY
            } else {
                // 向上滚动
                //  this.top = 0
                this.top = currentY - this.lastY
            }
        },
        end(e) {
            return (this.top = 0)
        },
    },
}
</script>

<style lang="scss" scoped>
//
.product-details {
    .swiper {
        width: 690rpx;
        height: 690rpx;
        border-radius: 10rpx 10rpx 0 0;
        overflow: hidden;

        .swiper-item {
            width: 100%;
            height: 100%;
        }
    }

    .goods-item {
        width: 100%;
        height: 118rpx;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10rpx;

        .top-view {
            color: #333333;
            font-weight: bold;
        }

        .botm-view {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10rpx;

            .btn {
                width: 100rpx;
                height: 48rpx;
                background: #ffe001;
                border-radius: 24rpx;
                color: #333333;
                text-align: center;
                line-height: 48rpx;
                font-size: 24rpx;
            }

            .price {
                color: #ff0006;
                font-size: 28rpx;
                font-weight: bold;
            }
        }
    }

    .introduction {
        width: 100%;
        background: #fff;
        margin-bottom: 100rpx;

        .title {
            width: 100%;
            height: 86rpx;
            line-height: 86rpx;
        }
    }
}

// 选择规格弹出
.skuTop {
    width: 100%;
    height: 180rpx;
    margin: 30rpx 0;
    display: flex;
    padding: 0 30rpx;

    .leftView {
        flex: 1;
        display: flex;

        .img-view {
            width: 180rpx;
            height: 180rpx;
            margin-right: 20rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .sku-view {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-content: flex-end;

            .m {
                color: #ff0000;

                .money {
                    font-weight: bold;
                    color: #ff0000;
                }
            }
        }
    }

    .rightView {
        width: 34rpx;
        height: 34rpx;

        image {
            width: 100%;
            height: 100%;
        }
    }
}

.sku-item {
    margin: 0 30rpx;
    padding: 30rpx 0;
    padding-bottom: 10rpx;
    height: 220rpx;
    overflow: auto;

    .item-view {
        margin-top: 20rpx;
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .item {
            padding: 0 10rpx;
            word-wrap: none;
            height: 58rpx;
            border: 1px solid rgba(51, 51, 51, 1);
            border-radius: 10rpx;
            margin-right: 20rpx;
            margin-bottom: 20rpx;
            text-align: center;
            line-height: 58rpx;
            width: 320rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .item-active {
            padding: 0 10rpx;
            word-wrap: none;
            height: 58rpx;
            border: 1px solid #fe432a;
            color: #fe432a;
            border-radius: 10rpx;
            margin-right: 20rpx;
            margin-bottom: 20rpx;
            text-align: center;
            line-height: 58rpx;
            width: 320rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.sku-item-num {
    margin: 0 30rpx;
    padding: 30rpx 0;
    padding-bottom: 10rpx;
    height: 120rpx;

    .item-view {
        margin-top: 20rpx;
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .item {
            padding: 0 10rpx;
            word-wrap: none;
            height: 58rpx;
            border: 1px solid rgba(51, 51, 51, 1);
            border-radius: 10rpx;
            margin-right: 20rpx;
            margin-bottom: 20rpx;
            text-align: center;
            line-height: 58rpx;
            width: 320rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .item-active {
            padding: 0 10rpx;
            word-wrap: none;
            height: 58rpx;
            border: 1px solid #fe432a;
            color: #fe432a;
            border-radius: 10rpx;
            margin-right: 20rpx;
            margin-bottom: 20rpx;
            text-align: center;
            line-height: 58rpx;
            width: 320rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.btn-sku {
    width: 100%;
    height: 98rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffe001;
    text-align: center;
    line-height: 98rpx;
    font-size: 32rpx;
    color: #333;
}

.popview {
    .top-view {
        width: 100%;
        height: 83rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .clear {
            color: #666;
        }

        .right-view {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;

            .icon-del {
                width: 22rpx;
                height: 22rpx;
                display: flex;
                justify-content: center;
                align-items: center;

                image {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .main-sel-view {
        width: 100%;
        // height: 620rpx;
        overflow: auto;

        .item {
            display: flex;
            margin-bottom: 20rpx;
            height: 140rpx;

            &>image {
                width: 140rpx;
                height: 140rpx;
                margin-right: 16rpx;
            }

            .content-view {
                flex: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: space-between;
                color: #333333;
                align-content: space-between;
                margin-bottom: 120rpx;

                .right-view-title {
                    .t {
                        font-weight: bold;
                        width: 500rpx;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                .right-view-bottom {
                    height: 48rpx;
                    display: flex;
                    // position: relative;
                    justify-content: space-between;

                    .right-view-bottom-desc {
                        display: flex;
                        align-items: center;
                    }

                    .steper {
                        // position: absolute;
                        // right:0;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                    }
                }
            }
        }
    }

    .bottom-view-t {
        position: fixed;
        left: 0;
        bottom: 0;
    }

    .empty-view {
        width: 100%;
        height: 50rpx;
    }
}
</style>
