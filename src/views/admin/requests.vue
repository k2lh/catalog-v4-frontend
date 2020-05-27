<template>
  <div id="Requests" class="page-body">
    <div class="container">
      <Usernotice />
      <PageheadShort :title="'Submit a Request'" :origin="'ISA'" />
      <main id="maincontent" class="page-content background">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="bx--grid">
            <div class="bx--row">
              <div class="-col-lg-4">
                <div class="bx--type-productive-heading-02 padbot1">
                  Select a request topic
                </div>
                <ul class="bx--list--unordered">
                  <li class="bx--list__item padtop1">
                    Not sure? Pick the statement that fits best.
                    <ul class="bx--list--unordered bx--list--nested">
                      <li class="bx--list__item single" @click="choice = 'dashreq'">
                        I want a new dashboard.
                      </li>
                      <li class="bx--list__item single" @click="choice = 'dashreq'">
                        I want to change an existing dashboard.
                      </li>
                      <li class="bx--list__item single" @click="choice = 'dashreq'">
                        I want my own version of an existing dashboard.
                      </li>
                      <li class="bx--list__item single" @click="choice = 'bugout'">
                        A dashboard's data is wrong, blank, or masked when it shouldn't be.
                      </li>
                      <li class="bx--list__item single" @click="choice = 'bugout'">
                        A page won't load or a link is broken.
                      </li>
                      <li class="bx--list__item single" @click="choice = 'bugout'">
                        Something is wrong/broken with the UI/wrapper.
                      </li>
                    </ul>
                  </li>
                  <li class="bx--list__item padtop1">
                    Reports
                    <ul class="bx--list--unordered bx--list--nested">
                      <li class="bx--list__item single" @click="choice = 'onerep'">
                        One-time custom report
                      </li>
                      <li class="bx--list__item single" @click="choice = 'recrep'">
                        Recurring custom report
                      </li>
                      <li class="bx--list__item single" @click="choice = 'wrkrep'">
                        project report
                      </li>
                    </ul>
                  </li>
                  <li class="bx--list__item padtop1">
                    Learning Reports
                    <ul class="bx--list--unordered bx--list--nested">
                      <li v-if="shortenv === 'dev'" class="bx--list__item single" @click="choice = 'passr'">
                        Analytics Self-Service Reports
                      </li>
                      <li v-if="shortenv === 'dev'" class="bx--list__item single" @click="choice = 'llidss'">
                        Services Reports Support
                      </li>
                      <li v-if="shortenv === 'dev'" class="bx--list__item single" @click="choice = 'tams'">
                        Metrics Support
                      </li>
                      <li v-if="shortenv === 'dev'" class="bx--list__item single" @click="choice = 'cmidi'">
                        Data Issue Support
                      </li>
                    </ul>
                  </li>
                  <li class="bx--list__item padtop1">
                    Assistance & Access
                    <ul class="bx--list--unordered bx--list--nested">
                      <!-- <li class="bx--list__item single" @click="choice = 'dashhelp'">
                        Clarification or inquiry
                      </li>
                      <li class="bx--list__item single" @click="choice = 'rephelp'">
                        Report clarification or inquiry
                      </li> -->
                      <!-- <li class="bx--list__item single" @click="choice = 'consult'">
                        Consulting
                      </li> -->
                      <li class="bx--list__item single" @click="choice = 'tabacc'">
                        Tableau access
                      </li>
                      <!-- <li class="bx--list__item single" @click="choice = 'cogacc'">
                        Cognos access
                      </li>
                      <li class="bx--list__item single" @click="choice = 'repacc'">
                        Report access
                      </li> -->
                      <li class="bx--list__item single" @click="choice = 'dbacc'">
                        Data lake access
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="-col-lg-12">
                <div v-if="choice === 'dashreq'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    Dashboard Request (new or existing)
                  </div>
                  <dashreq />
                </div>
                <div v-if="choice === 'bugout'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    Production Bug or Outage
                  </div>
                  <bugout />
                </div>

                <div v-if="choice === 'onerep'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    One-time custom report
                  </div>
                  <onerep />
                </div>
                <div v-if="choice === 'recrep'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    Recurring custom report
                  </div>
                  <recrep />
                </div>
                <div v-if="choice === 'wrkrep'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    project report
                  </div>
                  <wrkrep />
                </div>
                <div v-if="choice === 'passr'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    People Analytics Self-Service Reports
                  </div>
                  <div class="bx--row">
                    <iframe src="/paDataRequest" title="Analytics Self-Service Reports"></iframe>
                  </div>
                </div>
                <div v-if="choice === 'llidss'">
                  <!-- <div class="bx--type-productive-heading-02 padbot1">
                    LL&I Services Support
                  </div> -->
                  <div class="bx--row">
                    <iframe src="/DataRequest" title="Services Support"></iframe>
                  </div>
                </div>
                <div v-if="choice === 'tams'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    Metrics Support
                  </div>
                  <div class="bx--row">
                    <iframe src="/taDataRequest" title="Metrics"></iframe>
                  </div>
                </div>
                <div v-if="choice === 'cmidi'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    Data Issue Support
                  </div>
                  <div class="bx--row">
                    <iframe src="/cDataRequest" title="Data Issue Support"></iframe>
                  </div>
                </div>
                <div v-if="choice === 'dashhelp'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    Dashboard clarification or inquiry
                  </div>
                  <navhelp />
                </div>
                <div v-if="choice === 'rephelp'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    Report clarification or inquiry
                  </div>
                  <rephelp />
                </div>
                <div v-if="choice === 'consult'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    Consulting Request
                  </div>
                  <consult />
                </div>
                <div v-if="choice === 'tabacc'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    App 1 Access Request
                  </div>
                  <tabacc />
                </div>
                <div v-if="choice === 'cogacc'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    App 2 Access Request
                  </div>
                  <cogacc />
                </div>
                <div v-if="choice === 'repacc'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    Report Access Request
                  </div>
                  <repacc />
                </div>
                <div v-if="choice === 'dbacc'">
                  <div class="bx--type-productive-heading-02 padbot1">
                    Data Lake Access Request
                  </div>
                  <dbacc />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  // import {
  //   CvForm,
  //   CvTextInput
  // } from '@carbon/vue/src';
  import { CvContentSwitcher } from '@carbon/vue/src'
  import { mapGetters } from 'vuex'
  import axios from 'axios';

  export default {
    name: 'Requests',
    // components: {
    //   CvForm,
    //   CvTextInput
    // },
    data: () => ({
      items: [],
      create: {
        type: '',
        template: '',
        freq: ''
      },
      choice: null,
      tabacc: {
        gdpr: false,
        who: 'self',
        secondemail: '',
        notify: '',
        referer: '',
        need: '',
        notes: '',
        viewer: false,
        explorer: false,
        manager: false,
        git: false,
        box: false
      },
      message: ''
    }),
    computed: {
      ...mapGetters([
        'usertoken',
        'displayName',
        'groupTeam',
        'groupExecs',
        'groupAdmins',
        'groupDash',
        'groupOrg',
        'userId',
        'environment',
        'shortenv',
        'tracking',
        'baseURL',
        'email',
        'mgrStatus',
        'mgrID',
        'mgrName'
      ])
    },
    mounted() {
      if (this.environment === 'local' || this.userId) {
        this.message = '';
      } else {
        this.message = 'You must log in to view this page.';
      };
    },
    methods: {
      sendReq() {
        console.log('submit this');
        // axios.post('https://site-prod-log.domain.net/api/cards/edit/' + this.selected._id, {
        // }).then((response) => {
        //   console.log(response);
        // });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bx--list--unordered>.bx--list__item:before {
    content: unset;
  }
  .bx--list--nested {
    margin-bottom: .25rem;
    margin-left: 0;
  }
  .bx--list__item.single {
    padding: .25rem 0;
    cursor: pointer;
    padding-left: 1rem;
    font-weight: 600;
  }
  .bx--list__item.single:hover {
    background: #0545b8;
    color: #FFF;
  }

  .clearabove {
    clear: both;
  }
  .page-content iframe {
    width: 100%;
    min-height: 30rem;
  }

</style>
