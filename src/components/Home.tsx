import { useState } from 'react'
import { motion } from 'motion/react'
import { Code2, Globe, Share2, Smartphone, Sparkles } from 'lucide-react'
import { profile } from '../data'
import { useLanguage } from '../context/LanguageContext'
import DownloadCvMenu from './DownloadCvMenu'

export default function Home() {
  const { lang, t } = useLanguage()
  const [toast, setToast] = useState('')

  const flash = (m: string) => {
    setToast(m)
    setTimeout(() => setToast(''), 2200)
  }

  const share = async () => {
    const data = { title: `${t.hero.name} Portfolio`, url: window.location.href }
    try {
      if (navigator.share) {
        await navigator.share(data)
        return flash(t.hero.shared)
      }
      await navigator.clipboard.writeText(data.url)
      flash(t.hero.linkCopied)
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return
      flash('Share unavailable')
    }
  }

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-16 overflow-hidden flex items-center">
      {/* Dynamic Background Glows (Matched to ambient palette in light & dark mode) */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-28 w-[520px] h-[520px] bg-[#cbe7f8] dark:bg-[#153f60]/60 rounded-full blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 -right-28 w-[540px] h-[540px] bg-[#c2efe2] dark:bg-[#124955]/50 rounded-full blur-[120px] pointer-events-none"
      />
      <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] bg-[#dbe8fd]/60 dark:bg-[#1c486e]/40 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full z-10">
        <motion.div
          key={lang}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-2 lg:order-1 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-primary text-sm font-mono mb-6 border-primary/20 shadow-[0_0_15px_rgba(76,215,246,0.15)]"
          >
            <Sparkles size={14} className="text-secondary animate-pulse" />
            <span>{t.hero.greeting}</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl text-on-surface mb-4 pb-2 leading-tight tracking-tight">
            {lang === 'km' ? t.hero.name : profile.name}
          </h1>

          {/* Dual Specialty Badges (Flutter Mobile & Web Programming) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-7">
            {/* Flutter Mobile Badge */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-white/80 dark:border-white/10 shadow-[0_4px_16px_rgba(11,124,143,0.08)] hover:shadow-[0_6px_20px_rgba(11,124,143,0.18)] hover:border-primary/50 transition-all duration-300 cursor-default"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-[#02569B] to-[#4cd7f6] text-white shadow-sm">
                <Smartphone size={14} />
              </span>
              <span className="text-xs md:text-sm font-sans font-semibold text-on-surface tracking-wide">
                {t.hero.mobilePill}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse" />
            </motion.div>

            {/* Web Programming Badge */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-white/80 dark:border-white/10 shadow-[0_4px_16px_rgba(13,135,117,0.08)] hover:shadow-[0_6px_20px_rgba(13,135,117,0.18)] hover:border-secondary/50 transition-all duration-300 cursor-default"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-[#087c55] to-[#4edea3] text-white shadow-sm">
                <Globe size={14} />
              </span>
              <span className="text-xs md:text-sm font-sans font-semibold text-on-surface tracking-wide">
                {t.hero.webPill}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
            </motion.div>
          </div>

          <h2 className="text-2xl md:text-3xl text-primary/90 mb-6 font-serif tracking-wide leading-normal">
            {t.hero.role}
          </h2>

          <p className="text-base md:text-lg text-on-surface-variant max-w-xl mb-8 mx-auto lg:mx-0 leading-relaxed">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
            {profile.heroTags.map((tag, idx) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="px-4 py-1.5 rounded-xl glass-panel border-outline-variant/30 text-xs font-mono text-secondary hover:border-primary/40 hover:text-primary transition-all duration-300"
              >
                {tag}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#38d9f5] via-[#41dbbd] to-[#4edea3] text-slate-950 font-bold shadow-[0_0_20px_rgba(76,215,246,0.3)] hover:shadow-[0_0_30px_rgba(76,215,246,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center justify-center cursor-pointer"
            >
              {t.hero.viewWork}
            </a>
            <DownloadCvMenu variant="pill" align="center" />
            <div className="flex gap-3 ml-0 lg:ml-4 mt-4 sm:mt-0">
              <button
                type="button"
                aria-label={t.hero.openPortfolio}
                onClick={() => window.open(window.location.href, '_blank', 'noopener,noreferrer')}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-300/70 dark:border-white/15 bg-transparent hover:bg-primary/10 dark:hover:bg-[#38d9f5]/10 text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-[#38d9f5] hover:border-primary/60 dark:hover:border-[#38d9f5]/60 hover:shadow-[0_0_18px_rgba(56,217,245,0.3)] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 shadow-none"
              >
                <Globe size={19} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                aria-label={t.hero.sharePortfolio}
                onClick={share}
                className="relative w-12 h-12 flex items-center justify-center rounded-full border border-slate-300/70 dark:border-white/15 bg-transparent hover:bg-primary/10 dark:hover:bg-[#38d9f5]/10 text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-[#38d9f5] hover:border-primary/60 dark:hover:border-[#38d9f5]/60 hover:shadow-[0_0_18px_rgba(56,217,245,0.3)] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 shadow-none"
              >
                <Share2 size={19} strokeWidth={1.8} />
                {toast && (
                  <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-surface-container-high px-3 py-1 text-xs font-bold text-on-surface shadow-lg border border-primary/30">
                    {toast}
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Hero Avatar with Soft Ambient Aura & Floating Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
          <div className="relative w-72 h-72 md:w-[460px] md:h-[460px]">
            {/* Glowing soft ambient aura pulse */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-secondary/20 to-tertiary animate-pulse blur-md opacity-35" />
            <div className="absolute inset-2 rounded-full border-2 border-white/40 dark:border-white/20 z-0 shadow-[0_0_80px_10px_rgba(76,215,246,0.25)]" />
            
            {/* Portrait Container with Crisp Border */}
            <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-white/95 dark:border-white/10 z-10 shadow-2xl bg-white dark:bg-[#0a1322]">
              <img
                alt={profile.name}
                src={profile.avatar}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Tech Badge 1: Web Programming (Top Right, duration 4s float) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              title="Web Programming"
              className="absolute top-10 right-0 w-16 h-16 rounded-2xl glass-panel flex items-center justify-center z-20 shadow-xl border border-white/20 hover:scale-110 transition-transform cursor-pointer"
            >
              <Globe className="text-primary" size={30} />
            </motion.div>

            {/* Floating Tech Badge 2: Flutter Mobile (Bottom Left, duration 5s float) */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              title="Flutter Mobile Development"
              className="absolute bottom-10 -left-4 w-14 h-14 rounded-2xl glass-panel flex items-center justify-center z-20 shadow-xl border border-white/20 hover:scale-110 transition-transform cursor-pointer"
            >
              <Smartphone className="text-secondary" size={26} />
            </motion.div>

            {/* Floating Tech Badge 3: Clean Code & Architecture (Top Left, duration 4.5s float) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 left-12 w-12 h-12 rounded-xl glass-panel flex items-center justify-center z-20 shadow-lg border border-tertiary/30 hover:scale-110 transition-transform"
            >
              <Code2 className="text-tertiary" size={20} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
