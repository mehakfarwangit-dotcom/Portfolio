// Vite injects BASE_URL at build time so assets work under /Portfolio/ on GH Pages
const BASE = import.meta.env.BASE_URL

export const asset = (p) => `${BASE}${p.replace(/^\//, '')}`

export const profile = {
  name: 'Mehak Farwan',
  role: 'Aspiring Data Analyst | Business Analyst',
  email: 'mehakshan006@gmail.com',
  phone: '+91 8123072378',
  location: 'Kakkanad, Kerala, India',
  photo: asset('mehak.png'),
  presentingPhoto: asset('mehak-presenting.png'),
  bio: 'Insightful decisions begin with well-analyzed data. I bring a strong analytical mindset and a structured problem-solving approach to Business and Data Analysis, focused on translating raw data into actionable insights that drive informed decision-making and measurable business performance.',
  tagline: 'data → decisions → impact'
}

export const kpis = [
  { label: 'Projects shipped', value: 3, suffix: '' },
  { label: 'Skills tracked',   value: 18, suffix: '+' },
  { label: 'Languages spoken', value: 5, suffix: '' },
  { label: 'Years coding',     value: 4, suffix: '+' }
]

export const skillCategories = [
  {
    key: 'programming',
    title: 'Programming',
    skills: [
      { name: 'Python',      level: 88 },
      { name: 'Java',        level: 70 },
      { name: 'C',           level: 68 },
      { name: 'JavaScript',  level: 72 },
      { name: 'HTML/CSS',    level: 80 }
    ]
  },
  {
    key: 'data',
    title: 'Data & Databases',
    skills: [
      { name: 'SQL',         level: 85 },
      { name: 'MongoDB',     level: 75 },
      { name: 'SQLite',      level: 78 },
      { name: 'Pandas',      level: 80 },
      { name: 'Scikit-learn',level: 72 }
    ]
  },
  {
    key: 'analytics',
    title: 'Analytics & BI',
    skills: [
      { name: 'Power BI',           level: 82 },
      { name: 'Microsoft Excel',    level: 88 },
      { name: 'Business Analysis',  level: 78 },
      { name: 'Decision Making',    level: 85 }
    ]
  },
  {
    key: 'soft',
    title: 'Communication & Leadership',
    skills: [
      { name: 'Client Communication', level: 92 },
      { name: 'Lead Generation',      level: 86 },
      { name: 'CRM',                  level: 82 },
      { name: 'Teamwork',             level: 90 },
      { name: 'Adaptability',         level: 88 }
    ]
  }
]

// Aggregated radar
export const radarData = [
  { axis: 'Programming',    value: 76 },
  { axis: 'Data & DB',      value: 78 },
  { axis: 'Analytics & BI', value: 84 },
  { axis: 'Communication',  value: 90 },
  { axis: 'Leadership',     value: 86 }
]

export const projects = [
  {
    id: 'P-001',
    title: 'Injury Prediction System',
    category: ['Python', 'ML'],
    tech: ['Python', 'Pandas', 'Scikit-learn'],
    metric: { label: 'Model accuracy', value: 87 },
    bullets: [
      'Built a predictive system to analyze injury risks from historical performance data.',
      'Performed data preprocessing, EDA and pattern identification.',
      'Applied ML techniques to improve prediction accuracy.',
      'Delivered insights for injury prevention in sports & healthcare.'
    ]
  },
  {
    id: 'P-002',
    title: 'Smart Recipe Predictor',
    category: ['Python', 'MongoDB'],
    tech: ['Python', 'MongoDB', 'REST API'],
    metric: { label: 'User satisfaction', value: 92 },
    bullets: [
      'Recommendation system based on available ingredients and dietary preferences.',
      'Integrated API-based suggestions for a richer experience.',
      'Helped users plan meals and manage grocery needs efficiently.'
    ]
  },
  {
    id: 'P-003',
    title: 'Luxe Area — Interior Design Platform',
    category: ['Python', 'SQLite', 'Web'],
    tech: ['Python', 'SQLite', 'HTML', 'CSS'],
    metric: { label: 'Roles supported', value: 80 },
    bullets: [
      'Role-based platform for interior design and décor shopping.',
      'Enabled collaboration between Admin, Designers, Painters and Users.',
      'Focused on usability, structured data handling and content management.'
    ]
  }
]

export const projectFilters = ['All', 'Python', 'ML', 'MongoDB', 'SQLite', 'Web']

export const experience = [
  {
    role: 'Business Development Executive',
    org: 'Nettrans Infotech Pvt. Ltd., Kakkanad',
    start: '2025-11',
    end: 'Present',
    bullets: [
      'Handled outbound and inbound calls with UK customers.',
      'Explained services and generated leads through effective communication.',
      'Built and maintained strong client relationships.',
      'Translated customer requirements into suitable solutions.',
      'Coordinated with internal teams for smooth service delivery.',
      'Maintained call records and follow-ups for conversions.'
    ]
  }
]

export const education = [
  {
    degree: 'Master of Computer Applications',
    school: 'MES AIMAT, Marampally — M G University',
    period: '2024 — 2026',
    yearShort: '2026',
    note: 'Pursuing'
  },
  {
    degree: 'Bachelor of Computer Applications',
    school: 'A C K H M ICA College — Calicut University',
    period: '2021 — 2024',
    yearShort: '2024',
    note: 'Graduated'
  }
]

export const languages = [
  { name: 'English',   level: 5, value: 22 },
  { name: 'Hindi',     level: 5, value: 22 },
  { name: 'Malayalam', level: 5, value: 22 },
  { name: 'Kannada',   level: 4, value: 17 },
  { name: 'Tamil',     level: 4, value: 17 }
]

export const narration = {
  overview:   "Hi, I'm Mehak Farwan. I turn data into decisions. Welcome to my dashboard — let me walk you through who I am, one widget at a time.",
  skills:     "These are the tools I work with. Python and SQL for the heavy lifting, Power BI and Excel for the storytelling, and a curiosity that refuses to sit still.",
  projects:   "I've built a system that predicts injury risks for athletes, a smart recipe recommender powered by MongoDB, and a role-based platform for interior designers. Every project starts with a real problem.",
  experience: "Right now I'm sharpening my client side as a Business Development Executive at Nettrans Infotech, talking to customers across the UK and translating what they need into solutions that ship.",
  education:  "I'm a Bachelor of Computer Applications from Calicut University, currently completing my Masters at MES AIMAT under M G University. Four years deep in computer applications, and still learning every day.",
  languages:  "I speak five languages — English, Hindi, Malayalam, Kannada and Tamil. It comes in handy when your clients are everywhere.",
  contact:    "If any of this resonates with you, I'd love to talk. Hit run query, and you'll find every way to reach me. Thanks for stopping by."
}

export const activities = [
  {
    title: 'Class Representative — MCA',
    bullets: [
      'Liaison between students and faculty, ensuring clear communication and timely resolution of academic concerns.',
      'Coordinated class activities, schedules and feedback for a structured learning environment.'
    ]
  },
  {
    title: 'Vice Chairperson — BCA',
    bullets: [
      'Led and organized academic and cultural initiatives, driving student participation and engagement.',
      'Collaborated with faculty and student teams to plan and execute events smoothly.'
    ]
  }
]
