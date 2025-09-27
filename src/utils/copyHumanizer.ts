/**
 * Utility per umanizzare il copy del sito web
 * Trasforma il linguaggio commerciale in comunicazione naturale e orientata alla conversione
 */

export interface HumanizationRules {
  directReplacements: { [key: string]: string };
  commercialPatterns: { pattern: RegExp; replacement: string }[];
  introPatterns: { pattern: RegExp; replacement: string }[];
  ctoPatterns: { pattern: RegExp; replacement: string }[];
}

export const humanizationRules: HumanizationRules = {
  // Sostituzioni dirette per linguaggio più umano
  directReplacements: {
    "Trasforma il tuo corpo": "Il tuo corpo può cambiare",
    "Raggiungi i tuoi obiettivi": "Quello che vuoi ottenere",
    "Prenota ora": "Vieni a vedere",
    "Scopri di più": "Te lo spieghiamo meglio",
    "Risultati garantiti": "Risultati che funzionano",
    "Metodo rivoluzionario": "Un approccio che funziona",
    "Sistema innovativo": "Come lavoriamo noi",
    "Soluzione definitiva": "Quello che serve davvero",
    "Programma personalizzato": "Piano fatto per te",
    "Consulenza gratuita": "Prima volta gratis",
    "Offerta limitata": "Solo per poco",
    "Non perdere l'occasione": "Se ti interessa",
    "Approfitta subito": "Se decidi di iniziare",
    "Tecnologia avanzata": "Strumenti seri",
    "Centro all'avanguardia": "Palestra seria",
    "Team di professionisti": "Chi ti segue",
    "Esperti qualificati": "Persone che sanno il fatto loro",
    "Risultati straordinari": "Risultati seri",
    "Cambia la tua vita": "Cambia le cose",
    "Trasformazione completa": "Un bel cambiamento"
  },

  // Pattern per rimuovere linguaggio troppo "commerciale"
  commercialPatterns: [
    { pattern: /🚀|⚡|💪|🎯/g, replacement: "" },
    { pattern: /SCOPRI SUBITO|PRENOTA ORA|CLICCA QUI/gi, replacement: "Vedi qui" },
    { pattern: /TRASFORMA LA TUA VITA/gi, replacement: "Cambia le cose" },
    { pattern: /RISULTATI STRAORDINARI/gi, replacement: "Risultati seri" },
    { pattern: /INCREDIBILE OPPORTUNITÀ/gi, replacement: "Una bella occasione" },
    { pattern: /RIVOLUZIONARIO/gi, replacement: "Efficace" },
    { pattern: /INNOVATIVO/gi, replacement: "Diverso" },
    { pattern: /ESCLUSIVO/gi, replacement: "Particolare" },
    { pattern: /UNICO/gi, replacement: "Specifico" },
    { pattern: /MIGLIOR[EA]? IN ASSOLUTO/gi, replacement: "Tra i migliori" },
    { pattern: /GARANTITO AL 100%/gi, replacement: "Funziona davvero" },
    { pattern: /MASSIMI RISULTATI/gi, replacement: "Buoni risultati" },
    { pattern: /SUPER EFFICACE/gi, replacement: "Efficace" },
    { pattern: /ULTRA POTENTE/gi, replacement: "Potente" }
  ],

  // Introduzioni più naturali e umane
  introPatterns: [
    { pattern: /^Se stai cercando di (.+), probabilmente/gi, replacement: "Sai quella sensazione quando $1? Ecco," },
    { pattern: /^Vuoi sapere come (.+)\?/gi, replacement: "Ti spiego come $1." },
    { pattern: /^In questo articolo scoprirai/gi, replacement: "Qui dentro trovi" },
    { pattern: /^Leggi questa guida completa per/gi, replacement: "Ti spiego come" },
    { pattern: /^Scopri tutti i segreti per/gi, replacement: "Quello che devi sapere per" },
    { pattern: /^La guida definitiva per/gi, replacement: "Come fare per" },
    { pattern: /^Ti sei mai chiesto come/gi, replacement: "Sai come" },
    { pattern: /^Molte persone si domandano/gi, replacement: "Spesso ci chiedono" }
  ],

  // Call-to-action più naturali
  ctoPatterns: [
    { pattern: /Prenota (la tua )?consulenza/gi, replacement: "Vieni a fare una chiacchierata" },
    { pattern: /Contattaci (subito|ora)/gi, replacement: "Scrivici" },
    { pattern: /Chiamaci (subito|ora)/gi, replacement: "Chiamaci" },
    { pattern: /Inizia (subito|ora)/gi, replacement: "Inizia oggi" },
    { pattern: /Non aspettare/gi, replacement: "Se ti interessa" },
    { pattern: /Candidati (subito|ora)/gi, replacement: "Fatti sentire" }
  ]
};

/**
 * Umanizza un testo applicando le regole di trasformazione
 */
