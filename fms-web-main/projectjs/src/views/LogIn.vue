<template>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <div class="row" style="padding-top: 2%; padding-bottom: 2%;">
    <div class="flex md4"></div>
    <div class="flex md4">
      <va-card style="background-color: rgb(241 241 241);">
        <va-card-title></va-card-title>
        <va-card-content>
          <div class="row">
            <div class="col-12">
              <img
                src="../assets/logo-black.png"
                style="width: 50%;"
                alt="File Management System"
              />
            </div>
          </div>
          <br />
          <div class="row">
            <div class="flex md1"></div>
            <div class="flex md10">
              <va-input class="mb-4" v-model="userName" label="ชื่อผู้ใช้งาน" />
            </div>
            <div class="flex md1"></div>
          </div>
          <div class="row">
            <div class="flex md1"></div>
            <div class="flex md10">
              <va-input
                type="password"
                class="mb-4"
                v-model="password"
                label="รหัสผ่าน"
              />
            </div>
            <div class="flex md1"></div>
          </div>
          <div class="row">
            <div class="flex md1"></div>
            <div class="flex md5 va-input__label" style="text-align: left;">
              <router-link to="/CreateAccount">สร้างบัญชีผูัใช้งาน</router-link>
            </div>
            <div class="flex md5" style="text-align: right;">
              <va-button class="customButton01" @click="Login">
                เข้าสู่ระบบ
              </va-button>
            </div>
            <div class="flex md1"></div>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  name: 'LogIn',
  components: {},
  data: () => ({
    userName: '',
    password: '',
    //urlBackend: 'https://jet44.app.ruk-com.cloud', //Production
    urlBackend: 'http://localhost:3000', //Local
  }),
  methods: {
    Login() {
      if (this.userName == '') {
        Swal.fire({
          title: 'พบข้อผิดพลาด',
          text: 'กรุณากรอกชื่อผู้ใช้งาน',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        })
      } else if (this.password == '') {
        Swal.fire({
          title: 'พบข้อผิดพลาด',
          text: 'กรุณากรอกรหัสผ่าน',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        })
      } else {
        axios
          .get(
            this.urlBackend + '/login/' + this.userName + '/' + this.password,
            {
              headers: { 'Access-Control-Allow-Origin': '*' },
            },
          )
          .then((response) => {
            let userObj = response.data.data
            if (userObj != undefined && userObj != '') {
              this.$router.push({
                name: 'FileManagement',
                params: { userLogin: userObj.id },
              })
            } else {
              Swal.fire({
                title: 'พบข้อผิดพลาด',
                text: 'Username หรือ Password ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง',
                icon: 'error',
                confirmButtonText: 'ตกลง',
              })
            }
          })

          .catch((error) => {
            Swal.fire({
              title: 'พบข้อผิดพลาด',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'ตกลง',
            })
            console.log(error)
          })
      }
    },
  },
}
</script>

<style>
.row {
  padding: 5px;
}

.va-input__label {
  color: black !important;
  font-family: 'Courier New' !important;
  font-size: 70% !important;
}

.customButton01 {
  font-family: 'Courier New' !important;
  font-size: 70% !important;
}

.customBackground01 {
  background-image: url('https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Feagle-in-flight&psig=AOvVaw0WNFqvjmFnKkBra2KN1lro&ust=1651247906011000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOjLm_yPt_cCFQAAAAAdAAAAABAJ') !important;
  background-repeat: no-repeat;
}
</style>
