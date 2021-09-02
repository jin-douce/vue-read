<template>
  <div class="container">
    <detail-title :title="title" @back="back" :showShelf="false" ref="title"></detail-title>
    <div class="login-wrap" v-show="showLogin">
      <p v-show="showTishi">{{tishi}}</p>
      <br>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <button @click="logins">登录</button>
      <span class="link" @click="toRegister">没有账号？马上注册</span>
    </div>
    <div class="register-wrap" v-show="showRegister">
      <p v-show="showTishi">{{tishi}}</p>
      <br>
      <input type="text" placeholder="请输入用户名" v-model="newUsername">
      <input type="text" placeholder="请输入邮箱" v-model="email">
      <input type="password" placeholder="请输入密码" v-model="newPassword">
      <button @click="registers">注册</button>
      <span class="link" @click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>


<script>
import DetailTitle from '../../components/detail/DetailTitle.vue'
import { login, register } from '../../api/store'
import { storeShelfMixin } from '../../utils/mixin'
import md5 from 'md5'

export default {
  mixins: [storeShelfMixin],
  data(){
    return {
      title: '登录/注册',
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: '',
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      email: '',
      userState: false,
      emailState: false,
      pwdState: false,
    }
  },
  components:{
    DetailTitle
  },
    
  methods: {
    back(){
    this.$router.push("/store/home");
    },
    logins(){
      login(this.username, md5(this.password)).then(res => {
          if (res) {
              this.setUserInfo(res)
              localStorage.setItem('userInfo', JSON.stringify(res));
              // this.getShelfList()
              this.$router.push('/store/home')
          } else {
              this.tishi =  '用户名或密码错误，请重新登录'
              this.showTishi = true
          }
      })     
    },
    toRegister(){
      this.showRegister = true
      this.showLogin = false
    },
    ToLogin(){
      this.showRegister = false
      this.showLogin = true
    },
    checkUser() {
      if (this.newUsername.length > 16 || this.newUsername.length < 8) {
          this.userState = true;
      } else {
          this.userState = false;
      }
    },
    checkEmail() {
        let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (emailReg.test(this.email)) {
            this.emailState = false;
        } else {
            this.emailState = true;
        }
    },
    checkPwd() {
        if (this.newPassword.length > 16 || this.newPassword.length < 8) {
            this.pwdState = true;
        } else {
            this.pwdState = false;
        }
    },

    registers() {
      if (!this.userState && !this.emailState && !this.pwdState) {
        register({
            user: this.newUsername,
            pwd: md5(this.newPassword),
            email: this.email
        }).then(res => {
            if (res.insertStatus === 2) {
              this.tishi = "该账号已被注册，请重新填写"
              this.showTishi = true
            } else if (res.insertStatus === 0) {
              this.tishi = "注册失败，请重新注册"
              this.showTishi = true
            } else {
                this.tishi = "注册成功,正在登录"
                this.showTishi = true
                this.setUserInfo(res.userInfo)
                localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
                // this.getShelfList()

                setTimeout(() => {
                    this.showTishi = false
                    this.$router.push('/store/home')
                    
                }, 1500);
            }
        })
      } else {
          this.tishi = "请填写完整再注册"
          this.showTishi = true
      }
    }
  }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

html, body {
    width: 100%;
    height: 100%;
    margin: 0; 
    padding: 0;
}
.container {
  
  width: 100%;
  height: 100%;
  background-color: #fff;
  .login-wrap {
    position: relative;
    top: 10%;
    text-align:center;
  }
  .register-wrap {
    position: relative;
    top: 10%;
    text-align:center;
  }
   
  p {
    font-size: 20px;
    color:red;
  }

  input {
    display:block; 
    width:250px; 
    height:40px; 
    line-height:40px; 
    margin:0 auto; 
    margin-bottom: 10px; 
    outline:none; 
    border:1px solid #888; 
    padding:10px; 
    box-sizing:border-box;
  }
    
  button {
    display:block; 
    width:250px; 
    height:40px; 
    line-height: 40px; 
    margin:0 auto; 
    border:none; 
    background-color:#41b883; 
    color:#fff; 
    font-size:16px; 
    margin-bottom:5px;
  }
  span {
    cursor:pointer;
  }
  span:hover{
    color:#41b883;
  }
  .link{
    font-size: 16px;
    text-decoration: underline
  }


}


</style>