<template>
	<div class="toiletView">
		<div class="toilet-view-cell cell1">
			photo
		</div>
		<div class="toilet-view-cell cell2">
			<!-- toilet info -->
			<div>Name: {{information.name}}</div>
			<div>Address: {{information.location}}</div>
			<div>Hours:
				<li v-for="day in information.hours">
				   {{ day }}
				</li>
			</div>
		</div>
		<div class="toilet-view-cell cell3">
			Aggregate information
			<div>Gender Neutral: <span v-if="!isNaN(gender_neutral)">{{gender_neutral * 100}}%</span><span v-else>No information</span></div>
			<div>Pet Friendly: <span v-if="!isNaN(pet_friendly)">{{pet_friendly * 100}}%</span><span v-else>No information</span></div>
			<div>Clean: <span v-if="!isNaN(clean)">{{clean * 100}}%</span><span v-else>No information</span></div>
			<div>Private Room: <span v-if="!isNaN(private_room)">{{private_room * 100}}%</span><span v-else>No information</span></div>
			<div>Handicap Accessible: <span v-if="!isNaN(handicap)">{{handicap * 100}}%</span><span v-else>No information</span></div>
			<div>Diaper Station: <span v-if="!isNaN(diaper_station)">{{diaper_station * 100}}%</span><span v-else>No information</span></div>
			<div>Attendant: <span v-if="!isNaN(attendant)">{{attendant * 100}}%</span><span v-else>No information</span></div>
			<!-- <div>Customers Only: <span v-if="gender_neutral != 'NaN'">{{cust_only * 100}}%</span></div> -->
		</div>
		<div class="toilet-view-cell cell4">
			<div v-for="review in reviews">
				<div v-if="review.comments">
					{{review.comments}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
var server_url = "http://localhost:3000"
var server_url = "https://warm-shelf-71293.herokuapp.com";

export default {
  name: 'ToiletView',
  data () {
    return {
      message: "this is where you see toilet details",
      id:  this.$route.params.id,
      photos: null,
      reviews: null,
      information: null,
      stars: null,
      // ratings: {
      gender_neutral: null,
      pet_friendly: null,
      clean: null, 
      private_room: null,
	  handicap : null,
	  diaper_station: null,
	  attendant: null,
	  cust_only: null 
	  // }    

    }
  },
  created: function(){
     var scope = this;
     let today = (new Date()).getDay();
     scope.dayOfWeek = today > 0 ? today - 1 : 6 

     this.$http.get( server_url + '/fake/findOne/'+ scope.id).then((response) => {
        let r = response.body
        console.log(r);
        scope.photos = r.photos;
        scope.reviews = r.reviews;
        scope.information = r.info[0];
        this.getAverages();
     }, (error) => {
      console.log('error');
     }) 
  },
  methods: {
  	getAverages() {
  		var scope = this;
  		console.log(scope.reviews)
  		let private_room_count = 0;
  		let private_room_pos = 0;
  		let handicap_count = 0;
  		let handicap_pos = 0;
  		let diaper_station_count = 0;
  		let diaper_station_pos = 0;
  		let attendant_count = 0;
  		let attendant_pos = 0;
  		let cust_only_count = 0;
  		let cust_only_pos = 0;
  		let gender_neutral_count = 0;
  		let gender_neutral_pos = 0;
  		let pet_friendly_count = 0;
  		let pet_friendly_pos = 0;
  		let clean_count = 0;
  		let clean_pos = 0;

  		for (let i = 0; i< scope.reviews.length; i++) {
  			let review = scope.reviews[i];
  			if (review.private_room != null) {
  				private_room_count ++;
  				if (review.private_room === true) {
  					private_room_pos ++;
  				}
  			}
  			if (review.handicap != null) {
  				handicap_count ++;
  				if (review.handicap === true) {
  					handicap_pos ++;
  				}
  			}
  			if (review.diaper_station != null) {
  				diaper_station_count ++;
  				if (review.diaper_station === true) {
  					diaper_station_pos ++;
  				}
  			}
  			if (review.attendant != null) {
  				attendant_count ++;
  				if (review.attendant === true) {
  					attendant_pos ++;
  				}
  			}
  			if (review.cust_only != null) {
  				cust_only_count ++;
  				if (review.cust_only === true) {
  					cust_only_pos ++;
  				}
  			}
  			if (review.gender_neutral != null) {
  				gender_neutral_count ++;
  				if (review.gender_neutral === true) {
  					gender_neutral_pos ++;
  				}
  			}
  			if (review.pet_friendly != null) {
  				pet_friendly_count ++;
  				if (review.pet_friendly === true) {
  					pet_friendly_pos ++;
  				}
  			}
  			if (review.clean != null) {
  				clean_count ++;
  				if (review.clean === true) {
  					clean_pos ++;
  				}
  			}
  		}
  	  scope.gender_neutral = gender_neutral_pos / gender_neutral_count
      scope.pet_friendly = pet_friendly_pos / pet_friendly_count
      scope.clean = clean_pos / clean_count
      scope.private_room = private_room_pos / private_room_count
	  scope.handicap  = handicap_pos / handicap_count
	  scope.diaper_station = diaper_station_pos / diaper_station_count
	  scope.attendant = attendant_pos / attendant_count
	  scope.cust_only = cust_only_pos / cust_only_count

	  console.log(scope);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.toiletView {
	display: grid;
	background-color: purple;
	height: 100%;
	width: auto;
	grid-template-rows: 40vh 20vh 20vh auto;
  	grid-template-columns: 100%;
  	grid-row-gap: 10px;
}
.toilet-view-cell {
	background-color: white;
}
.cell1 {
	background-color: orange;
}
.cell2 {
}
.cell3 {
	background-color:green;
}
.cell4 {
	background-color: pink;
}

@media only screen and (min-width: 530px) { 
.toiletView {
	margin-top:10px;
	margin-left: 10px;
	margin-right: 10px;
	grid-template-rows: 50vh 20% auto 10%;
  	grid-template-columns: 35% 65%;
  	grid-column-gap: 5px;
  	grid-row-gap: 10px;
}
.toilet-view-cell {
	background-color: white;
	
}
.cell1 {
	grid-column: 1 / 2 ;
	background-color: orange;
}
.cell2 {
	grid-column: 2 / 3;
}
.cell3 {
	grid-column: 1 / 3;
	background-color:green;
}
.cell4 {
	grid-column: 1 / 3;
	background-color: pink;
}
}

</style>
