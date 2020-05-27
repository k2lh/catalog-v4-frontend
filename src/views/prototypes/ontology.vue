<template>
  <div id="prototype" class="page-body">
    <div class="container">
      <PageheadNoTabs :title="title" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--col -col-lg-14">
              </div>
              <div class="bx--col -col-lg-2">
                <div class="choose-user">
                  <cv-select :value="mockUserId" :label="'Select demo employee name.'" @input="changeUser">
                    <cv-select-option v-for="(user, index) in users" :key="index" :value="user.userid">
                      {{ user.name }}
                    </cv-select-option>
                  </cv-select>
                </div>
              </div>
            </div>
            <!-- SECTION 1: LEARNING -->
            <div class="bx--row">
              <div class="bx--col">
                <div class="bx--type-expressive-heading-03 padtop2">
                  What you've been learning
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-md-2 -col-lg-4">
                <BanCard
                    :title="'YTD Badges Earned'"
                    :value="currentYearBadgeNum"
                    :question="'How did we get this number'"
                    :height="21"
                />
              </div>
              <div class="bx--no-gutter-sm -col-md-2 -col-lg-4">
                <BanCard
                    :title="'Badges in queue'"
                    :value="learningBadgesInQueue"
                    :question="'How did we get this number'"
                    :height="21"
                />
              </div>
              <div class="bx--no-gutter-sm -col-md-4 -col-lg-8">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Your badge history, all-time
                    </div>
                    <BarVertical :datasets="badgeHistory" :columns="badgeColumns" />
                    <div class="box-footer">
                      <a @click="toggleExplanation('ALLBADGE')">
                        How did we get this information and what does it mean?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="['BADGEEARN', 'BADGEQUEUE', 'ALLBADGE'].includes(selectedExplanation)" class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-16">
                <div class="explanation">
                  <p v-if="selectedExplanation === 'BADGEEARN'">
                    We've collected your badges earned this year from YourLearning data. If this number is incorrect, use the YourLearning site to update your information.
                  </p>
                  <p v-if="selectedExplanation === 'BADGEQUEUE'">
                    We've collected your badges information from YourLearning data. As YourLearning doesn't mark badges 'in progress', we're instead showing how many badges you currently have queued.
                  </p>
                  <p v-if="selectedExplanation === 'ALLBADGE'">
                    We've collected your badges information from YourLearning data. This chart shows the badges you've earned across your time at XXX, to highlight trends in your badge-earning progress. The chart starts from the first badge earned, however, and not your first year of service. If you have been at for ten years but only earned your first badge three years ago, the "all-time" period begins with that first badge, three years ago.
                  </p>
                </div>
              </div>
            </div>

            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-8">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile long-list">
                    <h3 class="bx--type-heading-01">
                      Classes taken, 2019
                    </h3>
                    <div class="truncate-tile classList-card">
                      <p v-for="(classItem, index) in classList" :key="index" class="classList-p">
                        {{ classItem }}
                      </p>
                    </div>
                    <div class="box-footer">
                      <a @click="toggleExplanation('CLASSLIST')">
                        How did we get this information?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-8">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <h3 class="bx--type-heading-01">
                      Your class history, YTD
                    </h3>
                    <BarVertical :datasets="classHistory" :columns="classColumns" />
                    <div class="box-footer">
                      <a @click="toggleExplanation('CLASSYEAR')">
                        How did we get this information and what does it mean?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="['CLASSLIST', 'CLASSYEAR'].includes(selectedExplanation)" class="bx--row resource-card-group">
              <div class="bx--col">
                <div class="explanation">
                  <p v-if="selectedExplanation === 'CLASSLIST'">
                    We've collected your Think40 information from YourLearning. Multipart classes have been compressed into a single title, for easier reading. For a complete list, visit the YourLearning site. If there are classes missing or incorrectly listed, visit the YourLearning site to correct your information.
                  </p>
                  <p v-if="selectedExplanation === 'CLASSYEAR'">
                    We've collected your Think40 information from YourLearning. This chart shows the number of classes you've taken in each month, for the current year. Note that this chart does not represent hours, which means a 40-hour (single) class would show as equal to a half-hour (single) class. This chart's purpose is a simple at-a-glance representation of your class-taking trends this year.
                  </p>
                </div>
              </div>
            </div>

            <!-- SECTION 2: SPENDING -->
            <div class="bx--row">
              <div class="bx--col">
                <div class="bx--type-expressive-heading-03 padtop2">
                  What you work on
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile long-list claims-by-area">
                    <h3 class="bx--type-heading-01">
                      Claims by area, 2019
                    </h3>
                    <div class="truncate-tile">
                      <BarVerticalStackedOld :datasets="claimsByArea" />
                      <div class="box-footer">
                        <a @click="toggleExplanation('CLAIMSBYAREA')">
                          How did we get these numbers?
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-12">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile long-list claims-made">
                    <h3 class="bx--type-heading-01">
                      Claims made, 2019
                    </h3>
                    <div class="truncate-tile">
                      <BarHorizontal class="claims-horizontal-bar" :datasets="claimsMadeRows" :columns="claimsMadeColumns" />
                      <div class="box-footer">
                        <a @click="toggleExplanation('CLAIMS')">
                          How did we get these numbers?
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="['CLAIMSBYAREA','CLAIMS'].includes(selectedExplanation)" class="bx--row resource-card-group">
              <div class="bx--col">
                <div class="explanation">
                  <p v-if="selectedExplanation === 'CLAIMSBYAREA'">
                    We've collected your Think40 information from YourLearning. Multipart classes have been compressed into a single title, for easier reading. For a complete list, visit the YourLearning site. If there are classes missing or incorrectly listed, visit the YourLearning site to correct your information.
                  </p>
                  <p v-if="selectedExplanation === 'CLAIMS'">
                    We've collected your Think40 information from YourLearning. This chart shows the number of classes you've taken in each month, for the current year. Note that this chart does not represent hours, which means a 40-hour (single) class would show as equal to a half-hour (single) class. This chart's purpose is a simple at-a-glance representation of your class-taking trends this year.
                  </p>
                </div>
              </div>
            </div>
            <!-- SECTION 3: DOING -->
            <div class="bx--row">
              <div class="bx--col">
                <div class="bx--type-expressive-heading-03 padtop2">
                  What kind of work you do
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-6">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile ban-box current-jrs">
                    <h3 class="bx--type-heading-01">
                      Primary JRS (ZZZ)
                    </h3>
                    <p class="bx--type-expressive-heading-04 inner-cards">
                      {{ "job title name" }}
                    </p>
                    <div class="box-footer">
                      <a @click="toggleExplanation('JRS')">
                        How did we get this information?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-6">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile ban-box job-position">
                    <h3 class="bx--type-heading-01">
                      Job Position (HR)
                    </h3>
                    <p class="bx--type-expressive-heading-04 inner-cards">
                      {{ "job title name" }}
                    </p>
                    <div class="box-footer">
                      <a @click="toggleExplanation('JOB')">
                        How did we get this information?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile ban-box evidence-checkList">
                    <h3 class="bx--type-heading-01">
                      Evidence CheckList
                    </h3>
                    <div class="checkList-cards">
                      <cv-checkbox v-model="checks" value="badge" label="Badge" @change="actionChange" />
                      <cv-checkbox v-model="checks" value="resume" label="Resume" @change="actionChange" />
                      <cv-checkbox v-model="checks" value="careerHistory" label="Career History" @change="actionChange" />
                      <cv-checkbox v-model="checks" value="education" label="Education" @change="actionChange" />
                      <cv-checkbox v-model="checks" value="skillsProfile" label="Skills Profile" @change="actionChange" />
                      <cv-checkbox v-model="checks" value="learning" label="Learning" @change="actionChange" />
                    </div>
                    <div class="box-footer">
                      <a @click="toggleExplanation('CHECKLIST')">
                        How did we get this information?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="['JRS','JOB','CHECKLIST'].includes(selectedExplanation)" class="bx--row resource-card-group">
              <div class="bx--col">
                <div class="explanation">
                  <p v-if="selectedExplanation === 'JRS'">
                    We've collected your Think40 information from YourLearning. Multipart classes have been compressed into a single title, for easier reading. For a complete list, visit the YourLearning site. If there are classes missing or incorrectly listed, visit the YourLearning site to correct your information.
                  </p>
                  <p v-if="selectedExplanation === 'JOB'">
                    We've collected your Think40 information from YourLearning. This chart shows the number of classes you've taken in each month, for the current year. Note that this chart does not represent hours, which means a 40-hour (single) class would show as equal to a half-hour (single) class. This chart's purpose is a simple at-a-glance representation of your class-taking trends this year.
                  </p>
                  <p v-if="selectedExplanation === 'CHECKLIST'">
                    We've collected your Think40 information from YourLearning. This chart shows the number of classes you've taken in each month, for the current year. Note that this chart does not represent hours, which means a 40-hour (single) class would show as equal to a half-hour (single) class. This chart's purpose is a simple at-a-glance representation of your class-taking trends this year.
                  </p>
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-12">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile skills-areas">
                    <h3 class="bx--type-heading-01">
                      Skills Areas
                    </h3>
                    <div class="chart-container">
                      <BarVerticalStacked :datasets="barVerticalStackedRows" :columns="barVerticalStackedColumns" />
                    </div>
                    <div class="box-footer">
                      <a @click="toggleExplanation('AREAS')">
                        How did we get this information?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <h3 class="bx--type-heading-01">
                      Skills Evidence
                    </h3>
                    <div class="skillsContainer">
                      <div class="skillsType">
                        <span>Type</span>
                        <span>Points</span>
                      </div>
                      <div v-for="(data, index) of evidenceData" :key="index" class="skillsData" style="border-top: 1px solid;">
                        <span>{{ data.type }}</span>
                        <span>{{ data.points }}</span>
                      </div>
                    </div>

                    <div class="box-footer">
                      <a @click="toggleExplanation('SKILLS')">
                        How did we get this information?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="['AREAS','SKILLS'].includes(selectedExplanation)" class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm bx--col">
                <div class="explanation">
                  <p v-if="selectedExplanation === 'AREAS'">
                    We've collected your Think40 information from YourLearning. Multipart classes have been compressed into a single title, for easier reading. For a complete list, visit the YourLearning site. If there are classes missing or incorrectly listed, visit the YourLearning site to correct your information.
                  </p>
                  <p v-if="selectedExplanation === 'SKILLS'">
                    We've collected your Think40 information from YourLearning. Multipart classes have been compressed into a single title, for easier reading. For a complete list, visit the YourLearning site. If there are classes missing or incorrectly listed, visit the YourLearning site to correct your information.
                  </p>
                </div>
              </div>
            </div>

            <!-- SECTION 4: INFERENCE -->
            <div class="bx--row">
              <div class="bx--col">
                <div class="bx--type-expressive-heading-03 padtop2">
                  What we can infer from your data
                </div>
              </div>
            </div>
            <div id="skill-level" class="bx--no-gutter-sm -col-lg-16">
              <div class="bx--resource-card bx--resource-card--dark">
                <div class="bx--tile">
                  <!-- <div class="filters">
                    <span @click="filter = 2">
                      <CheckmarkOutline aria-role="button" />
                      <label>Skill level based on evidence</label>
                    </span>
                    <span @click="filter = 1">
                      <CheckmarkOutline />
                      <label>Adjusting based on badges & certifications</label>
                    </span>
                    <span @click="reset">
                      <CheckmarkOutline />
                      <label>Inferred skill levels</label>
                    </span>
                  </div>
                  <div id="container">
                    <div class="canvas">
                      <div class="level-5 level"></div>
                      <div class="level-4 level"></div>
                      <div class="level-3 level"></div>
                      <div class="level-2 level"></div>
                      <div class="level-1 level"></div>
                    </div>
                    <VerticalArrow
                        v-for="(label, index) of labels"
                        :id="label"
                        :key="index"
                        :baseskilllevel="plottedScore(skillRatings[0].baseskilllevel[index])"
                        :badgesandcert="plottedScore(skillRatings[0].badgesandcert[index])"
                        :inferredskill="plottedScore(skillRatings[0].inferredskill[index])"
                        :filter="filter"
                    />
                  </div>
                  <div class="box-footer">
                    <a @click="toggleExplanation('FLITERS')">
                      How did we get this information?
                    </a>
                  </div> -->
                </div>
              </div>
            </div>
            <div v-show="['FLITERS'].includes(selectedExplanation)" class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-16">
                <div class="explanation">
                  <p v-if="selectedExplanation === 'FLITERS'">
                    We've collected your Think40 information from YourLearning. Multipart classes have been compressed into a single title, for easier reading. For a complete list, visit the YourLearning site. If there are classes missing or incorrectly listed, visit the YourLearning site to correct your information.
                  </p>
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
  import axios from "axios";
  import { mapGetters } from "vuex";
  // import CheckmarkOutline from "@carbon/icons-vue/es/checkmark--outline/32";
  import { getLearningData } from "@/api/employees";
  import { getSpendingData } from "@/api/spending";
  import { getSpendingTotalData } from "@/api/spendingTotal";
  import { getSkillAreasData } from "@/api/skillsAreas";

  export default {
    name: 'OntologyV1',
    components: {
      // CheckmarkOutline
    },
    props: {
      title: {
        type: String,
        default: 'PROTOTYPE: Skills Ontology'
      }
    },
    data() {
      return {
        mockUserId:'123',
        isZZZ:false,
        isLogin:false,
        message: '',
        orgGroup:'',
        showExplanation: false,
        selectedExplanation: null,
        learningData: [],
        spending: [],
        spendingTotal: [],
        currentYearBadgeNum: null,
        learningBadgesInQueue: null,
        badgeHistory: [],
        classHistory: [],
        classList: [],
        classColumns: [],
        badgeColumns: [],
        claimsByArea: [],
        claimsMadeColumns:[],
        claimsMadeRows:[],
        spendingData: {
          columns: ['label', 'data'],
          rows: []
        },
        evidenceData: [],
        filter: 0,
        skillLevel:0,
        labels: [],
        skillRatings:[],
        vOffset: -7.5,
        scoreCard: {},
        // barVerticalStackedColumns: ['type', 'Badges', 'Resume', 'Career History', 'Education', 'Skills Profile', 'Learning'],
        barVerticalStackedColumns: [],
        barVerticalStackedRows: [],
        checks:[],
        users:[]
      };
    },
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupOrg',
      'environment'
    ]),
    mounted() {
      if (this.groupTeam || this.environment === 'local') {
        this.loadData();
        // this.filterList = {
        //   region: true,
        //   ciclocation: true,
        //   istss: false,
        //   market: false,
        //   country: true,
        //   businessmodel: false,
        //   jrs: false,
        //   service: true,
        //   servicearea: true,
        //   serviceline: false
        // };
      } else if (!usertoken) {
        this.message = 'You must log in to view this page.';
      } else {
        this.message = 'You are not authorized to view this page. If you believe this message is in error, please contact a site admin about creating an access request.'
      };
    },
    methods: {
      loadData() {
         getLearningData().then(res => {
            if (this.mockUserId==='123') {
              this.learningData = res.data.data[0];
            }else if(this.mockUserId==='234'){
              this.learningData = res.data.data[1];
            }
            else if(this.mockUserId==='345'){
              this.learningData = res.data.data[2];
            }
            else if(this.mockUserId==='456'){
              this.learningData = res.data.data[3];
            }
              this.currentYearBadgeNum = this.learningData.currentYearBadgeNum;
              this.learningBadgesInQueue = this.learningData.badgesProg;
              this.classHistory = this.learningData.classHist;
              this.classColumns = Object.keys(this.learningData.classHist[0]);
              this.classList = this.learningData.classList;
              this.badgeHistory = this.learningData.badgeHist;
              this.badgeColumns = Object.keys(this.learningData.badgeHist[0]);
        });
        getSpendingData().then(res => {
            if (this.mockUserId==='123') {
              this.spending = res.data.data[0].claimsMadeRowsData;
            }else if(this.mockUserId==='234'){
              this.spending = res.data.data[1].claimsMadeRowsData;
            }
            else if(this.mockUserId==='345'){
              this.spending = res.data.data[2].claimsMadeRowsData;
            }
            else if(this.mockUserId==='456'){
              this.spending = res.data.data[3].claimsMadeRowsData;
            }
            this.claimsMadeColumns=['label', 'data']
            this.claimsMadeRows = this.spending.map(s => ({
              label: s.WORK_ITEM_ID,
              data: Math.trunc(s.YTD_HOURS)
            }));
        });
        getSpendingTotalData().then(res => {
            if (this.mockUserId==='123') {
              this.spendingTotal = res.data.data[0].claimsByAreaData;
            }else if(this.mockUserId==='234'){
              this.spendingTotal = res.data.data[1].claimsByAreaData;
            }
            else if(this.mockUserId==='345'){
              this.spendingTotal = res.data.data[2].claimsByAreaData;
            }
            else if(this.mockUserId==='456'){
              this.spendingTotal = res.data.data[3].claimsByAreaData;
            }
            this.claimsByArea = this.spendingTotal.map(s => ({
            label: s.LABEL,
            data: [Math.trunc(s.YTD_HOURS)]
          }));
        });
        getSkillAreasData().then(res => {
          this.barVerticalStackedColumns= ['type', 'Badges', 'Resume', 'Career History', 'Education', 'Skills Profile', 'Learning']
            if (this.mockUserId==='123') {
              this.barVerticalStackedRows = res.data.data[0].barVerticalStackedRows;
            }else if(this.mockUserId==='234'){
              this.barVerticalStackedRows = res.data.data[1].barVerticalStackedRows;
            }
            else if(this.mockUserId==='345'){
              this.barVerticalStackedRows = res.data.data[2].barVerticalStackedRows;
            }
            else if(this.mockUserId==='456'){
              this.barVerticalStackedRows = res.data.data[3].barVerticalStackedRows;
            }
        });
      },
      toggleExplanation(type) {
        this.showExplanation =
          this.showExplanation && type !== this.selectedExplanation
            ? this.showExplanation
            : !this.showExplanation;
        this.selectedExplanation = this.showExplanation ? type : null;
      },
      reRender() {
        this.skillLevel += 1;
      },
      plottedScore(score) {
        return this.scoreCard[score] + this.vOffset;
      },
      reset() {
        this.filter = 0
        this.reRender()
      },
      actionChange(value){
        console.log(this.checks)
      },
      changeUser(value) {
        this.mockUserId=value
        this.loadData();
        console.log(value,'value')
      }
    }
  };
