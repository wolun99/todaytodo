import axios from 'axios'
const url = process.env.VUE_APP_PORT

function registerUser(userData) {
  return axios.post(url + 'sign', userData)
}

function LoginUser(loginData) {
  return axios.post(url + 'login', loginData)
}

function addPost(postsData) {
  return axios.post(url + 'post', postsData)
}

function loadPost(Data) {
  return axios.get(url + 'post', { params: { Data } })
}

function deletePost(delData) {
  return axios.delete(url + 'post', { data: delData })
}

function setTokenCookie(token) {
  document.cookie = `token=${token}; max-age=1800`
}

function setUserCookie(user) {
  document.cookie = `user=${user}; max-age=1800`
}

function getUserCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}
function getTokenCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}
export { registerUser, LoginUser, addPost, loadPost, deletePost, setTokenCookie, setUserCookie, getUserCookie, getTokenCookie }
