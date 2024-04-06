<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      themeColor: this.$store.state.users.activeUser.themeColor,
      locale: this.$store.state.users.activeUser.locale,
    };
  },
  watch: {
    themeColor() {
      this.$store.state.users.activeUser.themeColor = this.themeColor;
    },
    locale() {
      this.$i18n.locale = this.locale;
      this.$store.state.users.activeUser.locale = this.locale;
    },
  },
  computed: {
    activeUser() {
      return this.$store.state.users.activeUser;
    },
  },
  methods: {
    ...mapMutations(["changeActiveUser"]),
    changeUser(changeActiveUser) {
      this.changeActiveUser(changeActiveUser);

      const newLocale = this.$store.state.users.activeUser.locale;
      this.$i18n.locale = newLocale;
      this.locale = newLocale;

      this.themeColor = this.$store.state.users.activeUser.themeColor;
    },
  },
};
</script>

<template>
  <header>
    <img src="../assets/logo.svg" alt="logo" width="200" />
    <div class="user">
      <div class="userAvatar">
        <svg
          width="55"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="20 10 150 150"
        >
          <g>
            <g>
              <g>
                <circle
                  style="fill: #fce8e3"
                  cx="93.255"
                  cy="93.012"
                  r="55.82"
                />
                <g>
                  <rect
                    x="78.488"
                    y="85.66"
                    style="fill: #e2988f"
                    width="29.533"
                    height="33.358"
                  />
                  <g>
                    <path
                      style="fill: #e2988f"
                      d="M122.178,62.243c-1.629-3.895-4.958-1.983-4.958-1.983c1.922-17.708-7.082-29.397-23.966-29.397       S67.367,42.552,69.289,60.261c0,0-3.328-1.912-4.958,1.983c-1.629,3.895,1.346,13.032,3.187,15.935       c1.842,2.904,5.099,5.099,5.099,5.099s0.213,3.258,1.062,5.524c0.85,2.266,10.482,12.687,13.315,14.281       c3.714,2.186,9.186,2.186,12.52,0c2.833-1.593,12.465-12.014,13.315-14.281c0.85-2.267,1.062-5.524,1.062-5.524       s3.258-2.196,5.099-5.099C120.832,75.275,123.807,66.139,122.178,62.243z"
                    />
                    <g>
                      <path
                        style="fill: #c46966"
                        d="M93.402,105.088c-2.32,0-4.691-0.56-6.598-1.682c-1.715-0.964-5.659-4.911-8.595-8.169        l0.557-0.502c2.989,3.315,6.838,7.135,8.412,8.021c3.593,2.114,8.919,2.119,12.13,0.013c1.597-0.899,5.445-4.718,8.435-8.034        l0.557,0.502c-2.936,3.258-6.88,7.205-8.602,8.172C97.994,104.527,95.724,105.088,93.402,105.088z"
                      />

                      <rect
                        x="71.775"
                        y="75.654"
                        transform="matrix(0.9925 -0.1224 0.1224 0.9925 -9.1835 9.426)"
                        style="fill: #c46966"
                        width="0.75"
                        height="7.653"
                      />

                      <rect
                        x="110.524"
                        y="79.105"
                        transform="matrix(0.1106 -0.9939 0.9939 0.1106 22.7103 184.3371)"
                        style="fill: #c46966"
                        width="7.643"
                        height="0.751"
                      />
                      <g>
                        <path
                          style="fill: #c46966"
                          d="M66.507,71.001c-0.157-0.574-1.484-5.649,0.348-7.038c0.605-0.395,1.1-0.354,1.413-0.252         c0.933,0.303,1.397,1.455,1.448,1.586l-0.7,0.269c-0.103-0.263-0.477-0.979-0.981-1.142         c-0.229-0.076-0.477-0.025-0.749,0.153c-1.055,0.801-0.597,4.246-0.056,6.226L66.507,71.001z"
                        />
                        <path
                          style="fill: #c46966"
                          d="M120.002,71.001l-0.723-0.198c0.541-1.98,1-5.425-0.077-6.242         c-0.252-0.163-0.497-0.212-0.729-0.137c-0.602,0.195-0.976,1.132-0.979,1.141l-0.701-0.269         c0.051-0.13,0.516-1.283,1.448-1.586c0.313-0.102,0.809-0.142,1.391,0.237C121.486,65.351,120.159,70.426,120.002,71.001z"
                        />
                      </g>
                    </g>
                    <g>
                      <path
                        style="fill: #4c224b"
                        d="M71.682,69.574c5.011,0.026,1.221-16.143,5.152-20.056c1.998-1.988,4.915-1.665,7.415-1.027        c2.913,0.743,5.921,1.746,8.995,1.827c3.254,0.086,6.339-1.106,9.459-1.862c2.421-0.586,5.054-0.846,6.971,1.063        c3.931,3.913,0.142,20.082,5.152,20.056c-0.347-3.738-0.357-7.835,2.393-9.313l0.002-0.004        c1.921-17.707-7.084-29.393-23.966-29.393c-16.883,0-25.888,11.689-23.966,29.397v0        C71.522,61.712,72.033,65.662,71.682,69.574z"
                      />
                    </g>
                  </g>
                  <path
                    style="fill: #f4ba5d"
                    d="M140.961,122.007c-15.761-7.032-32.94-9.525-32.94-9.525c-7.883,8.219-22.565,8.335-29.533,0      c0,0-17.179,2.493-32.94,9.525c9.796,16.084,27.497,26.825,47.707,26.825C113.465,148.832,131.165,138.091,140.961,122.007z"
                  />
                  <polygon
                    style="fill: #ffffff"
                    points="74.498,113.05 78.488,105.893 91.407,117.49 83.503,126.152     "
                  />
                  <polygon
                    style="fill: #ffffff"
                    points="111.996,113.05 108.006,105.893 95.086,117.49 102.991,126.152     "
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div class="detail">
        <div class="currentUser">
          <span>{{ $t("currentUser") }}:</span> {{ this.activeUser.username }}
        </div>
        <div>
          <label class="select">
            <select required="required" v-model="themeColor">
              <option value="blue">{{ $t("color.blue") }}</option>
              <option value="red">{{ $t("color.red") }}</option>
              <option value="green">{{ $t("color.green") }}</option>
            </select>
            <svg>
              <use xlink:href="#select-arrow-down"></use>
            </svg>
          </label>
        </div>
        <div>
          <label class="select">
            <select required="required" v-model="locale">
              <option value="EN">{{ $t("language.english") }}</option>
              <option value="FA">{{ $t("language.persian") }}</option>
            </select>
            <svg>
              <use xlink:href="#select-arrow-down"></use>
            </svg>
          </label>
        </div>
        <div class="users">
          <div
            v-for="user in this.$store.state.users.users"
            @click="changeUser(user)"
          >
            <div><span>{{ $t("username") }}:</span> {{ user.username }}</div>
            <div><span>{{ $t("type.type") }}:</span> {{ user.type }}</div>
          </div>
        </div>
        <router-link to="/users/register" class="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ $t("register") }}
        </router-link>
      </div>
    </div>
  </header>
</template>
