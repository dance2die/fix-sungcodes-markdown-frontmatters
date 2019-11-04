const fs = require("fs")
const path = require("path")

// https://www.npmjs.com/package/front-matter-editor
const editor = require("front-matter-editor")

const { info, warn, log, error } = console

let rawData = JSON.parse(fs.readFileSync(path.join(__dirname, "articles.json")))
// info(JSON.stringify(rawData.map(_ => _.feed_source_url), null, 2));
// info(rawData.map(_ => _.feed_source_url).filter(Boolean));
// rawData.map(_ => _.feed_source_url).filter(Boolean)

// cached_tag_list: tags,
// cached_user_name: author,

// const [_, year, month, day, slug] = [
//   ..."https://www.slightedgecoder.com/2018/12/18/page-not-found-on-netlify-with-react-router/".matchAll(
//     pattern
//   ),
// ][0]

const pattern = /https:\/\/www.slightedgecoder.com\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)\/$/gi
rawData
  .filter(_ => !!_.feed_source_url || !!_.canonical_url)
  // .forEach(post => {
  .forEach(
    ({
      feed_source_url,
      canonical_url,
      published_at,
      cached_tag_list,
      cached_user_name,
      published,
      description,
    }) => {
      const url = feed_source_url || canonical_url
      const [_, year, month, day, slug] = [...url.matchAll(pattern)][0]
      // info(`year=${year}, month=${month}, day=${day}, slug=${slug}`)

      const filename = path.join(__dirname, `../blog/${year}/${slug}/index.md`)
      // const exists = fs.existsSync(filename)
      // info(`${exists} ??? ${filename}`)

      editor
        .read(filename)
        .data((data, matter) => {
          matter.data = Object.assign(data, {
            date: `${year}-${month}-${day}`,
            published_at: published_at || "",
            tags: cached_tag_list || "",
            author: cached_user_name || "",
          })
        })
        .save(
          path.join(__dirname, `../blog/${year}/${slug}/`),
          {},
          (err, matter) => {
            if (err) error(`ERRRORORORORORO!===> `, err)
            // console.log(matter)
            info(`processed ${filename}`)
          }
        )
      // .show("data")

      return
    }
  )
