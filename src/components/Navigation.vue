<script>
export default {
  computed: {
    isAdmin() {
      return this.$store.state.users.activeUser.type ==='admin';
    },
  },
};
</script>

<template>
  <div class="navigation">
    <ul class="menu">
      <router-link v-if="isAdmin" to="/users" tag="li" active-class="active" exact>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path
              d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
            />
          </svg>
          <span>{{ $t("navigation.manageUsers") }}</span>
        </a>
      </router-link>
      <router-link v-if="isAdmin" to="/groups" tag="li" active-class="active">
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 640 512"
            fill="currentColor"
          >
            <path
              d="M96 80a48 48 0 1 1 96 0A48 48 0 1 1 96 80zm128 0A80 80 0 1 0 64 80a80 80 0 1 0 160 0zm96 80a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm0 160a96 96 0 1 0 0-192 96 96 0 1 0 0 192zm-58.7 64H378.7c54.2 0 98.4 42.5 101.2 96H160.1c2.8-53.5 47-96 101.2-96zm0-32C187.7 352 128 411.7 128 485.3c0 14.7 11.9 26.7 26.7 26.7H485.3c14.7 0 26.7-11.9 26.7-26.7C512 411.7 452.3 352 378.7 352H261.3zM512 32a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm0 128A80 80 0 1 0 512 0a80 80 0 1 0 0 160zm16 64c44.2 0 80 35.8 80 80c0 8.8 7.2 16 16 16s16-7.2 16-16c0-61.9-50.1-112-112-112H444c2.6 10.2 4 21 4 32h80zm-336 0c0-11 1.4-21.8 4-32H112C50.1 192 0 242.1 0 304c0 8.8 7.2 16 16 16s16-7.2 16-16c0-44.2 35.8-80 80-80h80z"
            />
          </svg>
          <span>{{ $t("navigation.manageGroups") }}</span>
        </a>
      </router-link>
      <router-link v-if="isAdmin" to="/storage" tag="li" active-class="active">
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path
              d="M400 86v88.7c-13.3 7.2-31.6 14.2-54.8 19.9C311.3 203 269.5 208 224 208s-87.3-5-121.2-13.4C79.6 188.9 61.3 182 48 174.7V86l.6-.5C53.9 81 64.5 74.8 81.8 68.6C115.9 56.5 166.2 48 224 48s108.1 8.5 142.2 20.6c17.3 6.2 27.8 12.4 33.2 16.9l.6 .5zm0 141.5v75.2c-13.3 7.2-31.6 14.2-54.8 19.9C311.3 331 269.5 336 224 336s-87.3-5-121.2-13.4C79.6 316.9 61.3 310 48 302.7V227.6c13.3 5.3 27.9 9.9 43.3 13.7C129.5 250.6 175.2 256 224 256s94.5-5.4 132.7-14.8c15.4-3.8 30-8.3 43.3-13.7zM48 426V355.6c13.3 5.3 27.9 9.9 43.3 13.7C129.5 378.6 175.2 384 224 384s94.5-5.4 132.7-14.8c15.4-3.8 30-8.3 43.3-13.7V426l-.6 .5c-5.3 4.5-15.9 10.7-33.2 16.9C332.1 455.5 281.8 464 224 464s-108.1-8.5-142.2-20.6c-17.3-6.2-27.8-12.4-33.2-16.9L48 426zm354.1-2.1s0 .1-.2 .2l.1-.2 0-.1zm-356.1 0a.3 .3 0 1 0 .6-.2 .3 .3 0 1 0 -.6 .2zm0-335.8a.3 .3 0 1 0 .5 .2 .3 .3 0 1 0 -.5-.2zm356-.2a.3 .3 0 1 0 -.1 .6 .3 .3 0 1 0 .1-.6zM448 432V80C448 35.8 347.7 0 224 0S0 35.8 0 80V432c0 44.2 100.3 80 224 80s224-35.8 224-80z"
            />
          </svg>
          <span>{{ $t("navigation.storageSpace") }}</span>
        </a>
      </router-link>
      <router-link to="/manageFiles" tag="li" active-class="active">
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            viewBox="0 0 384 512"
            fill="currentColor"
          >
            <path
              d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"
            />
          </svg>
          <span>{{ $t("navigation.manageFiles") }}</span>
        </a>
      </router-link>
    </ul>
  </div>
</template>
