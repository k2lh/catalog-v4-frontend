<template>
  <div id="global-navigation">
    <div v-if="!usertoken">
      <a key="external-link" :href="'https://sso.com/auth/sps/samlidp2/saml20/logininitial?RequestBinding=HTTPPost&PartnerId=' + baseURL + '&NameIdFormat=email&Target=' + baseURL" class="cv-header-global-action bx--header__action">
        <span class="loginlink">
          LOGIN
        </span>
      </a>
    </div>
    <cv-header-global-action v-else aria-label="User avatar" aria-controls="user-panel" class="logout-button">
      <button @click="logOut">
        <UserAvatar24 />
      </button>
    </cv-header-global-action>
  </div>
</template>

<script>
import UserAvatar24 from "@carbon/icons-vue/es/user--avatar/24";
import navigationLinks from './navigation-links';
import { mapGetters } from 'vuex';

  export default {
    name: 'GlobalNavigation',
    components: { UserAvatar24 },
    props: {
      links: {
        type: Array,
        default: () => navigationLinks
      }
    },
    data () {
      return {
        help: false
      }
    },
    computed: mapGetters([
      'usertoken',
      'displayName',
      'baseURL'
    ]),
    methods: {
      logOut() {
        var r = confirm("This will log you out of this website.");
        if (r === true) {
          this.$cookie.delete('groupTeam');
          this.$cookie.delete('groupExecs');
          this.$cookie.delete('groupAdmins');
          this.$cookie.delete('groupDash');
          this.$cookie.delete('token');
          this.$cookie.delete('displayName');
          this.$cookie.delete('userid');
          this.$cookie.delete('email');
          this.$cookie.delete('connect.sid');
          this.$cookie.delete('XXX_W3SSO_ACCESS');
          this.$cookie.delete('LtpaToken2');
          this.$cookie.delete('XSRF-TOKEN');
          this.$cookie.delete('_abck');
          this.$cookie.delete('groupOrg');
          location.reload();
        }
      }
    }
  }
</script>

<style lang='scss'>
  .bx--global-header__menu {
    padding: 0 2rem 0 0;
  }

  [data-peripheral='keyboard'] .global-header__nav-button:focus {
    border-radius: 0;
    box-shadow: 0 0 2px 2px #79a6f6;
  }

  .global-header__nav-button {
    background: none !important;
    margin-left: -10px;
    display: none;
  }

  .bx--global-header__right-container {
    width: 30rem;
  }

  .bx--global-header__right-container {
    padding-right: 2%;
    background-color: transparent;
  }

  .loginlink {
      height: 3.75rem;
      width: 3.75rem;
      position: relative;
      top: 1rem;
      color: white;
  }
  .bx--header__action {
    margin-right: 2rem;
    button {
      background: transparent;
      border: 0;
      svg {
        fill: white;
      }
    }
  }

</style>
