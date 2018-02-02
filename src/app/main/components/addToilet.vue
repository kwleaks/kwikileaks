<template>
 <div class="stuff" id="addToilet">
  <!-- <div class="transparent-background"></div> -->
  <div class="form-container">
    <div class="transparent-background"></div>
    <b-container>
    <b-form enctype="multipart/form-data" id="toiletForm" 
    @submit="onSubmit" 
    @reset="onReset" 
    v-if="show">
      <b-row class="row">
        <!-- <b-col class -->
          <b-col cols="12" sm="3" class="category">
          <label for="Input1">Place: </label>
          </b-col>
          <b-col cols="12" sm="9">
          <b-input id="Input1"
                        autocomplete = "off"
                        type="text"
                        v-model="form.address"
                        placeholder=""
                        required>
          </b-input>
        </b-col>
      </b-row>

      <div v-if="street_address_only">
        <b-row>
          <b-col cols="12" sm="3" class="category">
            <label for="user_name">Name: </label>
          </b-col>
          <b-col cols="12" sm="9">
            <b-input id="user_name"
              autocomplete = "off"
              type="text"
              v-model="form.user_name"
              placeholder=""
              required />
            </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="3" class="category">
              <label for="user_description">Description:</label>
          </b-col>
          <b-col cols="12" sm="9">
              <b-input id="user_description"
              autocomplete="off"
              type="text"
              v-model="form.user_description"
              placeholder=""
              required />
          </b-col>
        </b-row>
      </div>
      
      <b-row class="row category">
        <b-col cols="12" sm="2">
          Rating:
        </b-col>
        <b-col cols="2" md="1">
          <img :src="imageLinks[0]" @click="rateToilet(1)">
        </b-col>
        <b-col cols="2" md="1">
          <img :src="imageLinks[1]" @click="rateToilet(2)">
        </b-col>
        <b-col cols="2" md="1">
          <img :src="imageLinks[2]" @click="rateToilet(3)">
        </b-col>
        <b-col cols="2" md="1">
          <img :src="imageLinks[3]" @click="rateToilet(4)">
        </b-col>
        <b-col cols="2" md="1">
          <img :src="imageLinks[4]" @click="rateToilet(5)">
        </b-col>
      </b-row>

      <b-row class="row">

        <b-col cols="12" md="9"class="category">
          <label>Review/Description</label>
          <b-form-textarea id="toilet-comments" v-model="form.comments" placeholder="" :rows="3">
          </b-form-textarea>
        </b-col>

 <b-col class="image-upload category" md="3" v-if="$mq==='md' || $mq === 'lg'">
    <label for="file-input" style="height: 100%; width: 100%; display: inline-block">
      <div v-if="!image" class="image-placeholder">
        <span>Add a Photo</span>
      </div>
      <div v-else class="image-container" v-bind:style="{ 'background-image': 'url(' + image + ')' }">
              <div class="remove-uploaded-image" @click="removeImage">
                <icon name="times-circle" />
              </div>
      </div>
    </label>
    <input id="file-input" accept="image/*" @change="onFileChange" type="file"/>
