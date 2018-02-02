
<template>
<b-card no-body>
    <b-tabs pills card>
        <b-tab title="Sign Up" active>
            <b-form class="form" @submit="registerUser">
                <b-form-group name="username" id="username-group">
                    <b-form-input id="username" type="text" v-model="form.username" required placeholder="Enter User Name">
                    </b-form-input>
                </b-form-group>
                <b-form-group name="email" id="email-group">
                    <b-form-input id="email" type="email" placeholder="Enter Email" required v-model="form.email">
                    </b-form-input>
                </b-form-group>
                <b-form-group name="password" id="password-group">
                    <b-form-input id="password" type="password" placeholder="Enter Password" required v-model="form.password">
                    </b-form-input>
                </b-form-group>
                <b-form-group name="passwordconf" id="password-conf-group">
                    <b-form-input id="passwordconf" type="password" placeholder="Confirm Password" required v-model="form.passwordconf">
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Sign Up</b-button>
            </b-form>
        </b-tab>
        <b-tab title="Log In">
            <div class="login-form">
                <b-form class="form" @submit="loginUser">
                    <b-form-group name="loginusername" id="login-username-group">
                        <b-form-input id="loginusername" type="text" v-model="loginform.username" required placeholder="Enter User Name">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group name="loginpassword" id="login-password-group">
                        <b-form-input id="loginpassword" type="password" placeholder="Enter Password" required v-model="loginform.password">
                        </b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Log In</b-button>
                </b-form>
                </form>
            </div>
        </b-tab>
    </b-tabs>
</b-card>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.4"></script>
<script>
// var server_url = "http://localhost:3000"
var server_url = "https://warm-shelf-71293.herokuapp.com"
export default {
  name: 'SignIn',
  // props: ['form'],
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        passwordconf: ''
      },
      loginform : {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    registerUser (event) {
      event.preventDefault();
      var newUser = this.form;
      this.$http.post( server_url+'/users/addUser', newUser).then(function (response) {
    // Success
          console.log(response.data)
          console.log('yay')
      },function (response) {
          // Error
          console.log(response.data)
          console.log('not yay')
      });
    },
    loginUser (event) {
      alert(JSON.stringify(this.loginform));
      let user = this.loginform;
      this.$http.post( server_url + '/session/create', user).then((response) => {
        console.log(response)
        //re route to the user's profile 
        //stuff about session... can only see profile and other stuff if logged in

      }, (error) => {
        console.log('error');
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
@media only screen and (max-width: 480px) {

}
</style>