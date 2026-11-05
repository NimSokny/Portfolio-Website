import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

interface AnimatedProgressBarProps {
  label: string
  value: number
  gradient: string
  glow?: string
  delay?: number
}

export default function AnimatedProgressBar({
  label,
  value,
  gradient,
  glow = 'rgba(76,215,246,0.6)',
  delay = 0.2,
}: AnimatedProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) {
      setDisplayValue(0)
      return
    }

    let start = 0
    const duration = 1200 // ms
    const startTime = performance.now()

    const animateCount = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * value)
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animateCount)
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(animateCount)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return (
    <div ref={ref} className="group space-y-2.5 cursor-pointer">
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-on-surface font-semibold tracking-wider uppercase group-hover:text-primary transition-colors duration-300">
          {label}
        </span>
        <span className="text-primary font-bold font-mono tracking-wider tabular-nums transition-transform duration-300 group-hover:scale-110">
          {displayValue}%
        </span>
      </div>

      {/* Progress track */}
      <div className="relative h-2.5 w-full bg-surface-bright/40 rounded-full overflow-hidden border border-white/5 p-[1px]">
        {/* Animated fill */}
        <motion.div
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${value}%` } : { width: '0%' }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`relative h-full rounded-full bg-gradient-to-r ${gradient} shadow-lg`}
          style={{
            boxShadow: `0 0 16px ${glow}`,
          }}
        >
          {/* Shimmer light beam */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-shimmer" />
          </div>

          {/* Glowing tip indicator */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </motion.div>
      </div>
    </div>
  )
}
