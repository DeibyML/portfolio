import { TranslationKey } from '../core/i18n/translations';

/**
 * Single source of truth for portfolio content.
 *
 * Structure (names, dates, links, tech) lives here; every human-readable
 * sentence is a translation key resolved through `I18nService`, so content
 * edits and copy edits never collide.
 */

export interface ExperienceEntry {
  company: string;
  location: string;
  /** Display years; `end: null` marks the current position. */
  start: number;
  end: number | null;
  roleKey: TranslationKey;
  summaryKey: TranslationKey;
  stack: string[];
}

export interface Project {
  name: string;
  year: number;
  descKey: TranslationKey;
  /** Omitted for private / not-yet-published work. */
  repoUrl?: string;
  stack: string[];
  /** Renders as the large spotlight card above the project list. */
  featured?: boolean;
  /** Shows an "in development" badge. */
  wip?: boolean;
}

export interface SkillGroup {
  labelKey: TranslationKey;
  /** `level` is 1–5; omitted level renders as a plain tag. */
  skills: { name: string; level?: number }[];
}

export interface EducationEntry {
  school: string;
  years: string;
  degreeKey: TranslationKey;
}

export const PROFILE = {
  name: 'Deiby Montoya',
  fullName: 'Deiby Leandro Montoya López',
  email: 'deiby.sk@hotmail.com',
  github: 'https://github.com/DeibyML',
  linkedin: 'https://www.linkedin.com/in/deibymontoya-dev',
  calendly: 'https://calendly.com/deiby',
  careerStart: 2017,
} as const;

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'TripArc',
    location: 'Toronto, Canada',
    start: 2023,
    end: null,
    roleKey: 'exp.triparc.role',
    summaryKey: 'exp.triparc.summary',
    stack: ['Angular', '.NET Core', 'Entity Framework', 'SQL Server'],
  },
  {
    company: 'Enlace TV',
    location: 'Remote',
    start: 2021,
    end: 2022,
    roleKey: 'exp.enlace.role',
    summaryKey: 'exp.enlace.summary',
    stack: ['Angular', '.NET Core', 'Entity Framework', 'SQL Server'],
  },
  {
    company: 'Overactive',
    location: 'Remote',
    start: 2020,
    end: 2021,
    roleKey: 'exp.overactive.role',
    summaryKey: 'exp.overactive.summary',
    stack: ['React', 'Next.js', 'GraphQL', 'Angular', '.NET Core'],
  },
  {
    company: 'Novatec',
    location: 'Bogotá, Colombia',
    start: 2020,
    end: 2020,
    roleKey: 'exp.novatec.role',
    summaryKey: 'exp.novatec.summary',
    stack: ['Angular', 'TypeScript', 'Python'],
  },
  {
    company: 'Fitideas',
    location: 'Bogotá, Colombia',
    start: 2019,
    end: 2020,
    roleKey: 'exp.fitideas.role',
    summaryKey: 'exp.fitideas.summary',
    stack: ['Angular', 'Redux', '.NET Core', 'WebSockets'],
  },
  {
    company: 'Colvatel',
    location: 'Bogotá, Colombia',
    start: 2018,
    end: 2019,
    roleKey: 'exp.colvatel.role',
    summaryKey: 'exp.colvatel.summary',
    stack: ['Angular', 'Ionic', 'C#', 'MongoDB', 'SQL Server'],
  },
  {
    company: 'ITEHL Consulting',
    location: 'Bogotá, Colombia',
    start: 2017,
    end: 2018,
    roleKey: 'exp.itehl.role',
    summaryKey: 'exp.itehl.summary',
    stack: ['.NET Core', 'Angular', 'SQL Server'],
  },
];

export const PROJECTS: Project[] = [
  {
    // Flagship side project — private for now; tweak desc/stack/link as it evolves.
    name: 'LangGrade',
    year: 2026,
    descKey: 'proj.langgrade.desc',
    stack: ['AI', 'Angular', 'TypeScript'],
    featured: true,
    wip: true,
  },
  {
    name: 'Warehouse Management System',
    year: 2025,
    descKey: 'proj.wms.desc',
    repoUrl: 'https://github.com/DeibyML/WarehouseManagementSystem',
    stack: ['MongoDB', 'Express', 'React', 'Node', 'TypeScript'],
  },
  {
    name: 'Contacts Manager',
    year: 2023,
    descKey: 'proj.contacts.desc',
    repoUrl: 'https://github.com/DeibyML/ContactsManager-BlazorApp',
    stack: ['Blazor', 'C#', '.NET'],
  },
  {
    name: 'Bill Splitter',
    year: 2022,
    descKey: 'proj.billsplitter.desc',
    repoUrl: 'https://github.com/DeibyML/BillSplitter',
    stack: ['C#', '.NET'],
  },
  {
    name: 'Custom Data Annotations',
    year: 2022,
    descKey: 'proj.annotations.desc',
    repoUrl: 'https://github.com/DeibyML/CustomDataAnnotations',
    stack: ['C#', '.NET'],
  },
  {
    name: 'Prision',
    year: 2021,
    descKey: 'proj.prision.desc',
    repoUrl: 'https://github.com/DeibyML/Prision',
    stack: ['TypeScript', 'Angular'],
  },
  {
    name: 'Auth Failed Microsite',
    year: 2020,
    descKey: 'proj.authsite.desc',
    repoUrl: 'https://github.com/DeibyML/AuthFailedMicrosite',
    stack: ['TypeScript', 'Angular'],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    labelKey: 'skills.groupFrontend',
    skills: [
      { name: 'Angular', level: 5 },
      { name: 'TypeScript', level: 5 },
      { name: 'HTML / CSS', level: 5 },
      { name: 'React', level: 4 },
      { name: 'Next.js', level: 4 },
      { name: 'Ionic' },
      { name: 'Redux / NgRx' },
    ],
  },
  {
    labelKey: 'skills.groupBackend',
    skills: [
      { name: '.NET Core / C#', level: 5 },
      { name: 'Entity Framework', level: 4 },
      { name: 'Blazor', level: 4 },
      { name: 'Python' },
      { name: 'Node.js' },
      { name: 'GraphQL' },
      { name: 'REST APIs' },
      { name: 'WebSockets' },
    ],
  },
  {
    labelKey: 'skills.groupData',
    skills: [{ name: 'SQL Server', level: 5 }, { name: 'Azure', level: 4 }, { name: 'MongoDB' }],
  },
  {
    labelKey: 'skills.groupPractices',
    skills: [
      { name: 'Clean Architecture' },
      { name: 'CI / CD' },
      { name: 'Agile / Scrum' },
      { name: 'Code Review' },
      { name: 'Mentoring' },
    ],
  },
];

export const EDUCATION: EducationEntry[] = [
  { school: 'Lambton College · ON, Canada', years: '2021 - 2023', degreeKey: 'edu.lambton' },
  { school: 'U. Jorge Tadeo Lozano · Colombia', years: '2017 - 2020', degreeKey: 'edu.tadeo' },
  { school: 'Fedesoft · Colombia', years: '2018', degreeKey: 'edu.fedesoft' },
  { school: 'SENA · Colombia', years: '2014 - 2016', degreeKey: 'edu.sena' },
];

/** Tech ticker shown in the hero marquee; order tells the story of the stack. */
export const MARQUEE = [
  'Angular',
  '.NET Core',
  'TypeScript',
  'C#',
  'React',
  'SQL Server',
  'Azure',
  'GraphQL',
  'Blazor',
  'Next.js',
];
