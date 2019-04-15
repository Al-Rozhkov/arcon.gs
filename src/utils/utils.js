export default function urlExists(url) {
  const http = new XMLHttpRequest()
  http.open('HEAD', url, false)
  http.send()
  console.log(`${url} -- ${http.status}`)
  return http.status != 404
}