</b-col>

      </b-row>

      <b-row>
        <b-col cols="12" style="text-align: center">
     <!--    Yes/No: -->
      </b-col>
      </b-row>


  
    <b-row>
      <b-col cols="6" style="text-align:right">
        <label style="text-align: right">Clean</label>
      </b-col>
      <b-col cols="6" sm="5">
        <b-form-radio-group id="radios0" v-model="form.clean" :options="clean_options" name="radio0">
        </b-form-radio-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="6" style="text-align:right">
        <label style="text-align: right">Gender Neutral</label>
      </b-col>
      <b-col cols="6" sm="5">
        <b-form-radio-group id="radios1" v-model="form.gender_neutral" :options="gender_neutral_options" name="radio1">
        </b-form-radio-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="6" style="text-align:right">
        <label style="text-align: right">Private Room</label>
      </b-col>
      <b-col cols="6" sm="5">
        <b-form-radio-group id="radios2" v-model="form.private_room" :options="private_room_options" name="radio2">
        </b-form-radio-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" style="text-align:right">
        <label style="text-align: right">Handicap</label>
      </b-col>
      <b-col cols="6" sm="5">
        <b-form-radio-group id="radios3" v-model="form.handicap" :options="handicap_options" name="radio3">
        </b-form-radio-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" style="text-align:right">
        <label style="text-align: right">Diaper Station</label>
      </b-col>
      <b-col cols="6" sm="5">
        <b-form-radio-group id="radios4" v-model="form.diaper_station" :options="diaper_station_options" name="radio4">
        </b-form-radio-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" style="text-align:right">
        <label style="text-align: right">Attendant</label>
      </b-col>
      <b-col cols="6" sm="5">
        <b-form-radio-group id="radios5" v-model="form.attendant" :options="attendant_options" name="radio5">
        </b-form-radio-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" style="text-align:right">
        <label style="text-align: right">Pet Friendly</label>
      </b-col>
      <b-col cols="6" sm="5">
        <b-form-radio-group id="radios6" v-model="form.pet_friendly" :options="pet_friendly_options" name="radio6">
        </b-form-radio-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" style="text-align:right">
        <label style="text-align: right">Customer Only ($$$)</label>
      </b-col>
      <b-col cols="6" sm="5">
        <b-form-radio-group id="radios7" v-model="form.cust_only" :options="cust_only_options" name="radio7">
        </b-form-radio-group>
      </b-col>
    </b-row>

    </b-form>
  </b-container>
 
    <b-button class="photo-button" v-if="$mq==='sm' || $mq === 'xs'" block>
       <label v-if="!image" for="file-input-2"  style="height: 100%; width: 100%">
        Add Photo
      </label>
      <div v-else @click="removeImage">
        Remove Photo
      </div>
      <input id="file-input-2" accept="image/*" @change="onFileChange" style="display:none" type="file" />
    </b-button>
   
    <b-button type="submit" block class="submit-button" @click="onSubmit">Submit</b-button>
  </div>
</div>

</template>

<script>

var server_url = "https://warm-shelf-71293.herokuapp.com"

