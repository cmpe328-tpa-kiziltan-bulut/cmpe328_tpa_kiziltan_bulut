<template>
  <div class="Home" id="main-app">
    <div id="analyze-box">
      <label for="files">Upload files to analyze: </label>
      <input type="file" id="files" multiple="multiple"><br><br>
      <button v-on:click="postFileToBackend"> ANALYZE IT</button>
    </div>
    <div id="result-box">
      <div v-if="hasAnim">
        <i class="fetching-animation material-icons">autorenew</i>
      </div>
      <div v-if="isError">ERROR</div>
      <div id="printed-result" v-else>
        <div v-for="item in sortedResult" :key="item.key">
          <Item v-bind:z_key="item.key" v-bind:value="item.value"></Item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "../components/ResultItem";

export default {
  name: 'Home',
  mounted() {
    document.getElementById('files').addEventListener('change', this.getFile)
    this.theInputWillBePostedToBackend['content'] = "";
  },
  beforeDestroy() {
    document.getElementById('files').removeEventListener('change', this.getFile)
  },
  components: {
    Item
  },
  data() {
    return {
      theInputWillBePostedToBackend: {},
      result: [],
      sortedResult: [],
      isError: false,
      hasAnim: false
    }
  },
  methods: {
    readFile: function (file) {
      const reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
      })
    },

    getFile: function (event) {
      const files = event.target.files
      this.theInputWillBePostedToBackend['content'] = "";

      for (let i = 0; i < files.length; ++i) {
        this.readFile(files[i]).then(data => {
          this.theInputWillBePostedToBackend['content'] += data;
          this.theInputWillBePostedToBackend['content'] += " ";
        }).catch(error => console.log(error))
      }
    },
    postFileToBackend: async function () {
      this.result = [];
      this.sortedResult = [];

      this.hasAnim = true;
      if (this.theInputWillBePostedToBackend['content'].trim() === "") {
        this.isError = true;
        this.hasAnim = false;
        return;
      }
      let requestBody = new URLSearchParams();
      requestBody.append("files", JSON.stringify(this.theInputWillBePostedToBackend))

      let TOKEN = localStorage.getItem("z-jwt")
      if (TOKEN) requestBody.append("jwt", TOKEN.toString())

      await fetch(process.env.VUE_APP_API_URL + "/analyze", {
        method: 'post',
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
        body: requestBody
      }).then(res => {
        this.hasAnim = false;
        res.json().then(r => {
            this.isError = false;
            this.parseResult(r)
          // eslint-disable-next-line no-unused-vars
        }).catch(err => {
          this.isError = true;
        })
      }).catch(err => {
        this.isError = true;
        if (err.response.statusCode === 401) this.$router.push({name: "Log In"});
      })

      this.hasAnim = false;
    },
    parseResult: async function (result) {
      const keys = Object.keys(result);

      for (let i = 0; i < keys.length; ++i) {
        if (keys[i] !== " " || keys[i] !== "" || keys[i] !== "\\n" || keys[i] !== "\\r" || keys[i] !== undefined)
          this.result.push({"key": keys[i], "value": result[keys[i]].toString()});
      }

      await this.result.sort((a, b) => {
        return parseInt(b.value) - parseInt(a.value);
      });

      this.sortedResult = this.result;
    }
  }
}
</script>

<style>
#printed-result {
  white-space: pre-wrap;
}

.fetching-animation {
  font-size: 6vw;
  display: inline-block;
  -webkit-animation: full-rotation 3s infinite linear;
  -moz-animation: full-rotation 3s infinite linear;
}

@-webkit-keyframes full-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-moz-keyframes full-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>