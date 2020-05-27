<template>
  <div class="component-set">
    <div class="bx--row padtop1">
      <div class="-col-lg-3">
        <div class="bx--label">
          This request is for...
        </div>
        <cv-radio-group :vertical="'vertical'">
          <cv-radio-button v-model="dashreq.who" label="myself" checked="" value="self" />
          <cv-radio-button v-model="dashreq.who" label="someone else" value="other" />
        </cv-radio-group>
      </div>
      <div v-if="dashreq.who === 'other'" class="-col-lg-6">
        <cv-text-input v-model="dashreq.secondemail" label="Recipient email address" />
      </div>
      <div v-if="dashreq.who === 'other'" class="-col-lg-4">
        <cv-select v-model="dashreq.notify" label="Send notifications to:" class="fullwidth">
          <cv-select-option value="first">
            Myself
          </cv-select-option>
          <cv-select-option value="second">
            The person I'm requesting for
          </cv-select-option>
          <cv-select-option value="both">
            Both of us
          </cv-select-option>
        </cv-select>
      </div>
    </div>
    <div class="bx--row">
      <div class="-col-lg-8">
        <div class="bx--label">
          Send email notifications...
        </div>
        <cv-radio-group :vertical="'vertical'">
          <cv-radio-button v-model="dashreq.when" label="For every update to the request (ie status change, assignments, etc)." value="always" />
          <cv-radio-button v-model="dashreq.when" label="Only when an action is required for this request." value="limited" />
        </cv-radio-group>
      </div>
    </div>
    <div class="bx--row">
      <div class="-col-lg-8">
        <cv-text-area label="Business need" :value="dashreq.need" :helper-text="'A summary of the business need or problem statement.'" class="fullwidth" />
      </div>
      <div class="-col-lg-8">
        <cv-text-area label="Requirements" :value="dashreq.reqs" :helper-text="'A summary of currently-identified requirements.'" class="fullwidth" />
      </div>
    </div>
    <div class="bx--row padtop2">
      <div class="-col-lg-8">
        <cv-text-area label="Justification or value-add" :value="dashreq.value" :helper-text="'ex: time spent in manual work, executive requirement, etc.'" class="fullwidth" />
      </div>
      <div class="-col-lg-8">
        <cv-text-area label="Obstacles to self-service" :value="dashreq.service" :helper-text="''" class="fullwidth" />
      </div>
    </div>
    <div class="bx--row padtop2">
      <div class="-col-lg-5 fullwidth">
        <cv-select v-model="dashreq.jobfunc" label="My job function:">
          <cv-select-option value="cio">
            CIO
          </cv-select-option>
          <cv-select-option value="communication">
            Communications/Marketing
          </cv-select-option>
          <cv-select-option value="compensation">
            Compensation &amp; Benefits
          </cv-select-option>
          <cv-select-option value="finance">
            Finance
          </cv-select-option>
          <cv-select-option value="hrpartner">
            HR Partner/Leader
          </cv-select-option>
          <cv-select-option value="hrto">
            HR T&amp;O
          </cv-select-option>
          <cv-select-option value="hrbd">
            HRBD
          </cv-select-option>
          <cv-select-option value="legal">
            Legal
          </cv-select-option>
          <cv-select-option value="learning">
            LL&amp;I
          </cv-select-option>
          <cv-select-option value="talent">
            Talent
          </cv-select-option>
          <cv-select-option value="other">
            Other
          </cv-select-option>
        </cv-select>
      </div>
      <div class="-col-lg-5 fullwidth">
        <cv-select v-model="dashreq.region" label="Region of Information Scope">
          <cv-select-option value="GEOs">
            GEOs
          </cv-select-option>
          <cv-select-option value="Global">
            Global
          </cv-select-option>
          <cv-select-option value="HR function">
            HR function
          </cv-select-option>
          <cv-select-option value="Business Unit">
            Business Unit
          </cv-select-option>
          <cv-select-option value="other">
            Other
          </cv-select-option>
        </cv-select>
      </div>
      <div class="-col-lg-5">
        <cv-select v-model="dashreq.country" label="Country of Information Scope">
          <cv-select-option value="Algeria">
            Algeria
          </cv-select-option>
          <cv-select-option value="Angola">
            Angola
          </cv-select-option>
          <cv-select-option value="Argentina">
            Argentina
          </cv-select-option>
          <cv-select-option value="Australia">
            Australia
          </cv-select-option>
          <cv-select-option value="Austria">
            Austria
          </cv-select-option>
          <cv-select-option value="Bangladesh">
            Bangladesh
          </cv-select-option>
          <cv-select-option value="Belgium">
            Belgium
          </cv-select-option>
          <cv-select-option value="Brazil">
            Brazil
          </cv-select-option>
          <cv-select-option value="Bulgaria">
            Bulgaria
          </cv-select-option>
          <cv-select-option value="Canada">
            Canada
          </cv-select-option>
          <cv-select-option value="Chile">
            Chile
          </cv-select-option>
          <cv-select-option value="Colombia">
            Colombia
          </cv-select-option>
          <cv-select-option value="Congo">
            Congo
          </cv-select-option>
          <cv-select-option value="Costa Rica">
            Costa Rica
          </cv-select-option>
          <cv-select-option value="Croatia">
            Croatia
          </cv-select-option>
          <cv-select-option value="Cyprus">
            Cyprus
          </cv-select-option>
          <cv-select-option value="Czech Republic">
            Czech Republic
          </cv-select-option>
          <cv-select-option value="Denmark">
            Denmark
          </cv-select-option>
          <cv-select-option value="Ecuador">
            Ecuador
          </cv-select-option>
          <cv-select-option value="Egypt">
            Egypt
          </cv-select-option>
          <cv-select-option value="Estonia">
            Estonia
          </cv-select-option>
          <cv-select-option value="Finland">
            Finland
          </cv-select-option>
          <cv-select-option value="France">
            France
          </cv-select-option>
          <cv-select-option value="Gabon">
            Gabon
          </cv-select-option>
          <cv-select-option value="GCG-China">
            GCG-China
          </cv-select-option>
          <cv-select-option value="GCG-Hong Kong">
            GCG-Hong Kong
          </cv-select-option>
          <cv-select-option value="GCG-Taiwan">
            GCG-Taiwan
          </cv-select-option>
          <cv-select-option value="Germany">
            Germany
          </cv-select-option>
          <cv-select-option value="Ghana">
            Ghana
          </cv-select-option>
          <cv-select-option value="Greece">
            Greece
          </cv-select-option>
          <cv-select-option value="Hungary">
            Hungary
          </cv-select-option>
          <cv-select-option value="India">
            India
          </cv-select-option>
          <cv-select-option value="Indonesia">
            Indonesia
          </cv-select-option>
          <cv-select-option value="Ireland">
            Ireland
          </cv-select-option>
          <cv-select-option value="Israel">
            Israel
          </cv-select-option>
          <cv-select-option value="Italy">
            Italy
          </cv-select-option>
          <cv-select-option value="Japan">
            Japan
          </cv-select-option>
          <cv-select-option value="Kenya">
            Kenya
          </cv-select-option>
          <cv-select-option value="Korea">
            Korea
          </cv-select-option>
          <cv-select-option value="Kuwait">
            Kuwait
          </cv-select-option>
          <cv-select-option value="Latvia">
            Latvia
          </cv-select-option>
          <cv-select-option value="Lithuania">
            Lithuania
          </cv-select-option>
          <cv-select-option value="Malaysia">
            Malaysia
          </cv-select-option>
          <cv-select-option value="Mexico">
            Mexico
          </cv-select-option>
          <cv-select-option value="Morocco">
            Morocco
          </cv-select-option>
          <cv-select-option value="Netherlands">
            Netherlands
          </cv-select-option>
          <cv-select-option value="New Zealand">
            New Zealand
          </cv-select-option>
          <cv-select-option value="Nigeria">
            Nigeria
          </cv-select-option>
          <cv-select-option value="Norway">
            Norway
          </cv-select-option>
          <cv-select-option value="Pakistan">
            Pakistan
          </cv-select-option>
          <cv-select-option value="Peru">
            Peru
          </cv-select-option>
          <cv-select-option value="Philippines">
            Philippines
          </cv-select-option>
          <cv-select-option value="Poland">
            Poland
          </cv-select-option>
          <cv-select-option value="Portugal">
            Portugal
          </cv-select-option>
          <cv-select-option value="Qatar">
            Qatar
          </cv-select-option>
          <cv-select-option value="Romania">
            Romania
          </cv-select-option>
          <cv-select-option value="Russia">
            Russia
          </cv-select-option>
          <cv-select-option value="Saudi Arabia">
            Saudi Arabia
          </cv-select-option>
          <cv-select-option value="Senegal">
            Senegal
          </cv-select-option>
          <cv-select-option value="Serbia">
            Serbia
          </cv-select-option>
          <cv-select-option value="Seychelles">
            Seychelles
          </cv-select-option>
          <cv-select-option value="Singapore">
            Singapore
          </cv-select-option>
          <cv-select-option value="Slovakia">
            Slovakia
          </cv-select-option>
          <cv-select-option value="Slovenia">
            Slovenia
          </cv-select-option>
          <cv-select-option value="South Africa">
            South Africa
          </cv-select-option>
          <cv-select-option value="Spain">
            Spain
          </cv-select-option>
          <cv-select-option value="Sri Lanka">
            Sri Lanka
          </cv-select-option>
          <cv-select-option value="Sweden">
            Sweden
          </cv-select-option>
          <cv-select-option value="Switzerland">
            Switzerland
          </cv-select-option>
          <cv-select-option value="Thailand">
            Thailand
          </cv-select-option>
          <cv-select-option value="Tunisia">
            Tunisia
          </cv-select-option>
          <cv-select-option value="Turkey">
            Turkey
          </cv-select-option>
          <cv-select-option value="UAE">
            UAE
          </cv-select-option>
          <cv-select-option value="Ukraine">
            Ukraine
          </cv-select-option>
          <cv-select-option value="United Kingdom">
            United Kingdom
          </cv-select-option>
          <cv-select-option value="Uruguay">
            Uruguay
          </cv-select-option>
          <cv-select-option value="USA">
            USA
          </cv-select-option>
          <cv-select-option value="Venezuela">
            Venezuela
          </cv-select-option>
          <cv-select-option value="Vietnam">
            Vietnam
          </cv-select-option>
        </cv-select>
      </div>
    </div>
    <div class="bx--row padtop2">
      <div class="-col-lg-4">
        <cv-select v-model="dashreq.frequency" label="Frequency of need/use:">
          <cv-select-option value="once">
            Just this once
          </cv-select-option>
          <cv-select-option value="daily">
            Daily
          </cv-select-option>
          <cv-select-option value="weekly">
            Weekly
          </cv-select-option>
          <cv-select-option value="monthly">
            Monthly
          </cv-select-option>
          <cv-select-option value="unknown">
            Not sure
          </cv-select-option>
        </cv-select>
      </div>
      <div class="-col-lg-4">
        <cv-select v-model="dashreq.rank" label="Intended audience category:">
          <cv-select-option value="1">
            everyone
          </cv-select-option>
          <cv-select-option value="2">
            only my division
          </cv-select-option>
          <cv-select-option value="3">
            Managers and above
          </cv-select-option>
          <cv-select-option value="5">
            Director-level and above
          </cv-select-option>
          <cv-select-option value="7">
            VP-level and above
          </cv-select-option>
          <cv-select-option value="9">
            C-suite and above
          </cv-select-option>
        </cv-select>
      </div>
      <div class="-col-lg-4">
        <cv-select v-model="dashreq.scope" label="Estimated audience size:">
          <cv-select-option value="1">
            10 or fewer
          </cv-select-option>
          <cv-select-option value="2">
            10 - 20 people
          </cv-select-option>
          <cv-select-option value="3">
            20 - 50 people
          </cv-select-option>
          <cv-select-option value="4">
            50 - 100 people
          </cv-select-option>
          <cv-select-option value="5">
            100 - 500 people
          </cv-select-option>
          <cv-select-option value="6">
            500 - 1,000 people
          </cv-select-option>
          <cv-select-option value="7">
            1,000 - 5,000 people
          </cv-select-option>
          <cv-select-option value="8">
            5,000 - 10,000 people
          </cv-select-option>
          <cv-select-option value="9">
            more than 10,000 people
          </cv-select-option>
        </cv-select>
      </div>
      <div class="-col-lg-4">
        <cv-select v-model="dashreq.finance" label="Financial impact:">
          <cv-select-option value="4">
            Cost savings
          </cv-select-option>
          <cv-select-option value="7">
            Revenue generation
          </cv-select-option>
          <cv-select-option value="9">
            Both cost savings and revenue generation.
          </cv-select-option>
          <cv-select-option value="1">
            Neither cost savings and revenue generation.
          </cv-select-option>
        </cv-select>
      </div>
    </div>
    <div class="bx--row padtop2">
      <div class="-col-lg-4">
        <div class="bx--label">
          Completion date:
        </div>
        <datepicker v-model="dashreq.deadline" class="fullwidth" />
      </div>
      <div class="-col-lg-8">
        <cv-text-input label="Business reason for completion date" :value="dashreq.reasondue" :helper-text="''" class="fullwidth" />
      </div>
    </div>
    <div class="bx--row padtop1">
      <div class="-col-lg-12">
        <cv-text-input label="Link for box folder with relevant documentation" :value="dashreq.docs" :helper-text="'Enter the link to a dropbox with relevant data, sample reports, etc.'" class="fullwidth" />
      </div>
    </div>
    <div class="bx--row padtop1">
      <div class="-col-lg-4">
        <cv-select v-model="dashreq.where" label="I heard about this form through:">
          <cv-select-option value="w3">
            w3 search
          </cv-select-option>
          <cv-select-option value="slack">
            Slack conversation
          </cv-select-option>
          <cv-select-option value="email">
            Email
          </cv-select-option>
          <cv-select-option value="presentation">
            Presentation
          </cv-select-option>
          <cv-select-option value="person">
            Colleague
          </cv-select-option>
        </cv-select>
      </div>
      <div class="-col-lg-6">
        <cv-text-input v-model="dashreq.referer" label="Email address of the person who referred me:" />
      </div>
    </div>
    <div class="bx--row">
      <div class="-col-lg-5">
        <button type="submit" class="bx--btn bx--btn--primary martop2" @click="submitReq">
          Submit request
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import { mapGetters } from 'vuex'
  export default {
    name: 'Dashreq',
    props: {},
    data: () => ({
      dashreq: {
        jobfunc: '',
        referer: '',
        who: 'self',
        secondemail: '',
        notify: ''
      }
    }),
    computed: {
      ...mapGetters([
        'displayName',
        'userId',
        'shortenv',
        'email',
        'mgrStatus'
      ])
    },
    methods: {
      submitReq() {
        console.log('submit this');
        // axios.post('https://site-prod-log.domain.net/api/cards/edit/' + this.selected._id, {
        // }).then((response) => {
        //   console.log(response);
        // });
      }
    }
  }
</script>

<style scoped lang='scss'>

  /deep/ .bx--text-input__field-wrapper {
    width: 100%;
    margin: 0 0 1rem 0;
  }

  /deep/ .cv-text-input.bx--form-item {
    & .bx--text-input__field-wrapper {
      width: 100%;
    }
  }
  /deep/ .bx--text-area__wrapper {
    width: 100%;
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

  /deep/ .bx--radio-button-group--vertical {
    align-items: baseline;
    margin-bottom: 2rem;
  }

  /deep/ .bx--select, .bx--select-input__wrapper {
    width: 96%;
    & .bx--select-input {
      width: 100%;
      background-color: #f4f4f4;
    }
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

  .vdp-datepicker /deep/ input {
    font-family: Plex Sans,Helvetica Neue,Arial,sans-serif;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.125rem;
    letter-spacing: .16px;
    outline: 2px solid transparent;
    outline-offset: -2px;
    background-color: #f3f3f3;
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;
    color: #171717;
    border: none;
    border-bottom: 1px solid #8c8c8c;
    transition: all .11s;
  }

</style>
