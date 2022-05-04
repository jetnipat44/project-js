<template>
  <body style="background-color: #fff;">
    <va-navbar
      color="#7e5338"
      shape
      class="mb-2"
      @click="toggleMunu"
      style="z-index: 5000;"
    >
      <template #left>
        <va-navbar-item style="width: 10%;">
          <img
            src="../assets/logo-white.png"
            style="width: 100%;"
            alt="File Management System"
          />
        </va-navbar-item>
      </template>
      <template #center>
        <va-navbar-item></va-navbar-item>
      </template>
      <template #right>
        <va-navbar-item>
          {{ fname }} {{ lname }}
          <va-avatar
            size="small"
            src="https://www.bsglobaltrade.com/wp-content/uploads/2016/09/person-icon.png"
          />
        </va-navbar-item>
      </template>
    </va-navbar>
    <div class="demo-content" style="height: 13rem; margin: -1%;">
      <div class="row">
        <va-sidebar
          :minimized="minimized"
          textColor="dark"
          minimizedWidth="64px"
          style="height: auto;"
        >
          <va-sidebar-item>
            <va-sidebar-item-content @click="goToFileManagement">
              <span class="material-symbols-outlined">dashboard</span>
              <va-sidebar-item-title v-if="!minimized" style="height: 24px;">
                การจัดการไฟล์
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
          <va-sidebar-item :active="true">
            <va-sidebar-item-content
              @click="goToUserManagement"
              style="background-color:#a37b64; !important"
            >
              <span class="material-symbols-outlined">description</span>
              <va-sidebar-item-title v-if="!minimized" style="height: 24px;">
                การจัดการสมาชิก
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
          <va-sidebar-item>
            <va-sidebar-item-content @click="logOut">
              <span class="material-symbols-outlined">logout</span>
              <va-sidebar-item-title v-if="!minimized" style="height: 24px;">
                ออกจากระบบ
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </va-sidebar>
        <div class="flex md1"></div>
        <div class="flex md8">
          <br />
          <div class="row">
            <div class="flex md9">
              <va-input class="flex mb-2 md12" v-model="filter" label="ค้นหา" />
            </div>
            <div class="flex md1"></div>
            <div class="flex md2">
              <va-button class="customButton01" @click="openModelAdd">
                <span class="material-symbols-outlined">add</span>
                เพิ่มผู้ใช้งาน
              </va-button>
            </div>
          </div>

          <va-data-table
            :key="key"
            :items="userList"
            :columns="columns"
            :filter="filter"
            :filter-method="customFilteringFn"
            @filtered="filteredCount = $event.items.length"
          >
            <template #cell(edit)="edit">
              <span
                class="material-symbols-outlined"
                @click="openModel(edit.rowIndex)"
              >
                edit
              </span>
            </template>

            <template #cell(delete)="edit">
              <span
                class="material-symbols-outlined"
                @click="deleteRow(edit.rowIndex)"
              >
                delete_outline
              </span>
            </template>
          </va-data-table>

          <va-alert class="mt-3" border="left">
            <span>
              จำนวนข้อมูล:
              <va-chip style="background-color:#a37b64; !important">
                {{ filteredCount }}
              </va-chip>
            </span>
          </va-alert>
        </div>
        <div class="flex md1"></div>
      </div>
    </div>

    <!-- Edit User -->
    <div>
      <va-modal
        v-model="showModal"
        size="large"
        fixed-layout
        no-outside-dismiss
        hide-default-actions
      >
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
            {{ firstName }} &nbsp; {{ lastName }}
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
                <va-input
                  class="mb-4"
                  v-model="userName"
                  label="ชื่อผู้ใช้งาน"
                />
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
            <div class="row" style="text-align: left;">
              <div class="flex md5">
                <va-switch v-model="isActive" color="success" class="mr-4">
                  สถานะใช้งาน
                </va-switch>
              </div>
              <div class="flex md1"></div>
              <div class="flex md5">
                <va-switch v-model="isAdmin" color="success" class="mr-4">
                  ผู้ดูแลระบบ
                </va-switch>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="flex md12" style="text-align: center;">
                <va-button @click="closeModel" class="customButton02">
                  ยกเลิก
                </va-button>
                &nbsp;
                <va-button class="customButton01" @click="UpdateAccount">
                  บันทึก
                </va-button>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </va-modal>
    </div>

    <!-- Add User -->
    <div>
      <va-modal
        v-model="showModalAdd"
        size="large"
        fixed-layout
        no-outside-dismiss
        hide-default-actions
      >
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
            เพิ่มผู้ใช้งาน
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
                <va-input
                  class="mb-4"
                  v-model="userName"
                  label="ชื่อผู้ใช้งาน"
                />
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
            <div class="row" style="text-align: left;">
              <div class="flex md5">
                <va-switch v-model="isActive" color="success" class="mr-4">
                  สถานะใช้งาน
                </va-switch>
              </div>
              <div class="flex md1"></div>
              <div class="flex md5">
                <va-switch v-model="isAdmin" color="success" class="mr-4">
                  ผู้ดูแลระบบ
                </va-switch>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="flex md12" style="text-align: center;">
                <va-button @click="closeModelAdd" class="customButton02">
                  ยกเลิก
                </va-button>
                &nbsp;
                <va-button class="customButton01" @click="CreateAccount">
                  บันทึก
                </va-button>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </va-modal>
    </div>
    <v-overlay :value="loadingData" style="z-index: 1000; text-align: center;">
      <v-progress-circular
        :active="loadingData"
        :indeterminate="loadingData"
        color="primary"
        size="100"
      ></v-progress-circular>
      <br />
      <br />
      กำลังโหลดข้อมูล กรุณารอสักครู่...
    </v-overlay>
    <div class="flex lg6 xs12 py-4" style="z-index: 10000; text-align: center;">
      <va-progress-circle :active="loadingData" :indeterminate="loadingData" />
    </div>
  </body>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'UserManagement',
  components: {},
  data() {
    var userList = []

    const columns = [
      { key: 'delete', label: 'ลบ' },
      { key: 'edit', label: 'แก้ไข', fixedColumns: true },
      { key: 'first_name', label: 'ชื่อ', sortable: true },
      { key: 'last_name', label: 'นามสกุล', sortable: true },
      { key: 'username', label: 'ชื่อผู้ใช้งาน', sortable: true },
      { key: 'email', label: 'อีเมล', sortable: true },
      { key: 'phone', label: 'เบอร์โทรศัพท์' },
      { key: 'totalSize', label: 'ความจุที่ใช้ไป(KB)' },
      { key: 'is_active', label: 'สถานะใช้งาน' },
      { key: 'is_admin', label: 'ผู้ดูแลระบบ' },
    ]

    return {
      loadingData: true,
      key: 1,
      items: userList,
      columns,
      filter: '',
      useCustomFilteringFn: false,
      filteredCount: userList.length,
      urlBackend: 'https://jet44.app.ruk-com.cloud', //Production
      //urlBackend: 'http://localhost:3000', //Local
      minimized: false,
      userLogin: this.$route.params.userLogin,
      showModal: false,
      showModalAdd: false,
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      userName: '',
      password: '',
      isActive: false,
      isAdmin: false,
      fname: '',
      lname: '',
    }
  },

  computed: {
    customFilteringFn() {
      return this.useCustomFilteringFn ? this.filterExact : undefined
    },
  },

  mounted() {
    this.getUserById()
    this.getUserList()
  },
  methods: {
    getUserById() {
      axios
        .get(this.urlBackend + '/userById/' + this.userLogin, {
          headers: { 'Access-Control-Allow-Origin': '*' },
        })
        .then((response) => {
          this.fname = response.data.data.first_name
          this.lname = response.data.data.last_name
        })
        .catch((error) => {
          console.log(error)
          Swal.fire('มีข้อผิดพลาด', error.message, 'error')
        })
    },

    getUserList() {
      axios
        .get(this.urlBackend + '/userList', {
          headers: { 'Access-Control-Allow-Origin': '*' },
        })
        .then((response) => {
          this.userList = response.data.data
          // this.userList = this.userList.forEach((element) => {
          //   element.is_active = true
          //   element.is_admin = true
          // })

          this.key = this.key++
        })
        .catch((error) => {
          console.log(error)
          Swal.fire('มีข้อผิดพลาด', error.message, 'error')
        })
    },
    filterExact(source) {
      if (this.filter === '') {
        return true
      }

      return source?.toString?.() === this.filter
    },

    toggleMunu() {
      this.minimized = !this.minimized
    },

    goToFileManagement() {
      this.$router.push({
        name: 'FileManagement',
        params: { userLogin: this.userLogin },
      })
    },

    goToUserManagement() {
      this.$router.push({
        name: 'UserManagement',
        params: { userLogin: this.userLogin },
      })
    },

    openModel(index) {
      this.showModal = true
      console.log(index)
      this.id = this.userList[index].id
      this.firstName = this.userList[index].first_name
      this.lastName = this.userList[index].last_name
      this.email = this.userList[index].email
      this.phone = this.userList[index].phone
      this.userName = this.userList[index].username
      this.password = this.userList[index].password
      this.isActive = this.userList[index].is_active
      this.isAdmin = this.userList[index].is_admin
    },

    closeModel(index) {
      this.showModal = false
      console.log(index)
    },

    openModelAdd(index) {
      this.showModalAdd = true
      console.log(index)
      this.id = ''
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.phone = ''
      this.userName = ''
      this.password = ''
      this.isActive = true
      this.isAdmin = false
    },

    closeModelAdd(index) {
      this.showModalAdd = false
      console.log(index)
    },

    deleteRow(index) {
      Swal.fire({
        title: 'ยืนยัน',
        text: 'คุณต้องการลบข้อมูลผู้ใช้งานใช่หรือไม่',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true,
        focusCancel: true,
      }).then((result) => {
        if (result.isConfirmed) {
          let deleteObj = this.userList[index]
          this.key = this.key++
          this.DeleteUser(deleteObj.id)
        }
      })
    },

    DeleteUser(id) {
      let self = this
      axios
        .delete(this.urlBackend + '/deleteUser/' + id)
        .then(function (response) {
          console.log(response)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'ลบข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            console.log(result)
            self.getUserList()
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
    },

    logOut() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      })

      swalWithBootstrapButtons
        .fire({
          title: 'ยืนยัน',
          text: 'คุณต้องการออกจากระบบใช่หรือไม่?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: 'LogIn' })
          }
        })
    },

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
              self.showModalAdd = false
              self.getUserList()
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

    UpdateAccount() {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        userName: this.userName,
        password: this.password,
        id: this.id,
        isActive: this.isActive,
        isAdmin: this.isAdmin,
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
          .put(this.urlBackend + '/updateUser', data)
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
              self.showModal = false
              self.getUserList()
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
.btn {
  display: inline-block;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  margin: 0 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.25;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
}

.btn-success {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.va-navbar__left {
  width: 100% !important;
}
</style>
