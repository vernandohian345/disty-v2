export const courseContent = [

  // ========================================
  // FRONTEND DEVELOPMENT
  // ========================================

  {
    id: 1,

    slug: "frontend-development",

    title: "Frontend Web Development",

    thumbnail:
      "/src/assets/images/Beranda/Frontend Web Development.jpg",

    mentor: "Disty Academy",

    category: "Programming",

    level: "Beginner",

    duration: "12 Jam",

    totalStudents: 240,

    progress: 68,

    completed: false,

    description:
      "Pelajari dasar hingga mahir frontend development menggunakan HTML, CSS, JavaScript, dan React modern.",

    finalExam: {
      title: "Final Exam Frontend",
      totalQuestions: 20,
      duration: "30 Menit",
    },

    modules: [

      // ========================================
      // MODULE 1
      // ========================================

      {
        id: 1,

        title: "Pengenalan HTML",

        duration: "25 Menit",

        completed: true,

        video:
          "https://www.youtube.com/watch?v=qz0aGYrrlhU",

        materials: [
          "Apa itu HTML",
          "Struktur dasar HTML",
          "Heading dan paragraph",
          "List dan table",
        ],

        quiz: [
          {
            question:
              "HTML digunakan untuk?",

            options: [
              "Styling website",
              "Membuat struktur website",
              "Database",
              "Backend",
            ],

            answer:
              "Membuat struktur website",
          },
        ],
      },

      // ========================================
      // MODULE 2
      // ========================================

      {
        id: 2,

        title: "Dasar CSS",

        duration: "40 Menit",

        completed: true,

        video:
          "https://www.youtube.com/watch?v=1PnVor36_40",

        materials: [
          "Apa itu CSS",
          "Selector",
          "Flexbox",
          "Grid",
          "Responsive design",
        ],

        quiz: [
          {
            question:
              "CSS digunakan untuk?",

            options: [
              "Membuat struktur",
              "Styling website",
              "Database",
              "Server",
            ],

            answer:
              "Styling website",
          },
        ],
      },

      // ========================================
      // MODULE 3
      // ========================================

      {
        id: 3,

        title: "JavaScript Dasar",

        duration: "1 Jam",

        completed: false,

        video:
          "https://www.youtube.com/watch?v=W6NZfCO5SIk",

        materials: [
          "Variable",
          "Function",
          "Array",
          "Object",
          "Looping",
        ],

        quiz: [
          {
            question:
              "JavaScript digunakan untuk?",

            options: [
              "Membuat website interaktif",
              "Membuat database",
              "Membuat server fisik",
              "Mengedit gambar",
            ],

            answer:
              "Membuat website interaktif",
          },
        ],
      },

    ],
  },

  // ========================================
  // UI UX DESIGN
  // ========================================

  {
    id: 2,

    slug: "uiux-design",

    title: "UI/UX Design Bootcamp",

    thumbnail:
      "/src/assets/images/Beranda/UIUX Design Bootcamp.jpg",

    mentor: "Disty Academy",

    category: "Design",

    level: "Beginner",

    duration: "10 Jam",

    totalStudents: 180,

    progress: 32,

    completed: false,

    description:
      "Belajar membuat desain modern dan pengalaman pengguna yang profesional menggunakan Figma.",

    finalExam: {
      title: "Final Exam UI UX",
      totalQuestions: 15,
      duration: "25 Menit",
    },

    modules: [

      {
        id: 1,

        title: "Pengenalan UI UX",

        duration: "30 Menit",

        completed: true,

        video:
          "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",

        materials: [
          "Apa itu UI",
          "Apa itu UX",
          "Perbedaan UI dan UX",
          "Career path",
        ],

        quiz: [
          {
            question:
              "UX fokus pada?",

            options: [
              "Pengalaman pengguna",
              "Database",
              "Backend",
              "Server",
            ],

            answer:
              "Pengalaman pengguna",
          },
        ],
      },

      {
        id: 2,

        title: "Belajar Figma",

        duration: "50 Menit",

        completed: false,

        video:
          "https://www.youtube.com/watch?v=FTFaQWZBqQ8",

        materials: [
          "Frame",
          "Component",
          "Auto Layout",
          "Prototype",
        ],

        quiz: [
          {
            question:
              "Figma digunakan untuk?",

            options: [
              "Desain UI",
              "Database",
              "Server",
              "Hosting",
            ],

            answer:
              "Desain UI",
          },
        ],
      },

    ],
  },

];