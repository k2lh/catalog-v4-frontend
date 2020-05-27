<template>
  <div class="component-set">
    <div class="bx--row padtop1">
      <div class="-col-lg-3">
        <div class="bx--label">
          This request is for...
        </div>
        <cv-radio-group :vertical="'vertical'">
          <cv-radio-button v-model="bugout.who" label="myself" checked="" value="self" />
          <cv-radio-button v-model="bugout.who" label="someone else" value="other" />
        </cv-radio-group>
      </div>
      <div v-if="bugout.who === 'other'" class="-col-lg-6">
        <cv-text-input v-model="bugout.secondemail" label="Recipient email address" />
      </div>
      <div v-if="bugout.who === 'other'" class="-col-lg-4">
        <cv-select v-model="bugout.notify" label="Send notifications to:" class="fullwidth">
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
          <cv-radio-button v-model="bugout.when" label="For every update to the request (ie status change, assignments, etc)." value="always" />
          <cv-radio-button v-model="bugout.when" label="Only when an action is required for this request." value="limited" />
        </cv-radio-group>
      </div>
    </div>
    <div class="bx--row">
      <div class="-col-lg-8">
        <cv-text-area label="Problem description:" :value="bugout.issue" :helper-text="'A clear and concise description of the bug.'" class="fullwidth" />
        <cv-text-area label="Expected behavior:" :value="bugout.behave" :helper-text="'A clear and concise description of what you expected to happen.'" class="fullwidth padtop1" />
        <cv-text-area label="Additional info" :value="bugout.more" :helper-text="'Any other information you want to add.'" class="fullwidth padtop1" />
      </div>
      <div class="-col-lg-8">
        <cv-text-area label="How to see it in action:" :value="bugout.instructions" :helper-text="'A step-by-step explanation of how to reproduce the behavior.'" class="fullwidth extratall" />
      </div>
    </div>
    <div class="bx--row padtop2">
      <div class="-col-lg-3">
        <cv-select v-model="bugout.device" label="My device:">
          <cv-select-option value="desktop">
            Desktop
          </cv-select-option>
          <cv-select-option value="phone">
            Smartphone
          </cv-select-option>
        </cv-select>
      </div>
      <div class="-col-lg-3">
        <cv-select v-model="bugout.os" label="My operating system:">
          <cv-select-option v-if="bugout.device ==='desktop'" value="mac">
            Mac
          </cv-select-option>
          <cv-select-option v-if="bugout.device ==='desktop'" value="windows">
            PC/Windows
          </cv-select-option>
          <cv-select-option v-if="bugout.device ==='desktop'" value="linux">
            Linux/Unix
          </cv-select-option>
          <cv-select-option v-if="bugout.device ==='phone'" value="android">
            Android
          </cv-select-option>
          <cv-select-option v-if="bugout.device ==='phone'" value="iphone">
            iPhone
          </cv-select-option>
          <cv-select-option v-if="bugout.device ==='phone'" value="winphone">
            Windows
          </cv-select-option>
        </cv-select>
      </div>
      <div class="-col-lg-3">
        <cv-text-input label="OS version" :value="bugout.osver" :placeholder="'ex: 10.14.6'" class="fullwidth" />
      </div>
      <div class="-col-lg-3">
        <cv-select v-model="bugout.browser" label="My browser:">
          <cv-select-option value="firefox">
            Firefox
          </cv-select-option>
          <cv-select-option value="chrome">
            Chrome
          </cv-select-option>
          <cv-select-option value="safari">
            Safari
          </cv-select-option>
          <cv-select-option value="ie">
            Internet Explorer
          </cv-select-option>
          <cv-select-option value="edge">
            Edge
          </cv-select-option>
        </cv-select>
      </div>
      <div class="-col-lg-3">
        <cv-text-input label="browser version:" :value="bugout.brover" :placeholder="'ex: 68.8.0esr'" class="fullwidth" />
      </div>
    </div>
    <div class="bx--row padtop1">
      <div class="-col-lg-12">
        <cv-text-input label="Link for box folder with relevant documentation" :value="bugout.docs" :helper-text="'Enter the link to a box folder with screenshots.'" class="fullwidth" />
      </div>
    </div>
    <div class="bx--row padtop1">
      <div class="-col-lg-5">
        <button type="submit" class="bx--btn bx--btn--primary" @click="submitReq">
          Submit report
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
      bugout: {
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

  .extratall /deep/ textarea {
    height: 19rem;
  }

</style>