export default {
  name: 'AddView',
  data () {
    return {
      image: '',
      form: {
        name: null,
        location: null,
        comments: null,
        rating: null,
        latitude: null,
        longitude: null,
        geolocation: null,
        googleID: null,
        hours: null,
        type: null,
        clean: null,
        gender_neutral: null,
        private_room: null,
        handicap: null,
        diaper_station: null,
        attendant: null,
        pet_friendly: null,
        cust_only: null,
        
        selected: [],
        user_name: undefined,
        user_description: undefined

      },
      street_address_only: false,
      show: true,
      address: null,
      name: null, 
      city: null,
      imageLinks: ['src/assets/tp-ratings/tp-gray.png','src/assets/tp-ratings/tp-gray.png','src/assets/tp-ratings/tp-gray.png','src/assets/tp-ratings/tp-gray.png','src/assets/tp-ratings/tp-gray.png',],
      clean_options: [{text: 'Yes', value: true}, {text: 'No', value: false}],
      gender_neutral_options: [{text: 'Yes', value: true}, {text: 'No', value: false}],
      private_room_options: [{text: 'Yes', value: true}, {text: 'No', value: false}],
      handicap_options: [{text: 'Yes', value: true}, {text: 'No', value: false}],
      diaper_station_options: [{text: 'Yes', value: true}, {text: 'No', value: false}],
      attendant_options: [{text: 'Yes', value: true}, {text: 'No', value: false}],
      pet_friendly_options: [{text: 'Yes', value: true}, {text: 'No', value: false}],
      cust_only_options: [{text: 'Yes', value: true}, {text: 'No', value: false}],

    }
  },
  mounted: function(){
    var scope = this;
    var input = document.getElementById('Input1');
    var placeSearch, autocomplete;
    function initAutocomplete() {
      autocomplete = new google.maps.places.Autocomplete(
        input, 
        );
      autocomplete.addListener('place_changed', fillInAddress);
    }
    initAutocomplete();
    function fillInAddress(){
      var place = autocomplete.getPlace();
      let placeLat = place.geometry.location.lat();
      let placeLng = place.geometry.location.lng();

      // get additional information from google maps API
      this.name = place.name;
      this.address = place.formatted_address;
      scope.form.name = place.name;
      scope.form.location = place.formatted_address;
      scope.form.latitude = placeLat;
      scope.form.longitude = placeLng;
      scope.form.geolocation = [placeLat, placeLng];
      scope.form.googleID = place.place_id;
      scope.form.hours = place.opening_hours ? place.opening_hours.weekday_text : null;
      scope.form.type = place.types[0];

      if (place.types.length == 1 && place.types[0] == 'street_address') {
        scope.street_address_only = true;
        console.log('street address only')

      } else {
        scope.street_address_only = false;
      }
    }
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            //autocomplete.setBounds(circle.getBounds());
          });
        }
      }
      geolocate();

  },
  methods: {
    onSubmit (evt) {
      let scope = this;
      evt.preventDefault();
      // console.log(scope.form);
      let formData = scope.form;
      console.log(formData)
      var file = scope.form.file;
      let arr = scope.form.selected
      for (let i = 0; i<arr.length; i++) {
        if (arr[i] != false) {
          scope.form[arr[i]] = true;

        }
      }
      var reader = new FileReader();
      function sendForm(data) {
        scope.$http.post( server_url + '/fake/createNew', 
        data,
        {headers: {enctype : "multipart/form-data"}}).then((response) => {
        console.log(response);
      }, (error) => {
        console.log('error');
        console.log(error);
      }) 
      }

      reader.onload = function(event) {
        var data = event.target.result.replace("data:"+ file.type +";base64,", '');
        formData.file = data
        formData.fileType = file.name.split('.')[1];
        sendForm(formData)
      }
      if (file) {
        reader.readAsDataURL(file);
      } else {
        sendForm(formData)
      }
      

    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
    onFileChange(e) {
      var file = e.target.files[0] || e.dataTransfer.files[0];
      console.log(file);
      console.log('file changed');
      this.createImage(file);
      this.form.file = file;
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      e.preventDefault();
      this.image = '';
      this.form.file = '';
    },
    rateToilet: function(rating) {
      var scope = this;
      scope.form.rating = rating;
      console.log(rating)
      let indexedRating = rating-1;
      // scope.imageLink = "src/assets/tp-ratings/tp-orange.png"
      for (let i=0; i<scope.imageLinks.length; i++) {
        if (i <= indexedRating) {
          scope.imageLinks[i] = "src/assets/tp-ratings/tp-orange.png"
        } else {
          scope.imageLinks[i] = "src/assets/tp-ratings/tp-gray.png"
        }
        
      }
      scope.$forceUpdate();

    }
  }
}

</script>
<!-- <link href="https://fonts.googleapis.com/css?family=Raleway|Rammetto+One|Roboto+Slab" rel="stylesheet"> -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway|Rammetto+One|Roboto+Slab');
#toiletForm {
  /*padding: 20px;*/
  position:relative;
}
@media only screen and (min-width: 530px) { 
  #toiletForm {
    padding: 20px;
  }
}

img {
  width: 200px;
}

