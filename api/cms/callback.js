const simpleOauthModule = require('simple-oauth2')

function getScript(mess, content) {
  return `<!doctype html><html><body><script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage %o", e)
      window.opener.postMessage(
        'authorization:github:${mess}:${JSON.stringify(content)}',
        e.origin
      )
      window.removeEventListener("message",receiveMessage,false);
    }
    window.addEventListener("message", receiveMessage, false)
    console.log("Sending message: %o", "github")
    window.opener.postMessage("authorizing:github", "*")
    })()
  </script></body></html>`;
}

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

const originPattern = process.env.ORG_ORIGIN || ''
if (('').match(originPattern)) {
  console.warn('Insecure ORIGIN pattern used. This can give unauthorized users access to your repository.')
  if (process.env.NODE_ENV === 'production') {
    console.error('Will not run without a safe ORIGIN pattern in production.')
    process.exit()
  }
}

module.exports = (req, res) => {
  console.log(req.query)
  const code = req.query.code
  const options = {
    code: code,
    redirect_uri: process.env.REDIRECT_URL,
    scope: 'repo,user',
  }

  oauth2.authorizationCode.getToken(options).then((result) => {
    const token = oauth2.accessToken.create(result)

    res.send(getScript('success', {
      token: token.token.access_token,
      provider: 'github'
    }))
  }).catch((error) => {
    console.error('Access Token Error', error.message)
    res.send(getScript('error', error))
  })
}
