<template>
	<div class="toiletView">
 <div>Show details for toilet with id {{id}}</div>
</div>
</template>

<script>

export default {
  name: 'ToiletView',
  data () {
    return {
      message: "this is where you see toilet details",
      id:  this.$route.params.id

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
