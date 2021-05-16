<template>
  <div class="result-item">
    <div id="key">{{z_key}}</div>:
    <div id="value">{{value}}</div>
    <br>
  </div>
</template>

<script>
export default {
  name: "ResultItem",
  props: {
    z_key: String,
    value: String
  }
}
</script>

<style scoped>
.result-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#key {
  color: #c71111;
}
#value {
  color: dodgerblue;
}
</style>