import usersData from "../../data/usersData";
import groups from "../../data/groups";

const getDateTime = function () {
  return new Date().toLocaleString("en-US", {
    day: "2-digit",
    hour12: true,
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const state = {
  users: usersData,
  groups: groups,
  activeUser: usersData.find((e) => e.username === "Admin"),
};

const mutations = {
  addUser(state, user) {
    const newUser = {
      username: user.username.toLowerCase().replace(/\s+/g, ""),
      creator: user.username,
      firstName: user.firstName.toLowerCase(),
      lastName: user.lastName.toLowerCase(),
      creationTime: getDateTime(),
      type: user.type,
      lastModifier: state.activeUser.username,
      lastModificationTime: getDateTime(),
      groupName: user.groupName,
      themeColor: "blue",
      locale: 'EN',
      storage: {
        name: "/",
        path: "/",
        folders: [],
        files: [],
      },
    };

    if (!state.users.find((e) => e.username === newUser.username)) {
      state.users.push(newUser);

      if (newUser.groupName) {
        const newGroup = state.groups.find(
          (e) => e.name === newUser.groupName
        );
        newGroup.users.push(user.username);
      }
    }
  },
  editUser(state, editedUser) {
    const user = state.users.find((e) => e.username === editedUser.username);

    const group = state.groups.find((e) => e.name === user.groupName);
    if (group) {
      const indexOfUser = group.users.indexOf(editedUser.username);
      group.users.splice(indexOfUser, 1);
    }

    user.username = editedUser.username;
    user.firstName = editedUser.firstName;
    user.lastName = editedUser.lastName;
    user.type = editedUser.type;
     user.lastModifier = state.activeUser.username;
    user.lastModificationTime = getDateTime();
    user.groupName = editedUser.groupName;

    if (editedUser.groupName) {
      const newGroup = state.groups.find(
        (e) => e.name === editedUser.groupName
      );
      newGroup.users.push(user.username);
    }
  },
  removeUser(state, username) {
    const user = state.users.find((e) => e.username === username);
    const group = state.groups.find((e) => e.name === user.groupName);
    const index = state.users.indexOf(user);
    state.users.splice(index, 1);

    const indexOfUser = group.users.indexOf(user.username);
    group.users.splice(indexOfUser, 1);
  },
  changeActiveUser(state, user) {
    state.activeUser = user;
  },
};

export default {
  state,
  mutations,
};
