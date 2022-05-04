<template>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <div class="row" style="padding-top: 2%; padding-bottom: 2%;">
    <div class="flex md3"></div>
    <div class="flex md6">
      <va-card style="background-color: rgb(241 241 241);">
        <va-card-title
          style="
            font-size: 20px;
            background-color: #7e5338;
            color: white;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          "
        >
          สร้างบัญชีผู้ใช้งาน
        </va-card-title>
        <va-card-content style="color: black;">
          <br />
          <br />
          <div class="row" style="text-align: left;">
            <div class="flex md5">
              <va-input class="mb-4" v-model="firstName" label="ชื่อ" />
            </div>
            <div class="flex md1"></div>
            <div class="flex md5">
              <va-input class="mb-4" v-model="lastName" label="นามสกุล" />
            </div>
          </div>
          <div class="row" style="text-align: left;">
            <div class="flex md5">
              <va-input class="mb-4" v-model="email" label="อีเมล" />
            </div>
            <div class="flex md1"></div>
            <div class="flex md5">
              <va-input class="mb-4" v-model="phone" label="เบอร์โทรศัพท์" />
            </div>
          </div>
          <div class="row" style="text-align: left;">
            <div class="flex md5">
              <va-input class="mb-4" v-model="userName" label="ชื่อผู้ใช้งาน" />
            </div>
            <div class="flex md1"></div>
            <div class="flex md5">
              <va-input
                type="password"
                class="mb-4"
                v-model="password"
                label="รหัสผ่าน"
              />
            </div>
          </div>
          <br />
          <div class="row">
            <div class="flex md12" style="text-align: center;">
              <va-button to="/" class="customButton02">
                ยกเลิก
              </va-button>
              &nbsp;
              <va-button class="customButton01" @click="CreateAccount">
                สร้างบัญชีผูัใช้งาน
              </va-button>
            </div>
          </div>
        </va-card-content>
      </va-card>
    </div>
    <div class="flex md3"></div>
  </div>
  <div class="row">
    <div class="flex md6"></div>
    <div class="flex md6"></div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'CreateAccount',
  components: {},
  data: () => ({
    urlBackend: 'http://localhost:3000',
    //urlBackend: 'https://jet44.app.ruk-com.cloud',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userName: '',
    password: '',
  }),

  methods: {
    CreateAccount() {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        userName: this.userName,
        password: this.password,
        id: uuidv4(),
      }
      console.log(data)

      if (
        this.firstName == '' ||
        this.lastName == '' ||
        this.email == '' ||
        this.phone == '' ||
        this.userName == '' ||
        this.password == ''
      ) {
        Swal.fire({
          title: 'พบข้อผิดพลาด',
          text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        })
      } else {
        let self = this
        axios
          .post(this.urlBackend + '/createUser', data)
          .then(function (response) {
            console.log(response)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            }).then((result) => {
              console.log(result)
              self.$router.push({ name: 'LogIn' })
            })
          })
          .catch(function (error) {
            console.log(error)
            Swal.fire({
              title: 'พบข้อผิดพลาด',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'ตกลง',
            })
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
  background-color: green !important;
}

.customButton02 {
  font-family: 'Courier New' !important;
  font-size: 70% !important;
  background-color: red !important;
}
</style>
