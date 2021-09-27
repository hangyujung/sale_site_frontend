<template>
  <div id="Detail">
    <Header/>

    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col md="10" offset-md="1">
          <table width="900">
            <tr>
              <td><span >{{board.title}}</span> <button v-on:click="addHeart">찜</button> </td>

            </tr>
            <tr>
              <td>
                <span>{{board.category}} </span>
                <span>{{board.region}}</span>
                <span v-if="board.user!=null">{{board.user.username}}</span>
              </td>
            </tr>

            <tr>
              <img v-bind:src="board.imgUrl" width="400" height="550"/>
            </tr>
            <tr>
              <span>{{board.content}}</span> </tr>
            <tr>
<!--              <b-nav-item to="login" v-if="isLogin()==null" >로그인</b-nav-item>-->
              <button v-if="board.user.username==now_id" v-on:click="delete_board">글 삭제</button>
            </tr>
          </table>
        </b-col>
      </b-row>
    </b-container>

<!--    parameter : {{param}}-->
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col md="10" offset-md="1">
      <Comment :board_id="board.boardId"/>   <!--자식컴포넌트로 아이디 넘겨주자-->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import Header from './Header'
import Comment from './Comment'

export default {
  components: {Comment, Header},
  data () {
      return {
        board: '',
        now_id : ''
      }
  },
  computed: {

    param: function () {
      return this.$route.params.id;
    }
  },
  created: function () {
    axios
      .get('http://seungwook.shop/boards/'+this.$route.params.id+'/details', {
          headers: {
            "X-AUTH-TOKEN": sessionStorage.getItem("accessToken")
          }
        }
      )
      .then((response) => {
        console.log(response.data)
        this.board=response.data
      })
      .catch((error) => {
        console.log(error)
      })
    this.now_id = sessionStorage.getItem('login_id');
    console.log('Detail 에서 created()함수실행')
    console.log(sessionStorage.getItem('login_id'));

  },
  methods: {
    addHeart: function () {
      axios
        .post('http://seungwook.shop/boards/'+this.$route.params.id+'/heart',"",{
        headers: {
          "X-AUTH-TOKEN" : sessionStorage.getItem("accessToken")
        }
      }

        )
        .then((response) => {
          console.log(response.data)
          this.board=response.data
        })
        .catch((error) => {
          console.log("addHEART에러"+error)
          console.log(response)
        })
    },
    delete_board: function () {
      axios
        .delete('http://seungwook.shop/boards/'+this.$route.params.id,{
            headers: {
              "X-AUTH-TOKEN" : sessionStorage.getItem("accessToken")
            }
          }

        )
        .then((response) => {
          console.log(response.data)
          this.board=response.data
        })
        .catch((error) => {
          console.log("delete_board()에러"+error)
          console.log(response)
        })
    }
  }
}
</script>