</script>

<style scoped lang="scss">
  .component {
    .long-list {
      overflow-y: auto;
      max-height: 100%;
      border-bottom: 1rem solid #333333;
      .truncate-tile {
        padding-top: 1rem;
      }
    }
  }

  .box-footer {
    font-size: 0.85rem;
    color: #4287f5;
    margin-top: 1rem;
    padding: 0 0.5rem 0.5rem 0;
    a {
      color: #4287f5;
      font-style: italic;
      cursor: pointer;
    }
  }

  .explanation{
      height: 4rem;
      background-color:#323232;
      font-size: 0.85rem;
      color: #fff;
      margin-top: -0.85rem;
      padding: 1.5rem 0.5rem 1.5rem 1rem;
  }
  .explanationText{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 8rem;
      background-color:#323232;
      font-size: 0.85rem;
      color: #fff;
      margin-top: -0.85rem;
      padding: 1.5rem 0.5rem 1.5rem 1rem;
  }

  .inner-card {
    height: 200px;
  }
  .inner-cards {
    height: 200px;
    display: flex;
    align-items: flex-end;
    padding-bottom: 30px;
  }
  .checkList-cards{
    padding-top: 1rem;
    height: 200px;
    display: flex;
    flex-direction: column
  }
  .classList-card{
    padding-top: 2rem;
    height: 200px;
    overflow: auto;
  }
  .classList-p{
    border-top: 1px solid;
    height: 1.5rem;
    display: flex;
    align-items: center
  }

  .bx--checkbox-label:before{
    background-color:'#fff'
  }

  .skillsContainer{
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .skillsType{
    height: 2rem;
    align-items: center;
    padding: 0 2rem 0 1rem;
    margin-top: 3rem;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
  .skillsData{
    height: 2rem;
    align-items: center;
    padding: 0 3.5rem 0 1rem;
    border-bottom: 1px;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }

 $level-height: 50px;

   #skill-level {
    margin-top: 0;
    margin-right: -1rem;
    margin-bottom: 2rem;
    margin-left: -1rem;
    h3 {
      padding: 1rem 1rem 0;
    }

    .filters {
      padding: 1rem;
      display: flex;
      justify-content: space-around;
      stroke: #fff;

      span {
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          color: #6ea6ff;
          stroke: #6ea6ff;
        }

        svg {
          width: 20px;
          height: 20px;
        }

        label {
          cursor: pointer;
          font-size: 16px;
          padding-left: 10px;
        }

        button {
          padding: 5px;
        }
      }
    }

    #container {
      display: flex;
      flex-direction: row;
      // height: 500px;
      padding: 2rem;

      .canvas {
        width: 99%;
        height: 100%;
        position: absolute;
        padding-right: 2rem;
      }

      .level {
        border-top: solid 1px;
        height: $level-height;

        &.level:before {
          position: relative;
          left: -1rem;
          top: -0.5rem;
        }

        &.level-5:before {
          content: '5';
        }
        &.level-4:before {
          content: '4';
        }
        &.level-3:before {
          content: '3';
        }
        &.level-2:before {
          content: '2';
        }
        &.level-1:before {
          content: '1';
        }
        &.level-1:after {
          content: '0';
          position: relative;
          left: -1.5rem;
          top: 2.5rem;
        }
        &.level-1 {
          border-bottom: solid 1px;
        }
      }
    }
  }

</style>
