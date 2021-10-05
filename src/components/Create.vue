<template>
<!--  <div>-->
<!--    <form @submit.prevent="submit_board">-->
<!--      카테고리: <input id="category" type="text" v-model="category" /><br>-->
<!--      제목: <input id="title" type="text" v-model="title" /><br>-->
<!--      <input type="file" name="photo" id="photo" /><br>-->
<!--      내용: <input id="content" type="textarea" v-model="content" /><br>-->
<!--      지역: <input id="region" type="text" v-model="region" /><br>-->
<!--    </form>-->
<!--    <button @click="submit_board">글 작성</button>-->
<!--  </div>-->

  <div class="container">
    <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
      <div>
        <div class="panel-title">글 작성</div>
        <div>
          <div>
            <input type="text" class="form-control" name="category" placeholder="카테고리" v-model="category" autofocus>
          </div>
          <div id="map" style="width:500px;height:400px;"></div>
          <div>
            <input type="text" class="form-control" name="title" v-model="title" placeholder="제목">
          </div>
          <div>
            <input type="file" class="form-control" id="photo" name="photo"  placeholder="사진">
          </div>
          <div>
            <input type="textarea" class="form-control" name="content" v-model="content" placeholder="내용">
          </div>

          <div>
            <button  @click="submit_board">글 작성</button>
          </div>

        </div>
      </div>
    </div>
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
      region_lat: '',
      region_lng: '',
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {

      this.initMap();
    }
    else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=08a002569760a207869b64feae1f4e89';
      document.head.appendChild(script);
    }

  },
  methods: {
      initMap () {
        // var lat;
        // var lon;
        // if (navigator.geolocation) {

        var lat;
        var lon;
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function(position) {

            lat = position.coords.latitude; // 위도
            lon = position.coords.longitude; // 경도

            const container = document.querySelector('#map')
            const options = {
              center: new kakao.maps.LatLng(lat, lon ),
              level: 3
            }
            const map = new kakao.maps.Map(container, options)

            var marker = new kakao.maps.Marker({
              // 지도 중심좌표에 마커를 생성합니다
              position: map.getCenter()
            });
            marker.setMap(map)

            kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

              // 클릭한 위도, 경도 정보를 가져옵니다
              var latlng = mouseEvent.latLng;

              // 마커 위치를 클릭한 위치로 옮깁니다
              marker.setPosition(latlng);
              this.region_lat = latlng.getLat();
              this.region_lng = latlng.getLng();


              // var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
              // message += '경도는 ' + latlng.getLng() + ' 입니다';
              //
              // var resultDiv = document.getElementById('clickLatlng');
              // resultDiv.innerHTML = message;

            });


            // 마커와 인포윈도우를 표시합니다

            // console.log(lat +" //// "+ lon);
          });
        // }


      },

    submit_board () {

      const frm = new FormData()
      var photoFile = document.getElementById("photo")
      frm.append('category', this.category)
      frm.append('title', this.title)
      frm.append("file", photoFile.files[0])
      frm.append('content', this.content)
      frm.append('region_lat', this.region_lat)
      frm.append('region_lng', this.region_lng)

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
