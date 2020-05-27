<template>
  <div id="global-footer">
    <footer role="contentinfo">
      <div class="container mainblock">
        <div class="bx--grid">
          <div class="bx--row">
            <div class="bx--col">
              <div class="footer-corporate-links">
                <ul class="padding-bottom-0 textcolumns-small-2">
                  <li>
                    <a href="/flg-cont-usen">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="/flg-priv-usen">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="/flg-tous-usen">
                      Terms of use
                    </a>
                  </li>
                  <li>
                    <a href="/flg-acce-usen">
                      Accessibility
                    </a>
                  </li>
                  <li class="feedbacklink">
                    <a href="#">
                      Feedback
                    </a>
                  </li>
                  <li id="truste-cp">
                    <a href="#" onclick="truste.eu.clickListener();return false;">
                      Cookie preferences
                    </a>
                  </li>
                  <!-- <li>
                    <router-link :to="'/admin/cards'">
                      Manage your cards
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="'/admin/requests'">
                      Submit a request
                    </router-link>
                  </li> -->
                </ul>
              </div>
            </div>
          </div>

          <div v-if="environment !== 'prod'" class="bx--row">
            <div class="bx--col bx--type-code-01">
              <p>environment = {{ environment }}</p>
              <p>shortenv = {{ shortenv }}</p>
              <p>baseURL = {{ baseURL }}</p>
            </div>
            <div class="bx--col bx--type-code-01">
              <p>displayName = {{ displayName }}</p>
              <p>userId = {{ userId }}</p>
              <p>mgrStatus = {{ mgrStatus }}</p>
              <p>showNote = {{ showNote }}</p>
            </div>
            <div class="bx--col bx--type-code-01">
              <p>mgrID = {{ mgrID }}</p>
              <p>mgrName = {{ mgrName }}</p>
              <p>groupOrg = {{ groupOrg }}</p>
            </div>
            <div class="bx--col bx--type-code-01">
              <p>groupExecs = {{ groupExecs }}</p>
              <p>groupAdmins = {{ groupAdmins }}</p>
              <p>groupTeam = {{ groupTeam }}</p>
              <p>groupDash = {{ groupDash }}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
  <script>
    import navigationLinks from '../global-header/navigation-links';
    import {mapGetters} from 'vuex';
    export default {
      name: 'GlobalFooter',
      data() {
        return {}
      },
      computed: mapGetters([
        'groupTeam',
        'displayName',
        'shortenv',
        'groupOrg',
        'groupTeam',
        'groupAdmins',
        'groupExecs',
        'groupDash',
        'userId',
        'environment',
        'baseURL',
        'showNote',
        'mgrStatus',
        'mgrID',
        'mgrName'
      ])
    };
  </script>

<style scoped>

  #global-footer {
    position: relative;
    background-color: #000;
    min-height: 15rem;
  }

  h4.footer {
    font-size: 1rem;
    line-height: 1.625rem;
    font-weight: normal;
    padding: 0 0 15px;
  }

  ul.footer-list {
    padding: 0 0 15px;
    margin: 0;
    list-style: none;
    font-size: 1rem;
    line-height: 1.625rem;
    display: block;
    border: 0;
    vertical-align: baseline;
    background: no-scroll transparent;
  }

  ul.footer-list>li {
      padding-left: 0;
  }

  .footer-corporate-links {
    padding-top: 2rem;
  }

  .footer-corporate-links li {
      display: inline-block;
      padding: 0 20px 0 0;
  }

  .footer-corporate-links a {
      display: inline-block;
      padding: 5px 0;
  }

  ul.footer-list>li a,
  h4.footer a,
  .footer-corporate-links a {
    color: #f4f4f4;
    text-decoration: none;
    font-weight: 300;
  }

  ul.footer-list>li a:hover,
  h4.footer a:hover,
  .footer-corporate-links a:hover {
    color: #FFF;
    text-decoration: underline;
    font-weight: 600;
  }

  .container {
    min-height: unset;
  }

  ol>li::before, ul>li::before {
      color: #f4f4f4;
      content: '';
      display: inline-block;
      font-family: Arial,sans-serif;
      font-size: 1.5rem;
      margin-left: -1.3rem;
      position: absolute;
  }
</style>
