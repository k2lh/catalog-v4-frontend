<template>
  <div id="DashFrame" class="page-body">
    <div class="container">
      <Usernotice />
      <PageheadNoTabs :title="displayTitle" :origin="originUse" />
      <main id="maincontent" class="page-content">
        <div class="bx--grid">
          <div v-if="message" class="bx--row notice info">
            <p class="bx--type-body-short-01">
              {{ message }}
            </p>
          </div>
        </div>
        <div class="bx--grid">
          <div class="bx--row">
            <div class="bx--col">
              <p v-show="unique === 'executive'" class="bx--type-body-short-01 padbot1">
                A PDF is available with steps for
                <a href="@assets/executive-dashboard-report-recomendations-instructions.pdf" target="_blank">
                  recommended reports in this dashboard
                </a>.
              </p>
              <div class="embed">
                <div id="vizContainer"></div>
                <div id="scriptgoeshere"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';

  export default {
    name: 'DashFrame',
    props: {
      unique: {
        type: String,
        default: ''
      },
      origin: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        baseurl: 'https://domain.com',
        displayTitle: '',
        linkurl: '',
        url: '',
        items: [],
        token: '',
        site: '',
        message: '',
        message2: false,
        licensed: false,
        help: false
      };
    },
    computed: mapGetters([
      'groupTeam',
      'usertoken',
      'groupExecs',
      'groupAdmins',
      'groupDash',
      'groupOrg',
      'environment',
      'baseURL',
      'shortenv',
      'email'
    ]),
    created() {
      if (this.origin === null) {
        this.originUse = this.getOrigin();
      } else {
        this.originUse = this.origin;
      }
      if ((this.unique === '') || (this.unique === 'undefined')) {
        this.uniqueID = this.getUnique();
      } else {
        this.uniqueID = this.unique;
      };
      if (this.environment === 'local') {
        this.site = 'http://localhost:3000';
      };
      axios.get('https://site-prod-log.domain.net/api/cards/fetch/' + this.uniqueID).then((response) => {
        this.displayTitle = response.data[0].displayTitle;
        this.linkurl = response.data[0].linkurl;
        var status = response.data[0].tags[4];
        console.log(this.displayTitle, ' // ', this.linkurl, ' // ', status);
        if (!this.usertoken) {
          console.log('------ NOT LOGGED IN');
          if (status === 'Private') {
            console.log('private ONLY, show error');
            this.message = 'You must login to view this dashboard.';
          } else if (status === 'Public') {
            console.log('anon ONLY, no msg');
            this.getAnonymous();
          } else {
            console.log('private OPTION, show notice');
            this.message = 'NOTE: You aren’t logged in, so this is the public version. Use the link in the header to login.';
            this.getAnonymous();
          }
        } else {
          console.log('------ IS LOGGED IN');
          axios.get('https://dpydalwftae02.sl.bluecloud.ibm.com:8888/api/v1/get/production/' + this.email + '/trusted').then((response) => {
            if (response.data === -1 ) {
              if (status === 'Private') {
                console.log('private ONLY, no license, show denial msg');
                this.message = 'Sorry, you don’t have permission to view this dashboard. If you believe this message is in error, contact a tableau administrator.';
              } else {
                console.log('anon version, no license, show notice');
                this.message = 'NOTE: all personal data is masked. You must have a tableau license with the proper permissions to view the unmasked version of this dashboard.';
                this.getAnonymous();
              }
            } else if ((response.data === undefined) || (response.data === null) || !response.data) {
              console.log('no response coming back');
              this.message2 = true;
              this.url = this.baseurl + '/#/site' + this.linkurl;
              this.initViz();
            } else {
              if (status === 'Private') {
                this.message2 = true;
                console.log('private option, has license, get dash');
                this.url = this.baseurl + '/trusted/' + response.data + '/t' + this.linkurl + '?:showVizHome=no&:embed=true';
                this.initViz();
              } else {
                console.log('anon only, has license, get dash');
                this.url = this.baseurl + '/#/site' + this.linkurl;
                this.initViz();
              }
            }
          });
        }
      });
    },
    methods: {
      getUnique: function() {
        var res = this.$route.path.split('/');
        var uniqueID = res[2];
        return uniqueID;
      },
      getOrigin: function() {
        var path = this.$route.path;
        var res = path.includes('Management');
        var origin = '';
        if (res === true) {
          origin = 'Management';
        };
        return origin;
      },
      initViz: function() {
        console.log('make initViz call');
        console.log(this.url);
        // let tScript = document.createElement('script');
        // tScript.setAttribute(
        //   'src',
        //   'https://domain.com/javascripts/api/tableau-2.min.js'
        // );
        let tScript1 = document.createElement('script');
        tScript1.setAttribute(
          'src',
          'https://domain.com/javascripts/api/viz_v1.js'
        );
        var container = document.getElementById('scriptgoeshere');
        container.appendChild(tScript1);
        var containerDiv = document.getElementById('vizContainer');
        // this.checkIframe();
        this.viz = new tableau.Viz(containerDiv, this.url);
      },
      getAnonymous: function() {
        console.log('call is anonymous');
        axios.get('https://dpydalwftae02.sl.bluecloud.ibm.com:8888/api/v1/get/trusted').then((response) => {
          console.log(response.data);
          this.url = this.baseurl + '/trusted/' + response.data + '/t' + this.linkurl + '?:showVizHome=no&:embed=true';
          this.initViz();
        });
      }
    }
  };
</script>

<style scoped lang='scss'>

  a.bx--breadcrumb {
    color: #fff;
    text-decoration: none;
  }

  .bx--breadcrumb svg {
    fill: #fff;
    top: 4px;
    left: -1px;
    position: relative;
  }

  .page-content {
    min-height: 30rem;
  }

  .notice.info {
    padding: 1rem;
    margin-bottom: 1rem;
    &.info {
      background: #D0E2FF;
    }
    &.warning {
      background: #da1e28;
    }
  }

  .bx--type-body-short-01 {
    color: #000;
    &.warning {
      color: #da1e28;
      font-weight: 600;
      color: white;
    }
  }

  .heavy {
    font-weight: 600;
  }
</style>
