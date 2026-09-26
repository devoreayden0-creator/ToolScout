"use strict";

/*
 * NOVLIRI Learn — News Feed Generator
 *
 * This script runs in GitHub Actions, retrieves approved RSS/Atom feeds,
 * validates the data, removes duplicates, categorizes stories, and writes
 * a safe static news.json file for the NOVLIRI Learn page.
 *
 * No API keys are required.
 */

const OUTPUT_FILE = "news.json";

const MAX_STORIES_TOTAL = 30;
const MAX_STORIES_PER_SOURCE = 6;
const MAX_STORY_AGE_DAYS = 14;
const REQUEST_TIMEOUT_MS = 15000;

/*
 * Approved feeds.
 *
 * Keep this list intentionally small. NOVLIRI should favor established
 * sources instead of pulling content from arbitrary websites.
 */
const FEEDS = [
  {
    name: "OpenAI",
    url: "https://openai.com/news/rss.xml",
    defaultCategory: "AI News"
  },
  {
    name: "Google DeepMind",
    url: "https://deepmind.google/blog/rss.xml",
    defaultCategory: "AI News"
  },
  {
    name: "Krebs on Security",
    url: "https://krebsonsecurity.com/feed/",
    defaultCategory: "Cybersecurity"
  }
];

/*
 * We only allow categories that exist on NOVLIRI Learn.
 */
const ALLOWED_CATEGORIES = new Set([
  "AI News",
  "AI Tools",
  "Cybersecurity",
  "Work & Productivity",
  "Business",
  "Education",
  "Guides"
]);

const CYBERSECURITY_KEYWORDS = [
  "cybersecurity",
  "security",
  "vulnerability",
  "vulnerabilities",
  "malware",
  "ransomware",
  "phishing",
  "breach",
  "breaches",
  "hacker",
  "hackers",
  "hacking",
  "exploit",
  "exploits",
  "password",
  "passwords",
  "credential",
  "credentials",
  "privacy",
  "scam",
  "scams",
  "fraud",
  "zero-day",
  "zero day"
];

const AI_TOOL_KEYWORDS = [
  "tool",
  "tools",
  "assistant",
  "agent",
  "agents",
  "app",
  "apps",
  "platform",
  "product",
  "products"
];

const EDUCATION_KEYWORDS = [
  "education",
  "student",
  "students",
  "teacher",
  "teachers",
  "school",
  "schools",
  "university",
  "universities",
  "learning",
  "classroom"
];

const BUSINESS_KEYWORDS = [
  "business",
  "businesses",
  "enterprise",
  "enterprises",
  "company",
  "companies",
  "startup",
  "startups",
  "workplace"
];

const PRODUCTIVITY_KEYWORDS = [
  "productivity",
  "workflow",
  "workflows",
  "automation",
  "automate",
  "work",
  "office"
];

function decodeEntities(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => {
      const number = Number(code);

      if (!Number.isInteger(number)) {
        return "";
      }

      return String.fromCodePoint(number);
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => {
      const number = Number.parseInt(code, 16);

      if (!Number.isInteger(number)) {
        return "";
      }

      return String.fromCodePoint(number);
    })
    .replace(/&amp;/gi, "&");
}

