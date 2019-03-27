<template>
  <div>
    <div style="height: 50px"></div>

  </div>
</template>
<style scoped>

</style>

<script>
import u from '@/common/util'

export default {
  components: {},
  data () {
    return {
      user: {
        logo: 'http://fpoimg.com/100x100',
        name: 'tarymee'
      }
    }
  },
  methods: {
    test () {
      console.log('test')
    }
  },
  mounted () {
    console.log('index mounted')
    var that = this
    // u.request({
    //   url: u.api.index,
    //   method: 'POST',
    //   isVerifyLogin: false,
    //   success(res) {
    //     console.log(res)
    //     that.site = res.site
    //     that.newArr = res.newest
    //     that.site = res.site
    //   }
    // })

  },
  created () {

  }
}
</script>