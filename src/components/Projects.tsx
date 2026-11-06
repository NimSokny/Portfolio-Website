import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Calendar, CheckCircle2, ChevronDown, ChevronUp, Code2, ExternalLink, Star, Trophy } from 'lucide-react'
import { projects } from '../data'
import { useLanguage } from '../context/LanguageContext'
import PrivateRepoModal from './PrivateRepoModal'

const filterKeys = ['All', 'Mobile', 'Web Apps', 'UX/UI Design', 'Frontend', 'Full Stack'] as const

export default function Projects() {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState<string>('All')
  const [showAll, setShowAll] = useState(false)
  const [modalProject, setModalProject] = useState<string | null>(null)

  const list =
    active === 'All'
      ? projects
      : projects.filter((p) => p.categories?.includes(active as any) || p.category === active)

  const displayedProjects = showAll ? list : list.slice(0, 9)

  return (
    <section id="projects" className="pt-32 pb-16 px-6 max-w-[1600px] mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-7xl">
          {t.projects.title1} <span className="text-primary italic font-serif">{t.projects.title2}</span>
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex flex-nowrap justify-center gap-3 min-w-max">
          {filterKeys.map((f) => {
            const isSelected = active === f
            const label = t.projects.filters[f] || f
            const count =
              f === 'All'
                ? projects.length
                : projects.filter((p) => p.categories?.includes(f as any) || p.category === f).length
            return (
              <motion.button
                key={f}
                type="button"
                onClick={() => {
                  setActive(f)
                  setShowAll(false)
                }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 py-2.5 rounded-full border text-xs md:text-sm font-medium transition-colors duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'border-primary text-on-primary font-bold'
                    : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:border-primary/50 hover:text-on-surface'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="project-filter-active"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-primary shadow-[0_0_15px_rgba(76,215,246,0.4)]"
                  />
                )}
                <span className="relative z-10">{label}</span>
                <span
                  className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    isSelected
                      ? 'bg-black/25 text-on-primary'
                      : 'bg-surface-variant/50 text-on-surface-variant'
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Projects Grid (Clean 3-column layout) */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((p, i) => {
            const kmItem =
              lang === 'km' ? t.projects.items.find((item: { id?: string }) => item.id === p.id) : null
            const projectTitle = kmItem?.title || p.title
            const projectDesc = kmItem?.description || p.description
            const statusLabel =
              p.status === 'Completed' ? t.projects.completed : t.projects.inProgress

            return (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: 'easeOut',
                  layout: { duration: 0.35, ease: 'easeOut' },
                }}
                className="glass-panel rounded-3xl overflow-hidden flex flex-col hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-white/5 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.image}
                    alt={projectTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-on-secondary-container shadow-md">
                    <CheckCircle2 size={12} /> {statusLabel}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary/20 backdrop-blur-md px-3 py-1 rounded-lg border border-primary/30 text-[10px] font-bold text-primary italic">
                    {active !== 'All' ? ((t.projects.filters as Record<string, string>)[active] || active) : p.category}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl text-on-surface mb-3 font-serif tracking-tight">
                    {projectTitle}
                  </h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed mb-6 line-clamp-4">
                    {projectDesc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-surface-variant/30 border border-white/5 text-[9px] font-mono text-on-surface uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mb-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <Star size={14} className="fill-secondary" />
                      <span className="text-xs font-bold text-on-surface">{p.stars}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-primary">
                      <Calendar size={14} />
                      <span className="text-xs font-bold text-on-surface">{p.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-tertiary">
                      <Trophy size={14} />
                      <span className="text-xs font-bold text-on-surface">{p.score}/100</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <a
                      href={p.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-disabled={!p.projectUrl}
                      className={`flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(76,215,246,0.35)] hover:scale-105 active:scale-95 ${
                        !p.projectUrl ? 'pointer-events-none opacity-60' : ''
                      }`}
                    >
                      <ExternalLink size={14} /> {t.projects.liveDemo}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        if (!p.sourceUrl || p.sourceUrl === '#') {
                          setModalProject(projectTitle)
                        } else {
                          window.open(p.sourceUrl, '_blank', 'noopener,noreferrer')
                        }
                      }}
                      className="flex-1 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/5 hover:border-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Code2 size={14} /> {t.projects.sourceCode}
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Show More / Show Less Button (Only shown when list has more than 9 cards / 3 rows in the 3-column grid) */}
      {list.length > 9 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0b1726]/80 backdrop-blur-md text-[#0b7c8f] dark:text-[#38d9f5] font-mono text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-md hover:border-[#0b7c8f]/60 dark:hover:border-[#38d9f5]/60 hover:bg-[#0b7c8f]/5 dark:hover:bg-[#38d9f5]/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>
              {showAll
                ? (t.projects.showLess || (lang === 'km' ? 'បង្ហាញតិចជាង' : 'Show Less'))
                : (t.projects.showMore || (lang === 'km' ? 'បង្ហាញបន្ថែម' : 'Show More'))}
            </span>
            {showAll ? (
              <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
      )}

      {list.length === 0 && (
        <p className="py-16 text-center text-sm text-on-surface-variant">
          No projects found in this category.
        </p>
      )}

      {/* Private Repository Modal */}
      <PrivateRepoModal
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
        projectTitle={modalProject || ''}
      />
    </section>
  )
}
