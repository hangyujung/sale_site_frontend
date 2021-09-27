<template>
  <div>
    <form @submit.prevent="submit_board">
      카테고리: <input id="category" type="text" v-model="category" /><br>
      제목: <input id="title" type="text" v-model="title" /><br>
      <input type="file" name="photo" id="photo" /><br>
      내용: <input id="content" type="textarea" v-model="content" /><br>
      지역: <input id="region" type="text" v-model="region" /><br>
    </form>
    <button @click="submit_board">글 작성</button>
  </div>
</template>

<script>

import axios from 'axios'
import main from './main'

export default {
  data(){
    return{
      category: '',
      title: '',
      content: '',
      region: '',
    }
  },
  methods: {
    submit_board () {

      const frm = new FormData()
      var photoFile = document.getElementById("photo")
      frm.append('category', this.category)
      frm.append('title', this.title)
      frm.append("file", photoFile.files[0])
      frm.append('content', this.content)
      frm.append('region', this.region)

      for (var pair of frm.entries()) { console.log(pair[0]+ ', ' + pair[1]); }

      axios
        .post('http://seungwook.shop/boards', frm, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-AUTH-TOKEN" : sessionStorage.getItem("accessToken")
          }
        })
        .then((response) => {
          console.log(response)
          this.$router.push(main); //로그인 성공시 list 페이지로 이동
        })
        .catch((error) => {
          console.log("======에러========="+error)
        })
    }

  }
}
</script>
