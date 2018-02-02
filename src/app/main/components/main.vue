 <template>
  <div class="main">
    <div id="map"></div>
    <div id="info-content">
    </div>
  </div>
</template>

<script>
var server_url = "https://warm-shelf-71293.herokuapp.com"
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
      dayOfWeek: 0,
      currentToilet: undefined,
      // searchtet: undefined
    }
  },
  beforeCreate: function(){
     // get all bathrooms in database and include them on the map
     // in the future this should only get the bathrooms in a certain range
     var scope = this;
     let today = (new Date()).getDay();
     scope.dayOfWeek = today > 0 ? today - 1 : 6 

     // this.$http.get('http://localhost:3000/fake/findAll').then((response) => {
     this.$http.get( server_url + '/fake/findAll').then((response) => {
        let r = response.body
        for (let i=0; i<r.length; i++) {
          scope.markers.push({
            position: {lat: r[i].latitude, lng: r[i].longitude},
            label: r[i].name,
            id: r[i]._id,
            hours: r[i].hours[scope.dayOfWeek],
            address: r[i].location,
            googleID: r[i].googleID,
            open_now: r[i].open_now
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
          // #33bf86
          center: scope.center,
                    styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8ec3b9"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1a3646"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#64779e"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#334e87"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6f9ba5"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3C7680"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#304a7d"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#33bf86"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#255763"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b0d5ce"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
  // {
  //   "featureType": "transit",
  //   "elementType": "labels.text.fill",
  //   "stylers": [
  //     {
  //       "color": "#98a5be"
  //     }
  //   ]
  // },
  // {
  //   "featureType": "transit",
  //   "elementType": "labels.text.stroke",
  //   "stylers": [
  //     {
  //       "color": "#1d2c4d"
  //     }
  //   ]
  // },
  // {
  //   "featureType": "transit.line",
  //   "elementType": "geometry.fill",
  //   "stylers": [
  //     {
  //       "color": "#283d6a"
  //     }
  //   ]
  // },
  // {
  //   "featureType": "transit.station",
  //   "elementType": "geometry",
  //   "stylers": [
  //     {
  //       "color": "#3a4762"
  //     }
  //   ]
  // },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0e1626"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4e6d70"
          }
        ]
  }
]

        });
        for (var i=0; i<scope.markers.length; i++){
          let icon_url;
          if (scope.markers[i].open_now == true) {
            icon_url = {url :'src/assets/toilet-icon-blue.png' };
          } else {
            icon_url = {url: 'src/assets/toilet-icon-png-14017.png'};
          }
          let marker = new google.maps.Marker({
            map: map,
            icon: icon_url,
            position: scope.markers[i].position,
            name: scope.markers[i].label,
            id: scope.markers[i].id,
            hours: scope.markers[i].hours,
            address: scope.markers[i].address
          })
        marker.addListener('click', function() {
          console.log('marker clicked')
          function getRating(ID) {
            scope.$http.get( server_url + '/fake/findOne/'+ID).then((response) => {
                let reviews = response.body.reviews;
                let reviewNumber = reviews.length;
                let total = 0;
                for (let i= 0; i<reviews.length; i++) {
                  total += reviews[i].stars
                }
                let average = total/reviewNumber;
                marker.ratingAverage = average;
                scope.currentToilet = marker.id
                scope.markerClicked(marker);
                infoWindow.setContent(document.getElementById('info-content').innerHTML);     
                infoWindow.open(map, marker);   
               }, (error) => {
                console.log(error);
               })       
          }
          getRating(marker.id)
        });
        }
        var infoWindow = new google.maps.InfoWindow({
          content: scope.infoContent
        })
      google.maps.event.addListener(infoWindow, 'domready', function() {
         // Removes background from google maps infowindow so it can be styled!
         var iwOuter = document.getElementsByClassName('gm-style-iw');
         var iwBackground = iwOuter[0].previousSibling;
         iwBackground.children[1].setAttribute('style', 'display:none')
         iwBackground.children[3].setAttribute('style', 'display:none')
      });
      google.maps.event.addListener(map, "click", function(event) {
        infoWindow.close();
      });
            document.addEventListener('click', function(e) {
              if (e.target.parentElement.classList.contains('window-container-cell') || e.target.classList.contains('window-container-cell')) {
                console.log('clicked');
                console.log(scope.currentToilet);

                // scope.viewToilet();
                // scope.$router.push({path: "/toilet/"+scope.currentToilet})
                window.location = '/toilet/'+scope.currentToilet
                scope.currentToilet = '';
              } 
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
      var scope = this;
      this.modalTitle = toilet.name;
      this.modalId = toilet.id;
      this.modalAddress = toilet.address;
      this.modalHours = toilet.hours;
      
      this.modalRating = toilet.ratingAverage;
      this.$forceUpdate();
      function getImage(ID) {
         scope.$http.get( server_url + '/fake/getImage/'+ID+'/1').then((response) => {
          let photo = document.getElementById('photo');
          if (response.body && response.body != '') {
            console.log(photo);
            let url = server_url + "/bathrooms/"+ID+"/"+response.body;
            photo.style.backgroundImage = "url("+url+")";
            console.log(photo)
          } else {
            photo.style.backgroundImage = 'url("../../src/assets/toilet_xs.jpeg")'
          }
         }, (error) => {
          console.log(error);
         }) 
      }
      document.getElementById('info-content').innerHTML = 
            `<div class="window-container">
              <div class="window-container-cell" id="window-container-title"><div>`+this.modalTitle+`</div></div>
              <div class="window-container-cell" id="photo">
              </div>
              <div class="window-container-cell"><div>Address: `+this.modalAddress+`</div></div>
              <div class="window-container-cell"><div>Hours: `+this.modalHours+`</div></div>
              <div class="window-container-cell"><div>Rating: `+this.modalRating+`</div></div>
             
               <!-- <div>Something else!</div> -->
             
             </div>`
      // getRating(scope.modalId);       
      getImage(scope.modalId);

    },
    viewToilet(toilet){
      // console.log('go to page for this toilet')
      // console.log(this.modalId)
      // console.log('go to page for' + this.currentToilet);
      // this.$router.push("/toilet/"+this.currentToilet)
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
