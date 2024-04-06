<script>
import { mapMutations } from "vuex";

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

export default {
  data() {
    return {
      getPath: "/",
      file: {
        name: "",
        size: "",
        path: "",
      },
      folderName: "",
      newName: "",
      selectedFiles: [],
      selectedFolder: [],
      copySelected: [],
      moveSelected: [],
      uploadModal: false,
      groupsModal: false,
      createFolderModal: false,
      renameModal: false,
      usersModal: false,
      users: this.$store.state.users.users,
      groups: this.$store.state.users.groups,
      selectedUsers: [],
      sharedModal: [],
    };
  },
  computed: {
    activeUser() {
      return this.$store.state.users.activeUser;
    },
    folder() {
      this.selectedFiles = [];
      this.selectedFolder = [];

      let folders;
      if (this.getPath === "/") {
        return this.activeUser.storage;
      } else {
        folders = this.activeUser.storage.folders;
        return findFolderByPath(folders, this.getPath);
      }
    },
  },
  methods: {
    ...mapMutations([
      "upload",
      "createFolder",
      "deleteSelect",
      "pasteFiles",
      "moveFiles",
      "rename",
      "shareWithPersons",
      "shareWithGroups",
    ]),
    selectAll(event) {
      if (event.target.checked) {
        for (const folder of this.folder.folders)
          this.selectedFolder.push(folder.path);

        for (const file of this.folder.files) {
          console.log(file)
          this.selectedFiles.push({
            name: file.name,
            owner: file.owner,
            path: file.path,
            size: file.size,
            uploadTime: file.uploadTime,
          });
        }
      } else {
        this.selectedFolder = [];
        this.selectedFiles = [];
      }
    },
    backMain() {
      this.getPath = "/";
    },
    back() {
      const lastIndex = this.getPath.lastIndexOf("/");
      this.getPath = lastIndex > 0 ? this.getPath.substring(0, lastIndex) : "/";
    },
    copy() {
      this.copySelected = this.selectedFiles;
    },
    paste() {
      this.pasteFiles({ files: this.copySelected, newPath: this.getPath });
      this.copySelected = [];
    },
    move() {
      if (this.moveSelected.length === 0)
        this.moveSelected = this.selectedFiles;
      else {
        this.moveFiles({ files: this.moveSelected, newPath: this.getPath });
        this.copySelected = [];
      }
    },
    downloadTextFile() {
      for (const file of this.selectedFiles) {
        const blob = new Blob([], { type: "text/plain" });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = file.name + ".txt";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      }
    },
  },
};
</script>

