<template>
  <div>
    <h2 class="title">회원가입</h2>
    <form @submit.prevent="submitForm">
      <input type="text" class="id" name="user_id" v-model="user_id" placeholder="id를 입력해주세요">
      <input type="password" class="pw" name="user_pw" v-model="user_pw" placeholder="비밀번호를 입력해주세요" autocomplete = "off">
      <input type="text" class="nickname" name="nickname" v-model="user_name" placeholder="닉네임을 입력해주세요">
      <button type="submit" class="btn">가입하기</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from '@/api/index.js'
export default {
  data() {
    return {
      user_id: '',
      user_pw: '',
      user_name: '',
      user_same: {}
    }
  },
  methods: {
    async submitForm() {
      if (this.user_id === '' || this.user_pw === '' || this.user_name === '') {
        alert('정보를 입력해주세요')
      } else {
        const userData = {
          user_id: this.user_id,
          user_pw: this.user_pw,
          user_name: this.user_name
        }
        const request = await registerUser(userData)
        this.user_same = request.data.message
        if (this.user_same === '이미 있는 ID입니다') {
          alert('있는ID입니다. 다른ID로 등록해주세요')
          this.$router.push('/sign')
        } else {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>

<style>
</style>
