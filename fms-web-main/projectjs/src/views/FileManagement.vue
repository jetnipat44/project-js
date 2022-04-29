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
          <va-sidebar-item :active="true">
            <va-sidebar-item-content @click="goToFileManagement">
              <span class="material-symbols-outlined"> dashboard </span>
              <va-sidebar-item-title v-if="!minimized" style="height: 24px">
                การจัดการไฟล์
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
          <va-sidebar-item>
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
            :items="items"
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
export default {
  name: "FileManagement",
  components: {},
  data() {
    const users = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "1-463-123-4447",
        website: "ramiro.info",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        phone: "493-170-9623 x156",
        website: "kale.biz",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        phone: "(254)954-1289",
        website: "demarco.info",
      },
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "1-463-123-4447",
        website: "ramiro.info",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        phone: "493-170-9623 x156",
        website: "kale.biz",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        phone: "(254)954-1289",
        website: "demarco.info",
      },
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "1-463-123-4447",
        website: "ramiro.info",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        phone: "493-170-9623 x156",
        website: "kale.biz",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        phone: "(254)954-1289",
        website: "demarco.info",
      },
    ];

    const columns = [
      { key: "id", sortable: true },
      { key: "username", sortable: true },
      { key: "name", sortable: true },
      { key: "email", sortable: true },
      { key: "phone" },
    ];

    return {
      items: users,
      columns,
      filter: "",
      useCustomFilteringFn: false,
      filteredCount: users.length,
      minimized: false,
      userLogin: this.$route.params.userLogin,
    };
  },

  computed: {
    customFilteringFn() {
      return this.useCustomFilteringFn ? this.filterExact : undefined;
    },
  },

  methods: {
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

.va-navbar__right {
  width: 250px;
}
</style>
