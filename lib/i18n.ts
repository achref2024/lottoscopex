export type Lang = "en" | "fr" | "de";

export const DEFAULT_LANG: Lang = "en";

export const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" },
];

export const LOCALE_MAP: Record<Lang, string> = {
  en: "en-GB",
  fr: "fr-FR",
  de: "de-DE",
};

/**
 * Builds the URL for `path` (e.g. "/", "/lottery/euromillions") in the given
 * language. The default language is unprefixed ("/lottery/x"); other
 * languages get a leading segment ("/fr/lottery/x").
 */
export function localePath(lang: Lang, path: string): string {
  const clean = path === "/" ? "" : path;
  return lang === DEFAULT_LANG ? clean || "/" : `/${lang}${clean}`;
}

/** Strips a known locale prefix ("/fr", "/de") from a pathname, if present. */
export function stripLocalePrefix(pathname: string): string {
  const match = pathname.match(/^\/(fr|de)(\/.*)?$/);
  if (match) return match[2] || "/";
  return pathname;
}

export interface Dictionary {
  nav: {
    lotteries: string;
    howItWorks: string;
    generator: string;
    pill: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    tagFrequency: string;
    tagHotCold: string;
    tagRanges: string;
    tagProbability: string;
    drawsAnalyzed: string;
  };
  features: {
    heading: string;
    subheading: string;
    frequencyTitle: string;
    frequencyDesc: string;
    hotColdTitle: string;
    hotColdDesc: string;
    rangesTitle: string;
    rangesDesc: string;
    probabilityTitle: string;
    probabilityDesc: string;
    viewStats: string;
  };
  chooseLottery: {
    heading: string;
    subheading: string;
  };
  card: {
    lastDraw: string;
    jackpot: string;
    nextDraw: string;
    typicalJackpot: string;
    jackpotAsOf: string; // "as of {date}"
  };
  drawCard: {
    latestDraw: string;
    draw: string;
    jackpotSuffix: string;
  };
  recentDraws: {
    heading: string;
  };
  tabs: {
    latest: string;
    history: string;
    frequency: string;
    hotCold: string;
    ranges: string;
    probability: string;
    compare: string;
  };
  glance: {
    heading: string;
    numbersDrawn: string;
    numbersDrawnValue: string; // "{count} from {min}–{max}"
    drawsTracked: string;
    oldestDraw: string;
    nextDraw: string;
    typicalJackpot: string;
    jackpotAsOf: string; // "as of {date}"
  };
  frequencyPanel: {
    heading: string;
    subheading: string; // "How often each number appeared across the last {n} draws."
  };
  chart: {
    numberLabel: string; // "Number {n}"
    appeared: string;
    draws: string;
  };
  hotCold: {
    hotTitle: string;
    hotDesc: string;
    coldTitle: string;
    coldDesc: string;
  };
  ranges: {
    shareOf: string;
    perDraw: string; // "~{n} numbers per draw"
  };
  probability: {
    intro: string; // "For each number range, we looked at every pair of draws in our last {n} recorded draws..."
    rangeLabel: string;
    trendUp: string;
    trendDown: string;
    trendStable: string;
    trendComeback: string;
    barMore: string;
    barSame: string;
    barFewer: string;
    headlineIncrease: string; // "{label} tends to show up more the next time — that happened {pct}% of the time."
    headlineDecrease: string;
    headlineStable: string;
    headlineComeback: string;
  };
  compare: {
    intro: string;
    heatingUp: string;
    coolingDown: string;
    description: string;
  };
  history: {
    from: string;
    to: string;
    containsNumber: string;
    placeholder: string;
    clearFilters: string;
    drawsFoundOne: string;
    drawsFoundMany: string;
    noMatch: string;
    loadMore: string;
  };
  footer: {
    disclaimer: string;
    copyright: string; // "© {year} LottoScopeX. Play responsibly."
    about: string;
    privacy: string;
    terms: string;
    contact: string;
  };
  lotteries: Record<
    string,
    { country: string; tagline: string }
  >;
  faq: {
    drawCountQuestion: string; // "How many {name} draws does LottoScopeX analyze?"
    drawCountAnswer: string; // "LottoScopeX tracks {count} real {name} draws, from {oldest} to {latest}..."
    hotNumbersQuestion: string; // "What are the hot numbers in {name} right now?"
    hotNumbersAnswer: string; // "Based on the last {n} draws, the most frequently drawn {name} numbers are {numbers}."
    jackpotQuestion: string; // "What is the jackpot for the next {name} draw?"
    jackpotAnswer: string; // "The estimated jackpot for the next {name} draw is {amount}, as of {date}."
  };
  seo: {
    homeTitle: string;
    homeDescription: string;
    lotteryTitle: string; // "{name} Statistics — Number Frequency, Hot & Cold Numbers"
    lotteryDescription: string; // "Explore {count} real {name} draws ({country})..."
  };
  generator: {
    heading: string;
    subheading: string;
    disclaimer: string;
    selectLabel: string;
    mainNumbersLabel: string;
    generateButton: string;
    regenerateButton: string;
  };
}

