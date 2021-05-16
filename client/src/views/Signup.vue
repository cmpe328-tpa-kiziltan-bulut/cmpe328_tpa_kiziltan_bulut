<template>
  <div class="signup-page">
    <h1>Signup Page</h1>
    <div id="signup-form">
      <label>
        <input v-on:keydown="checkKey" v-model="fullName" type="text" placeholder="Name Surname">
      </label>
      <br>
      <label>
        <input v-on:keydown="checkKey" v-model="email" type="text" placeholder="name.surname@email.com">
      </label>
      <br>
      <label>
        <input v-on:keydown="checkKey" v-model="password" type="password" placeholder="**************">
      </label>
      <br>
      <router-link to="/login">Already have an account?</router-link>
      <button v-on:click="register">Register</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      isRegistrationSuccessful: false
    }
  },
  methods: {
    checkKey: function (event) {
      if (event.key === 'Enter') this.register();
    },
    register: async function () {
      let requestBody = new URLSearchParams();
      requestBody.append("fullName", this.fullName);
      requestBody.append("email", this.email);
      requestBody.append("pwd", this.password);

      fetch(process.env.VUE_APP_API_URL + "/auth/signup", {
        method: 'post',
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
        body: requestBody
      }).then(res => {
        if (res.status === 201) {
          this.isRegistrationSuccessful = true;
          alert("Registration is successful, you can log in now ^^");
          this.$router.push({name: "Log In"});
        } else {
          this.isRegistrationSuccessful = false
          alert("Registration is NOT successful!");
        }
      }).catch(err => {
        this.isRegistrationSuccessful = false
        alert("Registration is NOT successful! " + err.response.statusCode);
      });
    }
  }
}
</script>
