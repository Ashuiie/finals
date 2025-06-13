// REMINDER: RUN WITH: npm run nodemon-server

import express, { json } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(json());
app.use(cors());

// REGULAR SCRAPER (Static sites)
app.post("/scrape", async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const websiteName = new URL(url).hostname.replace("www.", "");
    const articles = [];

    $("h1, h2, h3").each((i, element) => {
      const title = $(element).text().trim();
      let link =
        $(element).find("a").attr("href") ||
        $(element).closest("a").attr("href");
      const absoluteLink = link ? new URL(link, url).href : null;

      const parent = $(element).closest("article, div, section");

      let author =
        parent.find('[itemprop="author"], [rel="author"]').text().trim() ||
        parent
          .find(".author a, .byline a, .writer a, .contributor a")
          .first()
          .text()
          .trim() ||
        parent
          .find(".author, .byline, .writer, .contributor")
          .first()
          .text()
          .trim();

      if (!author || author === "Unknown") {
        author =
          $('[itemprop="author"], [rel="author"]').first().text().trim() ||
          $(".author a, .byline a, .writer a, .contributor a")
            .first()
            .text()
            .trim() ||
          $(".author, .byline, .writer, .contributor").first().text().trim() ||
          "Unknown";
      }

      let date =
        parent.find("time").attr("datetime") ||
        parent.find("time").text().trim() ||
        parent.find(".date, .published, .pubdate").first().text().trim();

      if (!date || date === "Unknown" || date === "") {
        date =
          $("time").attr("datetime") ||
          $("time").text().trim() ||
          $(".date, .published, .pubdate").first().text().trim() ||
          $('meta[property="article:published_time"]').attr("content") ||
          $('meta[name="pubdate"]').attr("content") ||
          $('meta[name="date"]').attr("content") ||
          "Unknown";
      }

      const relevance =
        parent.find(".tag, .label, .category, .badge").first().text().trim() ||
        "None";

      if (title && absoluteLink) {
        articles.push({
          title,
          author,
          date,
          link: absoluteLink,
          source: websiteName,
          relevance,
        });
      }
    });

    res.json(articles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error scraping the website." });
  }
});

// NEW: GMA Network scraper (static)
app.get("/scrape/gmanetwork", async (req, res) => {
  const url = "https://www.gmanetwork.com/news/";
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const websiteName = new URL(url).hostname.replace("www.", "");
    const articles = [];

    $("h1, h2, h3").each((i, element) => {
      const title = $(element).text().trim();
      let link =
        $(element).find("a").attr("href") ||
        $(element).closest("a").attr("href");
      const absoluteLink = link ? new URL(link, url).href : null;

      const parent = $(element).closest("article, div, section");

      const author =
        parent.find('[itemprop="author"]').text().trim() ||
        parent.find('[rel="author"]').text().trim() ||
        parent
          .find(".author, .byline, .writer, .contributor")
          .first()
          .text()
          .trim() ||
        "Unknown";

      const date =
        parent.find("time").attr("datetime") ||
        parent.find("time").text().trim() ||
        parent.find(".date, .published, .pubdate").first().text().trim() ||
        "Unknown";

      const relevance =
        parent.find(".tag, .label, .category, .badge").first().text().trim() ||
        "None";

      if (title && absoluteLink) {
        articles.push({
          title,
          author,
          date,
          link: absoluteLink,
          source: websiteName,
          relevance,
        });
      }
    });

    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error scraping GMA Network." });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
