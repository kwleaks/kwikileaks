<template>
  <div id="app">
    <transition name="fade">
      <div v-if="menu_shown" class="blackout" 
      v-bind:class="[menu_slide_up ? 'slide_up' : search_slide ? 'search_slideup' : '']" 
      style="color:white">
        
        <transition name="slide-left">
          <router-link to="/">
          <div 
          class="p1" 
          v-if="menu_shown || search_slide" 
          v-bind:class="[search_slide ? 'search_slideup_bar' : show_filters ? 'word_hide' : '']" 
          @click="slideUpSearch">Search
            <input id="hidden-input" v-if="show_input" v-bind:class="[search_slide ? 'search_slideup_input' : '']"/>
          </div>
        </router-link>
          
        </transition>
        <transition name="slide-left">
          <p class="p2" v-bind:class="[search_slide ? 'word_hide' : show_filters ? 'bump_up' : '']" @click="showFilters" v-if="menu_shown">Filter</p>
        </transition>
        <transition name="slide-left">
          <router-link to="/addToilet">
            <p class="p3" v-bind:class="[search_slide || show_filters ? 'word_hide' : '']" @click="slideUp" v-if="menu_shown">Add Toilet</p>
          </router-link>
        </transition>
        <transition name="slide-left">
          <p class="p4" v-bind:class="[search_slide || show_filters ? 'word_hide' : '']" v-if="menu_shown">About</p>
        </transition>

        <div v-if="show_filters_text">
          Filters coming soon...
<!--           Filter by
          <p>Open Now</p>
          <p>Rating</p>
          <p>Gender Neutral</p>
          <p>Private Room</p>
          <p>Attendant</p>
          <p>Pet Friendly</p>
          <p>Clean</p>
          <p>Handicap Accessible</p>
          <p>Diaper Station</p>
          <p>Customer Only</p> -->
        </div>

      </div>
    </transition>
    <div class="header">
        <div style="position: absolute" class="menu header-icon">
          <!-- <span> -->
            <div v-if="!menu_shown" @click="showMenu">
            <icon name ="bars"scale="2"/>
            </div>
            <div v-else @click="resets">
               <icon name="close" scale="2" />
            </div>
           
          <!-- </span> -->
        </div>
        <div>
          <router-link to ="/">
            <!-- <mq-layout mq="md+"> -->
            <h1 ><span class="large-k">K</span>WIKILEAKS</h1>
          <!-- </mq-layout> -->
          </router-link>
        </div>
<!--         <div style="position: absolute" class="search header-icon">
        <span>
          <icon name = "search" scale="1.5" />
      </span>
        
      </div>
        <div style="position: absolute" class="filters header-icon">
          <span>
            <router-link to ="/filter">
              <icon name = "filter" scale="1.5" />
          </router-link>
          </span>
        </div>
        <div style="position: absolute" class="add header-icon">
         <span>
          <router-link to="/addToilet">
              <icon name = "plus" scale="1.5"/>
          </router-link>
        </span>
      </div> -->
    </div>
    <router-view/>
  </div>
</template>

<!-- this should become visible on clicking the search button -->
<!-- <b-form-input v-model="searchtext" class="searchtext" type="text" placeholder="Search Address or Place Name"></b-form-input> -->




<script>

export default {
  name: 'app',
  data () {
    return {
      menu_shown: false,
      menu_slide_up: false,
      search_slide: false,
      show_input: false,
      show_filters: false,
      show_filters_text: false
    }
  },

  methods: {
    showMenu() {
      this.menu_shown = !this.menu_shown;
      console.log('show menu')
      let blackout = document.getElementsByClassName('blackout');
      // blackout.setAttribute('style', 'display: block')
      // alert('hello')


    },
    slideUp() {
      var scope = this;
      console.log('slide menu up and fade it out')
      this.menu_slide_up = true
      window.setTimeout(function() {
        scope.menu_shown = false;
        scope.menu_slide_up = false;
      }, 2500)
      // this.menu_shown = false
    },
    slideUpSearch() {
      var scope = this;
      this.search_slide = true
      window.setTimeout(function(){
        scope.show_input = true
      }, 2500)
    },
    showFilters() {
      var scope = this
      this.show_filters = true;
      window.setTimeout(function(){
        scope.show_filters_text = true
      }, 2500)
    },
    resets() {
      console.log('reset!!')
      this.search_slide = false;
      this.show_input = false;
      this.menu_shown = false;
      this.menu_slide_up = false;
      this.show_filters = false;
      this.show_filters_text = false
      this.$forceUpdate();
    }
  }
}
</script>

