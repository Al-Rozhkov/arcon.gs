const randomstring = require('randomstring')
const { AuthorizationCode } = require('simple-oauth2')

const client = new AuthorizationCode({
  client: {
    id: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET
  },
  auth: {
    // Supply GIT_HOSTNAME for enterprise github installs.
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize'
  }
})

// Authorization uri definition
const authorizationUri = client.authorizeURL({
  redirect_uri: process.env.REDIRECT_URL,
  scope: 'repo,user',
  state: randomstring.generate(32)
})

module.exports = (req, res) => {
  console.log(authorizationUri)
  res.redirect(authorizationUri)
  res.end()
}
