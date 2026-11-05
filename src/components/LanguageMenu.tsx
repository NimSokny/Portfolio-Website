import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageMenu() {
  const { lang, setLang, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const startTimer = () => {
    clearTimer()
    timerRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      startTimer()
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    } else {
      clearTimer()
    }

    return () => {
      clearTimer()
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={menuRef} className="relative inline-flex items-center">
      {/* Language Trigger Button (No border, clean non-bold icon, enlarged visible badge) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title={t.nav.switchLang}
        aria-label={t.nav.switchLang}
        aria-expanded={isOpen}
        className="p-1.5 text-primary hover:opacity-80 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center group focus:outline-none"
      >
        <div className="relative inline-flex items-center justify-center">
          {/* Languages icon (Clean, sleek, non-bold strokes) */}
          <Languages
            size={23}
            strokeWidth={1.6}
            className="text-primary group-hover:scale-105 transition-transform duration-200 shrink-0"
          />

          {/* Enlarged Pill Badge (Clearly visible EN / KM) */}
          <span className="absolute -bottom-1.5 -right-2 min-w-[20px] h-[14px] px-1 bg-[#0b7c8f] dark:bg-[#38d9f5] text-white dark:text-[#04141d] text-[9.5px] font-mono font-black rounded-full flex items-center justify-center leading-none shadow-sm select-none pointer-events-none tracking-tight">
            {lang === 'km' ? 'KM' : 'EN'}
          </span>
        </div>
      </button>

      {/* Language Selection Dropdown (Auto-hides after 3s) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onMouseEnter={clearTimer}
            onMouseLeave={startTimer}
            className="absolute right-0 top-full mt-3 w-44 md:w-48 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0c1828]/95 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.65)] p-2 z-50 flex flex-col gap-1"
          >
            {/* Option 1: English (EN) */}
            <button
              type="button"
              onClick={() => {
                setLang('en')
                setIsOpen(false)
              }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer w-full text-left group ${
                lang === 'en'
                  ? 'bg-slate-100/90 dark:bg-primary/15'
                  : 'hover:bg-slate-100/70 dark:hover:bg-white/5'
              }`}
            >
              <span className="text-sm font-semibold text-slate-800 dark:text-white">
                English
              </span>
              <span className="text-xs font-mono font-bold text-[#0b7c8f] dark:text-[#38d9f5]">
                EN
              </span>
            </button>

            {/* Option 2: Khmer (KM) */}
            <button
              type="button"
              onClick={() => {
                setLang('km')
                setIsOpen(false)
              }}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer w-full text-left group ${
                lang === 'km'
                  ? 'bg-slate-100/90 dark:bg-primary/15'
                  : 'hover:bg-slate-100/70 dark:hover:bg-white/5'
              }`}
            >
              <span className="text-sm font-semibold text-slate-800 dark:text-white">
                Khmer
              </span>
              <span className="text-xs font-mono font-bold text-[#0b7c8f] dark:text-[#38d9f5]">
                KM
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
