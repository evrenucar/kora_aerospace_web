
import { NavItem, SponsorTier, Achievement, ResearchMilestone } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Track Record', href: '#track-record' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const TEAM_MEMBERS = [
  { name: 'Dr. Aris Thorne', role: 'Lead Autonomy Engineer', bio: 'Specialist in SLAM and edge-inference perception pipelines with professional hardware experience.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
  { name: 'Elena Vance', role: 'Hardware Architect', bio: 'Expert in PCB development, embedded firmware, and DFM-ready development.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
  { name: 'Kaelen Ross', role: 'Mechanical Engineer', bio: 'Focused on airframe design, structural integration, and product/mechanical design.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
  { name: 'Mina Sato', role: 'Embedded Systems', bio: 'Experienced in real-time systems, driver development, and system bring-up.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
];

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    name: 'Platinum',
    bestFor: 'Major manufacturing/compute support',
    benefits: [
      'Largest logo placement',
      'Featured mention in demo video',
      'Priority sponsor updates',
      'Sponsor demo session',
    ],
    color: 'bg-kora-cyan text-kora-bg',
  },
  {
    name: 'Gold',
    benefits: [
      'Medium logo placement',
      'Regular mentions in updates',
      'Invite to demo day',
    ],
    color: 'bg-kora-surface border border-kora-cyan text-kora-offwhite',
  },
  {
    name: 'Silver',
    benefits: [
      'Logo on website and team material',
      'End-of-season technical summary',
    ],
    color: 'bg-kora-surface border border-slate-600 text-kora-offwhite',
  },
  {
    name: 'Bronze',
    benefits: [
      'Supporter listing',
      'Thank-you post',
    ],
    color: 'bg-kora-surface text-slate-400',
  },
  {
    name: 'Copper',
    benefits: [
      'Supporter listing',
    ],
    color: 'bg-transparent border border-slate-800 text-slate-500',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    rank: '1st Place',
    title: 'BEKO "Hack the Normal" Global Hackathon',
    date: 'Apr 2022',
    description: 'Developed novel hardware-software integration for real-world reliability.',
  },
  {
    rank: '2nd Place',
    title: 'Baku Smart Karabakh Hackathon, Teknofest',
    date: 'Apr 2022',
    description: 'Validated autonomous perception stack in high-pressure competition environment.',
  },
  {
    rank: '5th Place',
    title: 'Teknofest "Ulaşımda Yapay Zeka"',
    date: '2021',
    description: 'Demonstrated AI-driven navigation capabilities.',
  },
  {
    rank: '4th Place + Best Scientists Award',
    title: 'European Rover Challenge',
    date: 'Sep 2020',
    description: 'Kielce, Poland. Recognized for rigorous engineering and scientific methodology.',
  },
];

export const RESEARCH_MILESTONES: ResearchMilestone[] = [
  {
    title: 'Autonomy-ready avionics platform',
    points: ['Power + compute + sensing integrated for compact form factors.'],
  },
  {
    title: 'Perception + mission pipeline',
    points: ['Running fully onboard for real-time decision making.'],
  },
  {
    title: 'Flight validation',
    points: ['Consistent logging + repeatable test routes in field conditions.'],
  },
  {
    title: 'Competition demonstration',
    points: ['Validated at SUAS and Teknofest.'],
  },
];
