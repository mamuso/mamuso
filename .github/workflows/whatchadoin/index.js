const rssParser = require("rss-parser");
const stringTemplate = require("string-template");
const fs = require("fs");

const goodreadsFeed =
  "https://www.goodreads.com/review/list_rss/7067819?key=gi9kN6GhPqmBlc2ronm0c8l0oYRlj8-VhHnIs4niHnJ8WWsU&shelf=currently-reading";

let parser = new rssParser({
  customFields: {
    item: ["book_medium_image_url", "book_id"],
  },
});

(async () => {
  const template = fs.readFileSync("./README.template.md", "utf8");
  console.log(template);
  let feed = await parser.parseURL(goodreadsFeed);
  feed.items.forEach((item) => {
    // console.log(item.title + ":" + item.book_medium_image_url);
  });
})();
