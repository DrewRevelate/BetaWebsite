/**
 * Case Study data interface
 */
export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  industry: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  coverImageUrl?: string;
  results: string[];
  excerpt: string;
  featured: boolean;
  clientName?: string;
  projectDuration?: string;
  completionDate?: string;
  publishedDate?: string;
  updatedDate?: string;
  technologies?: string[];
  challenge?: string;
  approach?: string;
  solution?: string;
  resultsDetail?: string;
  pdfUrl?: string;
  galleryImages?: { url: string; alt: string; caption?: string }[];
}

/**
 * Empty case studies array
 * IMPORTANT: Case studies will only be populated once explicit client approval is received
 * Do not add any case studies without client permission
 */
const caseStudies: CaseStudy[] = [];

/**
 * Get all case studies
 * @returns Array of all case studies
 */
export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

/**
 * Get a specific case study by slug
 * @param slug The case study slug
 * @returns The case study or undefined if not found
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}

/**
 * Get featured case studies
 * @param limit Optional limit for the number of studies to return
 * @returns Array of featured case studies
 */
export function getFeaturedCaseStudies(limit?: number): CaseStudy[] {
  const featured = caseStudies.filter(study => study.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get case studies by category
 * @param category The category to filter by
 * @returns Array of case studies in the specified category
 */
export function getCaseStudiesByCategory(category: string): CaseStudy[] {
  return caseStudies.filter(study => study.category === category);
}

/**
 * Get case studies by industry
 * @param industry The industry to filter by
 * @returns Array of case studies in the specified industry
 */
export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return caseStudies.filter(study => study.industry === industry);
}

/**
 * Get related case studies
 * @param studyId The ID of the current case study
 * @param limit Optional limit for the number of studies to return
 * @returns Array of related case studies
 */
export function getRelatedCaseStudies(studyId: string, limit: number = 3): CaseStudy[] {
  const currentStudy = caseStudies.find(study => study.id === studyId);
  
  if (!currentStudy) {
    return [];
  }
  
  // Find studies with the same category or industry, but exclude the current study
  const related = caseStudies.filter(study => 
    study.id !== studyId && 
    (study.category === currentStudy.category || study.industry === currentStudy.industry)
  );
  
  return related.slice(0, limit);
}

/**
 * Get all available categories
 * @returns Array of unique categories
 */
export function getAllCategories(): string[] {
  const categories = caseStudies.map(study => study.category);
  return Array.from(new Set(categories));
}

/**
 * Get all available industries
 * @returns Array of unique industries
 */
export function getAllIndustries(): string[] {
  const industries = caseStudies.map(study => study.industry);
  return Array.from(new Set(industries));
}