export function humanizeText(text: string): string {
  let humanizedText = text;

  // Applica sostituzioni dirette
  Object.entries(humanizationRules.directReplacements).forEach(([original, replacement]) => {
    const regex = new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    humanizedText = humanizedText.replace(regex, replacement);
  });

  // Applica pattern commerciali
  humanizationRules.commercialPatterns.forEach(({ pattern, replacement }) => {
    humanizedText = humanizedText.replace(pattern, replacement);
  });

  // Applica pattern introduttivi
  humanizationRules.introPatterns.forEach(({ pattern, replacement }) => {
    humanizedText = humanizedText.replace(pattern, replacement);
  });

  // Applica pattern CTA
  humanizationRules.ctoPatterns.forEach(({ pattern, replacement }) => {
    humanizedText = humanizedText.replace(pattern, replacement);
  });

  // Aggiustamenti finali per naturalezza
  humanizedText = humanizedText
    // Rimuovi eccesso di punti esclamativi
    .replace(/!{2,}/g, '.')
    // Sostituisci alcune espressioni troppo formali
    .replace(/\bpertanto\b/gi, 'quindi')
    .replace(/\binoltre\b/gi, 'e poi')
    .replace(/\btuttavia\b/gi, 'però')
    .replace(/\binfatti\b/gi, 'infatti')
    .replace(/\bdi conseguenza\b/gi, 'così')
    .replace(/\bnonostante ciò\b/gi, 'però')
    // Rendi più conversazionale
    .replace(/\bvoi\b/gi, 'tu')
    .replace(/\bvostra?\b/gi, 'tua')
    .replace(/\bvostri?\b/gi, 'tuoi')
    // Aggiustamenti specifici
    .replace(/È importante sottolineare che/gi, 'Tieni presente che')
    .replace(/È fondamentale ricordare che/gi, 'Non dimenticare che')
    .replace(/Ricorda sempre che/gi, 'Ricordati che')
    .replace(/Devi assolutamente/gi, 'Dovresti')
    .replace(/È assolutamente necessario/gi, 'Serve');

  return humanizedText;
}

/**
 * Umanizza specificamente un titolo
 */
export function humanizeTitle(title: string): string {
  return humanizeText(title)
    // Rimuovi numerazioni eccessive
    .replace(/^\d+\s+modi\s+per/gi, 'Come')
    .replace(/I \d+ migliori/gi, 'I migliori')
    .replace(/Le \d+ ragioni/gi, 'Perché')
    .replace(/\d+ segreti per/gi, 'Come')
    // Rendi i titoli più conversazionali
    .replace(/: la guida completa$/gi, ': come fare')
    .replace(/: tutto quello che devi sapere$/gi, ': quello che serve')
    .replace(/Come ottenere/gi, 'Come avere')
    .replace(/Come raggiungere/gi, 'Come arrivare a');
}

/**
 * Umanizza specificamente un excerpt
 */
export function humanizeExcerpt(excerpt: string): string {
  return humanizeText(excerpt)
    // Rimuovi linguaggio troppo promozionale negli excerpt
    .replace(/Scopri come/gi, 'Vedi come')
    .replace(/Leggi la nostra guida/gi, 'Ti spieghiamo')
    .replace(/In questo articolo/gi, 'Qui')
    .replace(/Approfondisci/gi, 'Leggi');
}

/**
 * Verifica se un testo ha bisogno di umanizzazione
 */
export function needsHumanization(text: string): boolean {
  const commercialKeywords = [
    'rivoluzionario', 'innovativo', 'esclusivo', 'unico', 'garantito al 100%',
    'risultati straordinari', 'trasforma la tua vita', 'metodo segreto',
    'scopri subito', 'prenota ora', 'clicca qui', 'non perdere'
  ];

  const excessiveEmojis = (text.match(/[🚀⚡💪🎯🔥✨]/g) || []).length > 2;
  const hasCommercialLanguage = commercialKeywords.some(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );

  return excessiveEmojis || hasCommercialLanguage;
}

/**
 * Calcola un punteggio di "umanità" del testo (0-100, dove 100 è molto umano)
 */
export function calculateHumanityScore(text: string): number {
  let score = 100;

  // Penalizza emoji eccessive
  const emojiCount = (text.match(/[🚀⚡💪🎯🔥✨]/g) || []).length;
  score -= emojiCount * 10;

  // Penalizza linguaggio commerciale
  const commercialPhrases = [
    'garantito', 'rivoluzionario', 'esclusivo', 'unico',
    'innovativo', 'straordinario', 'incredibile'
  ];
  
  commercialPhrases.forEach(phrase => {
    const occurrences = (text.toLowerCase().match(new RegExp(phrase, 'g')) || []).length;
    score -= occurrences * 15;
  });

  // Penalizza caps lock eccessivo
  const capsWords = text.match(/\b[A-Z]{3,}\b/g) || [];
  score -= capsWords.length * 8;

  // Penalizza punti esclamativi multipli
  const multipleExclamations = (text.match(/!{2,}/g) || []).length;
  score -= multipleExclamations * 12;

  return Math.max(0, Math.min(100, score));
}