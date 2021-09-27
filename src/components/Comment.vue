<template>
  <div id="Comment">
<!--    <div>props: {{board_id}}</div>-->
    <table class="table" >
      <thead>
      <tr>
        <th scope="col">작성자</th>
        <th scope="col">내용</th>
      </tr>
      </thead>
      <tbody>
        <tr :key="item.commentId" v-for="item in comments">
          <td><span v-html="item.commentWriter"></span></td>
          <td><span v-text="item.content"></span></td>
        </tr>
    </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name:"Comment",
  props:['board_id'],
  data(){
    return{
      bb : this.board_id,
      comments: ''
    }
  },
  created: function () {
    axios
      .get('http://seungwook.shop/boards/'+this.board_id+'/comments',{
        headers: {
          "X-AUTH-TOKEN" : sessionStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        console.log(response.data)
        console.log("응답잘함 ")
        this.comments=response.data
      })
      .catch((error) => {
        console.log("COMMENTS GET 에러"+error)
      })

  }
}
</script>
