import { createWebHistory, createRouter } from "vue-router";
import LogInView from "../views/LogIn.vue";
import CreateAccountView from "../views/CreateAccount.vue";
import FileManagementView from "../views/FileManagement.vue"
import UserManagementView from "../views/UserManagement.vue"

const routes = [
  {
    path: "/",
    name: "LogIn",
    component: LogInView,
  },
  {
    path: "/CreateAccount",
    name: "CreateAccount",
    component: CreateAccountView,
  },
  {
    path: "/FileManagement/:userLogin",
    name: "FileManagement",
    component: FileManagementView,
  },
  {
    path: "/UserManagement/:userLogin",
    name: "UserManagement",
    component: UserManagementView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;