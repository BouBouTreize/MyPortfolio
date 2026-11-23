(function () {
  const D = window.PORTFOLIO;
  const S = window.PORTFOLIO_SECTIONS;
  const $ = (sel) => document.querySelector(sel);

  // Échappe tout le texte venant de data.js
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // N'autorise que http(s), mailto et chemins relatifs
  const safeUrl = (u) => (/^(https?:|mailto:|[\w./%-]+$)/i.test(u) ? esc(u) : "#");
  const has = (a) => Array.isArray(a) && a.length > 0;
  const chips = (arr, cls = "") => `<div class="chips">${arr.map((t) => `<span class="chip ${cls}">${esc(t)}</span>`).join("")}</div>`;
  const ext = (u) => (/^https?:/i.test(u) ? ' target="_blank" rel="noopener noreferrer"' : "");

  const p = D.profile;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Icônes devicon (les technos absentes de la liste s'affichent sans icône)
  const ICONS = {
    "C": "c-plain", "C++": "cplusplus-plain", "Python": "python-plain", "JavaScript": "javascript-plain",
    "PHP": "php-plain", "React": "react-original", "Node.js": "nodejs-plain", "Vue.js": "vuejs-plain",
    "Unity": "unity-plain", "MySQL": "mysql-plain", "Docker": "docker-plain", "Kubernetes": "kubernetes-plain",
    "Git": "git-plain", "GitHub": "github-original", "GitHub Projects": "github-original",
    "GitKraken": "gitkraken-plain", "BitBucket": "bitbucket-original", "VSCode": "vscode-plain", "Jira": "jira-plain"
  };
  const skillChips = (arr) => `<div class="chips">${arr.map((t) =>
    `<span class="chip chip--icon">${ICONS[t] ? `<i class="devicon-${ICONS[t]}" aria-hidden="true"></i>` : `<i class="chip__dot" aria-hidden="true"></i>`}${esc(t)}</span>`).join("")}</div>`;

  /* ---------- Renderers par section ---------- */
  const renderers = {
    about() {
      if (!has(D.about)) return "";
      return `<div class="about">
        <div>${D.about.map((t) => `<p>${esc(t)}</p>`).join("")}
        </div>
        <div class="meta">
          ${has(D.qualities) ? `<h3>Qualités</h3><ul>${D.qualities.map((q) => `<li>${esc(q)}</li>`).join("")}</ul>` : ""}
          ${has(D.languages) ? `<h3>Langues</h3><ul>${D.languages.map((l) => `<li>${esc(l.name)}<small>${esc(l.level)}</small></li>`).join("")}</ul>` : ""}
        </div>
      </div>`;
    },
    skills() {
      if (!has(D.skills)) return "";
      return `<div class="skills">${D.skills.filter((g) => has(g.items)).map((g) =>
        `<div class="skills__row"><div class="skills__cat">${esc(g.category)}</div>${skillChips(g.items)}</div>`).join("")}</div>`;
    },
    projects() {
      if (!has(D.projects)) return "";
      return `<div class="cards">${D.projects.map((x) => `
        <article class="card">
          ${x.image ? `<img src="${safeUrl(x.image)}" alt="Aperçu du projet ${esc(x.name)}" loading="lazy">` : `<div class="card__cover" aria-hidden="true"><b>${esc(x.name)}</b></div>`}
          <div class="card__body"><div class="card__top"><h3 class="card__title">${esc(x.name)}</h3>${x.year ? `<span class="card__year">${esc(x.year)}</span>` : ""}</div>
          <p class="card__desc">${esc(x.description)}</p>
          ${has(x.tags) ? chips(x.tags, "chip--sm") : ""}
          ${has(x.links) ? `<div class="card__links">${x.links.map((l) => `<a href="${safeUrl(l.url)}"${ext(l.url)}>${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
          </div></article>`).join("")}</div>`;
    },
    experience() {
      if (!has(D.experiences)) return "";
      return `<div class="timeline">${D.experiences.map((e) => `
        <div class="tl">
          <div class="tl__when">${esc(e.period)}${e.duration ? `<small>${esc(e.duration)}</small>` : ""}</div>
          <div class="tl__body">
            <h3>${esc(e.role)} — ${esc(e.company)}</h3>
            <div class="tl__sub">${esc(e.place)}</div>
            ${has(e.points) ? `<ul>${e.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
            ${has(e.tags) ? chips(e.tags, "chip--sm") : ""}
          </div>
        </div>`).join("")}</div>`;
    },
    education() {
      if (!has(D.education)) return "";
      return `<div class="timeline">${D.education.map((e) => `
        <div class="tl">
          <div class="tl__when">${esc(e.period)}</div>
          <div class="tl__body"><h3>${esc(e.school)}</h3><p>${esc(e.description)}</p></div>
        </div>`).join("")}</div>`;
    },
    extras() {
      if (!has(D.extras)) return "";
      return `<div class="grid-list">${D.extras.map((x) =>
        `<div class="extra"><b>${esc(x.title)}</b>${x.description ? `<span>${esc(x.description)}</span>` : ""}</div>`).join("")}</div>`;
    },
    contact() {
      const links = (p.links || []).map((l) => `<a class="btn" href="${safeUrl(l.url)}"${ext(l.url)}>${esc(l.label)} ↗</a>`).join("");
      return `<div class="contact">
        ${p.search && p.search.active ? `<p>${esc(p.search.detail)}</p>` : ""}
        <a class="contact__mail" href="mailto:${esc(p.email)}">${esc(p.email)}</a>
        ${p.phone ? `<br><a class="contact__mail contact__phone" href="tel:${esc(p.phone.replace(/\s/g, ""))}">${esc(p.phone)}</a>` : ""}
        <div class="contact__links">${links}</div>
      </div>`;
    }
  };

  /* ---------- Hero ---------- */
  document.title = `${p.firstName} ${p.lastName} — ${p.title}`;
  $("#brand").textContent = `${p.firstName} ${p.lastName}`;
  const letters = (t, off = 0) => [...t].map((c, i) => `<i style="--i:${i + off}">${esc(c)}</i>`).join("");
  $("#hero").innerHTML = `<div class="wrap hero__grid">
    <div>
      ${p.search && p.search.active ? `<div class="hero__badge">${esc(p.search.label)}</div>` : ""}
      <h1 class="hero__name" aria-label="${esc(p.firstName)} ${esc(p.lastName)}"><span aria-hidden="true">${letters(p.firstName)}</span><span aria-hidden="true">${letters(p.lastName, [...p.firstName].length)}</span></h1>
      <p class="hero__title"><span id="typed">${esc(p.title)}</span><span class="caret"></span></p>
      <p class="hero__lead">${esc((D.about && D.about[0]) || "")}</p>
      <div class="hero__cta">
        <a class="btn btn--solid" href="#contact">Me contacter</a>
        ${p.cv ? `<a class="btn" href="${safeUrl(encodeURI(p.cv))}" download>Télécharger mon CV</a>` : ""}
      </div>
    </div>
    ${p.photo ? `<div class="hero__frame"><div class="hero__photo"><img src="${safeUrl(p.photo)}" alt="Portrait de ${esc(p.firstName)} ${esc(p.lastName)}"></div><span class="hero__tag hero__tag--a">C++</span><span class="hero__tag hero__tag--b">Epitech</span></div>` : ""}
  </div>`;
  $("#marquee").innerHTML = (D.skills || []).length ? `<div class="marquee__track">${[0, 1].map(() =>
    D.skills.flatMap((g) => g.items).map((t) => `<span>${esc(t)}</span>`).join("")).join("")}</div>` : "";

  /* ---------- Sections + nav ---------- */
  const visible = S.filter((s) => renderers[s.id] && renderers[s.id]());
  $("#nav").innerHTML = visible.map((s) => `<a href="#${s.id}">${esc(s.title)}</a>`).join("");
  $("#sections").innerHTML = visible.map((s) => `
    <section class="section" id="${s.id}">
      <div class="wrap">
        <div class="section__head"><h2 class="section__title">${esc(s.title)}</h2></div>
        ${renderers[s.id]()}
      </div>
    </section>`).join("");

  $("#footer").textContent = `© ${new Date().getFullYear()} ${p.firstName} ${p.lastName}`;

  /* ---------- Effet machine à écrire ---------- */
  const typed = $("#typed");
  if (typed && has(p.roles) && !reduce) {
    let r = 0, c = 0, del = false;
    const tick = () => {
      const word = p.roles[r];
      c += del ? -1 : 1;
      typed.textContent = word.slice(0, c);
      let wait = del ? 35 : 75;
      if (!del && c === word.length) { del = true; wait = 1600; }
      else if (del && c === 0) { del = false; r = (r + 1) % p.roles.length; wait = 350; }
      setTimeout(tick, wait);
    };
    typed.textContent = ""; tick();
  }

  /* ---------- Barre de progression + lien actif ---------- */
  const bar = $("#progress");
  const links = [...document.querySelectorAll(".nav__links a")];
  const onScroll = () => {
    const h = document.documentElement;
    bar.style.transform = `scaleX(${h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1)})`;
    let cur = "";
    visible.forEach((s) => { const el = document.getElementById(s.id); if (el && el.getBoundingClientRect().top < 140) cur = s.id; });
    links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + cur));
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Thème ---------- */
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
  $("#theme").addEventListener("click", () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });
})();
