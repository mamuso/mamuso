const rssParser = require("rss-parser");
const stringTemplate = require("string-template");
const fs = require("fs");

const goodreadsFeed =
  "https://www.goodreads.com/review/list_rss/7067819?shelf=currently-reading";
const pinboardFeed = "https://feeds.pinboard.in/rss/u:mamuso/t:mamusonet/";

const parser = new rssParser({
  customFields: {
    item: ["author_name", "book_id"],
  },
});
const template = fs.readFileSync("src/README.template.md", "utf8");

(async () => {
  // Parese goodreads
  let goodreads = "";
  let goodreadsParsedFeed = await parser.parseURL(goodreadsFeed);
  for (let i = 0; i < 3; i++) {
    const item = goodreadsParsedFeed.items[i];
    goodreads += `- [📘 ${item.title}](https://www.goodreads.com/book/show/${item.book_id}) by ${item.author_name}\n`;
  }

  // Parese goodreads
  let pinboard = "";
  let pinboardParsedFeed = await parser.parseURL(pinboardFeed);
  for (let i = 0; i < 5; i++) {
    const item = pinboardParsedFeed.items[i];
    pinboard += `- [👀 ${item.title}](${item.link})\n`;
  }

  // write README.md
  const processedTemplate = stringTemplate(template, {
    goodreads: goodreads,
    pinboard: pinboard,
  });

  fs.writeFileSync("README.md", processedTemplate, {
    encoding: "utf8",
    flag: "w",
  });
})();
