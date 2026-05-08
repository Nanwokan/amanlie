import { COMING_SOON_LABEL } from '@/lib/utils'

interface ComingSoonPillProps {
  className?: string
  label: string
  light?: boolean
}

export default function ComingSoonPill({
  className = '',
  label,
  light = false,
}: ComingSoonPillProps) {
  const toneClasses = light
    ? 'border-white/35 bg-white/10 text-warm-cream/90'
    : 'border-[#d8cbb9] bg-white/55 text-charcoal/70'
  const badgeClasses = light
    ? 'bg-white/15 text-warm-cream'
    : 'bg-[#efe4d7] text-bordeaux'

  return (
    <span
      aria-label={`${label}, ${COMING_SOON_LABEL.toLowerCase()}`}
      className={`inline-flex items-center gap-2 rounded-[2px] border px-5 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.22em] ${toneClasses} ${className}`.trim()}
      title={`${label} ${COMING_SOON_LABEL.toLowerCase()}`}
    >
      <span>{label}</span>
      <span className={`rounded-full px-2 py-0.5 text-[9px] tracking-[0.18em] ${badgeClasses}`}>
        Bientôt
      </span>
    </span>
  )
}