.stuff {
  font-size: 15px;
  background-attachment: fixed;
  font-family: 'Raleway';
  font-weight: bold;
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url("/src/assets/toilet_outdoor.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  overflow-y: scroll;
}
@media only screen and (min-width: 330px) { 
  .stuff {
    font-size: 20px;
  }
  input {
    font-size: 20px;
  }
  textarea {
    font-size:20px;
  }
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
input {
  text-align: center;
  color: white!important;
  font-size:15px;
  font-weight: bold;
}
textarea {
  color: white!important;
  font-size:15px;
  font-weight: bold;
}
img {
  height: 40px;
  width: 40px;
}
.row {
  margin-bottom: 30px;
}
.form-container {
  position: absolute;
  right: 0!important;
  left: 0!important;
  width: 100%;
  height: auto;
  min-height: 100%;
  margin: auto;
  padding: 0;
  /*padding-top: 20px;*/
  /*overflow-y: scroll;*/
  /*padding: 20px;*/
  padding-bottom: 80px;
}
.transparent-background {
  position: absolute;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  margin: auto;
  /*padding: 20px;*/
  /*background-color: #ad4c50;*/
  background-color: white;
  opacity: .15;
  /*overflow-y: scroll;*/
  
}
@media only screen and (min-width: 530px) { 
.form-container {
  top: 5vh;
  width: 90%;
  /*height: 60vh;*/
  margin-bottom: 20px;
  border: 3px solid #33bf86;
  border-radius: 20px;
}
.transparent-background {
  /*top: 5vh;*/
  width: 100%;
  /*height: 60vh;*/
  border-radius: 20px;
}
}

.form-inner-container {
  /*margin-left: 20px;*/
  /*margin-right: 20px;*/
}
.form-control {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  background-color: transparent;
  color: #263C3F;
  /*text-align:center;*/
  opacity: 1;
  border-bottom: 2px solid #33bf86;
}
.form-control:focus {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-color: #263C3F;
  color: #263C3F;
  outline: none;
  /*box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);*/
  box-shadow: none;
  border-bottom: 3px solid #33bf86;
}
.submit-button {
  position: absolute;
  margin: 0;
  padding: 0;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #33bf86;
  outline: none;
  border: none;
}
.photo-button {
  position: absolute;
  bottom: 38px;
  left: 0;
  background-color: #ca7dfd;
}
@media only screen and (min-width: 530px) { 
.submit-button {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
}
.image-upload > input{
    display: none;
}
::-webkit-input-placeholder { /* Chrome */
  color: #263C3F;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #263C3F;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #263C3F;
  opacity: 1;
}
:-moz-placeholder { /* Firefox 4 - 18 */
  color: #263C3F;
  opacity: 1;
}

.image-placeholder {
  height: 100%;
  /*width: 140px;*/
  /*color: white;*/
  background-image: url("/src/assets/toilet_outhouse.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  color: black;
  font-size: 18px;
  text-align: center;
  vertical-align: center;
  opacity: .8;
}
.image-placeholder > span {
  display: inline-block;
  margin-top: 7px;
  color: white;
}
.image-container {
  position:relative;
  height: 100%;
  background-color: black;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  color: black;
  font-size: 18px;
  text-align: center;
  vertical-align: center;
  /*opacity: .8;*/
  /*margin: 0 auto;*/
}
.upload-photo {
  height: 100%;
  width: 140px;
  border-radius: 20px;
  margin: 0 auto;
  position: relative;
}
.remove-uploaded-image {
  position: absolute;
  display:inline-block;
  top: 0;
  right: 5px;
  /*width: 10px;*/
  width: 10px;
  height:10px;
  color: black;
  background-color: transparent;


  outline: none;
  border: none;
}

.category {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
@media only screen and (min-width: 530px) {
.category {
  text-align: left;
  padding-bottom: 0;
} 
  }

#radios5 .custom-radio {
  display:none!important;
  border-radius: 0!important;
  border: 10px solid black;
}
.custom-control-indicator {
  border-radius: 0!important;
  border: 10px solid black;
}
.custom-control-indicator .custom-radio{
  border-radius: 0!important;
}
.custom-control-input:checked ~ .custom-control-indicator {
    color: #fff;
    background-color: purple!important;
}
.custom-radio .custom-control-input:checked ~ .custom-control-indicator {
  background-image: none!important;
}
</style>
