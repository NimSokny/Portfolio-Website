import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Download, FileDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface DownloadCvMenuProps {
  variant?: 'icon' | 'pill' | 'button'
  align?: 'left' | 'right' | 'center'
  className?: string
}

export default function DownloadCvMenu({
  variant = 'icon',
  align = 'right',
  className = '',
}: DownloadCvMenuProps) {
  const { lang, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleDownload = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    fileUrl: string,
    fileName: string,
  ) => {
    try {
      const res = await fetch(fileUrl)
      if (res.ok) {
        e.preventDefault()
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch {
      // Fallback to default anchor download
    }
    setIsOpen(false)
  }

  const cvOptions = [
    {
      title: lang === 'km' ? 'កម្មវិធីទូរស័ព្ទ Flutter' : 'Flutter Mobile App',
      file: '/Nim-Sokny-Flutter-Mobile-Developer-CV.pdf',
      downloadName: 'Nim-Sokny-Flutter-Mobile-Development-CV.pdf',
    },
    {
      title: lang === 'km' ? 'អភិវឌ្ឍន៍ Backend' : 'Backend Development',
      file: '/Nim-Sokny-Backend-Developer-CV.pdf',
      downloadName: 'Nim-Sokny-Backend-Development-CV.pdf',
    },
    {
      title: lang === 'km' ? 'អភិវឌ្ឍន៍ Frontend' : 'Frontend Development',
      file: '/Nim-Sokny-Frontend-Developer-CV.pdf',
      downloadName: 'Nim-Sokny-Frontend-Development-CV.pdf',
    },
  ]

  const alignmentClass =
    align === 'left'
      ? 'left-0'
      : align === 'center'
        ? 'left-1/2 -translate-x-1/2'
        : 'right-0'

  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      {variant === 'icon' && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          title={t.nav.downloadCv}
          aria-label={t.nav.downloadCv}
          aria-expanded={isOpen}
          className={`p-2 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
            isOpen
              ? 'border-primary bg-primary/20 text-primary shadow-[0_0_20px_rgba(76,215,246,0.35)]'
              : 'border-slate-200/70 dark:border-white/20 glass-panel text-primary hover:border-primary/60 hover:bg-surface-bright/20'
          }`}
        >
          <Download size={19} />
        </button>
      )}

      {variant === 'pill' && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="px-8 py-3.5 rounded-full border border-[#0b7c8f]/60 dark:border-[#38d9f5]/60 bg-transparent hover:bg-primary/10 dark:hover:bg-[#38d9f5]/15 text-[#0b7c8f] dark:text-[#38d9f5] font-bold transition-all duration-300 hover:scale-105 active:scale-95 hover:border-primary dark:hover:border-[#38d9f5] hover:shadow-[0_0_20px_rgba(56,217,245,0.25)] inline-flex items-center justify-center cursor-pointer"
        >
          {t.hero.downloadCv}
        </button>
      )}

      {variant === 'button' && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="px-5 py-2.5 rounded-full glass-panel text-[11px] font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {t.about.download}
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute ${alignmentClass} top-full mt-3 w-64 md:w-72 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0c1828]/95 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.65)] p-2 z-50 flex flex-col gap-1`}
          >
            {cvOptions.map((opt) => (
              <a
                key={opt.title}
                href={opt.file}
                download={opt.downloadName}
                onClick={(e) => handleDownload(e, opt.file, opt.downloadName)}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors group cursor-pointer"
              >
                <span className="text-sm font-semibold text-slate-800 dark:text-white tracking-wide group-hover:text-primary transition-colors text-left">
                  {opt.title}
                </span>
                <FileDown
                  size={18}
                  className="text-primary group-hover:scale-110 transition-transform shrink-0 ml-3"
                />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
