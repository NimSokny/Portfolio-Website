// Edit this file to personalise the portfolio. All values below are placeholders.
export const profile = {
  name: 'Nim Sokny',
  role: 'Web & Flutter Mobile Developer',
  fullRole: 'Full-Stack Web & Flutter Mobile Developer',
  greeting: "Hi, I'm",
  description:
    'Crafting seamless digital experiences across mobile devices and the web. I build high-performance iOS & Android apps with Flutter, and fast, scalable web platforms with modern full-stack technologies.',
  heroTags: ['Flutter', 'Dart', 'React.js', 'Node.js', 'Firebase', 'PHP/Laravel', 'MySQL'],
  aboutText:
    'Versatile developer specializing in cross-platform Flutter mobile development and modern full-stack web solutions. Passionate about building end-to-end digital products from beautiful mobile UIs to scalable web platforms and APIs.',
  aboutTags: ['Flutter', 'Dart', 'React.js', 'Node.js', 'Firebase', 'PHP/Laravel', 'MySQL'],
  experienceText:
    'Specialized in developing production-ready Flutter mobile applications alongside full-stack web platforms and RESTful APIs with 2+ years of hands-on experience.',
  email: 'soknynim2@gmail.com',
  phones: [
    { carrier: 'Mobile', display: '+855 71 72 80 292', href: 'tel:+855717280292' },
    { carrier: 'Office', display: '+855 72 72 80 292', href: 'tel:+855727280292' },
  ],
  location: '371, Sen sok, Phnom Penh',
  mapUrl: 'https://maps.google.com/?q=Sen+Sok,+Phnom+Penh',
  telegram: 'https://t.me/NimSokny',
  linkedin: 'https://www.linkedin.com/in/sokny-nim-79ab4939a/',
  github: 'https://github.com/NimSokny',
  avatar: '/avatar.png',
}

export const stats = [
  { value: '10+', label: 'Projects', color: 'text-primary' },
  { value: '2+', label: 'Years Exp.', color: 'text-secondary' },
  { value: '1000+', label: 'Coffees', color: 'text-tertiary' },
  { value: '98%', label: 'Success', color: 'text-error' },
]

export type ProjectCategory = 'Full Stack' | 'Frontend' | 'Web Apps' | 'Mobile' | 'UX/UI Design'

