import users from "../../data/usersData";
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

const findFolderByPath = function (storage, path) {
  for (const folder of storage) {
    if (folder.path === path) {
      return folder;
    }

    if (folder.folders.length > 0) {
      const foundInSubFolder = findFolderByPath(folder.folders, path);
      if (foundInSubFolder) {
        return foundInSubFolder;
      }
    }
  }

  return null;
};

const removeFolderByPath = function (folders, path) {
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];

    if (folder.path === path) {
      folders.splice(i, 1);
      return true;
    }

    if (folder.folders.length > 0) {
      const removed = removeFolderByPath(folder.folders, path);
      if (removed) {
        return true;
      }
    }
  }

  return false;
};

const updateFolderPath = function (folder, oldPath, newName) {
  const updatePathRecursively = (currentFolder, currentPath) => {
    const newPath = currentPath.replace(oldPath, "/" + newName);

    currentFolder.path = newPath;
    console.log(newPath);

    currentFolder.files.forEach((file) => {
      file.path = newPath + "/" + file.name; // Update file path
    });

    currentFolder.folders.forEach((subFolder) => {
      updatePathRecursively(subFolder, newPath + "/" + subFolder.name);
    });
  };

  updatePathRecursively(folder, folder.path);
};

const state = {
  users: users,
  groups: groups,
  activeUser: users.find((e) => e.username === "Admin"),
};

const mutations = {
  upload(state, { file, path }) {
    const newFile = {
      name: file.name,
      owner: state.activeUser.username,
      path: path,
      size: file.size,
      uploadTime: getDateTime(),
    };

    let folder = state.activeUser.storage;
    if (path !== "/")
      folder = findFolderByPath(state.activeUser.storage.folders, newFile.path);

    if (!folder.files.find((e) => e.name === newFile.name))
      folder.files.push(newFile);
  },
  createFolder(state, { folderName, path }) {
    const newFolder = {
      name: folderName,
      owner: "amirkf",
      path: (path === "/" ? "" : path) + "/" + folderName,
      folders: [],
      files: [],
      size: "0",
      createTime: getDateTime(),
    };

    let folder = state.activeUser.storage;
    if (path !== "/")
      folder = findFolderByPath(state.activeUser.storage.folders, path);

    if (!folder.files.find((e) => e.name === newFolder.name))
      folder.folders.push(newFolder);
  },
  deleteSelect(state, { files, folders }) {
    for (const folder of folders) {
      removeFolderByPath(state.activeUser.storage.folders, folder);
    }

    for (const file of files) {
      let folder;

      if (files[0].path === "/") folder = state.activeUser.storage;
      else
        folder = findFolderByPath(
          state.activeUser.storage.folders,
          files[0].path
        );

      const index = folder.files.findIndex((e) => e.name === file.name);
      folder.files.splice(index, 1);
    }
  },
  pasteFiles(state, { files, newPath }) {
    for (const file of files) {
      this.commit("upload", { file: file, path: newPath });
    }
  },
  moveFiles(state, { files, newPath }) {
    this.commit("pasteFiles", { files: files, newPath: newPath });
    this.commit("deleteSelect", { files: files, folders: [] });
  },
  rename(state, { file, folder, newName, path }) {
    let folderOfFile;
    if (path === "/") folderOfFile = state.activeUser.storage;
    else
      folderOfFile = findFolderByPath(state.activeUser.storage.folders, path);

    if (file && !folderOfFile.files.find((e) => e.name === newName)) {
      const renamedFile = folderOfFile.files.find((e) => e.name === file.name);
      renamedFile.name = newName;
    } else if (
      folder &&
      !folderOfFile.folders.find((e) => e.name === newName)
    ) {
      const renamedFolder = folderOfFile.folders.find((e) => e.path === folder);

      renamedFolder.name = newName;

      state.activeUser.storage.folders.forEach((folderOfStorage) => {
        updateFolderPath(folderOfStorage, folder, newName);
      });
    }
  },
  shareWithPersons(state, { files, persons }) {
    let folderOfFiles;
    if (files[0].path === "/") folderOfFiles = state.activeUser.storage;
    else
      folderOfFiles = findFolderByPath(
        state.activeUser.storage.folders,
        files[0].path
      );

    files.map((e) => (e.path = "/"));

    for (const person of persons) {
      const sharedUser = state.users.find((e) => e.username === person);
      for (const file of files) {
        sharedUser.storage.files.push(file);
        folderOfFiles.files
          .find((e) => e.name === file.name)
          .shared.push(person);
      }
    }
  },
  shareWithGroups(state, { files, groups }) {
    files.map((e) => (e.path = "/"));

    for (const group of groups) {
      const sharedGroup = state.groups.find((e) => e.name === group);
      for (const user of sharedGroup.users) {
        const sharedUser = state.users.find((e) => e.username === user);
        if (sharedUser !== state.activeUser)
          for (const file of files) sharedUser.storage.files.push(file);
      }
    }
  },
};

export default {
  state,
  mutations,
};
