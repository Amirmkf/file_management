<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      group: {
        name: "",
        users: [],
      },
      usersModal: false,
      users: this.$store.state.users.users,
      isEdit: false,
    };
  },
  computed: {
    checkGroupName() {
      const groupName = this.group.name;

      return !(
        (groupName.length < 5 || groupName.length > 48) &&
        groupName !== ""
      );
    },
    GroupNameExist() {
      return this.$store.state.groups.groups.find(
        (e) => e.name === this.group.name
      );
    },
  },
  methods: {
    ...mapMutations(["addGroup", "editGroup"]),
    submit() {
      if (this.group.name !== "" && this.checkGroupName) {
        if (this.isEdit) {
          this.editGroup(this.group);
        } else {
          this.addGroup(this.group);
        }
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params.groupName) {
        vm.group = {
          ...vm.$store.state.groups.groups.find(
            (e) => e.name === to.params.groupName
          ),
        };

        vm.isEdit = true;
      } else {
        vm.group = {
          name: "",
          users: [],
        };
        vm.isEdit = false;
      }
    });
  },
};
</script>

<template>
  <div class="register group">
    <div class="inputGroup">
      <label>
        <span>Group name</span>
        <input
          v-if="!isEdit"
          type="text"
          min="5"
          max="48"
          required
          v-model="group.name"
        />
        <input v-else type="text" readonly :value="group.name" />
        <span v-if="!checkGroupName">
          {{ $t("errors.lengthError") }}
        </span>
        <span v-if="GroupNameExist && !isEdit"> This name exists </span>
      </label>

      <label class="selectGroup" @click="usersModal = !usersModal">
        {{ $t("selectUsers") }}
      </label>
      <button class="filled" @click="submit">Submit</button>
      <!--      <button class="filled" @click="test">Test</button>-->
    </div>
    <transition name="fade">
      <div
        class="groupModal modal"
        v-if="usersModal"
        @click="usersModal = !usersModal"
      >
        <div @click.stop>
          <div class="list">
            <label class="checkbox" v-for="user in users" :key="user.username">
              <input
                class="inp-cbx"
                type="checkbox"
                name="userGroup"
                :value="user.username"
                v-model="group.users"
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

          <button class="filled" @click="usersModal = !usersModal">
            {{ $t("close") }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
