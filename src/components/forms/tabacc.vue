<template>
  <div class="component-set">
    <div class="bx--row">
      <div class="-col-lg-16">
        <div v-if="!mgrStatus">
          <div class="bx--type-body-long-01">
            As a non-manager, your access level will be set to mask all employee level details. To see which dashboards have masked data
            and do not require a tableau license, filter the main page's cards by "Public" in the Permissions Levels section.
          </div>
        </div>
        <div v-else>
          <div class="bx--label">
            If you require employee name, email, or CNUM details, you must first read and sign the GDPR & Privacy compliance</a> agreement. Link will open in a new tab.
          </div>
          <cv-checkbox :label="'I have read and signed the GDPR & Privacy compliance agreement.'" value="tabacc.gdpr" />
        </div>
      </div>
    </div>
    <div class="bx--row padtop1">
      <div class="-col-lg-4">
        <div class="bx--label">
          This request is for...
        </div>
        <cv-radio-group :vertical="'vertical'">
          <cv-radio-button v-model="tabacc.who" label="myself" checked="" value="self" />
          <cv-radio-button v-model="tabacc.who" label="someone else" value="other" />
        </cv-radio-group>
      </div>
      <div class="-col-lg-6">
        <div v-if="tabacc.who === 'other'">
          <cv-text-input v-model="tabacc.secondemail" label="Recipient email address" />
        </div>
      </div>
      <div class="-col-lg-6">
        <div v-if="tabacc.who === 'other'">
          <cv-select v-model="tabacc.notify" label="Send all notifications to:" class="fullwidth">
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
    </div>
    <div class="bx--row">
      <div class="-col-lg-10">
        <cv-text-area label="Please explain your business need." :value="tabacc.need" :helper-text="'Provide a basic description of how the project Transformation data/reports will be used.'" class="fullwidth" />
      </div>
      <div class="-col-lg-6">
        <cv-text-area label="Additional notes" :value="tabacc.notes" :helper-text="'Include any other useful information and/or contacts.'" class="fullwidth" />
      </div>
    </div>
    <div class="bx--row padtop2">
      <div class="-col-lg-8">
        <div class="bx--label">
          What kinds of access do you need? Check all that apply.
        </div>
        <div class="bx--form__helper-text">
          Note: for access to the DB2/Data Lake, see the menu at left for that request form.
        </div>
        <cv-checkbox :label="'View-only detailed dashboards, beyond publicly available dashboards.'" value="tabacc.viewer" />
        <cv-checkbox :label="'Downloading data from dashboards.'" value="tabacc.explorer" />
        <cv-checkbox v-if="mgrStatus" :label="'Education progress at employee name level.'" value="tabacc.manager" />
        <cv-checkbox :label="'Add me to the team github workspace.'" value="tabacc.git" />
        <cv-checkbox :label="'Send me an invite for the team file storage.'" value="tabacc.box" />
      </div>
    </div>
    <div class="bx--row">
      <div class="-col-lg-16">
        <button type="submit" class="bx--btn bx--btn--primary martop2" @click="submitReq">
          Submit request
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Tabacc',
    props: {},
    data: () => ({
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

  .form-section,
  /deep/ .bx--text-area__wrapper {
    width: 100%;
  }
  /deep/ .cv-text-input.bx--form-item {
    & .bx--text-input__field-wrapper {
      width: 100%;
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

</style>
