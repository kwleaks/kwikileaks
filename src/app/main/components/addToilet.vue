<template>
 <div class="stuff">
    <b-form enctype="multipart/form-data" id="toiletForm" @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="InputGroup1"
                    label="Address: "
                    label-for="Input1">
        <b-form-input id="Input1"
                      type="text"
                      v-model="form.address"
                      required
                      placeholder="Enter address">
        </b-form-input>
      </b-form-group>

      <!--upload photo -->

<!-- after address is chosen fill out detail in box below and show other input options -->
    
    <b-form-file id="file-input" 
              accept="image/*" 
              v-model="form.file"
              v-if="!image"
              @change="onFileChange"></b-form-file>
    <div v-else>
      <img :src="image" />
      <b-button @click="removeImage">Remove image</b-button>
    </div>
    <br> Selected file: {{form.file && form.file.name}}

    <br>
      <!--star ratings-->
      <b-form-group label="Rating: ">
          <b-form-radio-group id="toilet-rating" v-model="form.rating" name="Rating">
              <b-form-radio value="1">1</b-form-radio>
              <b-form-radio value="2">2</b-form-radio>
              <b-form-radio value="3">3</b-form-radio>
              <b-form-radio value="4">4</b-form-radio>
              <b-form-radio value="5">5</b-form-radio>
          </b-form-radio-group>
      </b-form-group>
      <!--comments-->
      <b-form-textarea id="toilet-comments" v-model="form.comments" placeholder="Review" :rows="3">
      </b-form-textarea>
      <br>

      


      <!-- <input id="Input1" type="text" required placeholder="Enter address"></input> -->
<!--       <b-form-group id="exampleInputGroup2"
                    label="Your Name:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.name"
                      required
                      placeholder="Enter name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3"
                    label="Food:"
                    label-for="exampleInput3">
        <b-form-select id="exampleInput3"
                      :options="foods"
                      required
                      v-model="form.food">
        </b-form-select>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

  </div>
</template>

<script>

export default {
  name: 'AddView',
  data () {
    return {
      image: '',
      form: {
        //set everything to null when you know what everything will be
        // address: '',
        // street_address: '',
        // city: '',
        // state: '',
        // zip: '',
        // country: ''
      },
      show: true,
      address: null,
      name: null, 
      city: null,

    }
  },
  mounted: function(){
    var scope = this;
    var input = document.getElementById('Input1');
    var placeSearch, autocomplete;
    function initAutocomplete() {
      autocomplete = new google.maps.places.Autocomplete(
        input, 
        //{types: ['geocode']}
        );
      autocomplete.addListener('place_changed', fillInAddress);
    }
    initAutocomplete();
    function fillInAddress(){
      var place = autocomplete.getPlace();
      console.log(place);
      let placeLat = place.geometry.location.lat();
      let placeLng = place.geometry.location.lng();
      console.log(placeLat);
      console.log(placeLng);
      console.log(place.id)
      console.log(place);
      //console.log(place.location.lat);
      this.name = place.name;
      this.address = place.formatted_address;
      scope.form.name = place.name;
      scope.form.location = place.formatted_address;
      scope.form.latitude = placeLat;
      scope.form.longitude = placeLng;
      scope.form.geolocation = [placeLat, placeLng];
      scope.form.googleID = place.id;

      // ...etc! set up the result match and show it on the screen
      // then let user rate, add pictures, add stars, etc


      if (place.types.length == 1 && place.types[0] == 'street_address') {
        scope.$http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCm5Sz261KXfwM82StwusIE__NxsJ6cemc&latlng='+placeLat+','+placeLng).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        })

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
    // var request = google.maps.places.PlaceSearchRequest({
    //   keyword: 'Milkboy'
    // });
    //console.log(google.maps.places);
  },
  methods: {
    onSubmit (evt) {
      let scope = this;
      evt.preventDefault();
      console.log(scope.form);
      let formData = scope.form;
      scope.$http.post('http://localhost:3000/fake/createNew', 
        formData, 
        {headers: {enctype : "multipart/form-data"}}).then((response) => {
        console.log(response);
      }, (error) => {
        console.log('error');
      }) 
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
      this.createImage(file);
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
      this.image = '';
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#toiletForm {
  position:relative;
  top: 10%;
  width: 90%;
  margin: 0 auto;
}
img {
  width: 200px;
}
.stuff {
  height: 100%;
  width: 100%;
  position: relative;
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
