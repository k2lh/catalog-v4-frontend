import VueCookie from 'vue-cookie'
import router from '@/router'
import { store } from '@/store/store'

export const loginHelper = {
  login() {
    const callbackPath = sessionStorage.getItem('callbackPath') || '/'

    if (router.currentRoute.name !== 'login') {
      sessionStorage.setItem('callbackPath', router.currentRoute.path)
    }

    if (window.location.href.includes('localhost')) {
      // for localhost instance, set local token and test user
      if (!this.isLoggedIn()) {
        const jwtString = `--string--`
        VueCookie.set('access_token', jwtString, {
          expires: 1,
          domain: 'localhost',
          SameSite: 'Lax'
        })
      }

      if (router.currentRoute.path !== callbackPath) {
        router.push(callbackPath)
      }
    } else if (process.env.VUE_APP_SSO_URL) {
      window.location.href = process.env.VUE_APP_SSO_URL
    }

    store.commit('setLoginStatus', !!VueCookie.get('access_token'))
    store.commit('setUser', this.getUserInfo())
  },
  isLoggedIn() {
    return !!VueCookie.get('access_token')
  },
  getUserInfo() {
    try {
      let token = this.getToken()
      let user
      if (token) {
        // user = JSON.parse(window.atob(token))
        user = this.parseJwt(token)
      }

      return user
    } catch (e) {
      console.error(e)
      return null
    }
  },
  getToken() {
    return VueCookie.get('access_token')
  },
  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}
