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
              <div id="map" style="width:100%;height:350px;"></div>
            </tr>

            <tr>
              <td>
                <span>{{board.category}} </span>
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
              <button v-if="board.user && board.user.username==now_id" v-on:click="delete_board">글 삭제</button>
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
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap()
    } else {
      const script = document.createElement('script')
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=08a002569760a207869b64feae1f4e89';
      document.head.appendChild(script)
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
        this.board=response.data;
        setCenter();
      })
      .catch((error) => {
        console.log(error)
      })
    this.now_id = sessionStorage.getItem('login_id');
    console.log('Detail 에서 created()함수실행')
    console.log(sessionStorage.getItem('login_id'));

  },
  methods: {
    setCenter: function() {
  // 이동할 위도 경도 위치를 생성합니다
  var moveLatLon = new kakao.maps.LatLng(this.board.region_lat, this.board.region_lng);

  // 지도 중심을 이동 시킵니다
  map.setCenter(moveLatLon);

  },

    initMap: function() {
      const container = document.querySelector('#map')
      const options = {
        center: new kakao.maps.LatLng(35.19656853772262, 129.0807270648317),
        level: 3
      }
      const map = new kakao.maps.Map(container, options)
      const markerPosition = new kakao.maps.LatLng(35.19656853772262, 129.0807270648317);

      const marker = new kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map)
    },

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
