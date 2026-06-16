import Link from 'next/link';

const japaneseCourses = [
  {
    level: 'N5',
    title: 'Japanese N5',
    subtitle: 'Beginner Level',
    description: 'Start your Japanese journey with Hiragana, Katakana, basic grammar, ~800 vocabulary words, and essential conversation skills for JLPT N5.',
    duration: '12 weeks',
    price: '¥29,800',
    color: 'bg-blue-600',
    textColor: 'text-blue-100',
    topics: ['Hiragana & Katakana', 'Basic Grammar', '800 Vocabulary', 'Simple Conversations'],
  },
  {
    level: 'N4',
    title: 'Japanese N4',
    subtitle: 'Elementary Level',
    description: 'Build on N5 foundations with intermediate grammar patterns, ~1,500 vocabulary words, Kanji 300, and everyday Japanese conversation.',
    duration: '14 weeks',
    price: '¥34,800',
    color: 'bg-blue-700',
    textColor: 'text-blue-100',
    topics: ['300 Kanji', '1,500 Vocabulary', 'Intermediate Grammar', 'Daily Conversations'],
  },
  {
    level: 'N3',
    title: 'Japanese N3',
    subtitle: 'Intermediate Level',
    description: 'Bridge beginner and advanced Japanese. Master ~3,750 vocabulary words, 650 Kanji, complex grammar and natural reading ability.',
    duration: '16 weeks',
    price: '¥39,800',
    color: 'bg-indigo-600',
    textColor: 'text-indigo-100',
    topics: ['650 Kanji', '3,750 Vocabulary', 'Complex Grammar', 'Reading & Writing'],
  },
  {
    level: 'N2',
    title: 'Japanese N2',
    subtitle: 'Upper-Intermediate Level',
    description: 'Advance to near-fluency with ~6,000 vocabulary words, 1,000 Kanji, advanced grammar, and business Japanese communication.',
    duration: '20 weeks',
    price: '¥49,800',
    color: 'bg-purple-600',
    textColor: 'text-purple-100',
    topics: ['1,000 Kanji', '6,000 Vocabulary', 'Business Japanese', 'Advanced Grammar'],
  },
  {
    level: 'N1',
    title: 'Japanese N1',
    subtitle: 'Advanced Level',
    description: 'Achieve Japanese mastery with ~10,000 vocabulary words, 2,000 Kanji, literary Japanese, and professional communication skills.',
    duration: '24 weeks',
    price: '¥59,800',
    color: 'bg-red-600',
    textColor: 'text-red-100',
    topics: ['2,000 Kanji', '10,000 Vocabulary', 'Literary Japanese', 'Professional Communication'],
  },
];