export type Project = {
  id: string
  title: string
  description: string
  category: ProjectCategory
  categories: ProjectCategory[]
  image: string
  projectUrl?: string
  sourceUrl?: string
  tags: string[]
  stars: number
  year: number
  score: number
  status: 'Completed' | 'In Progress'
}

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=800`

export const projects: Project[] = [
  // Mobile Apps (Hong Kong Shop, Music Player, Tos Leng Ball, Franando app, Hang Meas TV app)
  {
    id: 'hong-kong-shop',
    title: 'Hong Kong Shop',
    description:
      'Modern cross-platform mobile e-commerce application built with Flutter. Features product catalog browsing, cart management, real-time order tracking, and secure checkout.',
    category: 'Mobile',
    categories: ['Mobile'],
    image: '/hong-kong-shop.jpg',
    projectUrl: '#',
    sourceUrl: '#',
    tags: ['Flutter', 'Dart', 'Firebase', 'State Management', 'REST API'],
    stars: 48,
    year: 2024,
    score: 96,
    status: 'Completed',
  },
  {
    id: 'music-player',
    title: 'Music Player',
    description:
      'Sleek and responsive mobile audio streaming app with smooth playback controls, custom playlist curation, audio visualizer, background streaming, and local caching.',
    category: 'Mobile',
    categories: ['Mobile'],
    image: '/music-player.jpg',
    projectUrl: '#',
    sourceUrl: '#',
    tags: ['Flutter', 'Dart', 'Audio Player', 'BLoC', 'UI/UX'],
    stars: 42,
    year: 2024,
    score: 94,
    status: 'Completed',
  },
  {
    id: 'tos-leng-ball',
    title: 'Tos Leng Ball',
    description:
      'Sports community mobile app in Cambodia for finding football pitches, booking time slots, organizing friendly matches, and team notifications.',
    category: 'Mobile',
    categories: ['Mobile'],
    image: '/tos-leng-ball.jpg',
    projectUrl: '#',
    sourceUrl: '#',
    tags: ['Flutter', 'Dart', 'Google Maps API', 'Firebase', 'Push Notifications'],
    stars: 56,
    year: 2024,
    score: 98,
    status: 'Completed',
  },
  {
    id: 'franando-app',
    title: 'Franando App',
    description:
      'Cross-platform mobile lifestyle & service scheduling app offering interactive booking workflows, user profiles, notifications, and fluid animations.',
    category: 'Mobile',
    categories: ['Mobile'],
    image: img('photo-1551650975-87deedd944c3'),
    projectUrl: '#',
    sourceUrl: '#',
    tags: ['Flutter', 'Dart', 'Provider', 'REST API', 'Material 3'],
    stars: 39,
    year: 2025,
    score: 93,
    status: 'Completed',
  },
  {
    id: 'hang-meas-tv',
    title: 'Hang Meas TV App',
    description:
      'Media and entertainment streaming mobile app for Hang Meas TV. Delivers fast live streaming, video-on-demand shows, program schedules, and real-time news alerts.',
    category: 'Mobile',
    categories: ['Mobile'],
    image: '/hang-meas-tv.jpg',
    projectUrl: '#',
    sourceUrl: '#',
    tags: ['Flutter', 'Dart', 'HLS Streaming', 'Video Player', 'Cloud Firestore'],
    stars: 64,
    year: 2025,
    score: 99,
    status: 'Completed',
  },

  // Web Projects: Web App, UX/UI, Frontend, Full Stack (Library System, PNC System, Rental Service, Online Voting)
  {
    id: 'library-management-system',
    title: 'Library Management System',
    description:
      'Full-stack web application designed for comprehensive book cataloging, member borrowing records, automated overdue calculation, and detailed administrative reports.',
    category: 'Full Stack',
    categories: ['Web Apps', 'UX/UI Design', 'Frontend', 'Full Stack'],
    image: img('photo-1521587760476-6c12a4b040da'),
    projectUrl: '#',
    sourceUrl: '#',
    tags: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'JavaScript'],
    stars: 45,
    year: 2024,
    score: 95,
    status: 'Completed',
  },
  {
    id: 'pnc-education-system',
    title: 'PNC Education System',
    description:
      'Academic management web portal built for Passerelles numériques Cambodia (PNC) to track student records, grading, class attendance, assignments, and curriculum progress.',
    category: 'Web Apps',
    categories: ['Web Apps', 'UX/UI Design', 'Frontend', 'Full Stack'],
    image: img('photo-1531482615713-2afd69097998'),
    projectUrl: '#',
    sourceUrl: '#',
    tags: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS'],
    stars: 58,
    year: 2025,
    score: 98,
    status: 'Completed',
  },
  {
    id: 'rental-service',
    title: 'Rental Service',
    description:
      'Modern web rental platform with intuitive search filters, responsive property listing galleries, booking availability calendars, and interactive booking inquiry forms.',
    category: 'Frontend',
    categories: ['Web Apps', 'UX/UI Design', 'Frontend', 'Full Stack'],
    image: img('photo-1560518883-ce09059eeffa'),
    projectUrl: '#',
    sourceUrl: '#',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'Figma'],
    stars: 36,
    year: 2024,
    score: 92,
    status: 'Completed',
  },
  {
    id: 'online-voting-system',
    title: 'Online Voting System',
    description:
      'Secure and transparent digital election web platform featuring voter verification, cryptographic ballot privacy, real-time tally visualization, and modern UI/UX design.',
    category: 'UX/UI Design',
    categories: ['Web Apps', 'UX/UI Design', 'Frontend', 'Full Stack'],
    image: img('photo-1540910419892-4a36d2c3266c'),
    projectUrl: '#',
    sourceUrl: '#',
    tags: ['Vue.js', 'Node.js', 'JWT Auth', 'MySQL', 'UI/UX Design'],
    stars: 47,
    year: 2025,
    score: 96,
    status: 'Completed',
  },
]

export type Skill = {
  title: string
  category: 'Mobile' | 'Frontend' | 'Backend' | 'Database' | 'Tools'
  expertise: number
  logo: string
  accent: string
  accentStrong: string
  tags: string[]
  exp: string
}
const dev = (n: string, v = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-${v}.svg`

