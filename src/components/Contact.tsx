import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import {
  Calendar,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  PhoneCall,
  Send,
  Smartphone,
} from 'lucide-react'
import { profile } from '../data'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const [f, setF] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = (k: keyof typeof f) => (e: { target: { value: string } }) =>
    setF({ ...f, [k]: e.target.value })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const body = `Name: ${f.name}\nEmail: ${f.email}\nSubject: ${f.subject}\n\n${f.message}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      f.subject || 'Portfolio Inquiry - Nim Sokny'
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const contactCards = [
    {
      label: t.contact.location,
      value: profile.location,
      action: t.contact.viewMap,
      href: profile.mapUrl,
      icon: MapPin,
      iconColor: 'text-[#ef4444] dark:text-[#f87171]',
      badgeBg: 'bg-[#fee2e2]/80 border-rose-200/90 dark:bg-[#3b1d24]/60 dark:border-red-500/20',
    },
    {
      label: t.contact.email,
      value: profile.email,
      action: t.contact.sendEmail,
      href: `mailto:${profile.email}`,
      icon: Mail,
      iconColor: 'text-[#0891b2] dark:text-[#38d9f5]',
      badgeBg: 'bg-[#cffafe]/80 border-cyan-200/90 dark:bg-[#132c3f]/70 dark:border-cyan-500/20',
    },
    {
      label: t.contact.phone,
      value: profile.phones[0]?.display || '+855 71 72 80 292',
      action: t.contact.callNow,
      href: profile.phones[0]?.href || 'tel:+855717280292',
      icon: Smartphone,
      iconColor: 'text-[#7c3aed] dark:text-[#818cf8]',
      badgeBg: 'bg-[#ede9fe]/80 border-purple-200/90 dark:bg-[#19243f]/70 dark:border-indigo-500/20',
    },
    {
      label: t.contact.social,
      value: t.contact.socialSub,
      action: t.contact.connect,
      href: profile.telegram,
      icon: Globe,
      iconColor: 'text-[#059669] dark:text-[#4edea3]',
      badgeBg: 'bg-[#d1fae5]/80 border-emerald-200/90 dark:bg-[#103328]/70 dark:border-emerald-500/20',
    },
  ]

  return (
    <section id="contact" className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
      {/* Header Section (Matched to Image 1 & Image 3) */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono mb-4 shadow-[0_0_12px_rgba(78,222,163,0.15)]"
        >
          {t.contact.badge || 'GET IN TOUCH'}
        </motion.div>
        <h2 className="text-5xl md:text-6xl font-serif text-[#0b7c8f] dark:text-[#38d9f5] font-bold tracking-tight mb-3">
          {t.contact.title1} {t.contact.title2}
        </h2>
        <p className="text-slate-600 dark:text-on-surface-variant max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          {t.contact.sub}
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4 Info Cards (Increased Height & Crisp Borders - Matched to Image 3 & 4) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {contactCards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              className="p-6 min-h-[106px] rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-[#0b1726]/60 backdrop-blur-md flex items-center gap-5 hover:border-[#0b7c8f]/60 dark:hover:border-primary/50 transition-all duration-300 shadow-[0_6px_20px_rgba(11,124,143,0.05)] dark:shadow-none hover:shadow-[0_10px_28px_rgba(11,124,143,0.12)] dark:hover:shadow-[0_8px_24px_rgba(56,217,245,0.12)] hover:-translate-y-1 group"
            >
              <div
                className={`w-14 h-14 md:w-15 md:h-15 shrink-0 rounded-2xl border flex items-center justify-center ${c.badgeBg} ${c.iconColor} group-hover:scale-105 transition-transform duration-300 shadow-sm`}
              >
                <c.icon size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-mono tracking-widest text-slate-400 dark:text-slate-400 uppercase font-bold mb-1">
                  {c.label}
                </span>
                <span className="block text-sm md:text-base font-semibold text-slate-900 dark:text-white truncate mb-1.5">
                  {c.value}
                </span>
                <a
                  href={c.href}
                  target={c.href.startsWith('tel:') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="inline-block text-[11px] font-mono font-bold text-[#0b7c8f] dark:text-[#4edea3] hover:text-[#004d40] dark:hover:text-[#38d9f5] hover:underline uppercase tracking-wider transition-colors"
                >
                  {c.action}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Send Message Form Container (Matched to Image 3) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-8 rounded-3xl p-8 md:p-10 border border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-[#0b1726]/60 backdrop-blur-md shadow-[0_14px_45px_rgba(11,124,143,0.07)] dark:shadow-2xl"
        >
          {/* Form Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-serif text-[#0b7c8f] dark:text-[#38d9f5] font-bold mb-1.5">
              {t.contact.formTitle}
            </h3>
            <p className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              {t.contact.formSub}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            {/* Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-300 mb-2 font-bold">
                  {t.contact.nameLabel}
                </label>
                <input
                  required
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  value={f.name}
                  onChange={set('name')}
                  className="w-full rounded-2xl bg-[#f8fafc] dark:bg-[#070f1a]/80 border border-slate-200/90 dark:border-white/5 px-4 py-3.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0b7c8f] dark:focus:border-[#38d9f5]/60 focus:bg-white dark:focus:bg-[#070f1a] transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-300 mb-2 font-bold">
                  {t.contact.emailLabel}
                </label>
                <input
                  required
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={f.email}
                  onChange={set('email')}
                  className="w-full rounded-2xl bg-[#f8fafc] dark:bg-[#070f1a]/80 border border-slate-200/90 dark:border-white/5 px-4 py-3.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0b7c8f] dark:focus:border-[#38d9f5]/60 focus:bg-white dark:focus:bg-[#070f1a] transition-all"
                />
              </div>
            </div>

            {/* Row 2: Subject */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-300 mb-2 font-bold">
                {t.contact.subjectLabel}
              </label>
              <input
                type="text"
                placeholder={t.contact.subjectPlaceholder}
                value={f.subject}
                onChange={set('subject')}
                className="w-full rounded-2xl bg-[#f8fafc] dark:bg-[#070f1a]/80 border border-slate-200/90 dark:border-white/5 px-4 py-3.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0b7c8f] dark:focus:border-[#38d9f5]/60 focus:bg-white dark:focus:bg-[#070f1a] transition-all"
              />
            </div>

            {/* Row 3: Message */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-300 mb-2 font-bold">
                {t.contact.messageLabel}
              </label>
              <textarea
                required
                rows={5}
                placeholder={t.contact.messagePlaceholder}
                value={f.message}
                onChange={set('message')}
                className="w-full rounded-2xl bg-[#f8fafc] dark:bg-[#070f1a]/80 border border-slate-200/90 dark:border-white/5 px-4 py-3.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0b7c8f] dark:focus:border-[#38d9f5]/60 focus:bg-white dark:focus:bg-[#070f1a] transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Send Message Pill Button (Matched to Image 3) */}
            <button
              type="submit"
              className="w-full py-4 rounded-full mt-4 bg-gradient-to-r from-[#00695c] via-[#00796b] to-[#00897b] text-white font-bold shadow-[0_4px_22px_rgba(0,105,92,0.32)] hover:shadow-[0_6px_30px_rgba(0,121,107,0.45)] dark:from-[#38d9f5] dark:via-[#43d9bf] dark:to-[#4edea3] dark:text-slate-950 dark:shadow-[0_0_28px_rgba(56,217,245,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 text-sm md:text-base tracking-wider cursor-pointer flex items-center justify-center gap-2.5 font-sans uppercase"
            >
              <Send size={18} className="text-white dark:text-slate-950" />
              <span>{t.contact.sendBtn}</span>
            </button>

            {sent && (
              <p className="text-sm text-center text-[#00796b] dark:text-[#4edea3] font-mono mt-3">
                {t.contact.sentSuccess}
              </p>
            )}
          </form>
        </motion.div>
      </div>

      {/* Quick Actions Section (Increased Height & Width - Matched to Image) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-20 text-center"
      >
        <h3 className="text-3xl md:text-4xl font-serif italic text-[#0b7c8f] dark:text-[#38d9f5] mb-10 font-semibold">
          {t.contact.quickActionsTitle}
        </h3>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <motion.a
            href={`mailto:${profile.email}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 md:px-12 py-6 md:py-6.5 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-[#0b1726]/60 backdrop-blur-md flex items-center gap-3.5 md:gap-4 text-slate-800 dark:text-on-surface hover:text-[#0b7c8f] dark:hover:text-[#38d9f5] hover:border-[#0b7c8f]/60 dark:hover:border-[#38d9f5]/60 hover:bg-[#0b7c8f]/5 dark:hover:bg-[#38d9f5]/10 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl min-w-[220px] md:min-w-[260px] justify-center group"
          >
            <MessageSquare size={22} className="text-[#0b7c8f] dark:text-[#38d9f5] group-hover:scale-110 transition-transform shrink-0" />
            <span className="text-sm font-mono font-bold tracking-wider uppercase">
              {t.contact.emailMe}
            </span>
          </motion.a>

          <motion.a
            href={profile.phones[0]?.href || 'tel:+855717280292'}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 md:px-12 py-6 md:py-6.5 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-[#0b1726]/60 backdrop-blur-md flex items-center gap-3.5 md:gap-4 text-slate-800 dark:text-on-surface hover:text-[#0d8775] dark:hover:text-[#4edea3] hover:border-[#0d8775]/60 dark:hover:border-[#4edea3]/60 hover:bg-[#0d8775]/5 dark:hover:bg-[#4edea3]/10 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl min-w-[220px] md:min-w-[260px] justify-center group"
          >
            <PhoneCall size={22} className="text-[#0d8775] dark:text-[#4edea3] group-hover:scale-110 transition-transform shrink-0" />
            <span className="text-sm font-mono font-bold tracking-wider uppercase">
              {t.contact.callMe}
            </span>
          </motion.a>

          <motion.a
            href={profile.telegram}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 md:px-12 py-6 md:py-6.5 rounded-2xl md:rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-[#0b1726]/60 backdrop-blur-md flex items-center gap-3.5 md:gap-4 text-slate-800 dark:text-on-surface hover:text-[#5e6bb2] dark:hover:text-[#818cf8] hover:border-[#5e6bb2]/60 dark:hover:border-[#818cf8]/60 hover:bg-[#5e6bb2]/5 dark:hover:bg-[#818cf8]/10 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl min-w-[220px] md:min-w-[260px] justify-center group"
          >
            <Calendar size={22} className="text-[#5e6bb2] dark:text-[#818cf8] group-hover:scale-110 transition-transform shrink-0" />
            <span className="text-sm font-mono font-bold tracking-wider uppercase">
              {t.contact.scheduleCall}
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
