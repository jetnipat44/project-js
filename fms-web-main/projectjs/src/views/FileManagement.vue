<template>
  <body style="background-color: #fff">
    <va-navbar color="#7e5338" shape class="mb-2" @click="toggleMunu">
      <template #left>
        <va-navbar-item style="width: 10%">
          <img
            src="../assets/logo-white.png"
            style="width: 100%"
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
    <div class="demo-content" style="height: 13rem; margin: -1%">
      <div class="row">
        <va-sidebar
          :minimized="minimized"
          textColor="dark"
          minimizedWidth="64px"
          style="height: auto"
        >
          <va-sidebar-item :active="true">
            <va-sidebar-item-content
              @click="goToFileManagement"
              style="background-color:#a37b64; !important"
            >
              <span class="material-symbols-outlined">dashboard</span>
              <va-sidebar-item-title v-if="!minimized" style="height: 24px">
                การจัดการไฟล์
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
          <va-sidebar-item v-if="isAdminRole">
            <va-sidebar-item-content @click="goToUserManagement">
              <span class="material-symbols-outlined">description</span>
              <va-sidebar-item-title v-if="!minimized" style="height: 24px">
                การจัดการสมาชิก
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
          <va-sidebar-item>
            <va-sidebar-item-content @click="logOut">
              <span class="material-symbols-outlined">logout</span>
              <va-sidebar-item-title v-if="!minimized" style="height: 24px">
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
                เพิ่มไฟล์
              </va-button>
            </div>
          </div>

          <va-data-table
            :key="key"
            :items="fileList"
            :columns="columns"
            :filter="filter"
            :filter-method="customFilteringFn"
            @filtered="filteredCount = $event.items.length"
          >
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

    <!-- Add User -->
    <div>
      <va-modal
        v-model="showModalAdd"
        size="large"
        fixed-layout
        no-outside-dismiss
        hide-default-actions
      >
        <va-card style="background-color: rgb(241 241 241)">
          <va-card-title
            style="
              font-size: 20px;
              background-color: #7e5338;
              color: white;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
            "
          >
            เพิ่มไฟล์
          </va-card-title>
          <va-card-content style="color: black">
            <br />
            <br />
            <div class="row" style="text-align: left">
              <div class="flex md12">
                <va-file-upload v-model="basic" id="avatar" dropzone />
              </div>
            </div>

            <div class="row" style="text-align: left">
              <div class="flex md12"></div>
            </div>
            <br />
            <div class="row">
              <div class="flex md12" style="text-align: center">
                <va-button @click="closeModelAdd" class="customButton02">
                  ยกเลิก
                </va-button>
                &nbsp;
                <va-button class="customButton01" @click="CreateFile()">
                  บันทึก
                </va-button>
              </div>
            </div>
          </va-card-content>
        </va-card>
      </va-modal>
    </div>
  </body>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "FileManagement",
  components: {},
  data() {
    var fileList = [];

    const columns = [
      { key: "delete", label: "ลบ" },
      { key: "file_name", label: "ชื่อ", sortable: true },
      { key: "file_type", label: "ประเภท", sortable: true },
      { key: "file_size", label: "ขนาด", sortable: true },
      { key: "ref", label: "อ้างอิงแหล่งจัดเก็บ", sortable: true },
      { key: "create_by", label: "ผู้สร้าง", sortable: true },
      { key: "create_date", label: "วันที่สร้าง", sortable: true },
    ];

    return {
      //urlBackend: 'https://jet44.app.ruk-com.cloud', //Production
      urlBackend: "http://localhost:3000", //Local
      key: 1,
      items: fileList,
      columns,
      filter: "",
      useCustomFilteringFn: false,
      filteredCount: fileList.length,
      minimized: false,
      userLogin: this.$route.params.userLogin,
      fname: "",
      lname: "",
      showModalAdd: false,
      isAdminRole: false,
      basic: [],
      testDL:
        "https://rgw1.netways.de/saasdataop/community/attachment/file/31775/download.jfif?response-content-disposition=inline&AWSAccessKeyId=c98f3ee5-8ef0-40b7-ad68-90e396d26a90&Signature=Fk4sVlmra9vR4xi3b95OZ%2Bm7DpY%3D&Expires=1651625668",
    };
  },

  computed: {
    customFilteringFn() {
      return this.useCustomFilteringFn ? this.filterExact : undefined;
    },
  },

  mounted() {
    this.getUserById();
    this.getFileList();
  },

  methods: {
    getUserById() {
      axios
        .get(this.urlBackend + "/userById/" + this.userLogin, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((response) => {
          this.fname = response.data.data.first_name;
          this.lname = response.data.data.last_name;
          this.isAdminRole = response.data.data.is_admin;
        })
        .catch((error) => {
          console.log(error);
          Swal.fire("มีข้อผิดพลาด", error.message, "error");
        });
    },

    deleteRow(index) {
      Swal.fire({
        title: "ยืนยัน",
        text: "คุณต้องการลบไฟล์ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "red",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
        focusCancel: true,
      }).then((result) => {
        window.open(this.testDL, "_blank");

        if (result.isConfirmed) {
          let deleteObj = this.fileList[index];
          this.key = this.key++;
          this.DeleteFile(deleteObj.id);
        }
      });
    },

    DeleteFile(id) {
      let self = this;
      axios
        .delete(this.urlBackend + "/deleteFile/" + id)
        .then(function (response) {
          console.log(response);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ลบข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            console.log(result);
            self.getFileList();
          });
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            title: "พบข้อผิดพลาด",
            text: error.message,
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        });
    },

    getFileList() {
      axios
        .get(this.urlBackend + "/fileList/" + this.userLogin, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((response) => {
          this.fileList = response.data.data;
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

    openModelAdd(index) {
      this.basic = [];
      this.showModalAdd = true;
      console.log(index);
    },

    closeModelAdd(index) {
      this.showModalAdd = false;
      this.basic = [];
      console.log(index);
    },

    // CreateFile() {
    //   console.log(this.basic);
    //   if (this.basic.length == 0) {
    //     Swal.fire({
    //       title: "พบข้อผิดพลาด",
    //       text: "กรุณาเลือกไฟล์ที่ต้องการ",
    //       icon: "error",
    //       confirmButtonText: "ตกลง",
    //     });
    //   } else {
    //     for (let i = 0; i < this.basic.length; i++) {
    //       let formData = new FormData();
    //       formData.append("file", this.basic[i]);
    //       formData.append(
    //         "metadata",
    //         '{"fileName":"' + this.basic[i].name + '"}'
    //       );
    //       let self = this;
    //       axios
    //         .post(
    //           "https://community.openproject.org/api/v3/attachments",
    //           formData,
    //           {
    //             headers: {
    //               "Access-Control-Allow-Origin": "*",
    //               "Access-Control-Allow-Credentials": "true",
    //               "Cache-Control": null,
    //               "X-Requested-With": null,
    //               "Content-Type": "application/hal+json; charset=utf-8",
    //               'Access-Control-Allow-Methods': 'GET, POST',
    //  'Access-Control-Allow-Headers': 'Content-Type',
     
    //             },
    //             mode: 'no-cors'
    //           }
    //         )
    //         .then(function (res) {
    //           console.log(res);
    //           Swal.fire({
    //             position: "center",
    //             icon: "success",
    //             title: "บันทึกข้อมูลสำเร็จ",
    //             showConfirmButton: false,
    //             timer: 1500,
    //           }).then((result) => {
    //             console.log(result);
    //             self.showModalAdd = false;
    //             self.getFileList();
    //           });
    //         })
    //         .catch(function (error) {
    //           Swal.fire({
    //             title: "พบข้อผิดพลาด",
    //             text: error.message,
    //             icon: "error",
    //             confirmButtonText: "ตกลง",
    //           });
    //         });
    //     }
    //   }
    // },

    CreateFile() {
      console.log(this.basic)
      if (this.basic.length == 0) {
        Swal.fire({
          title: 'พบข้อผิดพลาด',
          text: 'กรุณาเลือกไฟล์ที่ต้องการ',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        })
      } else {
        for (let i = 0; i < this.basic.length; i++) {
          let formData = new FormData()
          formData.append('file', this.basic[i])
          formData.append('userLogin', this.userLogin)
          let self = this
          axios
            .post(this.urlBackend + '/uploadFile1', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(function () {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500,
              }).then((result) => {
                console.log(result)
                self.showModalAdd = false
                self.getFileList()
              })
            })
            .catch(function (error) {
              Swal.fire({
                title: 'พบข้อผิดพลาด',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'ตกลง',
              })
            })
        }
      }
    },

    CFile() {
      const selectedFile = document.getElementById("avatar").files[0];
      console.log(selectedFile);
      console.log(this.$$refs.file);
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
