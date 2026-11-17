/* ==========================================================================
   DONNÉES DU PORTFOLIO
   --------------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour mettre à jour le site.
   - Ajouter un élément  : copier un bloc { ... } dans la liste et l'adapter.
   - Ajouter une section : ajouter une clé dans `sections` (voir en bas).
   - Masquer une section : laisser sa liste vide [].
   ========================================================================== */

window.PORTFOLIO = {

  /* ---------- Identité ---------- */
  profile: {
    firstName: "Théo",
    lastName: "Vitte",
    title: "Développeur Logiciel / Web",
    // Phrases qui défilent sous le nom (effet machine à écrire)
    roles: ["Développeur Logiciel", "Développeur Web", "Passionné de C++", "Étudiant à Epitech"],
    photo: "assets/img/photo.jpg",
    location: "Aix / Marseille / Toulon",
    email: "vittetheo22@gmail.com",
    // Recherche en cours : mets `active: false` pour masquer le bandeau
    search: {
      active: true,
      label: "Stage de 6 mois · de mars à juillet",
      detail: "Étudiant à Epitech, je recherche un stage de 6 mois de mars à juillet."
    },
    // Remplace les "#" par tes vrais liens
    links: [
      { label: "GitHub",   url: "https://github.com/BouBouTreize" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/th%C3%A9o-vitte-52045a345/" }
    ],
    cv: "Vitte Théo.pdf" // fichier téléchargeable ; "" pour masquer le bouton
  },

  /* ---------- Présentation ---------- */
  about: [
    "Étudiant en informatique, je recherche une expérience en entreprise pour renforcer mes compétences et acquérir une expérience concrète du monde professionnel.",
    "Intéressé par plusieurs domaines de l'informatique, j'ai une préférence pour le développement en C++."
  ],
  qualities: ["Créatif", "Aisance à l'oral", "Curiosité"],
  languages: [
    { name: "Anglais", level: "B2" }
  ],

  /* ---------- Compétences (groupées par catégorie) ---------- */
  skills: [
    {
      category: "Langages",
      items: ["C", "C++", "Python", "JavaScript", "PHP"]
    },
    {
      category: "Frameworks & moteurs",
      items: ["React", "Node.js", "Vue.js", "Unity", "SFML"]
    },
    {
      category: "Bases de données",
      items: ["MySQL"]
    },
    {
      category: "DevOps & outils",
      items: ["Docker", "Kubernetes", "Makefile", "Git", "GitHub", "GitHub Projects", "GitKraken", "BitBucket"]
    },
    {
      category: "Environnement & gestion de projet",
      items: ["VSCode", "Jira", "Teams"]
    }
  ],

  /* ---------- Projets ----------
     image : "assets/img/mon-projet.png" (optionnel)
     links : [{ label, url }] (optionnel)  */
  projects: [
    {
      name: "Raytracer",
      year: "",
      description: "Simulation d'environnement 3D avec gestion des lumières, réalisée from scratch en SFML.",
      tags: ["C++", "SFML", "3D"],
      image: "assets/img/raytracer.png",
      links: []
    },
    {
      name: "R-Type",
      year: "",
      description: "Game engine modulaire en C++ pour un jeu de type R-Type.",
      tags: ["C++", "Game Engine"],
      image: "assets/img/rtype.png",
      links: []
    },
    {
      name: "WOLF3D",
      year: "",
      description: "Création d'un jeu FPS en raycasting type Wolfenstein en CSFML : apprentissage d'un langage graphique et du game design.",
      tags: ["C", "CSFML", "Raycasting"],
      image: "assets/img/wolf3d.png",
      links: []
    },
    {
      name: "Zappy",
      year: "",
      description: "Jeu en réseau confrontant des modèles d'IA, avec gestion de l'interface graphique, serveur et Machine Learning.",
      tags: ["Réseau", "IA", "Serveur", "GUI"],
      image: "assets/img/zappy.png",
      links: []
    },
    {
      name: "Arcade",
      year: "",
      description: "Programme qui lance des bibliothèques dynamiques de jeux et de graphismes.",
      tags: ["C++", "Bibliothèques dynamiques"],
      image: "",
      links: []
    },
    {
      name: "myPGP",
      year: "",
      description: "Projet de cryptographie : réimplémentation en Python des systèmes de chiffrement AES, XOR, PGP AES et PGP XOR.",
      tags: ["Python", "Cryptographie", "AES", "XOR", "PGP"],
      image: "assets/img/mypgp.jpg",
      links: []
    },
    {
      name: "Dashboard",
      year: "",
      description: "Site de dashboard qui se connecte à des API pour afficher de nombreuses informations sur plusieurs comptes. Front en React, back en Node.js.",
      tags: ["React", "Node.js", "API"],
      image: "assets/img/dashboard.png",
      links: []
    }
  ],

  /* ---------- Expériences ---------- */
  experiences: [
    {
      role: "Développeur Web",
      company: "QuickMS",
      place: "Marseille World Trade Center",
      period: "2025",
      duration: "Stage · 4 mois",
      points: [
        "PHP et JavaScript (Vue.js)",
        "MySQL"
      ],
      tags: ["PHP", "Vue.js", "MySQL", "GitKraken", "Jira", "BitBucket"]
    }
  ],

  /* ---------- Formation ---------- */
  education: [
    {
      school: "Epitech Marseille",
      period: "2024 – 2029",
      description: "3ème année, diplôme EPITECH Programme Grande École BAC +5 en cours d'obtention (Titre RNCP 7)."
    },
    {
      school: "Lycée St Jean de Garguier — Gémenos",
      period: "2023",
      description: "Baccalauréat, spécialités anglais / S.E.S."
    }
  ],

  /* ---------- Les + (hackathons, keynotes, engagement…) ---------- */
  extras: [
    { title: "1ère place Hackathon", description: "Webapp casino." },
    { title: "Keynotes", description: "Developer, hackathons…" },
    { title: "GameJams Epitech", description: "" },
    { title: "Accompagnement de jeunes", description: "Aide à ceux qui veulent découvrir l'informatique." }
  ]
};

/* ==========================================================================
   SECTIONS : ordre d'affichage + titres. Pour une nouvelle section :
   1) ajoute ta liste dans PORTFOLIO (ex: `certifications: [...]`)
   2) ajoute une ligne ici avec un `render` parmi : "cards", "timeline", "list"
   ========================================================================== */
window.PORTFOLIO_SECTIONS = [
  { id: "about",      title: "À propos" },
  { id: "skills",     title: "Compétences" },
  { id: "projects",   title: "Projets" },
  { id: "experience", title: "Expérience" },
  { id: "education",  title: "Formation" },
  { id: "extras",     title: "Les +" },
  { id: "contact",    title: "Contact" }
];
