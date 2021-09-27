<template>

  <div class="container">

    <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-4">
      <form @submit.prevent="submitForm">
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="name"
          placeholder="이름을 입력하세요"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="비밀번호:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          placeholder="비밀번호 입력하세요"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="비밀번호 확인" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="passwordConfirm"
          placeholder="비밀번호 한번 더 입력하세요"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="지역:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="region"
          placeholder="지역을 입력하세요"
          required
        ></b-form-input>
      </b-form-group>
      <button type="submit">회원가입</button>
      </form>
    </div>
  </div>
<!--  <div class="container">-->
<!--    <form @submit.prevent="submitForm">-->
<!--      <div>-->
<!--        <label for="name">성함</label>-->
<!--        <input type="text" id="name" v-model="name" />-->
<!--      </div>-->
<!--      <div>-->
<!--        <label for="password">비밀번호</label>-->
<!--        <input type="password" id="password" v-model="password" />-->
<!--      </div>-->
<!--      <div>-->
<!--        <label for="passwordConfirm">비밀번호 확인</label>-->
<!--        <input type="password" id="passwordConfirm" v-model="passwordConfirm" />-->
<!--      </div>-->
<!--      <div>-->
<!--        <label for="region">지역</label>-->
<!--        <input type="text" id="region" v-model="region" />-->
<!--      </div>-->

<!--      <button type="submit">회원가입</button>-->

<!--    </form>-->
<!--  </div>-->
</template>

<script>
import axios from 'axios'
import main from './main'

export default {
  name: 'Signup',
  data () {
    return {
      member: {
        name: '',
        password: '',
        passwordConfirm: '',
        region: ''
      },
    }
  },
      methods: {
        submitForm () {
          const userData = {
              username: this.name,
              password: this.password,
              region: this.region,
            };
          console.log('SUBMUITFORM()함수실행');
          console.log(userData);
          axios.post('http://seungwook.shop/user/signup',userData)
            .then((response) => {
              alert(response+"리스폰스")
              console.log(response);
              this.$router.push(main); //성공시 메인 페이지로 이동
            })
            .catch((error) => {
              console.log(error+"에러")
              alert("회원가입 실패")
            })
          },
      }


}
</script>

