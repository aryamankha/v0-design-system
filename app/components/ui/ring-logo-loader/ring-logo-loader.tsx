import { LogoV0 } from '@vercel/geist/icons'
import styles from './ring-logo-loader.module.css'

const ringClass = 'stroke-[0.4] stroke-gray-300 fill-none'
const dotClass =
  'stroke-[0.4] stroke-gray-300 fill-background-subtle animate-spin'

const RING_INTERVAL = 8
const RING_START = 12

const ringData = [
  { angle: 0, duration: '44s' }, // 0° (right)
  { angle: 90, duration: '40s' }, // 90° (bottom)
  { angle: 180, duration: '36s' }, // 180° (left)
  { angle: 45, duration: '24s' }, // 45° (bottom-right)
  { angle: 270, duration: '16s' }, // 270° (top)
]

export function RingLogoLoader({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center h-full overflow-hidden [--think-highlight:theme(colors.gray.400)] [--think-shadow:theme(colors.gray.300)] relative">
      <svg
        width="380"
        height="380"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rings and orbiting dots */}
        {ringData.map(({ angle, duration }, index) => {
          const radius = RING_START + index * RING_INTERVAL

          // Calculate dot position on ring circumference
          const angleRad = (angle * Math.PI) / 180
          const dotCx = 50 + radius * Math.cos(angleRad)
          const dotCy = 50 + radius * Math.sin(angleRad)

          const opacity = (ringData.length - index) / ringData.length

          return (
            <g
              key={index}
              className={styles.pulse}
              style={{
                animationDelay: `${ringData.length + index * 0.2}s`,
                opacity,
              }}
            >
              {/* Ring */}
              <circle cx="50" cy="50" r={radius} className={ringClass} />
              {/* Orbiting dot */}
              <circle
                cx={dotCx}
                cy={dotCy}
                r="1"
                className={dotClass}
                style={{
                  animationDuration: duration,
                  transformOrigin: '50px 50px',
                }}
              />
            </g>
          )
        })}
      </svg>
      <div className="absolute text-v0-gray-900">
        <LogoV0 size={36} />
      </div>
      {children}
    </div>
  )
}
