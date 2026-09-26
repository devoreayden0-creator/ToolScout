const tools = [
  // AI & AUTOMATION
  {
    name: "ChatGPT",
    cat: "AI & Automation",
    needs: ["AI", "Writing", "Research", "Education", "Coding"],
    desc: "AI assistant for writing, studying, brainstorming, coding, analysis, and more.",
    price: "Free option",
    url: "https://chatgpt.com/",
    featured: true
  },
  {
    name: "Claude",
    cat: "AI & Automation",
    needs: ["AI", "Writing", "Research", "Coding"],
    desc: "AI assistant for writing, analysis, research, coding, and working with documents.",
    price: "View options",
    url: "https://claude.ai/",
    featured: true
  },
  {
    name: "Perplexity",
    cat: "AI & Automation",
    needs: ["AI", "Research", "Education"],
    desc: "AI-powered answer engine for researching topics with cited web sources.",
    price: "Free option",
    url: "https://www.perplexity.ai/",
    featured: true
  },
  {
    name: "Gemini",
    cat: "AI & Automation",
    needs: ["AI", "Writing", "Research"],
    desc: "Google's AI assistant for research, writing, ideas, and everyday tasks.",
    price: "View options",
    url: "https://gemini.google.com/"
  },
  {
    name: "Zapier",
    cat: "AI & Automation",
    needs: ["AI", "Automation", "Business", "Productivity"],
    desc: "Automate repetitive work by connecting apps and building workflows.",
    price: "View options",
    url: "https://zapier.com/",
    featured: true
  },
  {
    name: "Make",
    cat: "AI & Automation",
    needs: ["Automation", "Business", "Productivity"],
    desc: "Visual automation platform for connecting apps and building workflows.",
    price: "View options",
    url: "https://www.make.com/"
  },

  // EDUCATION & LEARNING
  {
    name: "Khan Academy",
    cat: "Education",
    needs: ["Education", "Students", "Math", "Science", "Test Prep"],
    desc: "Lessons, videos, and practice exercises across math, science, computing, and more.",
    price: "Free",
    url: "https://www.khanacademy.org/",
    featured: true
  },
  {
    name: "Quizlet",
    cat: "Education",
    needs: ["Education", "Students", "Studying"],
    desc: "Study tools for flashcards, practice activities, and learning.",
    price: "View options",
    url: "https://quizlet.com/"
  },
  {
    name: "Coursera",
    cat: "Education",
    needs: ["Education", "Courses", "Career"],
    desc: "Online courses and learning programs from universities and organizations.",
    price: "View options",
    url: "https://www.coursera.org/"
  },
  {
    name: "Duolingo",
    cat: "Education",
    needs: ["Education", "Languages", "Students"],
    desc: "Interactive lessons for learning languages through short daily activities.",
    price: "View options",
    url: "https://www.duolingo.com/"
  },
  {
    name: "Wolfram Alpha",
    cat: "Education",
    needs: ["Education", "Math", "Research"],
    desc: "Computational knowledge engine for mathematics, science, data, and research.",
    price: "View options",
    url: "https://www.wolframalpha.com/"
  },

  // PRODUCTIVITY
  {
    name: "Notion",
    cat: "Productivity",
    needs: ["Productivity", "Notes", "Projects", "Business"],
    desc: "Workspace for notes, documents, projects, databases, and team knowledge.",
    price: "View options",
    url: "https://www.notion.so/",
    featured: true
  },
  {
    name: "Trello",
    cat: "Productivity",
    needs: ["Productivity", "Projects", "Business"],
    desc: "Visual boards for organizing projects, workflows, and tasks.",
    price: "View options",
    url: "https://trello.com/"
  },
  {
    name: "ClickUp",
    cat: "Productivity",
    needs: ["Productivity", "Projects", "Business"],
    desc: "Project management platform combining tasks, documents, and collaboration.",
    price: "View options",
    url: "https://clickup.com/"
  },
  {
    name: "Todoist",
    cat: "Productivity",
    needs: ["Productivity", "Tasks", "Organization"],
    desc: "Task manager for organizing personal and professional work.",
    price: "View options",
    url: "https://todoist.com/"
  },
  {
    name: "Evernote",
    cat: "Productivity",
    needs: ["Productivity", "Notes", "Organization"],
    desc: "Note-taking and organization software for capturing information and ideas.",
    price: "View options",
    url: "https://evernote.com/"
  },
  {
    name: "Calendly",
    cat: "Productivity",
    needs: ["Productivity", "Scheduling", "Business"],
    desc: "Scheduling software for booking meetings without back-and-forth messages.",
    price: "View options",
    url: "https://calendly.com/"
  },
  {
    name: "Airtable",
    cat: "Productivity",
    needs: ["Productivity", "Database", "Business", "Projects"],
    desc: "Flexible platform for organizing data, projects, workflows, and operations.",
    price: "View options",
    url: "https://www.airtable.com/"
  },
  {
    name: "Asana",
    cat: "Productivity",
    needs: ["Productivity", "Projects", "Teams", "Business"],
    desc: "Work management platform for coordinating projects, tasks, and teams.",
    price: "View options",
    url: "https://asana.com/"
  },
  {
    name: "monday.com",
    cat: "Productivity",
    needs: ["Productivity", "Projects", "Business", "Teams"],
    desc: "Work management platform for projects, processes, and team collaboration.",
    price: "View options",
    url: "https://monday.com/"
  },

  // BUSINESS & SALES
  {
    name: "HubSpot",
    cat: "Business",
    needs: ["Business", "CRM", "Sales", "Marketing"],
    desc: "CRM platform with tools for marketing, sales, customer service, and operations.",
    price: "View options",
    url: "https://www.hubspot.com/",
    featured: true
  },
  {
    name: "Salesforce",
    cat: "Business",
    needs: ["Business", "CRM", "Sales"],
    desc: "Customer relationship management platform for sales and business operations.",
    price: "View options",
    url: "https://www.salesforce.com/"
  },
  {
    name: "Shopify",
    cat: "Business",
    needs: ["Business", "Ecommerce", "Selling"],
    desc: "Commerce platform for creating and managing online stores.",
    price: "View options",
    url: "https://www.shopify.com/"
  },
  {
    name: "QuickBooks",
    cat: "Business",
    needs: ["Business", "Accounting", "Finance"],
    desc: "Accounting software for invoices, expenses, bookkeeping, and business finances.",
    price: "View options",
    url: "https://quickbooks.intuit.com/"
  },
  {
    name: "FreshBooks",
    cat: "Business",
    needs: ["Business", "Accounting", "Freelance"],
    desc: "Accounting and invoicing software designed for businesses and professionals.",
    price: "View options",
    url: "https://www.freshbooks.com/"
  },
  {
    name: "Typeform",
    cat: "Business",
    needs: ["Business", "Forms", "Surveys", "Marketing"],
    desc: "Create interactive forms, surveys, quizzes, and lead-generation experiences.",
    price: "View options",
    url: "https://www.typeform.com/"
  },
  {
    name: "SurveyMonkey",
    cat: "Business",
    needs: ["Business", "Surveys", "Research"],
    desc: "Online survey platform for collecting feedback and conducting research.",
    price: "View options",
    url: "https://www.surveymonkey.com/"
  },

  // MARKETING & SOCIAL
  {
    name: "Mailchimp",
    cat: "Marketing",
    needs: ["Marketing", "Email", "Business"],
    desc: "Email marketing and audience tools for businesses and creators.",
    price: "View options",
    url: "https://mailchimp.com/"
  },
  {
    name: "Buffer",
    cat: "Marketing",
    needs: ["Marketing", "Social Media", "Creators"],
    desc: "Plan, schedule, and publish social media content across multiple platforms.",
    price: "View options",
    url: "https://buffer.com/"
  },
  {
    name: "Hootsuite",
    cat: "Marketing",
    needs: ["Marketing", "Social Media", "Business"],
    desc: "Social media management software for publishing, monitoring, and analytics.",
    price: "View options",
    url: "https://www.hootsuite.com/"
  },
  {
    name: "Brevo",
    cat: "Marketing",
    needs: ["Marketing", "Email", "Business"],
    desc: "Marketing and customer communication platform with email and automation tools.",
    price: "View options",
    url: "https://www.brevo.com/"
  },
  {
    name: "Kit",
    cat: "Marketing",
    needs: ["Marketing", "Email", "Creators"],
    desc: "Email marketing platform designed for creators and online businesses.",
    price: "View options",
    url: "https://kit.com/"
  },

  // DESIGN & CREATIVE
  {
    name: "Canva",
    cat: "Design & Creative",
    needs: ["Design", "Creators", "Marketing", "Presentations"],
    desc: "Create graphics, presentations, social content, videos, and other visual designs.",
    price: "View options",
    url: "https://www.canva.com/",
    featured: true
  },
  {
    name: "Figma",
    cat: "Design & Creative",
    needs: ["Design", "UI", "UX", "Teams"],
    desc: "Collaborative interface design and prototyping platform.",
    price: "View options",
    url: "https://www.figma.com/",
    featured: true
  },
  {
    name: "Adobe Express",
    cat: "Design & Creative",
    needs: ["Design", "Creators", "Marketing"],
    desc: "Create graphics, social content, videos, and other visual assets.",
    price: "View options",
    url: "https://www.adobe.com/express/"
  },
  {
    name: "Unsplash",
    cat: "Design & Creative",
    needs: ["Design", "Photos", "Creators"],
    desc: "Image library for finding photography for creative projects.",
    price: "View options",
    url: "https://unsplash.com/"
  },
  {
    name: "Descript",
    cat: "Design & Creative",
    needs: ["Creators", "Video", "Audio", "AI"],
    desc: "Audio and video editing platform with transcription-based editing tools.",
    price: "View options",
    url: "https://www.descript.com/"
  },
  {
    name: "Webflow",
    cat: "Design & Creative",
    needs: ["Design", "Websites", "Business"],
    desc: "Visual website building and content management platform.",
    price: "View options",
    url: "https://webflow.com/"
  },
  {
    name: "Wix",
    cat: "Design & Creative",
    needs: ["Websites", "Business", "Design"],
    desc: "Website builder for creating and managing websites and online businesses.",
    price: "View options",
    url: "https://www.wix.com/"
  },
  {
    name: "Squarespace",
    cat: "Design & Creative",
    needs: ["Websites", "Business", "Creators"],
    desc: "Website platform for portfolios, businesses, stores, and creator sites.",
    price: "View options",
    url: "https://www.squarespace.com/"
  },

  // COMMUNICATION & COLLABORATION
  {
    name: "Slack",
    cat: "Communication",
    needs: ["Communication", "Teams", "Business"],
    desc: "Team communication platform organized around channels and workplace collaboration.",
    price: "View options",
    url: "https://slack.com/"
  },
  {
    name: "Zoom",
    cat: "Communication",
    needs: ["Communication", "Meetings", "Education", "Business"],
    desc: "Video communications platform for meetings, collaboration, and virtual events.",
    price: "View options",
    url: "https://www.zoom.com/"
  },
  {
    name: "Microsoft Teams",
    cat: "Communication",
    needs: ["Communication", "Teams", "Business", "Education"],
    desc: "Workplace communication and collaboration platform from Microsoft.",
    price: "View options",
    url: "https://www.microsoft.com/microsoft-teams/"
  },
  {
    name: "Loom",
    cat: "Communication",
    needs: ["Communication", "Video", "Business", "Education"],
    desc: "Record and share screen and camera videos for asynchronous communication.",
    price: "View options",
    url: "https://www.loom.com/"
  },
  {
    name: "Miro",
    cat: "Communication",
    needs: ["Collaboration", "Design", "Teams", "Education"],
    desc: "Visual collaboration workspace for brainstorming, planning, and diagrams.",
    price: "View options",
    url: "https://miro.com/"
  },
  {
    name: "Dropbox",
    cat: "Communication",
    needs: ["Storage", "Files", "Teams", "Productivity"],
    desc: "Cloud storage and file-sharing platform for individuals and teams.",
    price: "View options",
    url: "https://www.dropbox.com/"
  },
  {
    name: "Google Workspace",
    cat: "Communication",
    needs: ["Business", "Education", "Documents", "Communication"],
    desc: "Google's collection of productivity and collaboration applications.",
    price: "View options",
    url: "https://workspace.google.com/"
  },
  {
    name: "Microsoft 365",
    cat: "Communication",
    needs: ["Business", "Education", "Documents", "Productivity"],
    desc: "Microsoft productivity suite for documents, spreadsheets, presentations, and collaboration.",
    price: "View options",
    url: "https://www.microsoft.com/microsoft-365/"
  },

  // DEVELOPER TOOLS
  {
    name: "GitHub",
    cat: "Developer",
    needs: ["Coding", "Developer", "Collaboration"],
    desc: "Platform for hosting code, version control, collaboration, and software projects.",
    price: "View options",
    url: "https://github.com/",
    featured: true
  },
  {
    name: "GitLab",
    cat: "Developer",
    needs: ["Coding", "Developer", "Collaboration"],
    desc: "DevSecOps platform for source code, collaboration, and software delivery.",
    price: "View options",
    url: "https://gitlab.com/"
  },
  {
    name: "Visual Studio Code",
    cat: "Developer",
    needs: ["Coding", "Developer"],
    desc: "Code editor with extensions, debugging, source control, and development tools.",
    price: "Free",
    url: "https://code.visualstudio.com/"
  },
  {
    name: "Vercel",
    cat: "Developer",
    needs: ["Coding", "Developer", "Hosting", "Websites"],
    desc: "Cloud platform for deploying and hosting modern web applications.",
    price: "View options",
    url: "https://vercel.com/"
  },

  // WRITING
  {
    name: "Grammarly",
    cat: "Writing",
    needs: ["Writing", "Education", "Business", "AI"],
    desc: "Writing assistance for grammar, clarity, tone, and communication.",
    price: "View options",
    url: "https://www.grammarly.com/"
  }
];

