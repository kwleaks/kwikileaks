
 <template>
  <div class="main">
    <div id="map"></div>
<!--     <b-modal id="modal1" ref="myModalRef" :title="modalTitle">
      <p class="my-4">
        <span>Address: {{modalAddress}}</span>
        <span>Hours: {{modalHours}}</span>
        <span>Rating: {{modalRating}}</span>
      </p>
       <div slot="modal-footer" class="w-100">
         <b-btn size="sm" variant="primary" @click="viewToilet">See More</b-btn>
         <b-btn size="sm" variant="primary" @click="show=false">
           Close
         </b-btn>
       </div>
    </b-modal> -->
    <div id="info-content">
<!--         <div>
            <p class="my-4">
        <span>Address: {{modalAddress}}</span>
        <span>Hours: {{modalHours}}</span>
        <span>Rating: {{modalRating}}</span>
      </p>
         <button size="sm" variant="primary" @click="viewToilet">See More</button>
         <button size="sm" variant="primary" @click="show=false">
           Close
         </button>
       </div>` -->
    </div>
  </div>
</template>

<script>

export default {
name: 'MainView',
data() {
    return {
      markers: [],
      place: null,
      center: {lat: 0, lng: 0},
      modalTitle: undefined,
      modalAddress: undefined,
      modalHours: undefined,
      modalRating: undefined,
      infoContent: "",
      // searchtext: undefined
    }
  },
  beforeCreate: function(){
     // get all bathrooms in database and include them on the map
     // in the future this should only get the bathrooms in a certain range
     var scope = this;
     // this.$http.get('http://localhost:3000/fake/getAll').then((response) => {
     //    let r = response.body
     //    for (let i=0; i<r.length; i++) {
     //      scope.markers.push({
     //        position: {lat: r[i].latitude, lng: r[i].longitude},
     //        label: r[i].name,
     //        id: r[i]._id,
     //        hours: r[i].hours,
     //        address: r[i].location
     //      })
     //    }
     //  }, (error) => {
     //    console.log('error');
     //  }) 
     this.$http.get('http://localhost:3000/fake/findAll').then((response) => {
      // console.log('real data below');
        console.log(response);
        let r = response.body
        for (let i=0; i<r.length; i++) {
          scope.markers.push({
            position: {lat: r[i].latitude, lng: r[i].longitude},
            label: r[i].name,
            id: r[i]._id,
            hours: r[i].hours,
            address: r[i].location
          })
        }
     }, (error) => {
      console.log('error');
     }) 
  },
  mounted: function(){
      var scope = this;
      var el = document.getElementById('map');
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                function(position){
                    var crd = position.coords;
                    scope.center.lat = crd.latitude;
                    scope.center.lng = crd.longitude; 
                    initMap();
                }, error);
          } else {
              x.innerHTML = "Geolocation is not supported by this browser.";
          }
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
    function initMap(){
        const map = new google.maps.Map(el, {
          zoom: 16,
          center: scope.center,
                    styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
        for (var i=0; i<scope.markers.length; i++){
          let marker = new google.maps.Marker({
            map: map,
            icon: {url: 'toilet-icon-png-14017.png'},
            position: scope.markers[i].position,
            name: scope.markers[i].label,
            id: scope.markers[i].id,
            hours: scope.markers[i].hours,
            address: scope.markers[i].address
          })
        marker.addListener('click', function() {
            scope.markerClicked(marker);
            infoWindow.setContent(document.getElementById('info-content').innerHTML);     
            document.addEventListener('click', function(e) {
              if (e.target && e.target.id == 'view-toilet-btn') {
                scope.viewToilet();
              } else if (e.target && e.target.id == 'close-window-btn') {
                infoWindow.close();
              }
            })            
            infoWindow.open(map, marker);
        });
        }
        var infoWindow = new google.maps.InfoWindow({
          content: scope.infoContent
        })
    }
  },
  description: 'Kwikileaks map',
  methods: {
    setCenter(center) {
    },
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.place = place
    },
    usePlace(place) {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          }
        })
        this.place = null;
      }
    },
    markerClicked(toilet){
      this.modalTitle = toilet.name;
      this.modalId = toilet.id;
      this.modalAddress = toilet.address;
      this.modalHours = toilet.hours;
      this.$forceUpdate()
      document.getElementById('info-content').innerHTML = 
            `<div class="window-container">

              <div class="window-container-cell" id="photo">
              </div>
              <div class="window-container-cell">Address: `+this.modalAddress+`</div>
              <div class="window-container-cell">Hours: `+this.modalHours+`</div>
              <div class="window-container-cell">Rating: `+5+`</div>
              <div class="button-row">
               <button id="view-toilet-btn" size="sm" variant="primary">See More</button>
               <button id="close-window-btn" size="sm" variant="primary">Close</button>
              </div>
             </div>`
    },
    viewToilet(toilet){
      console.log('go to page for this toilet')
      console.log(this.modalId)
      this.$router.push("/toilet/"+this.modalId)
    }
  }

}


</script>

<style scoped>

.searchtext {
  position:relative;
  width: 50%;
  display: inline-block;
  top: 20px;
}
.btn-addToilet {
/*  height: 50px;
  width: 50px;
  border-radius: 100px;*/
  /*background-color:white;*/
  display: inline;
  position:relative;
  top: 20px;
}
#modal1 {
  height: 800px;
  width: 800px;
  color: orange;
}
.main {
  height: 92vh;
  width: 100%;
  overflow-y: hidden;
}
#map {
  height: 100%;
  width: 100%;
  position:relative;
}
.footer {
  height: 100px;
  width: 100%;
  background-color: pink;
  position: absolute;
  bottom: 0;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style> 
