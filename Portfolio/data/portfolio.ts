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
  rank?: string;
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
  mentoredProjects: any[];
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
      score: "CGPA 8.92",
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
      organization: "University of Missouri (Remote)",
      period: "Jan 2026 – Feb 2026",
      description:
        "Contributed to TRACES, a computational genomics platform, by improving data reliability, scientific visualization, and developer-facing documentation.",
      highlights: [
        "Designed and implemented a graph-based retrieval system using LangChain, LangGraph, and Neo4j to support workflow-aware genomic analysis assistance.",
        "Developed backend validation pipelines and data processing workflows for large-scale genomic datasets, improving data quality and reducing manual verification effort.",
        "Enhanced scientific visualization modules through custom grouping and analysis features for volcano plot generation.",
        "Improved developer-facing documentation for computational genomic workflows, validation processes, and visualization modules.",
      ],
    },
  ],
  projects: [
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
      title: "EventPulse",
      description: "Campus event operations platform for capacity-safe registrations, QR-based entry, automated waitlists, venue scheduling, duplicate check-in prevention, and real-time crowd-flow tracking.",
      tech: [
        "Node.js",
        "Redis",
        "Kafka",
        "Next.js",
        "Socket.io",
        "PostgreSQL",
        "BullMQ",
        "Zod",
        "CASL",
        "OpenTelemetry",
        "Prometheus",
      ],
      features: [
        "Capacity-safe registrations and automated waitlist queues",
        "Event-driven broker layer using Kafka and transactional integrity in PG",
        "Eliminated registration race conditions under high load using Redis distributed locking",
        "Optimized statistics lookups via Fenwick Tree metrics aggregation",
      ],
      accent: "from-violet-400 via-indigo-500 to-cyan-400",
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
    {
      title: "Speedora",
      description: "Fast, lightweight command-line interface for measuring network ping, download, and upload speeds directly from your terminal.",
      tech: [
        "Rust",
        "Tokio",
        "Reqwest",
        "Clap",
        "Futures Util",
      ],
      features: [
        "Accurate bandwidth measurements (download & upload speeds)",
        "Ping latency reporting with RTT metrics",
        "Asynchronous Tokio-based multi-threaded engine",
        "Clean terminal CLI layout featuring ASCII progress bars",
      ],
      accent: "from-cyan-300 via-blue-500 to-violet-500",
    },
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
      title: "TrustCart",
      description: "NLP product review analyzer calculating trust scores and spam anomalies.",
      tech: [
        "Streamlit",
        "Python",
        "NLTK",
        "Scikit-learn",
        "Hugging Face",
        "Plotly",
      ],
      features: [
        "Linguistic signals & IsolationForest spam detection",
        "Aspect mining into performance, battery, display, support, etc.",
        "Weighted scoring (sentiment, rating consistency, authenticity)",
        "Automated final report with pros/cons and verdict recommendations",
      ],
      accent: "from-amber-300 via-yellow-500 to-orange-500",
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
        "BullMQ",
        "Zod",
        "Zustand",
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
        "Jest",
        "Supertest",
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
    { title: "Code-X-Culture 2026 Rank 14, annual coding contest of IIITA" },
    { title: "Three Musketeers 2026 Rank 7 (best girl's team), team coding contest conducted by Aparoksha, IIITA" },
    { title: "Flipkart Girls Wanna Code 7.0 Top Scholars Cohort" },
    { title: "CodeChef Starters 227 Global Rank 446" },
    { title: "OpenCode 2024 Rank 12" },
    { title: "Out Of Context Hackathon Rank 9" },
    { title: "JEE Mains AIR 5640" },
  ],
  codingProfiles: [
    { platform: "LeetCode", rank: "Knight" },
    { platform: "Codeforces", rank: "Pupil" },
    { platform: "CodeChef", rank: "3 Star" },
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
    { label: "CGPA", value: "8.92" },
    { label: "Base", value: "IIIT-A" },
  ],
  mentoredProjects: [
    {
      title: "CareerCraft",
      subtitle: "Resume Evaluator & Job Match Assistant",
      description: "AI-powered career enhancement platform to optimize resumes, evaluate job-fit, and generate tailored cover letters.",
      tech: ["Next.js", "Tailwind CSS", "Node.js", "Express", "MongoDB", "FastAPI", "Python", "NLP"],
      stats: { issues: "40+", prs: "150+", contributors: "70+" },
      githubUrl: "https://github.com/opencodeiiita/CareerCraft",
      features: [
        "ATS resume scanning & structural formatting check",
        "NLP keyword checking & matching with target job listings",
        "AI cover letter builder with customizable tone exports",
        "Authenticated database dashboard for history tracking",
      ],
      accent: "from-cyan-300 via-blue-500 to-violet-500",
    },
    {
      title: "FEM-CARE",
      subtitle: "AI PCOS & Hormonal Health Assistant",
      description: "AI platform for PCOS severity prediction, wellness tracking, diagnostics analytics, and chatbot support.",
      tech: ["React", "Tailwind CSS", "Express", "MongoDB", "Python", "FastAPI", "Random Forest", "NLP"],
      stats: { issues: "15+", prs: "60+", contributors: "30+" },
      githubUrl: "https://github.com/opencodeiiita/Fem-care",
      features: [
        "Guided form for PCOS symptom logging & database storage",
        "Random Forest machine learning model predicting severity risk",
        "Calming trend visualization dashboards for symptom histories",
        "NLP emotional chatbot supporting anxiety & wellness guidance",
      ],
      accent: "from-rose-400 via-pink-500 to-red-500",
    },
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
export const mentoredProjects = portfolio.mentoredProjects;
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
