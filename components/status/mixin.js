export default {
  data () {
    return {

    }
  },
  methods: {
    // 历史
    goGetHistory () {
      this.$minRouter.push({
        name: 'platform-history',
        params: { id: this.idNum }
      })
      console.log('id', this.idNum)
    },
    callPhone(phone) {
        uni.makePhoneCall({
            phoneNumber: phone
        });
    }
  },
  mounted () {
    console.log('公共部分')
  }
}
