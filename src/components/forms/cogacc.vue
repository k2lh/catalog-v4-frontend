<template>
  <div class="component-set">
    <div class="bx--row padtop1">
      <div class="-col-lg-5">
      </div>
      <div class="-col-lg-5">
      </div>
      <div class="-col-lg-6">
      </div>
    </div>
    <div class="bx--row padtop1">
      <div class="-col-lg-5">
      </div>
    </div>
    <div class="bx--row padtop1">
      <div class="-col-lg-5">
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
    name: 'Cogacc',
    props: {},
    data: () => ({
      create: {}
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
