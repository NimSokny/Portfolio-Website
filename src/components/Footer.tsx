import { profile } from '../data'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { lang, t } = useLanguage()

  const links = [
    { name: 'LinkedIn', href: profile.linkedin },
    { name: 'GitHub', href: profile.github },
    { name: 'Telegram', href: profile.telegram },
    { name: 'Email', href: `mailto:${profile.email}` },
    { name: t.footer.privacy || 'Privacy Policy', href: '#' },
  ]

  const displayName = lang === 'km' ? t.hero.name : profile.name

  return (
    <footer className="w-full bg-white/80 dark:bg-[#060d17]/80 backdrop-blur-md border-t border-slate-200/80 dark:border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-serif text-2xl text-[#0b7c8f] dark:text-[#38d9f5] font-bold tracking-tight">
            {displayName}
          </span>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
            © {new Date().getFullYear()} {displayName}. {t.footer.tagline}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target={l.href.startsWith('#') ? undefined : '_blank'}
              rel="noreferrer"
              className="text-slate-500 dark:text-slate-400 hover:text-[#0b7c8f] dark:hover:text-[#38d9f5] transition-colors duration-300 text-xs md:text-sm font-medium"
            >
              {l.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
