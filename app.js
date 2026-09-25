const tools = [
  {name:"Notion", cat:"Productivity", desc:"Workspace for notes, docs, projects, and team knowledge.", price:"Free plan", url:"https://www.notion.so/", featured:true},
  {name:"Canva", cat:"Design", desc:"Quickly create presentations, graphics, social posts, and more.", price:"Free plan", url:"https://www.canva.com/", featured:true},
  {name:"Zapier", cat:"AI", desc:"Automate repetitive tasks by connecting apps and workflows.", price:"Free plan", url:"https://zapier.com/", featured:true},
  {name:"Figma", cat:"Design", desc:"Collaborative design and prototyping for digital products.", price:"Free plan", url:"https://www.figma.com/", featured:true},
  {name:"Trello", cat:"Productivity", desc:"Visual boards for organizing projects and tasks.", price:"Free plan", url:"https://trello.com/"},
  {name:"HubSpot", cat:"Business", desc:"CRM and marketing tools for growing businesses.", price:"Free tools", url:"https://www.hubspot.com/"},
  {name:"Calendly", cat:"Productivity", desc:"Simple scheduling links for meetings and appointments.", price:"Free plan", url:"https://calendly.com/"},
  {name:"Mailchimp", cat:"Business", desc:"Email marketing and audience tools for creators and businesses.", price:"Free plan", url:"https://mailchimp.com/"},
  {name:"Grammarly", cat:"AI", desc:"Writing assistance for clarity, tone, and correctness.", price:"Free plan", url:"https://www.grammarly.com/"},
  {name:"Unsplash", cat:"Design", desc:"Free-to-use photo library for projects and inspiration.", price:"Free", url:"https://unsplash.com/"},
  {name:"ClickUp", cat:"Productivity", desc:"Project management, tasks, docs, and team collaboration.", price:"Free plan", url:"https://clickup.com/"},
  {name:"Buffer", cat:"Business", desc:"Plan and publish social content across multiple platforms.", price:"Free plan", url:"https://buffer.com/"}
];

const grid=document.querySelector("#toolGrid"), search=document.querySelector("#search"), sort=document.querySelector("#sort"), empty=document.querySelector("#empty");
document.querySelector("#toolCount").textContent=tools.length;

function render(){
  const q=(search.value||"").toLowerCase().trim();
  let list=tools.filter(t=>(!q || `${t.name} ${t.cat} ${t.desc}`.toLowerCase().includes(q)));
  if(sort.value==="name") list.sort((a,b)=>a.name.localeCompare(b.name));
  else list.sort((a,b)=>Number(b.featured)-Number(a.featured));
  grid.innerHTML=list.map(t=>`
    <article class="tool-card">
      <div class="tool-top"><div class="tool-icon">${t.name.slice(0,1)}</div><span class="tag">${t.cat}</span></div>
      <h3>${t.name}</h3><p>${t.desc}</p>
      <div class="tool-bottom"><span>${t.price}</span><a href="${t.url}" target="_blank" rel="noopener sponsored">Visit ↗</a></div>
    </article>`).join("");
  empty.hidden=list.length>0;
}
search.addEventListener("input",render); sort.addEventListener("change",render);
document.querySelectorAll(".category").forEach(b=>b.addEventListener("click",()=>{search.value=b.dataset.category; render(); document.querySelector("#tools").scrollIntoView({behavior:"smooth"});}));
render();