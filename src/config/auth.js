import auth0 from 'auth0-js'
import history from '../history'

const callbackUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOPMENT_CALLBACK : process.env.REACT_APP_PRODUCTION_CALLBACK

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_CLIENT_ID,
    redirectUri: `${callbackUrl}/callback`,
    responseType: 'token id_token',
    scope: 'openid profile'
  })

  login = () => {
    this.auth0.authorize()
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
          this.setSession(authResult, user)
        })
        history.replace('/home')
      } else if (err) {
        history.replace('/home')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession = (authResult, profile) => {
    // Set the expire time for the token
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('user_image', profile.picture)

    history.replace('/home')
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('user_image')
    // navigate to the home route
    history.replace('/home')
  }

  isAuthenticated = () => {
    // Check whether the current time is past the ccess token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}