const en: Dictionary = {
  nav: {
    lotteries: "Results",
    howItWorks: "How it works",
    generator: "Number Generator",
    pill: "Real stats · No predictions",
  },
  hero: {
    badge: "Statistics & patterns · 7 lotteries across Europe & the US",
    titleLine1: "Lottery statistics,",
    titleLine2: "made visual.",
    subtitle:
      "LottoScopeX turns real draw history into bold, visual statistics — frequencies, hot & cold numbers, ranges, and simple probability patterns. No predictions, no guesswork. Just the numbers.",
    tagFrequency: "Frequency stats",
    tagHotCold: "Hot & cold numbers",
    tagRanges: "Range analysis",
    tagProbability: "Probability patterns",
    drawsAnalyzed: "Recent draws analyzed, per lottery",
  },
  features: {
    heading: "What you can do with LottoScopeX",
    subheading:
      "Every lottery on the platform gives you the same statistics and pattern-analysis toolkit, built for clarity over complexity.",
    frequencyTitle: "Frequency analysis",
    frequencyDesc: "See exactly how often every number has appeared, at a glance.",
    hotColdTitle: "Hot & cold numbers",
    hotColdDesc: "Spot which numbers have been running hot — and which have gone quiet.",
    rangesTitle: "Range analysis",
    rangesDesc: "Understand how numbers are spread across 1–9, 10–19, 20–29, 30–39 and 40+.",
    probabilityTitle: "Probability patterns",
    probabilityDesc: "Our signature feature: plain-language insight into what tends to happen next.",
    viewStats: "View live stats",
  },
  chooseLottery: {
    heading: "Choose a lottery",
    subheading: "Consistent analytics, tailored to each game.",
  },
  card: {
    lastDraw: "Last draw",
    jackpot: "Jackpot",
    nextDraw: "Next draw",
    typicalJackpot: "Next jackpot",
    jackpotAsOf: "as of {date}",
  },
  drawCard: {
    latestDraw: "Latest draw",
    draw: "Draw",
    jackpotSuffix: "jackpot",
  },
  recentDraws: {
    heading: "Recent draws",
  },
  tabs: {
    latest: "Latest",
    history: "History",
    frequency: "Frequency",
    hotCold: "Hot & Cold",
    ranges: "Ranges",
    probability: "Probability",
    compare: "Compare",
  },
  glance: {
    heading: "At a glance",
    numbersDrawn: "Numbers drawn",
    numbersDrawnValue: "{count} from {min}–{max}",
    drawsTracked: "Draws tracked",
    oldestDraw: "Oldest draw on file",
    nextDraw: "Next draw",
    typicalJackpot: "Next jackpot",
    jackpotAsOf: "as of {date}",
  },
  frequencyPanel: {
    heading: "Number frequency",
    subheading: "How often each number appeared across the last {n} draws.",
  },
  chart: {
    numberLabel: "Number {n}",
    appeared: "Appeared",
    draws: "draws",
  },
  hotCold: {
    hotTitle: "Hot numbers",
    hotDesc: "Drawn most often in the selected period.",
    coldTitle: "Cold numbers",
    coldDesc: "Drawn least often in the selected period.",
  },
  ranges: {
    shareOf: "of all drawn numbers",
    perDraw: "~{n} numbers per draw",
  },
  probability: {
    intro:
      "For each number range, we looked at every pair of draws in our last {n} recorded draws and checked what usually happens next. No jargon — just plain patterns you can skim in seconds.",
    rangeLabel: "Range",
    trendUp: "Trending up",
    trendDown: "Trending down",
    trendStable: "Stays steady",
    trendComeback: "Bounces back",
    barMore: "More numbers next draw",
    barSame: "Same amount next draw",
    barFewer: "Fewer numbers next draw",
    headlineIncrease:
      "After a draw, {label} tends to show up more the next time — that happened {pct}% of the time.",
    headlineDecrease:
      "{label} tends to cool off afterward — fewer numbers from this range appeared next draw {pct}% of the time.",
    headlineStable:
      "{label} tends to stay steady — the same amount of numbers showed up again {pct}% of the time.",
    headlineComeback:
      "When {label} is missing from a draw, it usually bounces back — it reappeared in the very next draw {pct}% of the time.",
  },
  compare: {
    intro:
      "We compare how often each number showed up in the last 20 draws against its long-term average across the last 100 draws. Numbers appearing noticeably more often lately show up on the left as \"heating up\"; numbers appearing noticeably less often show up on the right as \"cooling down\". This is a snapshot of recent activity, not a forecast — each draw is independent and random.",
    heatingUp: "Heating up recently",
    coolingDown: "Cooling down recently",
    description: "Compared to our recorded draws, based on the most recent 20.",
  },
  history: {
    from: "From",
    to: "To",
    containsNumber: "Contains number",
    placeholder: "e.g. 23",
    clearFilters: "Clear filters",
    drawsFoundOne: "draw found",
    drawsFoundMany: "draws found",
    noMatch: "No draws match those filters.",
    loadMore: "Load more draws",
  },
  footer: {
    disclaimer:
      "LottoScopeX is an analytics tool for exploring historical lottery data. It does not predict future results — lottery draws are random.",
    copyright: "© {year} LottoScopeX. Play responsibly.",
    about: "About",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    contact: "Contact",
  },
  lotteries: {
    euromillions: { country: "Pan-European", tagline: "Europe's biggest jackpot lottery" },
    eurojackpot: { country: "Pan-European", tagline: "Europe's favourite Friday & Tuesday draw" },
    lotto6aus49: { country: "Germany", tagline: "Germany's classic Saturday lottery" },
    "loto-france": { country: "France", tagline: "France's national lottery tradition" },
    "irish-lotto": { country: "Ireland", tagline: "Ireland's home-grown favourite" },
    powerball: { country: "United States", tagline: "America's biggest jackpot lottery" },
    megamillions: { country: "United States", tagline: "America's other giant jackpot draw" },
  },
  faq: {
    drawCountQuestion: "How many {name} draws does LottoScopeX analyze?",
    drawCountAnswer:
      "LottoScopeX tracks {count} real {name} draws, from {oldest} to {latest}. The signature probability feature is based on the last 100 of these draws.",
    hotNumbersQuestion: "What are the hot numbers in {name} right now?",
    hotNumbersAnswer:
      "Based on the last {n} draws, the most frequently drawn {name} numbers are {numbers}.",
    jackpotQuestion: "What is the jackpot for the next {name} draw?",
    jackpotAnswer:
      "The estimated jackpot for the next {name} draw is {amount}, as of {date}.",
  },
  seo: {
    homeTitle: "LottoScopeX — Lottery Analytics",
    homeDescription:
      "Explore historical lottery data from EuroMillions, EuroJackpot, Lotto 6aus49, French Loto, Irish Lotto, Powerball and Mega Millions through simple, interactive statistics.",
    lotteryTitle: "{name} Statistics — Number Frequency, Hot & Cold Numbers",
    lotteryDescription:
      "Explore {count} real {name} draws ({country}). Number frequency, hot & cold numbers, range analysis and probability patterns based on the last 100 draws — updated with genuine historical results, not predictions.",
  },
  generator: {
    heading: "Number Generator",
    subheading: "Pick a lottery and get a random set of numbers to play.",
    disclaimer:
      "Purely random — this doesn't use any statistics and doesn't improve your chances of winning. Lottery draws are random, every time.",
    selectLabel: "Choose a lottery",
    mainNumbersLabel: "Your numbers",
    generateButton: "Generate numbers",
    regenerateButton: "Generate again",
  },
};

