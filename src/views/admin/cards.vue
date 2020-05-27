<template>
  <div id="Cards" class="page-body">
    <div class="container">
      <Usernotice />
      <PageheadShort :title="'Manage your cards'" :origin="'ISA'" />
      <main id="maincontent" class="page-content background">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else class="">
          <div class="bx--grid">
            <div class="bx--row resource-card-group">
              <div class="-col-lg-4">
                <button type="submit" class="bx--btn bx--btn--primary marbot1" @click="createCard">
                  Create a new card
                </button>
                <div class="bx--type-productive-heading-02 card-title">
                  Cards in production
                </div>
                <p v-for="(item, index) in items" v-if="item.inProduction" :key="index" class="bx--type-code-01 bx--type-mono edit" @click="getCard(item)">
                  {{ item.displayTitle }}
                </p>
                <div class="bx--type-productive-heading-02 card-title padtop1">
                  Cards in staging
                </div>
                <p v-for="(item, index) in items" v-if="!item.inProduction && !item.inArchive" :key="index" class="bx--type-code-01 bx--type-mono edit" @click="getCard(item)">
                  {{ item.displayTitle }}
                </p>
                <div class="bx--type-productive-heading-02 card-title padtop1">
                  Archived cards (retired or not in use)
                </div>
                <p v-for="(item, index) in items" v-if="item.inArchive" :key="index" class="bx--type-code-01 bx--type-mono edit" @click="getCard(item)">
                  {{ item.displayTitle }}
                </p>
              </div>
              <div class="-col-lg-12">
                <div v-if="message" class="nologin bx--type-body-short-01">
                  {{ message }}
                </div>
                <div v-if="cardEdit || cardCreate">
                  <div class="bx--type-productive-heading-02 card-title">
                    <span v-if="cardEdit">
                      Edit card: {{ selected.displayTitle }}
                    </span>
                    <span v-else>
                      Create new card
                    </span>
                  </div>
                  <div class="bx--label padbot2">
                    Contact the admin if you need an option added to any of the dropdowns.
                  </div>
                  <div class="bx--row">
                    <div class="-col-lg-10">
                      <cv-text-input v-model="selected.displayTitle" label="Card title" />
                    </div>
                    <div class="-col-lg-6">
                      <cv-text-input v-model="selected.owner" label="Card owner" />
                    </div>
                  </div>
                  <div class="bx--row">
                    <div class="-col-lg-16">
                      <cv-checkbox v-model="selected.inProduction" :label="'Publish to production environment.'" :checked="selected.inProduction" :value="selected.inProduction" />
                      <cv-checkbox v-model="selected.inCatalog" :label="'Post in the general catalog.'" :checked="selected.inCatalog" :value="selected.inCatalog" />
                      <cv-checkbox v-model="selected.inCore" :label="'Managed by the core Team-SAA team.'" :checked="selected.inCore" :value="selected.inCore" />
                      <cv-checkbox v-model="selected.inArchive" :label="'Archive (retire) this card.'" :checked="selected.inArchive" :value="selected.inArchive" />
                    </div>
                  </div>
                  <div v-if="selected.inCatalog" class="bx--row padtop1">
                    <div class="-col-lg-16 fullwidth">
                      <cv-text-input v-model="selected.description" label="Description (max 100 characters, please)" />
                    </div>
                  </div>
                  <div v-else class="bx--row padtop1 padbot1">
                    <div class="-col-lg-5 fullwidth">
                      <cv-select v-model="selected.section" label="Display section">
                        <cv-select-option value="featured" selected="selected.section === 'featured'">
                          Featured
                        </cv-select-option>
                        <cv-select-option value="plist" selected="selected.section === 'plist'">
                          Professions/Certifications
                        </cv-select-option>
                        <cv-select-option value="ilist" selected="selected.section === 'ilist'">
                          Intentional/Segment training
                        </cv-select-option>
                        <cv-select-option value="salist" selected="selected.section === 'salist'">
                          Management Service Areas
                        </cv-select-option>
                      </cv-select>
                    </div>
                  </div>
                  <div class="bx--row">
                    <div class="-col-lg-5 fullwidth">
                      <cv-select v-model="selected.tags[1]" label="Business group">
                        <cv-select-option value="Corp" :selected="selected.tags.includes('Corp')">
                          Corporate
                        </cv-select-option>
                        <cv-select-option value="NNN" :selected="selected.tags.includes('NNN')">
                          Business
                        </cv-select-option>
                        <cv-select-option value="ZZZ" :selected="selected.tags.includes('ZZZ')">
                          Technologies
                        </cv-select-option>
                      </cv-select>
                    </div>
                    <div class="-col-lg-5 fullwidth">
                      <cv-select v-model="selected.tags[0]" label="Programs & initiatives">
                        <cv-select-option value="AIS" :selected="selected.tags.includes('AIS')">
                          Academy
                        </cv-select-option>
                        <cv-select-option value="Management" :selected="selected.tags.includes('Management')">
                          project Management
                        </cv-select-option>
                        <cv-select-option value="ISA" :selected="selected.tags.includes('ISA')">
                          project Transformation
                        </cv-select-option>
                      </cv-select>
                    </div>
                    <div class="-col-lg-5 fullwidth">
                      <cv-select v-model="selected.tags[2]" label="Intended audience">
                        <cv-select-option value="'">
                          Everyone
                        </cv-select-option>
                        <cv-select-option value="Admins" :selected="selected.tags.includes('Admins')">
                          Admins
                        </cv-select-option>
                        <cv-select-option value="Employees" :selected="selected.tags.includes('Employees')">
                          Employees
                        </cv-select-option>
                        <cv-select-option value="Executives" :selected="selected.tags.includes('Executives')">
                          Executives
                        </cv-select-option>
                        <cv-select-option value="Managers" :selected="selected.tags.includes('Managers')">
                          Managers
                        </cv-select-option>
                      </cv-select>
                    </div>
                  </div>
                  <div class="bx--row padtop1">
                    <div class="-col-lg-5 fullwidth">
                      <cv-select v-model="selected.tags[4]" label="Required permissions to view">
                        <cv-select-option value="Private" :selected="selected.tags.includes('Private')">
                          Private (limited users)
                        </cv-select-option>
                        <cv-select-option value="Public" :selected="selected.tags.includes('Public')">
                          Public (all users)
                        </cv-select-option>
                        <cv-select-option value="Private + Public" :selected="selected.tags.includes('Private + Public')">
                          Private + Public
                        </cv-select-option>
                      </cv-select>
                    </div>
                    <div class="-col-lg-5 fullwidth">
                      <cv-select v-model="selected.tags[3]" label="Destination page/dashboard type">
                        <cv-select-option value="Tableau" :selected="selected.tags.includes('Tableau')">
                          Tableau
                        </cv-select-option>
                        <cv-select-option value="Cognos" :selected="selected.tags.includes('Cognos')">
                          Cognos
                        </cv-select-option>
                        <cv-select-option value="Standalone" :selected="selected.tags.includes('Standalone')">
                          Standalone
                        </cv-select-option>
                        <cv-select-option value="Other" :selected="selected.tags.includes('Other')">
                          External link
                        </cv-select-option>
                      </cv-select>
                    </div>
                    <div class="-col-lg-5 fullwidth">
                      <cv-select v-model="selected.tags[5]" label="Release status">
                        <cv-select-option value="Release" :selected="selected.tags.includes('Release')">
                          Regular release
                        </cv-select-option>
                        <cv-select-option value="Experimental" :selected="selected.tags.includes('Experimental')">
                          Experimental release
                        </cv-select-option>
                        <cv-select-option value="Prototype" :selected="selected.tags.includes('Prototype')">
                          Prototype version
                        </cv-select-option>
                      </cv-select>
                    </div>
                  </div>
                  <div class="bx--row padtop1">
                    <div class="-col-lg-16">
                      <cv-text-input v-model="selected.linkurl" label="Link URL" helper-text="Do not include the domain. Ask for help if you're not sure what that means." class="fullwidth" />
                    </div>
                  </div>
                  <div class="bx--row">
                    <div class="-col-lg-5 fullwidth">
                      <cv-text-input v-model="selected.team.lead" label="Team Lead" helper-text="(optional but recommended)" class="thirdwidth" />
                    </div>
                    <div class="-col-lg-5 fullwidth">
                      <cv-text-input v-model="selected.team.developer" label="Interface dev" helper-text="(optional but recommended)" class="thirdwidth" />
                    </div>
                    <div class="-col-lg-5 fullwidth">
                      <cv-text-input v-model="selected.team.database" label="Database dev" helper-text="(optional but recommended)" class="thirdwidth" />
                    </div>
                  </div>
                  <div class="bx--row padtop1">
                    <div class="-col-lg-16">
                      <button type="submit" class="bx--btn bx--btn--primary" @click="submitCard">
                        <span v-if="cardEdit">
                          Save changes
                        </span>
                        <span v-else>
                          Submit card
                        </span>
                      </button>
                    </div>
                  </div>
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
  import { mapGetters } from 'vuex'
  import axios from 'axios';

  export default {
    name: 'Cards',
    // components: {
    //   CvForm,
    //   CvTextInput
    // },
    data: () => ({
      items: [],
      selected: {},
      message: '',
      flevel: '',
      faudience: '',
      fgroup: '',
      fprog: '',
      fperms: '',
      fdash: '',
      core: [
        '2A4877897',  // Kat
        '4G3972897',  // Lawrence
        '7D3844897',  // Thanh
        '082067649'   // Bernard
      ],
      environmentTMP: [],
      message: '',
      cardEdit: false,
      cardCreate: false
    }),
    computed: {
      ...mapGetters([
        'userId',
        'groupTeam',
        'environment',
        'shortenv'
      ])
    },
    mounted() {
      if (this.environment === 'dev' || this.environment === 'local' || this.userId) {
        this.getData();
      } else {
        this.message = 'You must log in to view this page.';
      };
    },
    methods: {
      getData() {
        if ((this.userId === '806948897') || (this.userId === '909557897') || (this.userId === '5G9002897')) {
          axios.get('https://site-prod-log.domain.net/api/cards/fetch/').then((response) => {
            console.log('get all');
            this.items = response.data;
            this.items = this.items.sort((a, b) => (a.displayTitle > b.displayTitle) ? 1 : -1);
          });
        } else if (this.core.includes(this.userId)) {
          axios.get('https://site-prod-log.domain.net/api/cards/core/').then((response) => {
            console.log('get core');
            this.items = response.data;
            this.items = this.items.sort((a, b) => (a.displayTitle > b.displayTitle) ? 1 : -1);
          });
        } else {
          axios.get('https://site-prod-log.domain.net/api/cards/list/' + this.userId).then((response) => {
            console.log('get some');
            this.items = response.data;
            this.items = this.items.sort((a, b) => (a.displayTitle > b.displayTitle) ? 1 : -1);
          });
        }
      },
      getCard(obj) {
        this.selected = obj;
        this.cardEdit = true;
      },
      submitCard() {
        console.log('submit this');
        if (this.selected.inProduction) {
          this.environmentTMP = ["dev", "staging", "prod"];
        } else {
          this.environmentTMP = ["dev", "staging"];
        };
        if (this.selected.inCatalog) {
          this.selected.section = 'general';
        };
        if (this.cardCreate) {
          var str = this.selected.displayTitle.replace(/[^0-9a-z]/gi, '');
          str = str.toLowerCase();
          str = str.substring(0, 10);
          var d = new Date();
          var n = d.getMinutes();
          this.selected.uniqueID = str + n;
          axios.post('https://site-prod-log.domain.net/api/cards/new', {
            uniqueID: this.selected.uniqueID,
            description: this.selected.description,
            displayTitle: this.selected.displayTitle,
            linkurl: this.selected.linkurl,
            owner: this.selected.owner,
            inCatalog: this.selected.inCatalog,
            inProduction: this.selected.inProduction,
            inCore: this.selected.inCore,
            section: this.selected.section,
            useFrame: this.selected.useFrame,
            tags: this.selected.tags,
            environment: this.environmentTMP,
            team: {
              lead: this.selected.team.lead,
              developer: this.selected.team.developer,
              database: this.selected.team.database
            }
          }).then((response) => {
            console.log(response);
            this.getData();
            this.selected = {};
            this.cardCreate = false;
          });
        } else {
          axios.post('https://site-prod-log.domain.net/api/cards/edit/' + this.selected._id, {
            _id: this.selected._id,
            uniqueID: this.selected.uniqueID,
            description: this.selected.description,
            displayTitle: this.selected.displayTitle,
            linkurl: this.selected.linkurl,
            owner: this.selected.owner,
            inCatalog: this.selected.inCatalog,
            inProduction: this.selected.inProduction,
            inCore: this.selected.inCore,
            inArchive: this.selected.inArchive,
            section: this.selected.section,
            useFrame: this.selected.useFrame,
            tags: this.selected.tags,
            environment: this.environmentTMP,
            team: {
              lead: this.selected.team.lead,
              developer: this.selected.team.developer,
              database: this.selected.team.database
            }
          }).then((response) => {
            console.log(response);
            this.selected = {};
            this.cardEdit = false;
          });
        }
      },
      createCard() {
        this.cardCreate = true;
        console.log('create this');
        this.selected = {
          description: '',
          displayTitle: '',
          linkurl: '',
          owner: this.userId,
          inCatalog: false,
          inArchive: false,
          inProduction: false,
          inCore: true,
          section: 'general',
          useFrame: false,
          tags: [],
          team: {
            lead: '',
            developer: '',
            database: ''
          }
        };
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .bx--text-input__field-wrapper {
    width: 100%;
    margin: 0 0 1rem 0;
  }

  /deep/ .cv-text-input.bx--form-item {
    & .bx--text-input__field-wrapper {
      width: 100%;
    }
  }
  .fullwidth {
    width: 100%;
  }

  /deep/ .bx--select, .bx--select-input__wrapper {
    width: 96%;
    & .bx--select-input {
      width: 100%;
      background-color: #f4f4f4;
    }
  }

  .bx--list--unordered>.bx--list__item:before {
    content: unset;
  }
  .bx--list--nested {
    margin-bottom: .25rem;
    margin-left: 0;
  }
  .edit {
    color: #0545b8;
    cursor: pointer;
  }
  .edit:hover {
    text-decoration: underline;
  }

  /deep/ .bx--label {
    font-size: .875rem;
  }
  /deep/ .bx--form__helper-text {
    max-width: 100%;
  }
  /deep/ .bx--checkbox-label:before {
    border: 1px solid #171717;
  }
</style>
