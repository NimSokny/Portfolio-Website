import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

interface SkillCardProgressProps {
  percentage: number
  label: string
  triggerKey?: number | string
  delay?: number
}

export default function SkillCardProgress({
  percentage,
  label,
  triggerKey = 0,
  delay = 0.1,
}: SkillCardProgressProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.15 })
  const [displayValue, setDisplayValue] = useState(0)
  const [animWidth, setAnimWidth] = useState(0)

  useEffect(() => {
    if (!isInView) {
      setDisplayValue(0)
      setAnimWidth(0)
      return
    }

    // Reset to 0 before starting animation
    setDisplayValue(0)
    setAnimWidth(0)

    const timer = setTimeout(() => {
      setAnimWidth(percentage)

      const startTime = performance.now()
      const duration = 1100 // ms count duration

      const countStep = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(Math.round(eased * percentage))

        if (progress < 1) {
          requestAnimationFrame(countStep)
        }
      }

      requestAnimationFrame(countStep)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [isInView, percentage, triggerKey, delay])

  return (
    <div ref={ref} className="relative z-10 w-full max-w-[250px]">
      <div className="flex justify-between items-center text-[11px] font-mono text-white/95 mb-2 uppercase tracking-widest font-bold">
        <span>{label}</span>
        <span className="tabular-nums drop-shadow-sm font-bold text-white">{displayValue}%</span>
      </div>
      <div className="relative h-2.5 w-full bg-black/30 rounded-full overflow-hidden p-[1px] border border-white/10 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animWidth}%` }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative h-full bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)]"
        >
          {/* Continuous Shimmer Light Sheen */}
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-full">
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] animate-shimmer" />
          </div>

          {/* Glowing Front Tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </motion.div>
      </div>
    </div>
  )
}
