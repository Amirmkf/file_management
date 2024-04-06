<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "",
        firstName: "",
        lastName: "",
        type: "user",
        groupName: "",
      },
      groupModal: false,
      groups: this.$store.state.users.groups,
      isEdit: false,
    };
  },
  computed: {
    checkUsername() {
      const username = this.user.username;

      return !(
        (username.length < 5 || username.length > 48) &&
        username !== ""
      );
    },
    checkFirstName() {
      const firstName = this.user.firstName;

      return !(firstName.length > 48 && firstName !== "");
    },
    checkLastName() {
      const lastName = this.user.lastName;

      return !(lastName.length > 48 && lastName !== "");
    },
    usernameExist() {
      return this.$store.state.users.users.find(
        (e) => e.username === this.user.username
      );
    },
  },
  methods: {
    ...mapMutations(["addUser", "editUser"]),
    submit() {
      if (
        this.user.username !== "" &&
        this.checkUsername &&
        this.checkFirstName &&
        this.checkLastName
      ) {
        if (this.isEdit) {
          this.editUser(this.user);
        } else {
          this.addUser(this.user);
        }
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params.username) {
        vm.user = {
          ...vm.$store.state.users.users.find(
            (e) => e.username === to.params.username
          ),
        };

        vm.isEdit = true;
      } else {
        vm.user = {
          username: "",
          firstName: "",
          lastName: "",
          type: "user",
          groupName: "",
        };
        vm.isEdit = false;
      }
    });
  },
};
</script>

<template>
  <div class="register">
    <div class="inputGroup">
      <label>
        <span>{{ $t("username") }}</span>
        <input
          v-if="!isEdit"
          type="text"
          min="5"
          max="48"
          required
          v-model="user.username"
        />
        <input v-else type="text" readonly :value="user.username" />
        <span v-if="!checkUsername">
          {{ $t("errors.lengthError") }}
        </span>
        <span v-if="usernameExist && !isEdit"> {{ $t("errors.exist") }} </span>
      </label>

      <label>
        <span>{{ $t("firstName") }}</span>
        <input type="text" max="48" v-model="user.firstName" />
        <span v-if="!checkFirstName">
          {{ $t("errors.maxLength") }}
        </span>
      </label>

      <label>
        <span>{{ $t("lastName") }}</span>
        <input type="text" max="48" v-model="user.lastName" />
        <span v-if="!checkLastName">
         {{ $t("errors.maxLength") }}
        </span>
      </label>

      <label class="select">
        <select required="required" v-model="user.type">
          <option value="user">{{ $t("type.user") }}</option>
          <option value="admin">{{ $t("type.admin") }}</option>
        </select>
        <svg>
          <use xlink:href="#select-arrow-down"></use>
        </svg>
      </label>
      <svg class="sprites">
        <symbol id="select-arrow-down" viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1"></polyline>
        </symbol>
      </svg>
      <label class="selectGroup" @click="groupModal = !groupModal">
        {{ $t("selectGroup") }}
      </label>
      <button class="filled" @click="submit">{{ $t("submit") }}</button>
      <!--            <button class="filled" @click="test">Test</button>-->
    </div>
    <transition name="fade">
      <div
        class="groupModal modal"
        v-if="groupModal"
        @click="groupModal = !groupModal"
      >
        <div @click.stop>
          <div class="list">
            <label class="checkbox" v-for="group in groups" :key="group.name" >
              <input
                class="inp-cbx"
                type="radio"
                name="userGroup"
                :value="group.name"
                v-model="user.groupName"
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

          <button class="filled" @click="groupModal = !groupModal">
            {{ $t("close") }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
