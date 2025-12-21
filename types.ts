
export interface NavItem {
  label: string;
  href: string;
}

export interface SponsorTier {
  name: string;
  bestFor?: string;
  benefits: string[];
  color: string;
}

export interface Achievement {
  rank: string;
  title: string;
  date: string;
  description: string;
}

export interface ResearchMilestone {
  title: string;
  points: string[];
}
