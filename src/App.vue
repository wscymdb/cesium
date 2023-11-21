<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style scoped lang="less">
//  必须设置100vh 和100vw否则底部会留白
.app {
  width: 100vw;
  height: 100vh;
}

// html,
// body {
//   width: 100%;
//   height: 100%;
// }
</style>