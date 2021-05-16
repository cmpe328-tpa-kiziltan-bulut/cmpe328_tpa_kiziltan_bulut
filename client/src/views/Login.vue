<template>
  <div class="login-page">
    <h1>Login Page</h1>
    <label>
      <input v-on:keydown="checkKey" v-model="email" type="text" placeholder="name.surname@email.com">
    </label>
    <br>
    <label>
      <input v-on:keydown="checkKey" v-model="password" type="password" placeholder="**************">
    </label>
    <br>
    <button v-on:click="clickLogin">Login</button>
    <br>
    <router-link to="/signup">Click to create a new account</router-link>
    <br>
    <div v-if="isLoginSuccessful">
      LOGIN SUCCESSFUL !!!
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isLoginSuccessful: false
    }
  },
  methods: {
    checkKey: function (event) {
      if (event.key === 'Enter') this.clickLogin();
    },
    clickLogin: async function () {
      let requestBody = new URLSearchParams();
      requestBody.append("email", this.email);
      requestBody.append("pwd", this.password);

      let requestHeader = {};
      requestHeader["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";

      fetch(process.env.VUE_APP_API_URL + "/auth/login", {
        method: 'post',
        headers: requestHeader,
        body: requestBody
      }).then(r => {
        r.json().then(data => {
          if (r.status === 200) {
            localStorage.setItem("z-jwt", data["z-jwt"]);
            this.isLoginSuccessful = true
            alert("SUCCESSFUL ^^ Routing into the app...")
            this.$router.push({name: "Home"})
          }
        })
      }).catch(err => {
        if (err.response.statusCode === 400)
          alert("Wrong parameters (define email & password properly)");
        else if (err.response.statusCode === 401)
          alert("Wrong password or email");
        else if (err.response.statusCode === 404)
          alert("There is no user with that email");
        else {
          alert("Login is unsuccessful!");
        }
        this.isLoginSuccessful = false;
      })
    }
  }
}
</script>

<style scoped>

</style>