<style>
/*CSS for google maps infoWindow*/
.blackout {
  height: 100%;
  width: 100%;
  background-color: black;
  /*display:none;*/
  position: absolute;
  opacity: .95;
  z-index: 400;
  padding-top: 100px;
  font-size: 50px;
  text-align: center;
}
/*.blackout p {

  animation-duration: 3s;
  animation-name: slidein;

}*/
.p1 {
  /*position: absolute;*/
  /*left: 500px;*/
  animation-duration: 2s;
  animation-name: slidein;
}
.p2 {
  /*animation-dela*/
  animation-duration: 3s;
  animation-name: slidein;
}
.p3 {
  /*animation-dela*/
  animation-duration: 4s;
  animation-name: slidein;
}
.p4 {
  /*animation-dela*/
  animation-duration: 5s;
  animation-name: slidein;
}
.slide_up {
  animation-duration: 3s;
  animation-name: slideup;
}
.search_slideup {
  animation-delay:1s;
  animation-duration: 4s;
  animation-name: slideupSearch;
  animation-fill-mode: forwards;
}
.search_slideup_bar {
  animation-delay: 1s;
  animation-duration: 4s;
  animation-name: slideupSearchBar;
  animation-fill-mode: forwards;
}
.word_hide {
  animation-duration: 3s;
  animation-name: fadeOut;
  animation-fill-mode: forwards;
}
.search_slideup_input {
  animation-duration: 2s;
  animation-name: slideupReveal;
  animation-fill-mode: forwards
}
.bump_up {
  animation-delay: 1s;
  animation-duration: 2s;
  animation-name: bumpUp;
  animation-fill-mode: forwards;
}
#hidden-input {
  /*display:none;*/
  /*visibility:hidden;*/
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 400px;
  background-color: transparent;
  border: 3px solid white;
  border-radius: 50px;
  height: 50px;
  outline: none;
  color: white;

}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  20% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes slidein {
  0% {
    margin-left: 100%;
    width: 300%;
    opacity: 0;
    color: #33bf86;
  }
  60% {
    color: #33bf86;
  }
  100% {
    opacity: 1;
    margin-left: 0%;
    width: 100%;
    color: white;
  }
}
@keyframes slideup {
  0% {
    opacity: .95;
    top: 0;
  }
  80% {
    opacity: .95;
    top: -92%;
  }
  100% {
    opacity: 0;
    top: -92%;
  }
}
@keyframes bumpUp {
  0% {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 170px;
  }
/*  50% {
    top: 135px;
  }*/
  100% {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 100px;
  }
}
@keyframes slideupSearch {
   0% {
    opacity: 1;
    top: 0;
  }
  90% {
    opacity: 1;
    top: -92%;
  }
  100% {
    opacity: 1;
    top: -92%;
  } 
}

@media only screen and (min-width: 630px) { 
@keyframes slideupReveal {
  0% {
    display:none;
    opacity: 0;
    top: 7px;
    left: 2700px;
  }
  85% {
    display:inline-block!important;
    opacity: 1;
    top: 7px;
     left: 600px;
  }
  90% {
    /*left: 100px;*/
    opacity: 1;
    top: 7px;
     left: 600px;
  }
  100% {
    opacity: 1;
    left: 600px;
    top: 7px;
  }
}
@keyframes slideupSearchBar {
  0% {
    /*padding-top: 100px;*/
      position:absolute;
      left: 0;
      right: 0;
      margin: auto;
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
      color: white;
  }
  45% {
    position: fixed;
    top: -7px;
    left: 0;
    right: 0;
    margin: 0 auto;
    transform: scale(0.75);
    -webkit-transform: scale(0.75);
    color: white;
  }
  70% {
    transform: scale(0.75);
    -webkit-transform: scale(0.75);
    position: fixed;
    top: -7px;
    left: -300px;
    right: 0;
    color: white;
    /*margin: 0 auto;*/
    /*padding-top:200px;*/
  }
  100% {
    transform: scale(0.75);
    -webkit-transform: scale(0.75);
    position: fixed;
    top: -7px;
    left: -300px;
    right: 0;
    color: white;
  }
}


}