export const skills: Skill[] = [
  { title: 'Flutter', category: 'Mobile', expertise: 92, logo: dev('flutter'), accent: '#02569B', accentStrong: '#0175C2', tags: ['Cross-Platform', 'Widgets', 'Animations'], exp: '2+ years exp.' },
  { title: 'Dart', category: 'Mobile', expertise: 90, logo: dev('dart'), accent: '#0175C2', accentStrong: '#00B4AB', tags: ['OOP', 'Async', 'Null Safety'], exp: '2+ years exp.' },
  { title: 'Android', category: 'Mobile', expertise: 84, logo: dev('android'), accent: '#3DDC84', accentStrong: '#32B36B', tags: ['Java/Kotlin', 'Gradle', 'Deployment'], exp: '2 years exp.' },
  { title: 'Vue.js', category: 'Frontend', expertise: 90, logo: dev('vuejs'), accent: '#42d392', accentStrong: '#27ae60', tags: ['Reactive', 'SPA', 'Vuex'], exp: '3 years exp.' },
  { title: 'JavaScript', category: 'Frontend', expertise: 90, logo: dev('javascript'), accent: '#f2c94c', accentStrong: '#f0b90b', tags: ['ES6+', 'DOM', 'Async'], exp: '3 years exp.' },
  { title: 'HTML5', category: 'Frontend', expertise: 95, logo: dev('html5'), accent: '#ff6b35', accentStrong: '#e34f26', tags: ['Semantic', 'Accessibility', 'SEO'], exp: '3 years exp.' },
  { title: 'CSS3 & SCSS', category: 'Frontend', expertise: 90, logo: dev('css3'), accent: '#2d9cdb', accentStrong: '#1572b6', tags: ['Responsive', 'Animations', 'Tailwind'], exp: '4 years exp.' },
  { title: 'Node.js', category: 'Backend', expertise: 85, logo: dev('nodejs'), accent: '#6cc24a', accentStrong: '#3c873a', tags: ['Express', 'REST API', 'JWT'], exp: '3 years exp.' },
  { title: 'Firebase', category: 'Backend', expertise: 88, logo: dev('firebase', 'plain'), accent: '#FFCA28', accentStrong: '#FFA000', tags: ['Auth', 'Firestore', 'FCM'], exp: '2 years exp.' },
  { title: 'PHP', category: 'Backend', expertise: 85, logo: dev('php'), accent: '#8892bf', accentStrong: '#4f5b93', tags: ['OOP', 'PDO', 'REST'], exp: '3 years exp.' },
  { title: 'Laravel', category: 'Backend', expertise: 84, logo: dev('laravel'), accent: '#ff6459', accentStrong: '#e0342a', tags: ['Eloquent', 'Artisan', 'API'], exp: '3 years exp.' },
  { title: 'MySQL', category: 'Database', expertise: 82, logo: dev('mysql'), accent: '#00a0c6', accentStrong: '#00618a', tags: ['Relational', 'Optimization', 'Joins'], exp: '3 years exp.' },
  { title: 'Git & GitHub', category: 'Tools', expertise: 88, logo: dev('git'), accent: '#f4694b', accentStrong: '#c2361c', tags: ['Branching', 'PRs', 'CI/CD'], exp: '3 years exp.' },
  { title: 'Jira', category: 'Tools', expertise: 82, logo: dev('jira'), accent: '#3b82f6', accentStrong: '#0052cc', tags: ['Agile', 'Sprints', 'Boards'], exp: '2 years exp.' },
]