const programmingCourses = [
  {
    title: 'C Programming',
    subtitle: 'Fundamentals',
    description: 'Learn the foundation of all programming. Master memory management, pointers, data structures, and system-level programming in C.',
    duration: '10 weeks',
    price: '¥29,800',
    color: 'bg-gray-700',
    textColor: 'text-gray-200',
    icon: '🔧',
    topics: ['Pointers & Memory', 'Data Structures', 'File I/O', 'System Programming'],
  },
  {
    title: 'C++ Programming',
    subtitle: 'Object-Oriented',
    description: 'Advance from C to C++ with Object-Oriented Programming, STL, templates, and modern C++17/20 features for high-performance applications.',
    duration: '12 weeks',
    price: '¥34,800',
    color: 'bg-blue-800',
    textColor: 'text-blue-200',
    icon: '⚙️',
    topics: ['OOP Concepts', 'STL & Templates', 'Modern C++17/20', 'Performance Optimization'],
  },
  {
    title: 'Java Programming',
    subtitle: 'Full Stack Development',
    description: 'Master Java from core fundamentals to enterprise development. Includes OOP, collections, multithreading, JDBC, and backend APIs.',
    duration: '16 weeks',
    price: '¥39,800',
    color: 'bg-orange-600',
    textColor: 'text-orange-100',
    icon: '☕',
    topics: ['Core Java & OOP', 'Collections & Streams', 'Multithreading', 'REST APIs'],
  },
  {
    title: 'Spring Boot',
    subtitle: 'Enterprise Java Framework',
    description: 'Build robust enterprise applications with Spring Boot, Spring Security, JPA/Hibernate, microservices, and Docker deployment.',
    duration: '14 weeks',
    price: '¥44,800',
    color: 'bg-green-600',
    textColor: 'text-green-100',
    icon: '🌱',
    topics: ['Spring MVC & REST', 'Spring Security & JWT', 'JPA & Hibernate', 'Microservices & Docker'],
  },
  {
    title: 'JavaScript',
    subtitle: 'Web Development',
    description: 'Master modern JavaScript (ES6+) with DOM manipulation, async programming, Fetch API, and build interactive web applications.',
    duration: '12 weeks',
    price: '¥34,800',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-900',
    icon: '⚡',
    topics: ['ES6+ Modern JS', 'DOM Manipulation', 'Async/Await & Promises', 'Web APIs'],
  },
  {
    title: 'Vue.js',
    subtitle: 'Progressive Framework',
    description: 'Build modern, reactive web applications with Vue 3, Composition API, Pinia state management, Vue Router, and TypeScript integration.',
    duration: '10 weeks',
    price: '¥34,800',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-100',
    icon: '💚',
    topics: ['Vue 3 & Composition API', 'Pinia State Management', 'Vue Router', 'TypeScript Integration'],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-700">
                MIRAI Tech Academy
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#courses" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Courses
              </a>
              <Link href="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link href="/register" className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Learn Japanese & Programming
            <br />
            <span className="text-primary-600">With Expert Instructors</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master Japanese language from N5 to N1 and become a skilled programmer with our comprehensive courses.
            Join live online classes or attend in-person sessions at MIRAI Tech Academy.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#courses" className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition">
              Explore Courses
            </a>
            <Link href="/login" className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-50 transition">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Instructors</h3>
            <p className="text-gray-600">
              Learn from experienced teachers who are native Japanese speakers and industry professionals.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive Curriculum</h3>
            <p className="text-gray-600">
              Structured courses from beginner to advanced levels in both Japanese and programming.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Learning</h3>
            <p className="text-gray-600">
              Choose between online and offline classes with flexible scheduling options.
            </p>
          </div>
        </div>
      </div>

      {/* Japanese Courses Section */}
      <div id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">🇯🇵 Japanese Language Courses</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            JLPT-aligned curriculum from complete beginner (N5) to master level (N1). Taught by native Japanese instructors.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {japaneseCourses.map((course) => (
            <div key={course.level} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className={`${course.color} text-white p-5`}>
                <div className="text-3xl font-black mb-1">{course.level}</div>
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className={`text-sm ${course.textColor}`}>{course.subtitle}</p>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p>
                <ul className="space-y-1 mb-4">
                  {course.topics.map((topic) => (
                    <li key={topic} className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="text-green-500">✓</span> {topic}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">{course.duration}</p>
                    <p className="text-sm font-bold text-primary-700">{course.price}</p>
                  </div>
                  <Link href="/login" className="text-xs bg-primary-600 text-white px-3 py-1.5 rounded-md hover:bg-primary-700 transition">
                    Enroll →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Programming Courses Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">💻 Programming Courses</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From systems programming to modern web development — build real-world skills with industry-relevant projects.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmingCourses.map((course) => (
              <div key={course.title} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className={`${course.color} text-white p-5`}>
                  <div className="text-3xl mb-2">{course.icon}</div>
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <p className={`text-sm ${course.textColor}`}>{course.subtitle}</p>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p>
                  <ul className="space-y-1 mb-4">
                    {course.topics.map((topic) => (
                      <li key={topic} className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="text-green-500">✓</span> {topic}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400">{course.duration}</p>
                      <p className="text-sm font-bold text-primary-700">{course.price}</p>
                    </div>
                    <Link href="/login" className="text-xs bg-primary-600 text-white px-3 py-1.5 rounded-md hover:bg-primary-700 transition">
                      Enroll →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-primary-700 mb-2">500+</div>
            <p className="text-gray-600 font-medium">Active Students</p>
          </div>
          <div>
            <div className="text-4xl font-black text-primary-700 mb-2">11</div>
            <p className="text-gray-600 font-medium">Courses Available</p>
          </div>
          <div>
            <div className="text-4xl font-black text-primary-700 mb-2">95%</div>
            <p className="text-gray-600 font-medium">JLPT Pass Rate</p>
          </div>
          <div>
            <div className="text-4xl font-black text-primary-700 mb-2">20+</div>
            <p className="text-gray-600 font-medium">Expert Instructors</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">MIRAI Tech Academy</h3>
              <p className="text-gray-400">
                Empowering students with Japanese language skills and technical expertise for global opportunities.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Japanese N5 ~ N1</li>
                <li>C / C++ Programming</li>
                <li>Java & Spring Boot</li>
                <li>JavaScript & Vue.js</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <p className="text-gray-400">
                Email: info@miraitech.academy<br />
                Phone: +81-XX-XXXX-XXXX<br />
                Tokyo, Japan
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 MIRAI Tech Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
