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
      const term = [
        ["whoami", `${p.firstName.toLowerCase()}-${p.lastName.toLowerCase()}`],
        has(D.education) ? ["cat formation.txt", `${D.education[0].school.split(" — ")[0]} · ${D.education[0].period}`] : null,
        has(D.skills) ? ["ls skills/", D.skills.flatMap((g) => g.items).slice(0, 5).join("  ") + " …"] : null,
        p.search && p.search.active ? ["./recherche --stage", p.search.label] : null
      ].filter(Boolean);
      return `<div class="about">
        <div>${D.about.map((t) => `<p>${esc(t)}</p>`).join("")}
          <div class="term" role="img" aria-label="Résumé en style terminal">
            <div class="term__bar"><i></i><i></i><i></i><span>~/portfolio</span></div>
            <div class="term__body">${term.map(([c, o]) => `<div><b>$</b> ${esc(c)}</div><div class="term__out">${esc(o)}</div>`).join("")}<div><b>$</b> <span class="caret"></span></div></div>
          </div>
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
      return `<div class="cards">${D.projects.map((x, i) => `
        <article class="card">
          ${x.image ? `<img src="${safeUrl(x.image)}" alt="Aperçu du projet ${esc(x.name)}" loading="lazy">` : `<div class="card__cover" aria-hidden="true"><span>${String(i + 1).padStart(2, "0")}</span><code>${esc(x.name.slice(0, 2))}</code></div>`}
          <div class="card__top"><h3 class="card__title">${esc(x.name)}</h3>${x.year ? `<span class="card__year">${esc(x.year)}</span>` : ""}</div>
          <p class="card__desc">${esc(x.description)}</p>
          ${has(x.tags) ? chips(x.tags, "chip--sm") : ""}
          ${has(x.links) ? `<div class="card__links">${x.links.map((l) => `<a href="${safeUrl(l.url)}"${ext(l.url)}>${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
        </article>`).join("")}</div>`;
    },
    experience() {
      if (!has(D.experiences)) return "";
      return `<div class="timeline">${D.experiences.map((e) => `
        <div class="tl">
          <div class="tl__when">${esc(e.period)}${e.duration ? `<small>${esc(e.duration)}</small>` : ""}</div>
          <div>
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
          <div><h3>${esc(e.school)}</h3><p>${esc(e.description)}</p></div>
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
  $("#hero").innerHTML = `<div class="wrap hero__grid">
    <div>
      ${p.search && p.search.active ? `<div class="hero__badge"><i></i>${esc(p.search.label)}</div>` : ""}
      <h1 class="hero__name"><span>${esc(p.firstName)}</span>${esc(p.lastName)}</h1>
      <p class="hero__title"><span class="hero__prompt">&gt;</span> <span id="typed">${esc(p.title)}</span><span class="caret"></span></p>
      <p class="hero__lead">${esc((D.about && D.about[0]) || "")}</p>
      <div class="hero__cta">
        <a class="btn btn--solid" href="#contact">Me contacter</a>
        ${p.cv ? `<a class="btn" href="${safeUrl(encodeURI(p.cv))}" download>Télécharger mon CV</a>` : ""}
      </div>
    </div>
    ${p.photo ? `<div class="hero__frame"><div class="hero__photo"><img src="${safeUrl(p.photo)}" alt="Portrait de ${esc(p.firstName)} ${esc(p.lastName)}"></div><span class="hero__tag hero__tag--a">&lt;/&gt; C++</span><span class="hero__tag hero__tag--b">Epitech</span></div>` : ""}
  </div>
  <div class="wrap stats">
    ${[
      [(D.projects || []).length, "Projets"],
      [new Set((D.skills || []).flatMap((g) => g.items)).size, "Technologies"],
      [(D.extras || []).length, "Hackathons, jams & +"],
      [(D.experiences || []).length, "Expérience pro"]
    ].filter((s) => s[0]).map(([n, l]) => `<div class="stat"><b data-count="${n}">${n}</b><span>${esc(l)}</span></div>`).join("")}
  </div>
  ${(D.skills || []).length ? `<div class="marquee" aria-hidden="true"><div class="marquee__track">${[0, 1].map(() =>
    (D.skills).flatMap((g) => g.items).map((t) => `<span>${esc(t)}</span>`).join("")).join("")}</div></div>` : ""}`;

  /* ---------- Sections + nav ---------- */
  const visible = S.filter((s) => renderers[s.id] && renderers[s.id]());
  $("#nav").innerHTML = visible.map((s) => `<a href="#${s.id}">${esc(s.title)}</a>`).join("");
  $("#sections").innerHTML = visible.map((s, i) => `
    <section class="section reveal" id="${s.id}">
      <div class="wrap">
        <div class="section__head">
          <span class="section__num">${String(i + 1).padStart(2, "0")}</span>
          <h2 class="section__title">${esc(s.title)}</h2>
          <span class="section__rule"></span>
        </div>
        ${renderers[s.id]()}
      </div>
    </section>`).join("");

  $("#footer").textContent = `© ${new Date().getFullYear()} ${p.firstName} ${p.lastName}`;

  /* ---------- Apparition au scroll ---------- */
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add("in"));

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

  /* ---------- Compteurs animés ---------- */
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = +el.dataset.count;
    if (reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min((t - t0) / 900, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    el.textContent = "0"; io.observe(el);
  });

  /* ---------- Spotlight sur les cartes ---------- */
  document.querySelectorAll(".card, .extra").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

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
