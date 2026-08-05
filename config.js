// Personal Portfolio Configuration Data
const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Gnanasambandam Jayabal",
    title: "Full Stack Software Engineer",
    tagline: "Building scalable enterprise applications with .NET, React, and Microsoft Azure.",
    bio: "Results-driven Software Engineer with 4.6 years of experience in Full Stack Development using ASP.NET Core, C#, React.js, .NET MAUI, MS SQL Server, and Microsoft Azure. Proven expertise in developing scalable enterprise applications, implementing CI/CD pipelines, leading Agile development activities, conducting code reviews, and mentoring team members. Skilled in Azure App Services, Azure DevOps, and end-to-end software delivery, with a strong focus on performance, quality, and business value.",
    email: "jayabalgnanam@gmail.com",
    phone: "+91 8111025988",
    location: "Chennai, Tamil Nadu",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      resume: "resume.html"
    }
  },
  skills: [
    // Frontend
    { name: "React.js",     icon: "⚛️", category: "frontend", level: 85 },
    { name: "JavaScript",   icon: "🟨", category: "frontend", level: 85 },
    // Backend
    { name: "C#",                        icon: "💜", category: "backend", level: 95 },
    { name: "ASP.NET Core / Web API",    icon: "🔷", category: "backend", level: 95 },
    { name: "ASP.NET",                   icon: "🔵", category: "backend", level: 85 },
    { name: "Entity Framework & LINQ",   icon: "🗄️", category: "backend", level: 90 },
    { name: ".NET MAUI",                 icon: "📱", category: "backend", level: 80 },
    { name: "MS SQL Server",             icon: "🛢️", category: "backend", level: 90 },
    // Tools & DevOps
    { name: "Microsoft Azure",           icon: "☁️", category: "tools", level: 85 },
    { name: "Azure App Services",        icon: "🚀", category: "tools", level: 85 },
    { name: "Azure DevOps",              icon: "⚙️", category: "tools", level: 85 },
    { name: "CI/CD Pipelines",           icon: "🔄", category: "tools", level: 80 },
    { name: "Git / GitHub / Azure Repos",icon: "🐙", category: "tools", level: 90 },
    { name: "Agile Scrum",               icon: "🏃", category: "tools", level: 90 }
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "ProPhoenix Technologies Software Solution Pvt. Ltd.",
      duration: "Dec 2023 - Present",
      location: "Chennai, TN",
      description: "Contributing throughout the complete Software Development Life Cycle (SDLC) from requirement gathering to production support. Leading agile development activities and mentoring team members.",
      highlights: [
        "Designing and developing scalable RESTful APIs using ASP.NET Core Web API and Clean Architecture.",
        "Developing responsive web applications using React.js and cross-platform mobile applications using .NET MAUI.",
        "Designing and optimizing database structures and SQL Server queries for performance and scalability.",
        "Implementing CI/CD pipelines using Azure DevOps for automated build and deployment processes.",
        "Managing Agile Scrum ceremonies including Daily Stand-ups, Sprint Planning, Sprint Reviews, and Retrospectives.",
        "Conducting code reviews and providing technical guidance to team members.",
        "Reviewing business requirements, preparing effort estimates, and coordinating development activities.",
        "Deploying and maintaining applications in Microsoft Azure App Services."
      ]
    },
    {
      role: "Software Engineer",
      company: "Leiten Technologies Pvt. Ltd.",
      duration: "Sep 2022 - Oct 2023",
      location: "Chennai, TN",
      description: "Worked on Philips' internal Daily Log Update System, implementing critical workflow management and business logic.",
      highlights: [
        "Built end-to-end backend services and frontend interfaces.",
        "Implemented business logic using ASP.NET Core and C#.",
        "Designed and optimized SQL queries for daily operations.",
        "Delivered production-ready features used in daily operational environments."
      ]
    },
    {
      role: "Quality Assurance Engineer",
      company: "TVS Sundram Fasteners Limited",
      duration: "Aug 2021 - Aug 2022",
      location: "Velappanchavadi, Chennai",
      description: "Performed quality inspection of manufactured components to ensure compliance with company standards.",
      highlights: [
        "Measured product dimensions using Vernier Callipers, Micrometres, and Height Gauges.",
        "Conducted in-process and final inspections, identifying defects and reporting non-conforming products.",
        "Maintained quality inspection records and worked with production teams to reduce defects."
      ]
    }
  ],
  education: [
    {
      degree: "B.E. Mechanical Engineering",
      school: "Mailam Engineering College",
      duration: "Completed",
      details: "Percentage: 74.50%",
      highlights: [
        "Located in Villupuram.",
        "Acquired solid engineering foundation, analytical skills, and mathematical background."
      ]
    },
    {
      degree: "Higher Secondary (12th)",
      school: "SJSV Higher Secondary School",
      duration: "Completed",
      details: "Percentage: 75.00%",
      highlights: [ "Located in Villupuram." ]
    },
    {
      degree: "SSLC (10th)",
      school: "Mount Park Higher Secondary School",
      duration: "Completed",
      details: "Percentage: 92.00%",
      highlights: [ "Located in Thiyagadurgam." ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
} else {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
