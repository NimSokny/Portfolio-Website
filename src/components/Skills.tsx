import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronDown, ChevronUp, Database, LayoutGrid, Layers, Monitor, Server, Smartphone, Wrench } from 'lucide-react'
import { skills } from '../data'
import { useLanguage } from '../context/LanguageContext'
import SkillCardProgress from './SkillCardProgress'

const catIcons: Record<string, React.ReactNode> = {
  All: <LayoutGrid size={22} />,
  Mobile: <Smartphone size={22} />,
  Frontend: <Monitor size={22} />,
  Backend: <Server size={22} />,
  Database: <Database size={22} />,
  Tools: <Wrench size={22} />,
}

export default function Skills() {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  // Listen for clicks on the header "Skills" link or hash changes to re-trigger card animations
  useEffect(() => {
    const handleTrigger = () => {
      setAnimKey((k) => k + 1)
    }

    const handleHash = () => {
      if (window.location.hash === '#skills') {
        handleTrigger()
      }
    }

    window.addEventListener('nav-skills-clicked', handleTrigger)
    window.addEventListener('hashchange', handleHash)

    return () => {
      window.removeEventListener('nav-skills-clicked', handleTrigger)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  const catKeys = ['All', 'Mobile', 'Frontend', 'Backend', 'Database', 'Tools'] as const

  const list = active === 'All' ? skills : skills.filter((s) => s.category === active)
  const displayedSkills = showAll ? list : list.slice(0, 9)
  const count = (k: string) => (k === 'All' ? skills.length : skills.filter((s) => s.category === k).length)

  const handleCategoryChange = (key: string) => {
    setActive(key)
    setShowAll(false)
  }

  return (
    <section id="skills" className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs mb-6 shadow-[0_0_15px_rgba(76,215,246,0.15)]"
        >
          {t.skills.badge}
        </motion.div>
        <h1 className="text-6xl md:text-7xl text-on-surface mb-4">
          {t.skills.title1} <span className="text-primary italic font-serif">{t.skills.title2}</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          {t.skills.sub}
        </p>
      </header>

      {/* Category Tabs */}
      <div className="mb-16 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap justify-center gap-4 min-w-max">
          {catKeys.map((key) => {
            const isSelected = active === key
            const translatedLabel = t.skills.cats[key] || key
            return (
              <button
                key={key}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleCategoryChange(key)}
                className={`flex flex-col items-center gap-2 px-8 py-4 rounded-2xl border transition-colors duration-150 min-w-[124px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
                  isSelected
                    ? 'border-primary/60 bg-surface-container-high text-primary shadow-[0_0_24px_rgba(76,215,246,0.2)]'
                    : 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:border-primary/40 hover:text-on-surface'
                }`}
              >
                {catIcons[key]}
                <span className="font-mono text-sm uppercase tracking-wider">{translatedLabel}</span>
                <span className="text-[10px] opacity-70">
                  {count(key)} {t.skills.skillsCount}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedSkills.map((s, i) => (
          <motion.article
            key={`${s.title}-${animKey}`}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: (i % 6) * 0.04 }}
            className="glass-panel rounded-3xl overflow-hidden group hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            <div
              className="h-52 overflow-hidden p-6 flex flex-col justify-end relative"
              style={{
                background: `linear-gradient(135deg, ${s.accent} 0%, ${s.accentStrong} 48%, #ffd166 130%)`,
              }}
            >
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_12px_12px,white_1.5px,transparent_2px)] bg-[length:18px_18px]" />
              <div className="absolute -left-12 bottom-2 h-36 w-36 rounded-full bg-white/20" />
              <div className="absolute right-[-36px] top-10 h-40 w-40 rounded-full bg-white/10" />
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono font-bold text-white uppercase tracking-widest shadow-md">
                {s.category}
              </div>

              <div className="absolute left-8 top-12 flex items-center gap-4 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_14px_28px_rgba(15,23,42,0.22)] group-hover:scale-105 transition-transform">
                  <img src={s.logo} alt={`${s.title} logo`} className="h-16 w-16 object-contain" loading="lazy" />
                </div>
                <h3 className="max-w-[150px] font-sans text-2xl font-black leading-tight text-white drop-shadow-[0_2px_8px_rgba(15,23,42,0.24)]">
                  {s.title}
                </h3>
              </div>

              <div className="absolute right-16 top-16 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                <Layers size={22} />
              </div>

              {/* Animated Progress Bar with Dynamic Count-up */}
              <SkillCardProgress
                label={t.skills.mastery}
                percentage={s.expertise}
                triggerKey={animKey}
                delay={0.1 + (i % 6) * 0.06}
              />
            </div>

            <div className="p-8">
              <h3 className="text-2xl text-on-surface mb-2 tracking-tight font-serif">{s.title}</h3>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                Applied in production mobile apps to build clean, maintainable, and high-performance user experiences.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {s.tags.map((tTag) => (
                  <span
                    key={tTag}
                    className="px-3 py-1 rounded-full bg-surface-variant/40 text-[10px] font-mono font-medium text-on-surface uppercase tracking-wider"
                  >
                    {tTag}
                  </span>
                ))}
              </div>
              <div className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                {s.exp}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Show More / Show Less Button (Only shown when category has more than 3 rows / 9 cards in the 3-column grid) */}
      {list.length > 9 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0b1726]/80 backdrop-blur-md text-[#0b7c8f] dark:text-[#38d9f5] font-mono text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-md hover:border-[#0b7c8f]/60 dark:hover:border-[#38d9f5]/60 hover:bg-[#0b7c8f]/5 dark:hover:bg-[#38d9f5]/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>
              {showAll
                ? (t.skills.showLess || (lang === 'km' ? 'បង្ហាញតិចជាង' : 'Show Less'))
                : (t.skills.showMore || (lang === 'km' ? 'បង្ហាញបន្ថែម' : 'Show More'))}
            </span>
            {showAll ? (
              <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
      )}
    </section>
  )
}
