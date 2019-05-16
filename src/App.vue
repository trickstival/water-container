<template>
  <div id="app">
    <water-container v-model="stdIn"></water-container>
    <div>
      Input:
      <input v-model="stdIn" type="number"> 
    </div>
  </div>
</template>

<script>
import WaterContainer from './components/WaterContainer'
export default {
  name: 'app',
  components: {
    WaterContainer
  },
  data () {
    return {
      stdIn: '0214343000'
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body, html {
  margin: 0;
  min-height: 100%;
}
body {
  position: absolute;
  padding: 10px;
  width: 100%;
  height: 100%;
}
#app {
  display: grid;
  height: 100%;
  width: 100%;

  grid-template-rows: 1fr auto;
  grid-gap: 10px;
}
</style>