@media only screen and (max-width: 630px) { 
@keyframes slideupReveal {
  0% {
    display:none;
    left: 0;
     right: 0;
     margin: 0 auto;
    opacity: 0;
    top: 3px;
    width: 70%;
    /*left: 2700px;*/
  }
  85% {
    display:inline-block!important;
    left: 0;
     right: 0;
     margin: 0 auto;
    opacity: 1;
    top: 3px;
     /*width: 70%;*/
     
  }
  90% {
    /*left: 100px;*/
    opacity: 1;
    top: 3px;
     left: 0;
     right: 0;
     margin: 0 auto;
      width: 90%;
  }
  100% {
    opacity: 1;
    top: 3px;
     left: 0;
     right: 0;
     margin: 0 auto;
      width: 90%;

  }
}
@keyframes slideupSearchBar {
  0% {
    /*padding-top: 100px;*/
      position:absolute;
      left: 0;
      right: 0;
      margin: auto;
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
  }
  45% {
    position: fixed;
    top: -7px;
    left: 0;
    right: 0;
    margin: 0 auto;
    transform: scale(0.75);
    -webkit-transform: scale(0.75);
  }
  70% {
    position: fixed;
    top: -7px;
    left: 0;
    right: 0;
    margin: 0 auto;
    transform: scale(0.75);
    -webkit-transform: scale(0.75);
    opacity: 1;
    /*margin: 0 auto;*/
    /*padding-top:200px;*/
  }
  100% {
    position: fixed;
    top: -7px;
    left: 0;
    right: 0;
    margin: 0 auto;
    transform: scale(0.75);
    -webkit-transform: scale(0.75);
    opacity: 1;
    color: black;
  }
}
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide-left-enter, .slide-left-leave-to {
  /*transform: translateX(100px);*/
  left: 0px;
}
.slide-left-enter-to {
  left: 50px;
}
.slide-left-enter-active {
  left: 50px;
  transition: all 3s;
}
.window-container {
  padding: 0;
  margin: 0;
  display: grid;
  background-color: white;
  height: 150px;
  grid-template-rows: 20% 30% 25% 25%;
  grid-template-columns: 30% 65%;
  grid-column-gap: 5%;
  /*grid-gap: 3px;*/
}

.window-container-cell {
  color: #2f438c;
  position: relative;
  text-align: left;
  font-size: 13px;
  /*font-weight: bold;*/
}
.window-container-cell > div {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 0 auto;
}
.button-row {
  text-align: left;
}

#photo {
  grid-row: 2 / 5;
  /*grid-row-end: 6;*/
  background-color: white;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
#window-container-title {
  grid-column: 1 / 3;
  text-align: center;
  color: white;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  background-color: #ca7dfd;
}
.gm-style-iw {
  left: 0px !important;
  top: 15px !important;
  width: 350px !important;
  background-color: #e6e9ed;
  border-radius: 10px;
}
/*remove x from top right corner of info window*/
.gm-style-iw + div{
  display:none;
  background-color: transparent;
}
.gm-style-iw > div {
  width: 100%!important;
}
@media only screen and (max-width: 500px) { 
.gm-style-iw {
  left: 0px !important;
  top: 15px !important;
  width: 350px !important;
  background-color: #e6e9ed;
  border-radius: 10px;
}



}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.header {
  text-align: center;
  height: 8vh;
  background-color: black;
  display: inline-block;
  width: 100%;
  text-align: center;
}
.menu {
  top: 15px;
  left: 15px;
  z-index: 401;
}
.search {
  top: 15px;
  right: 50px;
}
.filters{
  top: 15px;
  right: 75px;
}
.add {
  top: 15px;
  right: 25px;
}
/*.header-icon {
  font-size: 20px;
  vertical-align: baseline;
  position:relative;
}*/
.header-icon>span {
  /*position: absolute;*/
  /*bottom: 0;*/
  /*left: 1vw;*/
  /*font-size: 20px;*/
}
.grid-div {
  background-color:blue;
}
h1 {
  /*font-family: 'Linux Libertine';*/
  font-size: 4.5vh;
}
.large-k {
  font-size: 6vh;
}
@media only screen and (min-width: 480px) {
h1 {
  /*font-family: 'Linux Libertine';*/
  font-size: 5.5vh;
}
.large-k {
  font-size: 7vh;
}
}
a, a:hover {
  text-decoration: none;
  color: white;
}
.header a, .header-icon {
  text-decoration: none;
  /*color: #EFE5DD;*/
  /*color: #f7e6a1;*/
  color: #33bf86;
}
.header a:hover {
  text-decoration:none;
  /*color:#EFE5DD;*/
  /*color: #f7e6a1;*/
  color: #33bf86;
}
</style>
