<template>
  <div class="post_list">
    <span class="post_time">{{ posts.post_time }}</span>
    <span class="post_content">{{ posts.post }}</span>
    <button class="post_check" @click="$emit('postDelete', posts)"></button>
  </div>
</template>

<script>
export default {
  props: {
    posts: {}
  }
}
</script>

<style scoped>
button {
  background: url("@/assets/check.svg") no-repeat;
  border: none;
  outline: none;
}
</style>
