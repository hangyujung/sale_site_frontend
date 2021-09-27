
<template>
  <div>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <!--    헤더 컴포넌트-->
    <Header />
<!--    점보트론 -->
    <div>
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template #header>리얼 뽐뿌</template>

        <template #lead>
          리얼 뽐뿌는 동네별로 할인하고 있는 오프라인 상품들에 대한 정보들을 공유하는 웹 사이트 입니다.
          알고 있는 할인정보를 공유해서 합리적인 소비를 할 수 있습니다.
        </template>
        <hr class="my-4">
        <p>
        v1.0
        </p>
      </b-jumbotron>
    </div>

<!--    게시글 테이블  -->
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">

        <b-col md="10" offset-md="1">

          <table id="my-table" width="1000px" height="700">
            <tr>
              <th>분류</th>
              <th>글쓴이</th>
              <th>  </th>
              <th>제목</th>
              <th>등록일</th>
              <th>찜</th>
            </tr>
            <tr v-for="item in data" :key="item.boardId">

              <td><span v-html="item.category"></span></td>
              <td><span v-text="item.user.username"></span></td>
              <td><img width="90px" height="120px" v-bind:src="item.imgUrl"></td>

              <td>
                <span @click="$router.push('/detail/'+item.boardId)" v-text="item.title"></span>
              </td>
              <td><span v-text="item.createdAt"></span></td>
              <td><span v-text="item.heartCount"></span></td>

            </tr>
          </table>

        </b-col>
      </b-row>
    </b-container>


<!--    <b-pagination-->
<!--      v-model="currentPage"-->
<!--      :total-rows="rows"-->
<!--      :per-page="perPage"-->
<!--      aria-controls="my-table">-->
<!--    </b-pagination>-->

<!--    <button id="rc" >주소변경</button>-->
<!--    <input id="search" type="text" placeholder="검색어를 입력하세요">-->
<!--    <button id="wr" @click ="write" >글쓰기</button>-->


</div>
</template>
<script>

import Header from './Header'
import './main.css'
import axios from 'axios'

export default {
  name: 'main',
  components: {Header},
  data () {
    return {
      perPage: 5,
      currentPage: 1,
      data: '',

      fields: ['category', 'user.username', 'imgurl','title','createdAt','heartCount','region']
    }
  },
  created: function () {
    axios
      .get('http://seungwook.shop/boards', {

      })
      .then((response) => {
        console.log(response.data)
        this.data=response.data
      })
      .catch((error) => {
        console.log(error)
      })
    console.log('created()함수실행')
    sessionStorage.setItem('isLogin','false')

  },
  methods: {
    write () {
      this.$router.push({
        path: 'create'
      })
    },
    goDetail(item){
      this.$router.push({name:'Detail'});
    }
  },
  computed: {

    rows () {
      return this.data.length
    }
  }
}

</script>
