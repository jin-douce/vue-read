<template>
  <div>
    <detail-title :title="title" @back="back" :showShelf="false" ref="title"></detail-title>
    <div class="info">
      <div class="head">
          <img :src="info.head_img" alt="">
      </div>
      <br>
      <div class="name">用户名：{{info.user}}</div>
      <div class="name">账号：{{info.id}}</div>
    </div>
    <br>
    <button class="btn" @click="loginOut">退出登录</button>
  </div>
   
</template>

<script>
import DetailTitle from '../../components/detail/DetailTitle'
import { storeShelfMixin } from '../../utils/mixin';
export default {
  mixins: [storeShelfMixin],
  data(){
    return{
      title: '个人中心',
      info: null
    }
  },
  components: {
    DetailTitle
  },
  methods: {
    back(){
      this.$router.push("/store/home");
    },
    loginOut() {
      this.$router.push('/login');
      localStorage.removeItem('userInfo')
      localStorage.removeItem('shelf')
    }
  },
  created() {
      this.info = JSON.parse(localStorage.getItem('userInfo'))
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
  .info {
    padding-top: 80px;

    .head {
        margin: 0 auto;
        width: 100px;
        height: 100px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .name {

        text-align: center;
        font-size: 16px;
        line-height: 1.8;
    } 
  }
  .btn {
    display:block;
    margin:0 auto;
    width: px2rem(250);
    height: px2rem(40);
    background-color: rgb(248, 93, 93);
    color: #fff;
    border: none;
    font-size: 16px;
  }
</style>