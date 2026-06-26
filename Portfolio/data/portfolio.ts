import type { IconType } from "react-icons";
import { FiCode, FiCpu, FiDatabase, FiLayers, FiServer, FiZap } from "react-icons/fi";

export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  roleHeadline: string;
  location: string;
  summary: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  period?: string;
  score: string;
  details?: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
};

export type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
  features?: string[];
  accent: string;
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type ResponsibilityItem = {
  title: string;
  description: string;
};

export type AchievementItem = {
  title: string;
  description?: string;
};

export type CodingProfile = {
  platform: string;
  url?: string;
};

export type StrengthItem = {
  title: string;
  description: string;
  icon: IconType;
};

export type StatItem = {
  label: string;
  value: string;
};

export type PortfolioData = {
  personal: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  responsibilities: ResponsibilityItem[];
  achievements: AchievementItem[];
  codingProfiles: CodingProfile[];
  strengths: StrengthItem[];
  stats: StatItem[];
};

export const portfolio: PortfolioData = {
  personal: {
    name: "Suvanwita Das",
    email: "dsuvanwita@gmail.com",
    phone: "+91 6291212208",
    roleHeadline: "Full Stack Developer | AI/ML Explorer | Open Source Contributor",
    location: "IIIT Allahabad / Prayagraj, India",
    summary:
      "Full Stack Developer and AI/ML explorer building performant web platforms, developer tools, and data-driven systems with a strong open source mindset.",
  },
  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "Indian Institute of Information Technology, Allahabad",
      period: "2024-Present",
      score: "CGPA 9.06",
    },
    {
      degree: "Class 12 CBSE",
      institution: "Kalyani Central Model School",
      score: "95.4%",
    },
    {
      degree: "Class 10 ICSE",
      institution: "Julien Day School Kalyani",
      score: "98.8%",
      details: "State Merit Position 5th",
    },
  ],
  experience: [
    {
      role: "Software Development Engineer Intern",
      organization: "University of Missouri",
      period: "Jan 2026-Feb 2026",
      description:
        "Contributed to TRACES, a computational genomics platform, by improving data reliability, scientific visualization, and developer-facing documentation.",
      highlights: [
        "Worked on missing-data imputation workflows for computational genomics datasets.",
        "Built automated dataset validation to improve data quality before analysis.",
        "Enhanced Volcano Plot functionality for clearer biological insight exploration.",
        "Improved documentation for platform workflows, validation behavior, and visualization updates.",
      ],
    },
  ],
  projects: [
    {
      title: "SkillSync",
      description: "AI-driven career path recommendation platform.",
      tech: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "FastAPI",
        "Scikit-learn",
        "Pandas",
        "Joblib",
      ],
      accent: "from-cyan-300 via-blue-500 to-violet-500",
    },
    {
      title: "SwiftCache",
      description: "Redis-inspired in-memory datastore in C++17.",
      tech: ["C++", "Redis", "Cache"],
      features: [
        "Threaded TCP server",
        "Command registry",
        "Typed storage",
        "TTL expiration",
        "Server metrics",
      ],
      accent: "from-pink-400 via-fuchsia-500 to-violet-500",
    },
    {
      title: "SheCare",
      description: "Full-stack women's health platform with AI prediction, background jobs, and event streaming.",
      tech: [
        "Next.js",
        "React",
        "FastAPI",
        "Express",
        "MongoDB",
        "Redis",
        "BullMQ",
        "Apache Kafka",
      ],
      features: [
        "PCOS risk & cycle irregularity predictions via FastAPI ML",
        "Redis-backed cache & BullMQ queue for reminders/notifications",
        "Apache Kafka streaming for user Health Activity Timeline",
        "Comprehensive role-based patient & admin dashboards",
      ],
      accent: "from-rose-400 via-pink-500 to-red-500",
    },
  ],
  skills: [
    {
      category: "Programming",
      items: ["C/C++", "Python", "Java", "Rust", "JavaScript", "TypeScript", "Bash/Shell"],
    },
    {
      category: "Full-stack",
      items: [
        "HTML",
        "CSS",
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "FastAPI",
        "GraphQL",
        "Socket.IO",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "Apache Kafka",
        "Redis",
      ],
    },
    {
      category: "AI/ML",
      items: [
        "NumPy",
        "Pandas",
        "Scikit-learn",
        "OpenCV",
        "Matplotlib",
        "Seaborn",
        "LangChain",
        "LangGraph",
      ],
    },
    {
      category: "DevOps",
      items: [
        "Git",
        "GitHub",
        "Linux",
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "Postman",
        "Vercel",
      ],
    },
  ],
  responsibilities: [
    {
      title: "GSSoC 2026 Mentor & Contributor",
      description: "Mentoring contributors and participating in open source development workflows.",
    },
    {
      title: "Geekhaven FOSS Wing Member",
      description:
        "Conducted workshops for 100+ freshers, contributed to the OpenCode website and leaderboard, and mentored OpenCode 2025.",
    },
    {
      title: "Club of Professionals",
      description: "Built frontend features for the IIITA ERP ecosystem.",
    },
    {
      title: "Rangtarangini Dramatics Society",
      description: "Contributed to scriptwriting and acting for society productions.",
    },
  ],
  achievements: [
    { title: "Flipkart Girls Wanna Code 7.0 Top Scholars Cohort" },
    { title: "CodeChef Starters 227 Global Rank 446" },
    { title: "OpenCode 2024 Rank 12" },
    { title: "Out Of Context Hackathon Rank 9" },
    { title: "JEE Mains AIR 5640" },
  ],
  codingProfiles: [
    { platform: "LeetCode" },
    { platform: "Codeforces" },
    { platform: "CodeChef" },
  ],
  strengths: [
    {
      title: "Full-stack Engineering",
      description: "Frontend product craft backed by APIs, databases, authentication flows, and distributed tooling.",
      icon: FiLayers,
    },
    {
      title: "AI/ML Exploration",
      description: "Practical ML pipelines, recommendation systems, scientific data workflows, and Python tooling.",
      icon: FiCpu,
    },
    {
      title: "Open Source Leadership",
      description: "Mentorship, contributor workflows, workshops, and community-centered engineering.",
      icon: FiCode,
    },
    {
      title: "Systems Thinking",
      description: "C++ datastore internals, command design, TCP services, caching behavior, and metrics.",
      icon: FiServer,
    },
    {
      title: "Data Reliability",
      description: "Validation, imputation, documentation, and visualization improvements for research platforms.",
      icon: FiDatabase,
    },
    {
      title: "Interactive Interfaces",
      description: "Responsive UI, motion, feedback, and polished visual systems for modern web applications.",
      icon: FiZap,
    },
  ],
  stats: [
    { label: "Focus", value: "Full Stack" },
    { label: "CGPA", value: "9.06" },
    { label: "Base", value: "IIIT-A" },
  ],
};

export type ProfileSummary = PersonalInfo & {
  role: string;
};

export const profile: ProfileSummary = {
  name: portfolio.personal.name,
  roleHeadline: portfolio.personal.roleHeadline,
  role: portfolio.personal.roleHeadline,
  location: portfolio.personal.location,
  email: portfolio.personal.email,
  phone: portfolio.personal.phone,
  summary: portfolio.personal.summary,
};

export const stats = portfolio.stats;
export const strengths = portfolio.strengths;
export const skillCategories = portfolio.skills;
export const skills = portfolio.skills.flatMap((category) => category.items);
export const projects = portfolio.projects.map((project) => ({
  ...project,
  tags: project.tech,
}));
export const timeline = [
  ...portfolio.experience.map((item) => ({
    period: item.period,
    title: `${item.role}, ${item.organization}`,
    description: item.description,
  })),
  ...portfolio.education.map((item) => ({
    period: item.period ?? item.score,
    title: `${item.degree}, ${item.institution}`,
    description: [item.score, item.details].filter(Boolean).join(" | "),
  })),
];