const grid = document.querySelector("#toolGrid");
const search = document.querySelector("#search");
const sort = document.querySelector("#sort");
const empty = document.querySelector("#empty");
const toolCount = document.querySelector("#toolCount");

toolCount.textContent = tools.length;

function render() {
  const q = (search.value || "").toLowerCase().trim();

  let list = tools.filter(tool => {
    const searchable = [
      tool.name,
      tool.cat,
      tool.desc,
      ...(tool.needs || [])
    ].join(" ").toLowerCase();

    return !q || searchable.includes(q);
  });

  if (sort.value === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }

  grid.innerHTML = list.map(tool => `
    <article class="tool-card">
      <div class="tool-top">
        <div class="tool-icon">${tool.name.slice(0, 1)}</div>
        <span class="tag">${tool.cat}</span>
      </div>

      <h3>${tool.name}</h3>
      <p>${tool.desc}</p>

      <div class="tool-bottom">
        <span>${tool.price}</span>
        <a href="${tool.url}" target="_blank" rel="noopener sponsored">
          Visit ↗
        </a>
      </div>
    </article>
  `).join("");

  empty.hidden = list.length > 0;
}

search.addEventListener("input", render);
sort.addEventListener("change", render);

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    search.value = button.dataset.category;
    render();

    document.querySelector("#tools").scrollIntoView({
      behavior: "smooth"
    });
  });
});

render();
