<template>
  <div id="app">
    <div class="header">
        <div class="menu header-icon">
          <span>&#9776</span>
        </div>
        <div>
          <router-link to ="/">
            <!-- <mq-layout mq="md+"> -->
            <h1 ><span class="large-k">K</span>WIKILEAKS</h1>
          <!-- </mq-layout> -->
          </router-link>
        </div>
        <div class="search header-icon">
        <span>&#x1F50D</span>
      </div>
        <div class="filters header-icon">
          <span>
            <router-link to ="/filter">
            &#9881
          </router-link>
          </span>
        </div>
        <div class="add header-icon">
         <span>
          <router-link to="/addToilet">
           &#10133
          </router-link>
        </span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<!-- this should become visible on clicking the search button -->
<!-- <b-form-input v-model="searchtext" class="searchtext" type="text" placeholder="Search Address or Place Name"></b-form-input> -->




<script>

export default {
  name: 'app'
}
</script>

<style>

.window-container {
  display: grid;
  grid-template-rows: 20% 20% 20% 20% 20%;
  grid-template-columns: 30% 65%;
  grid-column-gap: 5%;
  /*grid-gap: 3px;*/
}
.window-container-cell {
  /*background-color: darkblue;*/
  /*margin: 0;*/
  /*padding: 0;*/

  text-align: left;
}
.button-row {
  text-align: center;
}
.gm-style-iw {
  left: 0!important;
}
#photo {
  grid-row-start: 1;
  grid-row-end: 5;
  background-image: url("../assets/toilet_xs.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.header {
  height: 8vh;
  background-color: #7839CB;
  display: grid;
  grid-template-columns: 10vw auto 10vw 10vw 10vw;
  grid-template-rows: 8vh;
  grid-gap: 3px;
}
.header-icon {
  font-size: 4vh;
  vertical-align: baseline;
  position:relative;
}
.header-icon>span {
  position: absolute;
  bottom: 0;
  left: 1vw;
}
.grid-div {
  background-color:blue;
}
h1 {
  font-family: 'Linux Libertine';
  font-size: 4.5vh;
}
.large-k {
  font-size: 6vh;
}
@media only screen and (min-width: 480px) {
h1 {
  font-family: 'Linux Libertine';
  font-size: 5.5vh;
}
.large-k {
  font-size: 7vh;
}
}

a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration:none;
  color:black;
}
</style>