<template>
  <div class="manageFiles">
    <div class="menu">
      <div>
        <button class="filled" @click="uploadModal = !uploadModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9.31995 6.49994L11.8799 3.93994L14.4399 6.49994"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.88 14.18V4.01001"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 12C4 16.42 7 20 12 20C17 20 20 16.42 20 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ $t("menu.upload") }}
        </button>
        <div
          class="modal"
          v-if="uploadModal"
          @click="uploadModal = !uploadModal"
        >
          <div @click.stop>
            <div class="inputGroup">
              <label>
                <span>File name</span>
                <input type="text" max="48" required v-model="file.name" />
              </label>
              <label>
                <span>File size</span>
                <input type="text" max="48" required v-model="file.size" />
              </label>
              <button
                class="filled"
                @click="upload({ file: file, path: getPath })"
              >
                {{ $t("menu.upload") }}
              </button>
            </div>
          </div>
        </div>
        <button @click="createFolderModal = !createFolderModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.0601 16.5V11.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.5 14H9.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
            />
          </svg>
          {{ $t("menu.createFolder") }}
        </button>
        <div
          class="modal"
          v-if="createFolderModal"
          @click="createFolderModal = !createFolderModal"
        >
          <div @click.stop>
            <div class="inputGroup">
              <label>
                <span>{{ $t("folderName") }}</span>
                <input type="text" max="48" required v-model="folderName" />
              </label>
              <button
                class="filled"
                @click="createFolder({ folderName: folderName, path: getPath })"
              >
                {{ $t("menu.upload") }}
              </button>
            </div>
          </div>
        </div>
        <div class="verticalLine"></div>
        <div class="actions">
          <a href="#" @click="copy" v-if="copySelected.length === 0">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 13.4V16.4C17 20.4 15.4 22 11.4 22H7.6C3.6 22 2 20.4 2 16.4V12.6C2 8.6 3.6 7 7.6 7H10.6"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17 13.4H13.8C11.4 13.4 10.6 12.6 10.6 10.2V7L17 13.4Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6 2H15.6"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 5C7 3.34 8.34 2 10 2H12.62"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.9999 8V14.19C21.9999 15.74 20.7399 17 19.1899 17"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 8H19C16.75 8 16 7.25 16 5V2L22 8Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ $t("menu.copy") }}
          </a>
          <a href="#" @click="paste" v-else>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 13.4V16.4C17 20.4 15.4 22 11.4 22H7.6C3.6 22 2 20.4 2 16.4V12.6C2 8.6 3.6 7 7.6 7H10.6"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17 13.4H13.8C11.4 13.4 10.6 12.6 10.6 10.2V7L17 13.4Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6 2H15.6"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 5C7 3.34 8.34 2 10 2H12.62"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.9999 8V14.19C21.9999 15.74 20.7399 17 19.1899 17"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 8H19C16.75 8 16 7.25 16 5V2L22 8Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ $t("menu.paste") }}
          </a>
          <a href="#" @click="move">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 11L21.2 2.80005"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 6.8V2H17.2"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ moveSelected.length === 0 ? $t("menu.move") : $t("menu.paste") }}
          </a>
          <a href="#" @click="downloadTextFile">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.31995 11.6799L11.8799 14.2399L14.4399 11.6799"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.88 4V14.17"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 12.1799C20 16.5999 17 20.1799 12 20.1799C7 20.1799 4 16.5999 4 12.1799"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ $t("menu.download") }}
          </a>
          <a href="#" @click="renameModal = !renameModal">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 22H21"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ $t("menu.rename") }}
          </a>
          <div
            class="modal"
            v-if="
              renameModal &&
              (selectedFolder.length > 0 || selectedFiles.length > 0)
            "
            @click="renameModal = !renameModal"
          >
            <div @click.stop>
              <div class="inputGroup">
                <label>
                  <span>{{ $t("menu.rename") }}</span>
                  <input type="text" max="48" required v-model="newName" />
                </label>
                <button
                  class="filled"
                  @click="
                    rename({
                      file: selectedFiles[0],
                      folder: selectedFolder[0],
                      newName: newName,
                      path: getPath,
                    })
                  "
                >
                  {{ $t("menu.change") }}
                </button>
              </div>
            </div>
          </div>
          <a
            href="#"
            @click="
              deleteSelect({ files: selectedFiles, folders: selectedFolder })
            "
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.33 16.5H13.66"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 12.5H14.5"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ $t("menu.delete") }}
          </a>
          <div class="share">
            <a href="#">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.96 6.17004C18.96 7.56004 20.34 9.77004 20.62 12.32"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.48999 12.37C3.74999 9.82997 5.10999 7.61997 7.08999 6.21997"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.19 20.9399C9.35 21.5299 10.67 21.8599 12.06 21.8599C13.4 21.8599 14.66 21.5599 15.79 21.0099"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.06 7.70001C13.5954 7.70001 14.84 6.45537 14.84 4.92001C14.84 3.38466 13.5954 2.14001 12.06 2.14001C10.5247 2.14001 9.28003 3.38466 9.28003 4.92001C9.28003 6.45537 10.5247 7.70001 12.06 7.70001Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.82999 19.92C6.36534 19.92 7.60999 18.6753 7.60999 17.14C7.60999 15.6046 6.36534 14.36 4.82999 14.36C3.29464 14.36 2.04999 15.6046 2.04999 17.14C2.04999 18.6753 3.29464 19.92 4.82999 19.92Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.17 19.92C20.7054 19.92 21.95 18.6753 21.95 17.14C21.95 15.6046 20.7054 14.36 19.17 14.36C17.6347 14.36 16.39 15.6046 16.39 17.14C16.39 18.6753 17.6347 19.92 19.17 19.92Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ $t("menu.share") }}
            </a>
            <div>
              <span @click="groupsModal = !groupsModal">groups</span>
              <transition name="fade">
                <div
                  class="groupModal modal"
                  v-if="groupsModal"
                  @click="groupsModal = !groupsModal"
                >
                  <div @click.stop>
                    <div class="list">
                      <label
                        class="checkbox"
                        v-for="group in groups"
                        :key="group.name"
                      >
                        <input
                          class="inp-cbx"
                          type="checkbox"
                          name="userGroup"
                          :value="group.name"
                          v-model="selectedUsers"
                        />
                        <span class="cbx">
                          <span>
                            <svg width="12px" height="10px">
                              <use xlink:href="#check-4"></use>
                            </svg>
                          </span>
                          <span>{{ group.name }}</span>
                        </span>
                        <svg class="inline-svg">
                          <symbol id="check-4" viewbox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                          </symbol>
                        </svg>
                      </label>
                    </div>

                    <button
                      class="filled"
                      @click="
                        shareWithGroups({
                          files: selectedFiles,
                          groups: selectedUsers,
                        })
                      "
                    >
                      Share
                    </button>
                  </div>
                </div>
              </transition>
              <span @click="usersModal = !usersModal">{{
                $t("menu.sharePerson")
              }}</span>
              <transition name="fade">
                <div
                  class="groupModal modal"
                  v-if="usersModal"
                  @click="usersModal = !usersModal"
                >
                  <div @click.stop>
                    <div class="list">
                      <label
                        class="checkbox"
                        v-for="user in users"
                        :key="user.username"
                      >
                        <input
                          class="inp-cbx"
                          type="checkbox"
                          name="userGroup"
                          :value="user.username"
                          v-model="selectedUsers"
                        />
                        <span class="cbx">
                          <span>
                            <svg width="12px" height="10px">
                              <use xlink:href="#check-4"></use>
                            </svg>
                          </span>
                          <span>{{ user.username }}</span>
                        </span>
                        <svg class="inline-svg">
                          <symbol id="check-4" viewbox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                          </symbol>
                        </svg>
                      </label>
                    </div>

                    <button
                      class="filled"
                      @click="
                        shareWithPersons({
                          files: selectedFiles,
                          persons: selectedUsers,
                        })
                      "
                    >
                      {{ $t("menu.share") }}
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="controls">
      <button @click="backMain">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18V15"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ $t("main") }}
      </button>
      <button @click="back">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.5 12H3.67004"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="path">
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
          />
          <path
            d="M8 2H17C19 2 20 3 20 5V6.38"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ this.getPath }}
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>
            <label class="checkbox">
              <input
                class="inp-cbx"
                type="checkbox"
                @input="selectAll($event)"
              />
              <span class="cbx">
                <span>
                  <svg width="12px" height="10px">
                    <use xlink:href="#check-4"></use>
                  </svg>
                </span>
                <span>{{ $t("table.name") }}</span>
              </span>
              <svg class="inline-svg">
                <symbol id="check-4" viewbox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </label>
          </th>
          <th>{{ $t("table.owner") }}</th>
          <th>{{ $t("table.size") }}</th>
          <th>{{ $t("table.uploadTime") }}</th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="folder in this.folder.folders" @click="getPath = folder.path">
        <td>
          <label class="checkbox" @click.stop>
            <input
              class="inp-cbx"
              type="checkbox"
              :value="folder.path"
              v-model="selectedFolder"
            />
            <span class="cbx">
              <span>
                <svg width="12px" height="10px">
                  <use xlink:href="#check-4"></use>
                </svg>
              </span>
              <span class="fileName">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#ffa000"
                    d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h29.7L44,29V16C44,13.8,42.2,12,40,12z"
                  ></path>
                  <path
                    fill="#ffca28"
                    d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"
                  ></path>
                </svg>
                <span>{{ folder.name }}</span>
              </span>
            </span>
            <svg class="inline-svg">
              <symbol id="check-4" viewbox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </symbol>
            </svg>
          </label>
        </td>
        <td>{{ folder.owner }}</td>
        <td>{{ folder.size }}</td>
        <td>{{ folder.createTime }}</td>
        <td></td>
      </tr>
      <tr v-for="file in folder.files">
        <td>
          <label class="checkbox">
            <input
              class="inp-cbx"
              type="checkbox"
              :value="{
                name: file.name,
                owner: file.owner,
                path: file.path,
                size: file.size,
                uploadTime: file.uploadTime,
              }"
              v-model="selectedFiles"
            />
            <span class="cbx">
              <span>
                <svg width="12px" height="10px">
                  <use xlink:href="#check-4"></use>
                </svg>
              </span>
              <span class="fileName">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
                    fill="rgba(128, 236, 243, 1)"
                  />
                  <path
                    d="M15.7997 2.21048C15.3897 1.80048 14.6797 2.08048 14.6797 2.65048V6.14048C14.6797 7.60048 15.9197 8.81048 17.4297 8.81048C18.3797 8.82048 19.6997 8.82048 20.8297 8.82048C21.3997 8.82048 21.6997 8.15048 21.2997 7.75048C19.8597 6.30048 17.2797 3.69048 15.7997 2.21048Z"
                    fill="rgba(128, 236, 243, 1)"
                  />
                </svg>
                <span>{{ file.name }}</span>
              </span>
            </span>
            <svg class="inline-svg">
              <symbol id="check-4" viewbox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </symbol>
            </svg>
          </label>
        </td>
        <td>{{ file.owner }}</td>
        <td>{{ file.size }}</td>
        <td>{{ file.uploadTime }}</td>
        <td>
          <div class="button" @click="sharedModal = file.shared">
            {{ $t("sharedUser") }}
          </div>
        </td>
      </tr>
    </table>
    <transition name="fade">
      <div
        class="groupModal modal"
        v-if="sharedModal.length > 0"
        @click="sharedModal = []"
      >
        <div @click.stop>
          <div class="list">
            <label class="checkbox" v-for="user in sharedModal" :key="user">
              <input
                class="inp-cbx"
                type="checkbox"
                name="userGroup"
                checked
                disabled
              />
              <span class="cbx">
                <span>
                  <svg width="12px" height="10px">
                    <use xlink:href="#check-4"></use>
                  </svg>
                </span>
                <span>{{ user }}</span>
              </span>
              <svg class="inline-svg">
                <symbol id="check-4" viewbox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </label>
          </div>

          <button class="filled" @click="sharedModal = []">Close</button>
        </div>
      </div>
    </transition>
  </div>
</template>
