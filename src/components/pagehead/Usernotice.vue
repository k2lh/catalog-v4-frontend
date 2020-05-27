<template>
  <div id="Usernotice">
    <div v-if="!usertoken" class="notice">
      <div class="bx--grid pushed">
        <div class="bx--row">
          <div class="bx--col">
            <div class="bx--type-body-short-01">
              <span class="heavy">We’ve converted to SSO!</span> Use the LOGIN link in the header (right-hand side) to see non-public dashboards.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="seeNote" class="notice cleared">
      <div class="bx--grid pushed extratop">
        <div class="bx--row">
          <div class="-col-lg-14 -col-md-6 bx--type-body-short-01">
            Thanks for logging in! If you're having trouble seeing tableau dashboards, <span class="helplink" @click="help = !help">read our troubleshooting guide</span>.
          </div>
          <div class="-col-lg-2 -col-md-2">
            <div class="closeAlert" @click="closeNotice()">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="close" fill="#000000">
                    <polygon id="x" points="10.1119065 8 16 13.8880935 13.8880935 16 8 10.1119065 2.11190653 16 0 13.8880935 5.88809347 8 1.42416192e-07 2.11190667 2.11190667 1.42416361e-07 8 5.88809347 13.8880935 0 16 2.11190653" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="help">
      <div class="bx--grid">
        <div class="bx--row padtop2 padbot1">
          <div class="bx-col">
            <p class="bx--type-body-short-01">
              If you get a <span class="heavy">Resource Not Found</span> message, this means you don't have permissions for that dashboard. Please contact a tableau administrator if you believe this message to be in error.
            </p>
          </div>
        </div>
        <div class="bx--row padbot1">
          <div class="bx-col">
            <p class="bx--type-body-short-01">
              If you don't see a dashboard, it means we've hit a browser permissions snag. Try these workarounds.
            </p>
          </div>
        </div>
        <div class="bx--row padbot1">
          <div class="bx-col">
            <p class="bx--type-body-short-01 padbot1">
              First, verify that your browser will accept the server's certificates. Click <a href="https://dpydalwftae02.sl.bluecloud.ibm.com:8888/" target="_new">this link</a>. (This will open in a new window.)
            </p>
            <p class="bx--type-body-short-01">
              If the page loads with a warning...
            </p>
            <ol class="bx--list--ordered bx--list--nested">
              <li class="bx--list__item">
                Click on “advanced”.
              </li>
              <li class="bx--list__item">
                Click on “accept risk and continue”.
              </li>
              <li class="bx--list__item">
                The page will show text about the Tableau Server trusted authentication API. Close the window.
              </li>
              <li class="bx--list__item">
                Refresh this page. This fixes the issues for most users.
              </li>
            </ol>
          </div>
        </div>
        <div class="bx--row padbot1">
          <div class="bx-col">
            <p class="bx--type-body-short-01">
              If you don't see a warning, it means your certificate is fine but your browser is blocking the tableau API. Note: we're currently focused on Firefox. Chrome and Safari have similar options, but their interfaces
              differ from Firefox, so you may need to dig a little.
            </p>
            <ol class="bx--list--ordered bx--list--nested">
              <li class="bx--list__item">
                Look up at the URL field at the top of the browser. To the left of the green lock icon, you'll see a little shield icon or an 'i' in a circle (depending on your Firefox version).
              </li>
              <li class="bx--list__item">
                Either the shield or the (i) will give you the option to turn off tracker blocking. Turn this tracking (or tracker blocking) off.
              </li>
              <li class="bx--list__item">
                Once that's done, return to the main page and refresh. This will give you a clean entry.
              </li>
            </ol>
            <p class="bx--type-body-short-01">
              Instructions for Chrome and Safari will be added as we tackle those browsers.
            </p>
          </div>
        </div>
        <div class="bx--row">
          <div class="bx-col">
            <p class="bx--type-body-short-01">
              If those changes don't work, join @wft-ui-troubleshooting on slack for more help.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Usernotice',
    data() {
      return {
        help: false,
        seeNote: false
      };
    },
    computed: mapGetters([
      'usertoken',
      'displayName',
      'showNote'
    ]),
    created() {
      if (this.usertoken && (this.showNote === 'true')) {
        this.seeNote = true;
      } else {
        this.seeNote = false;
      }
    },
    methods: {
      closeNotice: function() {
        this.$cookie.set('showNote', false, 7);
        this.$store.commit('setShowNote', this.$cookie.get('showNote'));
        this.seeNote = false;
      }
    }
  };
</script>

<style lang='scss' scoped>
  .notice {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    background-color: #da1e28;
    color: #FFF;
    &.cleared {
      background-color: #f1c21b;
      color: #000;
    }
  }
  .helplink {
    color: #0062ff;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .heavy {
    font-weight: 600;
  }
  .closeAlert {
    text-align: right;
  }
  .extratop {
    // margin-top: 50px;
  }
</style>
