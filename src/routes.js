import RegisterAndEdit from "./components/users/RegisterAndEdit.vue";
import Files from "./components/files/Files.vue";
import Users from "./components/users/Users.vue";
import ManageFiles from "./components/files/ManageFiles.vue";
import UsersHome from "./components/users/UsersHome.vue";
import GroupsHome from "./components/userGroups/GroupsHome.vue";
import Groups from "./components/userGroups/Groups.vue";
import CreateAndEdit from "./components/userGroups/CreateAndEdit.vue";

export const routes = [
  { path: "/", redirect: "/manageFiles" },
  {
    path: "/users",
    component: UsersHome,
    children: [
      { path: "", component: Users },
      { path: "register", component: RegisterAndEdit },
      { path: "edit/:username", component: RegisterAndEdit, name: "editUser" },
    ],
  },
  {
    path: "/groups",
    component: GroupsHome,
    children: [
      { path: "", component: Groups },
      { path: "create", component: CreateAndEdit, name: "createGroup" },
      { path: "edit/:groupName", component: CreateAndEdit, name: "editGroup" },
    ],
  },
  { path: "/manageFiles", component: ManageFiles },
  { path: "/storage", component: Files },
];
