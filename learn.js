"use strict";

const newsGrid = document.getElementById("news-grid");
const newsStatus = document.getElementById("news-status");
const filterButtons = document.querySelectorAll(".news-filter");

let stories = [];
let activeCategory = "All";

function safeHttpsUrl(value) {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function createStoryCard(story) {
  const article = document.createElement("article");
  article.className = "news-card";

  const meta = document.createElement("div");
  meta.className = "news-meta";

  const category = document.createElement("span");
  category.className = "news-category";
  category.textContent = story.category || "News";

  const source = document.createElement("span");
  source.className = "news-source";
  source.textContent = story.source || "Source";

  meta.append(category, source);

  const heading = document.createElement("h2");
  heading.className = "news-title";
  heading.textContent = story.title || "Untitled story";

  const summary = document.createElement("p");
  summary.className = "news-summary";
  summary.textContent =
    story.summary || "Read the original story for more information.";

  const bottom = document.createElement("div");
  bottom.className = "news-bottom";

  const date = document.createElement("time");
  date.className = "news-date";

  const formattedDate = formatDate(story.published);

  if (formattedDate) {
    date.textContent = formattedDate;
    date.dateTime = story.published;
  }

  const link = document.createElement("a");
  link.className = "news-link";
  link.textContent = "Read original ↗";
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const destination = safeHttpsUrl(story.url);

  if (destination) {
    link.href = destination;
  } else {
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
  }

  bottom.append(date, link);
  article.append(meta, heading, summary, bottom);

  return article;
}

function renderStories() {
  const visibleStories =
    activeCategory === "All"
      ? stories
      : stories.filter(
          story => story.category === activeCategory
        );

  const fragment = document.createDocumentFragment();

  visibleStories.forEach(story => {
    fragment.appendChild(createStoryCard(story));
  });

  newsGrid.replaceChildren(fragment);

  if (visibleStories.length === 0) {
    newsStatus.textContent =
      "No stories are available in this category right now.";
    newsStatus.hidden = false;
  } else {
    newsStatus.hidden = true;
  }
}

function setCategory(category) {
  activeCategory = category;

  filterButtons.forEach(button => {
    const isActive = button.dataset.category === category;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderStories();
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.category);
  });
});

async function loadStories() {
  try {
    const response = await fetch("news.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Unable to load news feed.");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid news feed.");
    }

    stories = data
      .filter(story => {
        return (
          story &&
          typeof story.title === "string" &&
          typeof story.category === "string" &&
          typeof story.url === "string"
        );
      })
      .sort((a, b) => {
        return (
          new Date(b.published).getTime() -
          new Date(a.published).getTime()
        );
      });

    renderStories();
  } catch (error) {
    console.error("NOVLIRI Learn:", error);

    newsGrid.replaceChildren();

    newsStatus.textContent =
      "Current stories are temporarily unavailable. Please try again later.";

    newsStatus.hidden = false;
  }
}

setCategory("All");
loadStories();
