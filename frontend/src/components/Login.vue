<template>
  <div>
    <form @submit.prevent="submitForm">
      <input type="text" class="id" name="user_id" v-model="user_id" placeholder="id를 입력해주세요">
      <input type="password" class="pw" name="user_pw" v-model="user_pw" placeholder="비밀번호를 입력해주세요" autocomplete="off">
      <button type="submit" class="btn">Login</button>
    </form>
    <router-link to="/sign" class="signup">회원가입</router-link>
  </div>
</template>

<script>

export default {
  name: 'LogIn',
  data() {
    return {
      user_id: '',
      user_pw: ''
    }
  },
  methods: {
    async submitForm() {
      const loginData = {
        user_id: this.user_id,
        user_pw: this.user_pw
      }
      await this.$store.dispatch('Login', loginData)
      if (this.$store.state.message !== '') {
        this.$router.push('/')
      }
      this.$router.push('/post')
    }
  }
}
</script>

<style>
</style>
