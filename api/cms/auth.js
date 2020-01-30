const randomstring = require('randomstring')
const simpleOauthModule = require('simple-oauth2')

const oauth2 = simpleOauthModule.create({
  client: {
    id: '296798bfc38173997392',
    secret: '1ae8b32678751439c23967682300f2547d1237ba'
  },
  auth: {
    // Supply GIT_HOSTNAME for enterprise github installs.
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize'
  }
})

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: process.env.REDIRECT_URL,
  scope: 'repo,user',
  state: randomstring.generate(32)
})

module.exports = (req, res) => {
  res.status(301).setHeader('Location', authorizationUri)
  res.end()
}