const fr: Dictionary = {
  nav: {
    lotteries: "Résultats",
    howItWorks: "Comment ça marche",
    generator: "Générateur de numéros",
    pill: "Statistiques réelles · Aucune prédiction",
  },
  hero: {
    badge: "Statistiques & tendances · 7 loteries en Europe et aux États-Unis",
    titleLine1: "Statistiques de loterie,",
    titleLine2: "rendues visuelles.",
    subtitle:
      "LottoScopeX transforme l'historique réel des tirages en statistiques visuelles claires — fréquences, numéros chauds et froids, répartition par plage, et tendances de probabilité simples. Aucune prédiction, aucune conjecture. Juste les chiffres.",
    tagFrequency: "Statistiques de fréquence",
    tagHotCold: "Numéros chauds et froids",
    tagRanges: "Analyse par plage",
    tagProbability: "Tendances de probabilité",
    drawsAnalyzed: "Tirages récents analysés, par loterie",
  },
  features: {
    heading: "Ce que vous pouvez faire avec LottoScopeX",
    subheading:
      "Chaque loterie de la plateforme propose les mêmes outils de statistiques et d'analyse de tendances, pensés pour la clarté avant tout.",
    frequencyTitle: "Analyse de fréquence",
    frequencyDesc: "Voyez en un coup d'œil à quelle fréquence chaque numéro est sorti.",
    hotColdTitle: "Numéros chauds et froids",
    hotColdDesc: "Repérez les numéros qui sortent souvent — et ceux qui se font rares.",
    rangesTitle: "Analyse par plage",
    rangesDesc: "Comprenez comment les numéros se répartissent entre 1–9, 10–19, 20–29, 30–39 et 40+.",
    probabilityTitle: "Tendances de probabilité",
    probabilityDesc: "Notre fonctionnalité phare : une explication simple de ce qui se passe généralement ensuite.",
    viewStats: "Voir les statistiques",
  },
  chooseLottery: {
    heading: "Choisissez une loterie",
    subheading: "Des analyses cohérentes, adaptées à chaque jeu.",
  },
  card: {
    lastDraw: "Dernier tirage",
    jackpot: "Jackpot",
    nextDraw: "Prochain tirage",
    typicalJackpot: "Prochain jackpot",
    jackpotAsOf: "au {date}",
  },
  drawCard: {
    latestDraw: "Dernier tirage",
    draw: "Tirage",
    jackpotSuffix: "de jackpot",
  },
  recentDraws: {
    heading: "Tirages récents",
  },
  tabs: {
    latest: "Dernier tirage",
    history: "Historique",
    frequency: "Fréquence",
    hotCold: "Chauds & froids",
    ranges: "Plages",
    probability: "Probabilité",
    compare: "Comparer",
  },
  glance: {
    heading: "En un coup d'œil",
    numbersDrawn: "Numéros tirés",
    numbersDrawnValue: "{count} parmi {min}–{max}",
    drawsTracked: "Tirages suivis",
    oldestDraw: "Tirage le plus ancien enregistré",
    nextDraw: "Prochain tirage",
    typicalJackpot: "Prochain jackpot",
    jackpotAsOf: "au {date}",
  },
  frequencyPanel: {
    heading: "Fréquence des numéros",
    subheading: "Fréquence d'apparition de chaque numéro sur les {n} derniers tirages.",
  },
  chart: {
    numberLabel: "Numéro {n}",
    appeared: "Apparitions",
    draws: "tirages",
  },
  hotCold: {
    hotTitle: "Numéros chauds",
    hotDesc: "Les plus souvent tirés sur la période sélectionnée.",
    coldTitle: "Numéros froids",
    coldDesc: "Les moins souvent tirés sur la période sélectionnée.",
  },
  ranges: {
    shareOf: "de tous les numéros tirés",
    perDraw: "~{n} numéros par tirage",
  },
  probability: {
    intro:
      "Pour chaque plage de numéros, nous avons examiné chaque paire de tirages parmi nos {n} derniers tirages enregistrés pour voir ce qui se passe généralement ensuite. Sans jargon — juste des tendances simples à lire en quelques secondes.",
    rangeLabel: "Plage",
    trendUp: "En hausse",
    trendDown: "En baisse",
    trendStable: "Stable",
    trendComeback: "Fait son retour",
    barMore: "Plus de numéros au tirage suivant",
    barSame: "Même quantité au tirage suivant",
    barFewer: "Moins de numéros au tirage suivant",
    headlineIncrease:
      "Après un tirage, la plage {label} a tendance à revenir plus fortement la fois suivante — c'est arrivé {pct}% du temps.",
    headlineDecrease:
      "La plage {label} a tendance à se calmer ensuite — moins de numéros de cette plage sont apparus au tirage suivant {pct}% du temps.",
    headlineStable:
      "La plage {label} a tendance à rester stable — la même quantité de numéros est réapparue {pct}% du temps.",
    headlineComeback:
      "Quand la plage {label} est absente d'un tirage, elle fait généralement son retour — elle est réapparue dès le tirage suivant {pct}% du temps.",
  },
  compare: {
    intro:
      "Nous comparons la fréquence d'apparition de chaque numéro sur les 20 derniers tirages à sa moyenne de long terme calculée sur les 100 derniers tirages. Les numéros apparaissant nettement plus souvent récemment s'affichent à gauche, « en hausse » ; ceux apparaissant nettement moins souvent s'affichent à droite, « en baisse ». Il s'agit d'un instantané de l'activité récente, pas d'une prévision — chaque tirage est indépendant et aléatoire.",
    heatingUp: "En hausse récemment",
    coolingDown: "En baisse récemment",
    description: "Comparé à nos tirages enregistrés, basé sur les 20 plus récents.",
  },
  history: {
    from: "Du",
    to: "Au",
    containsNumber: "Contient le numéro",
    placeholder: "ex. 23",
    clearFilters: "Effacer les filtres",
    drawsFoundOne: "tirage trouvé",
    drawsFoundMany: "tirages trouvés",
    noMatch: "Aucun tirage ne correspond à ces filtres.",
    loadMore: "Voir plus de tirages",
  },
  footer: {
    disclaimer:
      "LottoScopeX est un outil d'analyse pour explorer l'historique des tirages de loterie. Il ne prédit pas les résultats futurs — les tirages de loterie sont aléatoires.",
    copyright: "© {year} LottoScopeX. Jouez de manière responsable.",
    about: "À propos",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    contact: "Contact",
  },
  lotteries: {
    euromillions: { country: "Paneuropéen", tagline: "La plus grande loterie à jackpot d'Europe" },
    eurojackpot: { country: "Paneuropéen", tagline: "Le tirage du vendredi et mardi préféré des Européens" },
    lotto6aus49: { country: "Allemagne", tagline: "La loterie classique du samedi en Allemagne" },
    "loto-france": { country: "France", tagline: "La tradition de la loterie nationale française" },
    "irish-lotto": { country: "Irlande", tagline: "La favorite irlandaise de toujours" },
    powerball: { country: "États-Unis", tagline: "La plus grande loterie à jackpot des États-Unis" },
    megamillions: { country: "États-Unis", tagline: "L'autre immense tirage à jackpot américain" },
  },
  faq: {
    drawCountQuestion: "Combien de tirages {name} LottoScopeX analyse-t-il ?",
    drawCountAnswer:
      "LottoScopeX suit {count} tirages {name} réels, du {oldest} au {latest}. La fonctionnalité de probabilité s'appuie sur les 100 derniers de ces tirages.",
    hotNumbersQuestion: "Quels sont les numéros chauds du {name} en ce moment ?",
    hotNumbersAnswer:
      "Sur la base des {n} derniers tirages, les numéros {name} les plus fréquemment tirés sont {numbers}.",
    jackpotQuestion: "Quel est le jackpot du prochain tirage {name} ?",
    jackpotAnswer:
      "Le jackpot estimé du prochain tirage {name} est de {amount}, au {date}.",
  },
  seo: {
    homeTitle: "LottoScopeX — Analyse de loteries",
    homeDescription:
      "Explorez l'historique des tirages d'EuroMillions, EuroJackpot, Loto 6aus49, Loto français, Irish Lotto, Powerball et Mega Millions grâce à des statistiques simples et interactives.",
    lotteryTitle: "Statistiques {name} — Fréquence des numéros, numéros chauds et froids",
    lotteryDescription:
      "Explorez {count} tirages {name} réels ({country}). Fréquence des numéros, numéros chauds et froids, analyse par plage et tendances de probabilité basées sur les 100 derniers tirages — des résultats historiques authentiques, pas des prédictions.",
  },
  generator: {
    heading: "Générateur de numéros",
    subheading: "Choisissez une loterie et obtenez une sélection aléatoire de numéros à jouer.",
    disclaimer:
      "Entièrement aléatoire — cet outil n'utilise aucune statistique et n'améliore pas vos chances de gagner. Les tirages de loterie sont aléatoires, à chaque fois.",
    selectLabel: "Choisir une loterie",
    mainNumbersLabel: "Vos numéros",
    generateButton: "Générer des numéros",
    regenerateButton: "Générer à nouveau",
  },
};

