<template>
  <div class="login">
    <Header />
    <div class="container">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div>
            <div class="panel-title">환영합니다!</div>

          <div>
              <div>
                <input type="text" class="form-control" name="username" v-model="user.id" placeholder="Username" autofocus>
              </div>
              <div>
                <input type="password" class="form-control" name="password" v-model="user.password" @keyup.enter="login()" placeholder="Password">
              </div>
              <div>
                <button v-on:click="login()">로그인</button>
                <button @click="signup">회원가입</button>
              </div>

          </div>
        </div>
      </div>
    </div>


<!--    <h2>로그인</h2>-->
<!--    <div>-->
<!--      아이디 : <input type="text" placeholder="아이디" v-model="user.id">-->
<!--    </div>-->
<!--    <div>-->
<!--      <input type="password" placeholder="비밀번호" v-model="user.password" @keyup.enter="login()">-->
<!--    </div>-->
<!--    <div>-->
<!--      <a href="#"  v-on:click="login()">LOGIN</a>-->
<!--    </div>-->
<!--    <div>-->
<!--      <button @click="signup">회원가입</button>-->
<!--    </div>-->
  </div>
</template>
<script>
import axios from 'axios'
import main from './main'
import Header from './Header'

export default {

  name: 'Login',
  data() {
    return {
      user : {
        id : '',
        password : ''
      }
    }
  },
  methods : {
    login : function () {

      if (this.user.id == '') {alert('아이디를 입력해주세요.');return;}
      if (this.user.password == '') {alert('비밀번호를 입력해주세요.');return;}

      const user_logindata = {
        username: this.user.id,
        password: this.user.password,
      };
      console.log(user_logindata)
      axios.post('http://seungwook.shop/user/login', user_logindata)
        .then((response) => {
          sessionStorage.setItem('accessToken', response.data.token)
          sessionStorage.setItem('login_id', this.user.id)
          //sessionStorage.setItem('refreshToken', response.data.data.refreshToken)
          //sessionStorage.setItem('expiredTime', response.data.data.cur_time)
          //axios.defaults.headers.common['X-AUTH-TOKEN'] = response.data.token
          axios.defaults.headers.common = { 'X-AUTH-TOKEN': sessionStorage.getItem('accessToken') }
          console.log(response.data);
          console.log(sessionStorage.getItem('login_id'));
          this.$router.push(main); //로그인 성공시 list 페이지로 이동
      })
      .catch((error) => {
        alert("로그인 실패")
      })
    },
    signup () {
      this.$router.push({
        path: 'signup'
      })
    }
  },
  created () {
  }
}
</script>
