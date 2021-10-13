<template>
  <div class="shelf-item-book">
    <img class="book-cover" :src="baseUrl+'/images/'+data.id+'.jpg'">
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    },
    data(){
      return{
        baseUrl: process.env.VUE_APP_BOOK_URL
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item-book {
    width: 100%;
    height: 100%;
    .book-cover {
      width: 100%;
      height: 100%;
    }

  }
</style>
