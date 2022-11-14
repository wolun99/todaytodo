<template>
  <div>
    <div class="app_top">
      <p>{{ time }}</p>
      <img src="@/assets/phone_base.svg" alt="" class="top_icon">
    </div>
    <div class="main_title">
      <h2>오늘 하루</h2>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: ''
    }
  },
  methods: {
    setTime() {
      const day = new Date()
      const hour = day.getHours()
      let minutes = day.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      this.time = `${hour}:${minutes}`
    },
    TimeInter() {
      setInterval(this.setTime, 30000)
    }
  },
  created() {
    this.setTime()
  },
  mounted() {
    this.TimeInter()
  }
}
</script>
<style>
@import '@/css/main.css'
</style>
