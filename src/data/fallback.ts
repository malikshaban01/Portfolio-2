// Built-in content shown when the /api routes / Supabase are unavailable or empty.
// Source: Muhammad Shaban Malik's resume.

export const FALLBACK_SKILLS = [
  { id: 1, name: 'Programming', icon: '💻', skills: ['C++', 'Object-Oriented Programming', 'File Handling', 'String Processing'] },
  { id: 2, name: 'Computer Science', icon: '🧠', skills: ['Data Structures', 'Algorithms', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Sorting', 'Searching'] },
  { id: 3, name: 'Database', icon: '🗄️', skills: ['SQL', 'MySQL Workbench', 'Database Design', 'ER Diagrams', 'Normalization', 'Relational Schema Design'] },
  { id: 4, name: 'DevOps & Cloud', icon: '☁️', skills: ['Linux', 'Shell Scripting', 'Docker', 'Git', 'GitHub', 'CI/CD Pipelines', 'AWS Basics', 'CI/CD on AWS'] },
  { id: 5, name: 'Tools', icon: '🛠️', skills: ['Visual Studio IDE', 'Linux Terminal', 'Docker', 'Git / GitHub', 'AWS Console'] },
  { id: 6, name: 'Professional Skills', icon: '🤝', skills: ['Problem Solving', 'Debugging', 'Team Collaboration', 'Adaptability', 'Fast Learning'] },
];

export const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Hotel Reservation System',
    description: 'Console-based hotel reservation app to check room availability, create bookings, and maintain customer records, with file handling to store and retrieve data.',
    tech: ['C++', 'File I/O', 'Visual Studio'],
    github_url: 'https://github.com/shabanmalik',
  },
  {
    id: 2,
    title: 'CSV File Manipulation Tool',
    description: 'C++ data processing tool that reads, parses, filters, sorts, and writes CSV files using string processing and file I/O.',
    tech: ['C++', 'File Handling', 'String Processing'],
    github_url: 'https://github.com/shabanmalik',
  },
  {
    id: 3,
    title: 'Dungeon Game',
    description: 'Text-based dungeon adventure built with OOP: class-based models for characters, enemies, and items using encapsulation, inheritance, and polymorphism.',
    tech: ['C++', 'OOP', 'Visual Studio'],
    github_url: 'https://github.com/shabanmalik',
  },
];

export const FALLBACK_EXPERIENCE = [
  {
    id: 1,
    role: 'DevOps Intern',
    company: 'Punjab Information Technology Board (PITB)',
    period: 'July 2026 - Present',
    bullets: [
      'Linux and shell scripting to manage and automate development and deployment tasks.',
      'Built and managed Docker containers for isolated, reproducible environments.',
      'Used Git and GitHub for version control, branching, and collaboration.',
      'Designed a complete CI/CD pipeline automating build, test, and deploy stages, and deployed it on AWS.',
    ],
  },
];

export const FALLBACK_EDUCATION = [
  {
    id: 1,
    degree: 'BS Computer Science',
    institution: 'University of Central Punjab, Lahore',
    period: '2024 - Present',
    details: '4th Semester · CGPA 3.22 / 4.00',
    coursework: ['Introduction to Computing', 'Programming Fundamentals', 'Object-Oriented Programming', 'Data Structures & Algorithms', 'Database Systems'],
  },
];
