import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { profile } from '../data'
import { useLanguage } from '../context/LanguageContext'
import DownloadCvMenu from './DownloadCvMenu'
import LanguageMenu from './LanguageMenu'

export default function Header() {
  const { lang, toggleLang, t } = useLanguage()
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const links = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-white/80 dark:border-white/10 bg-white/90 dark:bg-surface/70 backdrop-blur-xl z-50 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_0_40px_rgba(76,215,246,0.1)]">
      <nav className="flex justify-between items-center px-6 md:px-8 py-3">
        <a href="#home" className="font-serif text-xl md:text-2xl font-bold text-primary tracking-tight hover:opacity-80 transition-opacity">
          {lang === 'km' ? t.hero.name : profile.name}
        </a>
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => {
                if (l.id === 'skills') {
                  window.dispatchEvent(new CustomEvent('nav-skills-clicked'))
                }
              }}
              className="text-sm font-medium text-on-surface-variant transition-colors duration-300 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDark((d) => !d)}
            className="p-2 text-primary border border-slate-200/70 dark:border-white/20 glass-panel hover:border-primary/60 hover:bg-surface-bright/20 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Language Translate Dropdown Menu (Matched to User Reference Image 1) */}
          <LanguageMenu />

          {/* Download CV Menu Dropdown */}
          <DownloadCvMenu variant="icon" align="right" />
        </div>
      </nav>
    </header>
  )
}
