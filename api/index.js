const http = require("http")
const URL = require('url')
const fs = require('fs')
const path = require('path')

const data = require("./urls.json")

function writeFile(callback) {
  fs.writeFile(path.join(__dirname, "urls.json"), JSON.stringify(data, null, 2), err => {
    if (err) throw err

    callback(JSON.stringify({message: "OK"}))
  })
}

http.createServer((req, res) => {
  const {name, url, del} = URL.parse(req.url, true).query

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  })

  // all resources
  if (!name || !url)
    return res.end(JSON.stringify(data))

  if (del) {
    data.urls = data.urls.filter(item => {
      const diff = String(item.url) !== String(url)
      return diff
    })
    return writeFile(message => res.end(message))
  }

  data.urls.push({name, url})

  return writeFile(message => res.end(message))

}).listen(3000, () => console.log("API is running..."))
