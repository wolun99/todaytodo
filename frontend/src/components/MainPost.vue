<template>

  <div>
    <div class="content">
      <p class="post_day">{{ today }}</p>
      <p class="content_ti">오늘하루의 <br />일정을 확인하세요!</p>
      <img src="@/assets/1099528.png" alt="캐릭터" class="ca">
    </div>
    <div class="post_menu">
      <p>예정시간</p>
      <p>일정완료</p>
    </div>
    <div class="post">
      <PostMenu :posts="posts[i]" v-for="(post, i) in posts" :key="post" @postDelete="postDelete"></PostMenu>
      <div class="add_post" v-if="add_open == true">
        <form @submit.prevent="add_post">
          <h4>오늘의 할일</h4>
          <img src="@/assets/close_icon.png" alt="닫기" @click="closeAdd">
          <input type="text" v-model="post_content" class="add_content" placeholder="할일을 입력해주세요">
          <h5>예정 시각</h5>
          <input type="time" name="" id="" v-model="post_time" class="add_time">
          <button type="submit" class="submit_btn">등록하기</button>
        </form>
      </div>
    </div>
    <button class="add_btn" @click="openAddPost"></button>
  </div>
</template>

<script>
import { addPost, loadPost, deletePost } from '@/api/index.js'
import PostMenu from '@/components/PostMenu.vue'
import store from '../store'
export default {
  data() {
    return {
      post_content: '',
      post_time: '',
      add_open: false,
      posts: [],
      delete: {},
      today: ''
    }
  },
  components: {
    PostMenu
  },
  methods: {
    async loadPost() {
      const queryData = store.state.user_id
      const { data } = await loadPost(queryData)
      this.posts = data
    },
    async add_post() {
      try {
        const postsData = {
          post_content: this.post_content,
          post_time: this.post_time,
          user_id: store.state.user_id
        }
        const { data } = await addPost(postsData)
        console.log(data)
        this.initForm()
        this.loadPost()
      } catch (error) {
        console.log(error)
      }
    },
    initForm() {
      this.post_content = ''
      this.post_time = ''
      this.add_open = false
    },
    openAddPost() {
      this.add_open = true
    },
    async postDelete(selectpost) {
      try {
        this.delete = selectpost
        const delData = {
          post_time: this.delete.post_time,
          post: this.delete.post,
          user_id: this.delete.user_id
        }
        const del = await deletePost(delData)
        console.log(del)
        this.loadPost()
      } catch (error) {
        console.log(error)
      }
    },
    closeAdd() {
      this.add_open = false
    },
    todayDate() {
      const date = new Date()
      const month = date.getMonth()
      const today = date.getDate()
      this.today = `${month + 1}월 ${today}일`
    }
  },
  mounted() {
    this.todayDate()
    this.loadPost()
  }
}
</script>

<style scoped>
.content {
  height: 127px;
  margin: 27px 0;
}

.content p {
  text-align: left;
  margin-left: 20px;
}

.content .post_day {
  font-weight: bold;
  text-decoration: underline;
  font-size: 18px;
}

.post {
  height: 545px;
  overflow-y: auto;

}

.post::-webkit-scrollbar {
  display: none;
}

#app .add_post {
  width: 90%;
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  box-shadow: 5px 5px 5px 5px rgb(0 0 0 / 10%);
  height: 310px;
  padding: 10px 20px 0;

}

.add_post .add_content {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  text-align: left;
  padding-left: 10px;
  height: 45px;
  outline: none;
}

.add_post h4 {
  font-size: 25px;
  margin-bottom: 15px;
}

.add_post h5 {
  font-size: 20px;
  margin-top: 20px;
  text-align: left;
  padding-left: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  height: 40px;
  margin-bottom: 10px;
}

.add_post .add_time {
  border: none;
  width: 100%;
  font-size: 20px;
  text-align: left;
  padding-left: 10px;
  height: 40px;
  margin-bottom: 25px;
  font-weight: bold;
  outline: none;
  border-bottom: 1px solid #ccc;
}

.submit_btn {
  width: 100%;
  height: 40px;
  background: #5DB075;
  border-radius: 28px;
  border: 0;
  color: #fff;
  font-size: 18px;
}

.add_btn {
  background: none;
  border: none;
  outline: none;
  position: absolute;
  bottom: 0px;
  width: 48px;
  height: 48px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  background: url('@/assets/adds.png')no-repeat center center;
  background-size: 100% 100%;
}

.add_btn:hover {
  cursor: pointer;
}

.add_btn img {
  width: 100%;
  height: 100%;
}

.add_post img {
  position: absolute;
  right: 8px;
  top: 8px;
  width: 25px;
}

.add_post img:hover {
  cursor: pointer;
}

.ca {
  width: 150px;
  position: absolute;
  top: 150px;
  right: 0px;
  ;
}

.content .content_ti {
  font-size: 27px;
  line-height: 47px;
  margin-top: 11px;
}
</style>
