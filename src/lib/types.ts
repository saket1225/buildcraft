export interface Guide {
  slug: string
  number: string
  title: string
  description: string
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export const guides: Guide[] = [
  { slug: 'accessibility', number: '01', title: 'Accessibility', description: 'Native HTML first, ARIA done right, keyboard navigation, and contrast that actually works.', readTime: '12 min', difficulty: 'Intermediate' },
  { slug: 'design-typography', number: '02', title: 'Design & Typography', description: 'Escaping the generic AI look. Hierarchy, spacing systems, and type that commands attention.', readTime: '15 min', difficulty: 'Advanced' },
  { slug: 'color', number: '03', title: 'Color', description: 'Palette construction, contrast ratios, dark mode, and the one-accent philosophy.', readTime: '10 min', difficulty: 'Beginner' },
  { slug: 'seo', number: '04', title: 'SEO', description: 'Meta tags, heading hierarchy, Core Web Vitals, and structured data that search engines love.', readTime: '8 min', difficulty: 'Beginner' },
  { slug: 'content-copy', number: '05', title: 'Content & Copy', description: 'Writing for humans, avoiding AI slop patterns, and finding a voice that resonates.', readTime: '11 min', difficulty: 'Intermediate' },
  { slug: 'performance', number: '06', title: 'Performance', description: 'Image optimization, lazy loading, font loading strategies, and performance budgets.', readTime: '9 min', difficulty: 'Intermediate' },
  { slug: 'architecture', number: '07', title: 'Architecture', description: 'File structure, knowing when to stop, component boundaries, and managing complexity.', readTime: '14 min', difficulty: 'Advanced' },
  { slug: 'testing', number: '08', title: 'Testing', description: 'What to test, how to test, meaningful coverage, and expect.dev integration.', readTime: '10 min', difficulty: 'Intermediate' },
  { slug: 'interactivity-animation', number: '09', title: 'Interactivity & Animation', description: 'The 12 principles of animation applied to UI. Micro-interactions, scroll patterns, and motion that serves purpose.', readTime: '16 min', difficulty: 'Advanced' },
  { slug: 'ux-laws', number: '10', title: 'UX Laws & Principles', description: 'The psychological principles behind every good interface. Fitts\'s Law, Hick\'s Law, and the myths debunked.', readTime: '18 min', difficulty: 'Intermediate' },
  { slug: 'silicon-friendly', number: '11', title: 'Silicon-Friendly Design', description: 'Making your product work for AI agents. Semantic HTML to autonomous operation.', readTime: '14 min', difficulty: 'Advanced' },
]
