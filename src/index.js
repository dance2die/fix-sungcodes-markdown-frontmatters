const fs = require("fs")
const path = require("path")

const { info, warn, log, error } = console

let rawData = JSON.parse(fs.readFileSync(path.join(__dirname, "articles.json")))
// info(JSON.stringify(rawData.map(_ => _.feed_source_url), null, 2));
// info(rawData.map(_ => _.feed_source_url).filter(Boolean));

// rawData.map(_ => _.feed_source_url).filter(Boolean)

const pattern = /https:\/\/www.slightedgecoder.com\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)\/$/gi
const [_, year, month, day, slug] = [
  ..."https://www.slightedgecoder.com/2018/12/18/page-not-found-on-netlify-with-react-router/".matchAll(
    pattern
  ),
][0]

// info(`m, d, y, slug`, year, month, day, slug)

const filename = path.join(__dirname, `../blog/${year}/${slug}/index.md`)
const exists = fs.existsSync(filename)
info(`${filename} exists????? ${exists}`)