const de: Dictionary = {
  nav: {
    lotteries: "Ergebnisse",
    howItWorks: "So funktioniert's",
    generator: "Zahlengenerator",
    pill: "Echte Statistiken · Keine Vorhersagen",
  },
  hero: {
    badge: "Statistiken & Muster · 7 Lotterien in Europa und den USA",
    titleLine1: "Lotteriestatistiken,",
    titleLine2: "sichtbar gemacht.",
    subtitle:
      "LottoScopeX verwandelt echte Ziehungshistorien in klare, visuelle Statistiken — Häufigkeiten, heiße und kalte Zahlen, Zahlenbereiche und einfache Wahrscheinlichkeitsmuster. Keine Vorhersagen, kein Raten. Nur die Zahlen.",
    tagFrequency: "Häufigkeitsstatistik",
    tagHotCold: "Heiße & kalte Zahlen",
    tagRanges: "Bereichsanalyse",
    tagProbability: "Wahrscheinlichkeitsmuster",
    drawsAnalyzed: "Aktuelle Ziehungen analysiert, pro Lotterie",
  },
  features: {
    heading: "Das kannst du mit LottoScopeX tun",
    subheading:
      "Jede Lotterie auf der Plattform bietet dieselben Statistik- und Musteranalyse-Werkzeuge — für maximale Klarheit statt Komplexität.",
    frequencyTitle: "Häufigkeitsanalyse",
    frequencyDesc: "Sieh auf einen Blick, wie oft jede Zahl gezogen wurde.",
    hotColdTitle: "Heiße & kalte Zahlen",
    hotColdDesc: "Erkenne, welche Zahlen zuletzt oft fielen — und welche kaum.",
    rangesTitle: "Bereichsanalyse",
    rangesDesc: "Verstehe, wie sich Zahlen auf 1–9, 10–19, 20–29, 30–39 und 40+ verteilen.",
    probabilityTitle: "Wahrscheinlichkeitsmuster",
    probabilityDesc: "Unser Hauptfeature: verständliche Einblicke, was danach meist passiert.",
    viewStats: "Live-Statistiken ansehen",
  },
  chooseLottery: {
    heading: "Lotterie auswählen",
    subheading: "Einheitliche Analysen, abgestimmt auf jedes Spiel.",
  },
  card: {
    lastDraw: "Letzte Ziehung",
    jackpot: "Jackpot",
    nextDraw: "Nächste Ziehung",
    typicalJackpot: "Nächster Jackpot",
    jackpotAsOf: "Stand {date}",
  },
  drawCard: {
    latestDraw: "Letzte Ziehung",
    draw: "Ziehung",
    jackpotSuffix: "Jackpot",
  },
  recentDraws: {
    heading: "Letzte Ziehungen",
  },
  tabs: {
    latest: "Aktuell",
    history: "Verlauf",
    frequency: "Häufigkeit",
    hotCold: "Heiß & Kalt",
    ranges: "Bereiche",
    probability: "Wahrscheinlichkeit",
    compare: "Vergleich",
  },
  glance: {
    heading: "Auf einen Blick",
    numbersDrawn: "Gezogene Zahlen",
    numbersDrawnValue: "{count} von {min}–{max}",
    drawsTracked: "Erfasste Ziehungen",
    oldestDraw: "Älteste erfasste Ziehung",
    nextDraw: "Nächste Ziehung",
    typicalJackpot: "Nächster Jackpot",
    jackpotAsOf: "Stand {date}",
  },
  frequencyPanel: {
    heading: "Zahlenhäufigkeit",
    subheading: "Wie oft jede Zahl in den letzten {n} Ziehungen erschien.",
  },
  chart: {
    numberLabel: "Zahl {n}",
    appeared: "Erschienen",
    draws: "Ziehungen",
  },
  hotCold: {
    hotTitle: "Heiße Zahlen",
    hotDesc: "Im gewählten Zeitraum am häufigsten gezogen.",
    coldTitle: "Kalte Zahlen",
    coldDesc: "Im gewählten Zeitraum am seltensten gezogen.",
  },
  ranges: {
    shareOf: "aller gezogenen Zahlen",
    perDraw: "~{n} Zahlen pro Ziehung",
  },
  probability: {
    intro:
      "Für jeden Zahlenbereich haben wir jedes Ziehungspaar der letzten {n} erfassten Ziehungen untersucht und geschaut, was danach meist passiert. Kein Fachjargon — nur einfache Muster, die man in Sekunden erfasst.",
    rangeLabel: "Bereich",
    trendUp: "Steigender Trend",
    trendDown: "Fallender Trend",
    trendStable: "Bleibt stabil",
    trendComeback: "Kommt zurück",
    barMore: "Mehr Zahlen bei der nächsten Ziehung",
    barSame: "Gleiche Anzahl bei der nächsten Ziehung",
    barFewer: "Weniger Zahlen bei der nächsten Ziehung",
    headlineIncrease:
      "Nach einer Ziehung taucht der Bereich {label} beim nächsten Mal meist stärker auf — das geschah in {pct}% der Fälle.",
    headlineDecrease:
      "Der Bereich {label} kühlt danach meist ab — weniger Zahlen aus diesem Bereich erschienen in {pct}% der Fälle bei der nächsten Ziehung.",
    headlineStable:
      "Der Bereich {label} bleibt meist stabil — die gleiche Anzahl an Zahlen erschien in {pct}% der Fälle erneut.",
    headlineComeback:
      "Fehlt der Bereich {label} bei einer Ziehung, kommt er meist zurück — er erschien in {pct}% der Fälle direkt bei der nächsten Ziehung wieder.",
  },
  compare: {
    intro:
      "Wir vergleichen, wie oft jede Zahl in den letzten 20 Ziehungen aufgetaucht ist, mit ihrem langfristigen Durchschnitt über die letzten 100 Ziehungen. Zahlen, die zuletzt deutlich häufiger vorkamen, erscheinen links als „im Aufwind\"; Zahlen, die deutlich seltener vorkamen, erscheinen rechts als „abgekühlt\". Das ist eine Momentaufnahme der jüngsten Aktivität, keine Vorhersage — jede Ziehung ist unabhängig und zufällig.",
    heatingUp: "Zuletzt im Aufwind",
    coolingDown: "Zuletzt abgekühlt",
    description: "Verglichen mit unseren erfassten Ziehungen, basierend auf den letzten 20.",
  },
  history: {
    from: "Von",
    to: "Bis",
    containsNumber: "Enthält Zahl",
    placeholder: "z. B. 23",
    clearFilters: "Filter zurücksetzen",
    drawsFoundOne: "Ziehung gefunden",
    drawsFoundMany: "Ziehungen gefunden",
    noMatch: "Keine Ziehungen entsprechen diesen Filtern.",
    loadMore: "Weitere Ziehungen laden",
  },
  footer: {
    disclaimer:
      "LottoScopeX ist ein Analysetool zur Erkundung historischer Lotteriedaten. Es sagt keine zukünftigen Ergebnisse voraus — Lotterieziehungen sind zufällig.",
    copyright: "© {year} LottoScopeX. Bitte verantwortungsvoll spielen.",
    about: "Über uns",
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
    contact: "Kontakt",
  },
  lotteries: {
    euromillions: { country: "Paneuropäisch", tagline: "Europas größte Jackpot-Lotterie" },
    eurojackpot: { country: "Paneuropäisch", tagline: "Europas beliebte Dienstag- und Freitagsziehung" },
    lotto6aus49: { country: "Deutschland", tagline: "Deutschlands klassische Samstagslotterie" },
    "loto-france": { country: "Frankreich", tagline: "Die Tradition der französischen Nationallotterie" },
    "irish-lotto": { country: "Irland", tagline: "Irlands hauseigener Favorit" },
    powerball: { country: "Vereinigte Staaten", tagline: "Amerikas größte Jackpot-Lotterie" },
    megamillions: { country: "Vereinigte Staaten", tagline: "Amerikas andere riesige Jackpot-Ziehung" },
  },
  faq: {
    drawCountQuestion: "Wie viele {name}-Ziehungen analysiert LottoScopeX?",
    drawCountAnswer:
      "LottoScopeX erfasst {count} echte {name}-Ziehungen, vom {oldest} bis {latest}. Die Wahrscheinlichkeits-Funktion basiert auf den letzten 100 dieser Ziehungen.",
    hotNumbersQuestion: "Welche Zahlen sind bei {name} gerade heiß?",
    hotNumbersAnswer:
      "Basierend auf den letzten {n} Ziehungen sind die am häufigsten gezogenen {name}-Zahlen {numbers}.",
    jackpotQuestion: "Wie hoch ist der Jackpot bei der nächsten {name}-Ziehung?",
    jackpotAnswer:
      "Der geschätzte Jackpot für die nächste {name}-Ziehung beträgt {amount}, Stand {date}.",
  },
  seo: {
    homeTitle: "LottoScopeX — Lotterie-Analyse",
    homeDescription:
      "Entdecke historische Lotteriedaten von EuroMillions, EuroJackpot, Lotto 6aus49, Loto (Frankreich), Irish Lotto, Powerball und Mega Millions durch einfache, interaktive Statistiken.",
    lotteryTitle: "{name} Statistiken — Zahlenhäufigkeit, heiße & kalte Zahlen",
    lotteryDescription:
      "Entdecke {count} echte {name}-Ziehungen ({country}). Zahlenhäufigkeit, heiße & kalte Zahlen, Bereichsanalyse und Wahrscheinlichkeitsmuster basierend auf den letzten 100 Ziehungen — echte historische Ergebnisse, keine Vorhersagen.",
  },
  generator: {
    heading: "Zahlengenerator",
    subheading: "Wähle eine Lotterie und erhalte eine zufällige Zahlenauswahl zum Spielen.",
    disclaimer:
      "Rein zufällig — dieses Tool nutzt keine Statistiken und verbessert nicht deine Gewinnchancen. Lotterieziehungen sind jedes Mal zufällig.",
    selectLabel: "Lotterie wählen",
    mainNumbersLabel: "Deine Zahlen",
    generateButton: "Zahlen generieren",
    regenerateButton: "Erneut generieren",
  },
};

export const DICTIONARIES: Record<Lang, Dictionary> = { en, fr, de };

export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}