function stripHtml(value = "") {
  return decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanText(value = "", maxLength = 300) {
  const text = Array.from(stripHtml(value))
    .filter(character => character.codePointAt(0) !== 0)
    .join("")
    .trim();

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trim()}…`;
}

function safeHttpsUrl(value) {
  try {
    const url = new URL(decodeEntities(value).trim());

    if (url.protocol !== "https:") {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}

function extractTag(xml, tagNames) {
  for (const tagName of tagNames) {
    const escaped = tagName.replace(":", "\\:");

    const match = xml.match(
      new RegExp(
        `<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`,
        "i"
      )
    );

    if (match) {
      return match[1].trim();
    }
  }

  return "";
}

function extractAtomLink(entry) {
  const alternateMatch = entry.match(
    /<link\b[^>]*\brel=["']alternate["'][^>]*\bhref=["']([^"']+)["'][^>]*\/?>/i
  );

  if (alternateMatch) {
    return alternateMatch[1];
  }

  const hrefMatch = entry.match(
    /<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\/?>/i
  );

  if (hrefMatch) {
    return hrefMatch[1];
  }

  return extractTag(entry, ["link"]);
}

function extractEntries(xml) {
  const entries = [];

  const itemRegex = /<item\b[\s\S]*?<\/item>/gi;
  const entryRegex = /<entry\b[\s\S]*?<\/entry>/gi;

  entries.push(...(xml.match(itemRegex) || []));
  entries.push(...(xml.match(entryRegex) || []));

  return entries;
}

function parseDate(value) {
  const date = new Date(stripHtml(value));

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function isRecent(date) {
  const age = Date.now() - date.getTime();
  const maximumAge =
    MAX_STORY_AGE_DAYS * 24 * 60 * 60 * 1000;

  /*
   * Allow a small amount of clock skew for feeds whose servers are
   * slightly ahead of GitHub's runner clock.
   */
  const futureTolerance = 6 * 60 * 60 * 1000;

  return age <= maximumAge && age >= -futureTolerance;
}

function containsKeyword(text, keywords) {
  const normalized = text.toLowerCase();

  return keywords.some(keyword =>
    normalized.includes(keyword.toLowerCase())
  );
}

function categorizeStory(title, description, defaultCategory) {
  const text = `${title} ${description}`;

  if (containsKeyword(text, CYBERSECURITY_KEYWORDS)) {
    return "Cybersecurity";
  }

  if (containsKeyword(text, EDUCATION_KEYWORDS)) {
    return "Education";
  }

  if (containsKeyword(text, BUSINESS_KEYWORDS)) {
    return "Business";
  }

  if (containsKeyword(text, PRODUCTIVITY_KEYWORDS)) {
    return "Work & Productivity";
  }

  if (
    defaultCategory === "AI News" &&
    containsKeyword(text, AI_TOOL_KEYWORDS)
  ) {
    return "AI Tools";
  }

  if (ALLOWED_CATEGORIES.has(defaultCategory)) {
    return defaultCategory;
  }

  return "AI News";
}

function makeSummary(source, category) {
  const summaries = {
    "AI News":
      `A recent artificial intelligence development reported by ${source}. Open the original source for the complete report.`,

    "AI Tools":
      `A recent AI tool or product development from ${source}. Visit the original source to learn what was announced and how it works.`,

    "Cybersecurity":
      `A recent cybersecurity development reported by ${source}. Read the original report for technical details and recommended actions.`,

    "Work & Productivity":
      `A recent development involving AI, work, automation, or productivity from ${source}. Read the original source for full details.`,

    "Business":
      `A recent AI or technology business development from ${source}. Open the original report for the complete context.`,

    "Education":
      `A recent development involving AI, technology, or education from ${source}. Read the original source for additional details.`,

    "Guides":
      `A practical technology resource from ${source}. Open the original source for the complete guide.`
  };

  return summaries[category] || summaries["AI News"];
}

function normalizeStory(entry, feed) {
  const title = cleanText(
    extractTag(entry, ["title"]),
    180
  );

  const rawDescription = extractTag(entry, [
    "description",
    "summary",
    "content:encoded",
    "content"
  ]);

  const description = cleanText(rawDescription, 500);

  const rawUrl = extractAtomLink(entry);
  const url = safeHttpsUrl(rawUrl);

  const rawDate = extractTag(entry, [
    "pubDate",
    "published",
    "updated",
    "dc:date"
  ]);

  const publishedDate = parseDate(rawDate);

  if (!title || !url || !publishedDate) {
    return null;
  }

  if (!isRecent(publishedDate)) {
    return null;
  }

  const category = categorizeStory(
    title,
    description,
    feed.defaultCategory
  );

  return {
    title,
    summary: makeSummary(feed.name, category),
    category,
    source: feed.name,
    published: publishedDate.toISOString(),
    url
  };
}

async function fetchFeed(feed) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    console.log(`Fetching ${feed.name}...`);

    const response = await fetch(feed.url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "NOVLIRI-Learn/1.0 (+https://novliri.com/)",
        Accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml"
      }
    });

    if (!response.ok) {
      throw new Error(
        `${feed.name} returned HTTP ${response.status}`
      );
    }

    const contentType =
      response.headers.get("content-type") || "";

    if (
      !contentType.includes("xml") &&
      !contentType.includes("rss") &&
      !contentType.includes("atom") &&
      !contentType.includes("text")
    ) {
      throw new Error(
        `${feed.name} returned an unexpected content type`
      );
    }

    const xml = await response.text();

    if (xml.length > 5_000_000) {
      throw new Error(
        `${feed.name} feed exceeded the size limit`
      );
    }

    const entries = extractEntries(xml);

    console.log(
      `${feed.name}: found ${entries.length} feed entries`
    );

    return entries
      .map(entry => normalizeStory(entry, feed))
      .filter(Boolean);
  } catch (error) {
    console.error(
      `Unable to retrieve ${feed.name}:`,
      error.message
    );

    /*
     * One broken publisher should not stop the entire NOVLIRI feed.
     */
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

function deduplicateStories(stories) {
  const seenUrls = new Set();
  const seenTitles = new Set();
  const unique = [];

  for (const story of stories) {
    const normalizedTitle = story.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

    if (
      seenUrls.has(story.url) ||
      seenTitles.has(normalizedTitle)
    ) {
      continue;
    }

    seenUrls.add(story.url);
    seenTitles.add(normalizedTitle);

    unique.push(story);
  }

  return unique;
}

function limitSources(stories) {
  const sourceCounts = new Map();
  const selected = [];

  for (const story of stories) {
    const current =
      sourceCounts.get(story.source) || 0;

    if (current >= MAX_STORIES_PER_SOURCE) {
      continue;
    }

    sourceCounts.set(story.source, current + 1);
    selected.push(story);

    if (selected.length >= MAX_STORIES_TOTAL) {
      break;
    }
  }

  return selected;
}

async function loadExistingNovliriContent() {
  try {
    const text = await Deno.readTextFile(OUTPUT_FILE);
    const existing = JSON.parse(text);

    if (!Array.isArray(existing)) {
      return [];
    }

    /*
     * Preserve NOVLIRI's own educational/tool/guide cards.
     * Automated publisher stories will be regenerated.
     */
    return existing.filter(story => {
      return (
        story &&
        story.source === "NOVLIRI" &&
        typeof story.title === "string" &&
        typeof story.category === "string" &&
        typeof story.url === "string" &&
        ALLOWED_CATEGORIES.has(story.category) &&
        safeHttpsUrl(story.url)
      );
    });
  } catch {
    return [];
  }
}

async function main() {
  console.log("Starting NOVLIRI Learn feed update...");

  const results = await Promise.all(
    FEEDS.map(feed => fetchFeed(feed))
  );

  const automatedStories = results
    .flat()
    .sort((a, b) => {
      return (
        new Date(b.published).getTime() -
        new Date(a.published).getTime()
      );
    });

  const uniqueStories =
    deduplicateStories(automatedStories);

  const limitedStories =
    limitSources(uniqueStories);

  const novliriContent =
    await loadExistingNovliriContent();

  const finalStories = [
    ...limitedStories,
    ...novliriContent
  ].sort((a, b) => {
    return (
      new Date(b.published).getTime() -
      new Date(a.published).getTime()
    );
  });

  if (
    limitedStories.length === 0 &&
    novliriContent.length === 0
  ) {
    throw new Error(
      "No valid stories were available. Existing news.json was not replaced."
    );
  }

  const output =
    `${JSON.stringify(finalStories, null, 2)}\n`;

  await Deno.writeTextFile(
    OUTPUT_FILE,
    output
  );

  console.log(
    `Wrote ${finalStories.length} stories to ${OUTPUT_FILE}.`
  );

  console.log(
    `${limitedStories.length} automated stories + ` +
    `${novliriContent.length} NOVLIRI stories.`
  );
}

if (import.meta.main) {
  await main();
}
