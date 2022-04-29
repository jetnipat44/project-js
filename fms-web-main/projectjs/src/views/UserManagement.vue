<template>
  <body style="background-color: #fff">
    <va-navbar color="primary" shape class="mb-2" @click="toggleMunu">
      <template #left>
        <va-navbar-item style="width: 10%">
          <img
            src="../assets/logo-white.png"
            style="width: 100%"
            alt="File Management System"
        /></va-navbar-item>
      </template>
      <template #center>
        <va-navbar-item></va-navbar-item>
      </template>
      <template #right>
        <va-navbar-item
          >คุณเจตนิพัทธ์ ประกอบนา
          <va-avatar
            size="small"
            src="https://www.bsglobaltrade.com/wp-content/uploads/2016/09/person-icon.png"
        /></va-navbar-item>
      </template>
    </va-navbar>
    <div class="demo-content" style="height: 13rem; margin: -1%">
      <div class="row">
        <va-sidebar
          :minimized="minimized"
          textColor="dark"
          minimizedWidth="64px"
          style="height: auto"
        >
          <va-sidebar-item>
            <va-sidebar-item-content @click="goToFileManagement">
              <span class="material-symbols-outlined"> dashboard </span>
              <va-sidebar-item-title v-if="!minimized" style="height: 24px">
                การจัดการไฟล์
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
          <va-sidebar-item :active="true">
            <va-sidebar-item-content @click="goToUserManagement">
              <span class="material-symbols-outlined"> description </span>
              <va-sidebar-item-title v-if="!minimized" style="height: 24px">
                การจัดการสมาชิก
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
          <va-sidebar-item>
            <va-sidebar-item-content @click="logOut">
              <span class="material-symbols-outlined"> logout </span>
              <va-sidebar-item-title v-if="!minimized" style="height: 24px">
                ออกจากระบบ
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </va-sidebar>
        <div class="flex md1"></div>
        <div class="flex md8">
          <br />
          <div class="row">
            <va-input class="flex mb-2 md12" v-model="filter" label="ค้นหา" />
          </div>

          <va-data-table
            :key="key"
            :items="userList"
            :columns="columns"
            :filter="filter"
            :filter-method="customFilteringFn"
            @filtered="filteredCount = $event.items.length"
          />

          <va-alert class="mt-3" border="left">
            <span>
              Number of filtered items:
              <va-chip>{{ filteredCount }}</va-chip>
            </span>
          </va-alert>
        </div>
        <div class="flex md1"></div>
      </div>
    </div>
  </body>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "UserManagement",
  components: {},
  data() {
    var userList = [];

    const columns = [
      { key: "first_name", label: "ชื่อ", sortable: true },
      { key: "last_name", label: "นามสกุล", sortable: true },
      { key: "username", label: "UserName", sortable: true },
      { key: "email", label: "อีเมล", sortable: true },
      { key: "phone", label: "เบอร์โทรศัพท์" },
    ];

    return {
      key: 1,
      items: userList,
      columns,
      filter: "",
      useCustomFilteringFn: false,
      filteredCount: userList.length,
      urlBackend: "https://jet44.app.ruk-com.cloud", //Production
      //urlBackend: "http://localhost:3000", //Local
      minimized: false,
      userLogin: this.$route.params.userLogin,
    };
  },

  computed: {
    customFilteringFn() {
      return this.useCustomFilteringFn ? this.filterExact : undefined;
    },
  },

  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      axios
        .get(this.urlBackend + "/userList", {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((response) => {
          this.userList = response.data.data;
          this.key = this.key++;
        })
        .catch((error) => {
          console.log(error);
          Swal.fire("มีข้อผิดพลาด", error.message, "error");
        });
    },
    filterExact(source) {
      if (this.filter === "") {
        return true;
      }

      return source?.toString?.() === this.filter;
    },

    toggleMunu() {
      this.minimized = !this.minimized;
    },

    goToFileManagement() {
      this.$router.push({
        name: "FileManagement",
        params: { userLogin: this.userLogin },
      });
    },

    goToUserManagement() {
      this.$router.push({
        name: "UserManagement",
        params: { userLogin: this.userLogin },
      });
    },

    logOut() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "ยืนยัน",
          text: "คุณต้องการออกจากระบบใช่หรือไม่?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ตกลง",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: "LogIn" });
          }
        });
    },
  },
};
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
