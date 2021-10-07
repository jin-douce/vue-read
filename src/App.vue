<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
  export default {}
  document.addEventListener('DOMContentLoaded', ()=>{
    const html = document.querySelector('html')
    let fontSize = window.innerWidth/10
    fontSize = fontSize>50 ? 50 : fontSize
    html.style.fontSize=fontSize+'px'
  })
</script>

<style lang="scss" scoped>
  #app {
    width: 100%;

    height: 100%;
    margin: 0 auto;
    background: #b5bac2;
    overflow: hidden;
  }
</style>
