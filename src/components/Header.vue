<script>
export default {
  name: 'Header',
  methods: {
    isLogin: function () {
      return sessionStorage.getItem("accessToken")
    }
  },
  created: function () {
    console.log("헤더헤더헤더" + sessionStorage.getItem("accessToken"))
  }
}


import './Header.css'
</script>

<template>
  <header>
    <b-navbar toggleable type="dark" variant="dark" style="height: 100px">
      <b-navbar-brand href="#">오프라인할인정보공유사이트</b-navbar-brand>

<!--      로그인하기 전 메뉴-->

      <b-nav-item to="login" v-if="isLogin()==null" >로그인</b-nav-item>

      <!--로그인 후 메뉴-->
      <b-nav-item to="mymenu" v-else>마이메뉴</b-nav-item>

    </b-navbar>

<!--    <div style="display:inline-block" v-if="isLogin()==null">-->
<!--    <router-link to="/login">-->
<!--     <img class="login"-->
<!--          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9yAeFNIzybTtOY_0YSZTC41ZV5sQDrqojV0i22eyYGaINOvuHJiGglZr85p5X49TK5fo&usqp=CAU"-->
<!--          alt="로그인">-->
<!--    </router-link>-->
<!--    </div>-->
<!--    <div style="display:inline-block" v-else >-->
<!--      <router-link to="/mypage">-->
<!--        <img class="login"-->
<!--             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf4iXwzn0hCbzGS8FwtX89pkDlm6yo2ZqMzQ&usqp=CAU"-->
<!--             alt="마이페이지">-->
<!--      </router-link>-->
<!--    </div>-->
  </header>

</template>
