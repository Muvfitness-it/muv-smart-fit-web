/**
 * Advanced Keyword Similarity Algorithms for Related Articles
 * Uses TF-IDF and Cosine Similarity for intelligent content matching
 */

export interface KeywordVector {
  keyword: string;
  weight: number;
}

/**
 * Calculate Term Frequency (TF) for a keyword in a document
 */
function calculateTF(keyword: string, document: string): number {
  const words = document.toLowerCase().split(/\s+/);
  const keywordLower = keyword.toLowerCase();
  const count = words.filter(word => word.includes(keywordLower)).length;
  return words.length > 0 ? count / words.length : 0;
}

/**
 * Calculate Inverse Document Frequency (IDF)
 */
function calculateIDF(keyword: string, allDocuments: string[]): number {
  const keywordLower = keyword.toLowerCase();
  const docsWithKeyword = allDocuments.filter(doc => 
    doc.toLowerCase().includes(keywordLower)
  ).length;
  
  return Math.log(allDocuments.length / (docsWithKeyword + 1));
}

/**
 * Calculate TF-IDF weight for a keyword in a document
 */
export function calculateTFIDF(
  keyword: string,
  document: string,
  allDocuments: string[]
): number {
  const tf = calculateTF(keyword, document);
  const idf = calculateIDF(keyword, allDocuments);
  return tf * idf;
}

/**
 * Create keyword vector from text with TF-IDF weights
 */
export function createKeywordVector(
  keywords: string[],
  document: string,
  allDocuments: string[]
): KeywordVector[] {
  return keywords.map(keyword => ({
    keyword,
    weight: calculateTFIDF(keyword, document, allDocuments)
  }));
}

/**
 * Calculate Cosine Similarity between two keyword vectors
 */
export function cosineSimilarity(
  vectorA: KeywordVector[],
  vectorB: KeywordVector[]
): number {
  // Create a map for quick lookup
  const mapB = new Map(vectorB.map(kv => [kv.keyword, kv.weight]));
  
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  // Calculate dot product and magnitude A
  vectorA.forEach(kvA => {
    const weightB = mapB.get(kvA.keyword) || 0;
    dotProduct += kvA.weight * weightB;
    magnitudeA += kvA.weight * kvA.weight;
  });
  
  // Calculate magnitude B
  vectorB.forEach(kvB => {
    magnitudeB += kvB.weight * kvB.weight;
  });
  
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Extract keywords from text (simple tokenization)
 */
export function extractSimpleKeywords(text: string, minLength: number = 3): string[] {
  const stopWords = new Set([
    'il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una',
    'di', 'a', 'da', 'in', 'con', 'su', 'per', 'tra', 'fra',
    'e', 'o', 'ma', 'però', 'anche', 'se', 'come', 'quando',
    'che', 'chi', 'cui', 'quale', 'questo', 'quello',
    'è', 'sono', 'sei', 'siamo', 'siete', 'hanno', 'ha', 'ho', 'hai',
    'al', 'del', 'nel', 'sul', 'dal', 'col',
    'alla', 'della', 'nella', 'sulla', 'dalla',
    'per', 'più', 'non', 'molto', 'poco', 'tanto', 'ogni', 'tutti'
  ]);
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= minLength && !stopWords.has(word))
    .filter((word, index, self) => self.indexOf(word) === index); // unique
}

/**
 * Calculate composite similarity score with multiple factors
 */
export function calculateCompositeScore(
  contentSimilarity: number,
  categoryMatch: boolean,
  recencyScore: number,
  weights = { content: 0.6, category: 0.3, recency: 0.1 }
): number {
  return (
    contentSimilarity * weights.content +
    (categoryMatch ? 1 : 0) * weights.category +
    recencyScore * weights.recency
  );
}

/**
 * Calculate recency score (0-1) based on publish date
 * More recent articles get higher scores
 */
export function calculateRecencyScore(publishedAt: string): number {
  const now = new Date();
  const publishDate = new Date(publishedAt);
  const daysDiff = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
  
  // Exponential decay: articles lose 50% relevance every 180 days
  const halfLife = 180;
  return Math.exp(-0.693 * daysDiff / halfLife);
}
