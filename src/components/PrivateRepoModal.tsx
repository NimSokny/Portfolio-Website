import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Lock, Mail, ShieldAlert, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface PrivateRepoModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
}

export default function PrivateRepoModal({
  isOpen,
  onClose,
  projectTitle,
}: PrivateRepoModalProps) {
  const { lang } = useLanguage()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const content =
    lang === 'km'
      ? {
          badge: 'កូដរក្សាការសម្ងាត់',
          title: 'Private Repository',
          desc: 'កូដប្រភពនៃគម្រោងនេះត្រូវបានរក្សាការសម្ងាត់ (Private & Confidential) ស្របតាមគោលការណ៍រក្សាការសម្ងាត់របស់ម្ចាស់កម្មវិធី ឬស្ថាប័ន។ អ្នកអាចទស្សនា Live Demo ឬទាក់ទងមកខ្ញុំដើម្បីស្វែងយល់បន្ថែមអំពីស្ថាបត្យកម្មកូដ។',
          contactBtn: 'ទាក់ទងខ្ញុំ',
          closeBtn: 'យល់ព្រម',
        }
      : {
          badge: 'Private & Confidential',
          title: 'Private Repository',
          desc: 'This project codebase is kept in a private repository to protect proprietary software and client confidentiality. However, live demo and architectural details can be shared upon request.',
          contactBtn: 'Request Access / Contact',
          closeBtn: 'Got it',
        }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            className="relative w-full max-w-md rounded-3xl glass-panel p-7 md:p-8 border border-white/20 dark:border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.55)] z-10 overflow-hidden text-center flex flex-col items-center"
          >
            {/* Ambient Background Glow inside modal */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-secondary/20 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-outline-variant/30 glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all cursor-pointer hover:rotate-90 duration-200"
            >
              <X size={16} />
            </button>

            {/* Shield / Lock Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/10 to-secondary/20 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_24px_rgba(76,215,246,0.25)] mb-5">
              <Lock size={28} className="animate-pulse" />
            </div>

            {/* Privacy Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
              <ShieldAlert size={13} />
              {content.badge}
            </span>

            {/* Project Title */}
            <h3 className="text-xl md:text-2xl font-serif font-bold text-on-surface mb-2 tracking-tight">
              {projectTitle}
            </h3>

            {/* Professional Explanation Message */}
            <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed mb-6 max-w-sm">
              {content.desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <a
                href="#contact"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(76,215,246,0.3)] hover:shadow-[0_0_28px_rgba(76,215,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Mail size={14} />
                <span>{content.contactBtn}</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full border border-outline-variant/40 hover:bg-white/10 dark:hover:bg-white/5 text-on-surface font-semibold text-xs transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {content.closeBtn}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
