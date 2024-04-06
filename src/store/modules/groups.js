import users from "../../data/usersData";
import groups from "../../data/groups";
import activeUser from "./users";

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
  groups: groups,
  users: users,
  activeUser: activeUser.state.activeUser,
};

const mutations = {
  addGroup(state, group) {
    const newGroup = {
      name: group.name.toLowerCase(),
      users: group.users,
      creator: "admin",
      creationTime: getDateTime(),
      lastModifier: "admin",
      lastModificationTime: getDateTime(),
    };

    if (!state.groups.find((e) => e.name === newGroup.name)) {
      state.groups.push(newGroup);

      newGroup.users.forEach(function (username) {
        const user = state.users.find((e) => e.username === username);
        const group = state.groups.find((e) => e.name === user.groupName);

        if (group) {
          const index = group.users.indexOf(username);
          group.users.splice(index, 1);
        }

        user.groupName = newGroup.name;
      });
    }
  },
  editGroup(state, editedGroup) {
    const group = state.groups.find((e) => e.name === editedGroup.name);

    group.users.forEach(function (username) {
      const user = state.users.find((e) => e.username === username);
      user.groupName = "";
    });

    group.users = editedGroup.users;

    group.lastModifier = state.activeUser.username;
    group.lastModificationTime = getDateTime();

    editedGroup.users.forEach(function (username) {
      const user = state.users.find((e) => e.username === username);
      const groupOfUser = state.groups.find((e) => e.name === user.groupName);

      if (groupOfUser) {
        const index = group.users.indexOf(username);
        group.users.splice(index, 1);
      }

      user.groupName = group.name;
    });
  },
  removeGroup(state, groupName) {
    const group = state.groups.find((e) => e.name === groupName);
    const index = state.groups.indexOf(group);
    state.groups.splice(index, 1);

    group.users.forEach(function (username, userIndex) {
      state.users[userIndex].groupName = "";
    });
  },
};

export default {
  state,
  mutations,
};
