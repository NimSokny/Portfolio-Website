import { motion } from 'motion/react'
import { Briefcase, Clock, Coffee, FileText, Lightbulb, Rocket, ShieldCheck, Target } from 'lucide-react'
import { profile } from '../data'
import { useLanguage } from '../context/LanguageContext'
import AnimatedProgressBar from './AnimatedProgressBar'
import DownloadCvMenu from './DownloadCvMenu'

const icons = [Briefcase, Clock, Coffee, Target]
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})
const h4 = 'font-bold text-on-surface text-sm uppercase tracking-widest font-mono'

export default function About() {
  const { lang, t } = useLanguage()

  return (
    <section id="about" className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          {...fade()}
          className="inline-block px-4 py-1.5 rounded-full glass-panel text-secondary text-sm font-mono mb-4 border border-secondary/20 shadow-[0_0_15px_rgba(78,222,163,0.15)]"
        >
          {t.about.badge}
        </motion.div>
        <h1 className="text-6xl md:text-7xl">
          {t.about.title1} <span className="text-secondary italic font-serif">{t.about.title2}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Card */}
        <motion.div
          {...fade()}
          className="md:col-span-4 glass-panel p-8 rounded-3xl flex flex-col items-center text-center hover:border-primary/40 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(76,215,246,0.15)] group"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
            <img
              alt={profile.name}
              src={profile.avatar}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <h3 className="text-2xl text-on-surface mb-3 pb-1 font-serif leading-normal">
            {lang === 'km' ? t.hero.name : profile.name}
          </h3>
          <p className="text-primary font-mono text-sm mb-6">{t.about.role}</p>
          <div className="flex items-center gap-2 text-secondary mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider">{t.about.available}</span>
          </div>
          <div className="w-full text-left space-y-4">
            <h4 className={h4}>{t.about.profileHeading}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t.about.aboutText}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.aboutTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg glass-panel text-[10px] uppercase tracking-wider font-mono text-primary hover:border-primary/50 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Technical Skills Progress Card (Highlighted in Screenshot) */}
        <motion.div
          {...fade(0.1)}
          className="md:col-span-4 glass-panel p-8 rounded-3xl flex flex-col hover:border-secondary/40 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(78,222,163,0.15)] group"
        >
          <h3 className="text-2xl text-on-surface mb-2 font-serif">{t.about.techHeading}</h3>
          <p className="text-on-surface-variant text-sm mb-8">{t.about.techSub}</p>

          <div className="space-y-6 mb-8">
            {t.about.skillsProgress.map((skill, idx) => (
              <AnimatedProgressBar
                key={skill.label}
                label={skill.label}
                value={skill.value}
                gradient={skill.gradient}
                glow={skill.glow}
                delay={0.2 + idx * 0.15}
              />
            ))}
          </div>

          <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
            <h4 className={h4}>{t.about.expHeading}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{t.about.expText}</p>
          </div>
        </motion.div>

        {/* Achievements Card */}
        <motion.div
          {...fade(0.2)}
          className="md:col-span-4 glass-panel p-8 rounded-3xl flex flex-col hover:border-tertiary/40 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(208,188,255,0.15)]"
        >
          <h3 className="text-2xl text-on-surface mb-2 font-serif">{t.about.achieveHeading}</h3>
          <p className="text-on-surface-variant text-sm mb-8">{t.about.achieveSub}</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {t.about.stats.map((s, i) => {
              const Icon = icons[i]
              const colors = ['text-primary', 'text-secondary', 'text-tertiary', 'text-error']
              return (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="p-4 rounded-2xl bg-surface-variant/20 border border-white/5 flex flex-col items-center text-center cursor-pointer hover:border-white/10"
                >
                  <Icon size={20} className={`mb-2 ${colors[i % colors.length]}`} />
                  <div className="text-xl font-bold text-on-surface font-mono">{s.value}</div>
                  <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">
                    {s.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
          <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
            <h4 className={h4}>{t.about.philosophyHeading}</h4>
            <div className="flex gap-3 items-center">
              <Lightbulb size={16} className="text-primary shrink-0" />
              <p className="text-[12px] text-on-surface-variant">{t.about.phil1}</p>
            </div>
            <div className="flex gap-3 items-center">
              <Rocket size={16} className="text-secondary shrink-0" />
              <p className="text-[12px] text-on-surface-variant">{t.about.phil2}</p>
            </div>
          </div>
        </motion.div>

        {/* Resume Card */}
        <motion.div
          {...fade(0.3)}
          className="md:col-span-6 glass-panel p-8 rounded-3xl flex flex-wrap gap-4 items-center justify-between hover:border-primary/40 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(76,215,246,0.12)]"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-2xl bg-primary/20 text-primary relative">
              <div className="absolute -top-1 -right-2 bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded font-bold">
                PDF
              </div>
              <FileText size={38} />
            </div>
            <div>
              <h3 className="text-xl text-on-surface mb-1 font-serif">{t.about.resumeHeading}</h3>
              <p className="text-on-surface-variant text-sm">{t.about.resumeSub}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <DownloadCvMenu variant="button" align="right" />
            <a
              href="/Nim-Sokny-Flutter-Mobile-Developer-CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full glass-panel text-[11px] font-bold uppercase tracking-wider text-on-surface hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {t.about.view}
            </a>
          </div>
        </motion.div>

        {/* Core Values Card */}
        <motion.div
          {...fade(0.4)}
          className="md:col-span-6 glass-panel p-8 rounded-3xl flex flex-wrap gap-4 items-center justify-between hover:border-tertiary/40 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(208,188,255,0.12)]"
        >
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full border-2 border-surface glass-panel flex items-center justify-center">
                <Lightbulb size={18} className="text-tertiary" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-surface glass-panel flex items-center justify-center">
                <ShieldCheck size={18} className="text-secondary" />
              </div>
            </div>
            <div>
              <h3 className="text-xl text-on-surface mb-1 font-serif">{t.about.valuesHeading}</h3>
              <p className="text-on-surface-variant text-sm">{t.about.valuesSub}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {t.about.values.map((v) => (
              <span
                key={v}
                className="px-3.5 py-1.5 rounded-xl glass-panel text-[11px] font-mono uppercase text-tertiary hover:border-tertiary/50 transition-colors"
              >
                {v}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
