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
        toEmint(item) {
            console.log(item)
            this.$minRouter.push({
                name: "submit-leads",
                params: {
                    item
                }
            })
            this.$store.dispatch('status/setId', item.id)
        }
    },
    onShow() {
        this.list.map((item, index) => {
            if (item.isPrv) {
                if (item.id != this.$store.state.status.id) {
                    this.$set(item, 'isPrv', false)
                }
            }
            if (item.id === this.$store.state.status.id) {
                this.$set(item, 'isPrv', true)
            }

        })
        let obj = {}
        this.list.map((item, index) => {
            if (item.isPrv && index !== 0) {
                console.log("在修改")
                obj = item
                return this.list.splice(index, 1)
            }
        })
        if (obj.id) return this.list.unshift(obj)

    },
    mounted() {
        this.$minApi.getSeletStore().then(res => {
            // this.list = res.list;
            res.list.map((item, index) => {
                if (item.id === this.$store.state.status.id) {
                    this.$set(item, 'isPrv', true)
                    this.list.push(item)
                    return res.list.splice(index, 1)
                }
            })
            this.list = this.list.concat(...res.list);
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
