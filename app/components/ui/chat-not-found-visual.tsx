'use client'

import { motion } from 'framer-motion'

type Direction = 'top' | 'right' | 'bottom' | 'left'

interface FadingDashedLineProps {
  direction: Direction
  className?: string
}

export default function ChatEmptyStateAnimation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <div className="relative mb-3 flex">
      <motion.div
        animate="visible"
        className="bg-v0-background-100 z-10 flex h-[132px] w-[160px] flex-col justify-between rounded-xl border border-v0-gray-200 px-[10px] py-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        initial="hidden"
        variants={containerVariants}
      >
        <div className="flex flex-row gap-x-1">
          <div className="h-2 w-2 rounded-full bg-v0-gray-500" />
          <div className="h-2 w-2 rounded-full bg-v0-gray-500" />
          <div className="h-2 w-2 rounded-full bg-v0-gray-500" />
        </div>
        <motion.div variants={itemVariants}>
          <ChatBubble1 />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ChatBubble2 />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ChatBubble3 />
        </motion.div>
      </motion.div>
      <FadingDashedLine
        className="left-0 top-1/2 z-0 h-[275px] w-px -translate-y-1/2"
        direction="left"
      />
      <FadingDashedLine
        className="right-0 top-1/2 z-0 h-[275px] w-px -translate-y-1/2"
        direction="right"
      />
      <FadingDashedLine
        className="left-1/2 top-0 z-0 h-px w-[350px] -translate-x-1/2"
        direction="top"
      />
      <FadingDashedLine
        className="z- bottom-0 left-1/2 h-px w-[350px] -translate-x-1/2"
        direction="bottom"
      />
    </div>
  )
}

// using svgs for the dashed lines because easier to apply gradient
const FadingDashedLine: React.FC<FadingDashedLineProps> = ({
  direction,
  className = '',
}) => {
  const isVertical = direction === 'left' || direction === 'right'
  const id = `fading-dashed-line-${direction}`

  return (
    <div className={`absolute ${className}`}>
      <svg
        className="absolute inset-0 text-v0-gray-300"
        height="100%"
        width="100%"
      >
        <defs>
          <pattern
            height="6"
            id={`${id}-pattern`}
            patternUnits="userSpaceOnUse"
            width="6"
            x="0"
            y="0"
          >
            <line
              stroke="currentColor"
              strokeWidth="1"
              x1="0"
              x2={isVertical ? '0' : '3'}
              y1="0"
              y2={isVertical ? '3' : '0'}
            />
          </pattern>
          <linearGradient
            gradientUnits="objectBoundingBox"
            id={`${id}-gradient`}
            x1={isVertical ? '0.5' : '0'}
            x2={isVertical ? '0.5' : '1'}
            y1={isVertical ? '0' : '0.5'}
            y2={isVertical ? '1' : '0.5'}
          >
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="25%" stopColor="white" stopOpacity="1" />
            <stop offset="75%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={`${id}-mask`}>
            <rect fill={`url(#${id}-gradient)`} height="100%" width="100%" />
          </mask>
        </defs>
        <rect
          fill={`url(#${id}-pattern)`}
          height="100%"
          mask={`url(#${id}-mask)`}
          width="100%"
        />
      </svg>
    </div>
  )
}

function ChatBubble1() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 140 20"
      width="140"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask fill="white" id="path-1-inside-1_5217_99418">
        <path
          clipRule="evenodd"
          d="M11.9015 0C6.37866 0 1.90151 4.47715 1.90151 10C1.90151 10.0174 1.90155 10.0347 1.90164 10.052V13.4481C1.90164 15.7681 1.24213 18.0404 0 20H0.459016C2.5867 20 4.55918 19.3355 6.18026 18.2027C7.80134 19.3355 9.77382 20 11.9015 20H106C111.523 20 116 15.5228 116 10C116 4.47715 111.523 0 106 0H11.9015Z"
          fillRule="evenodd"
        />
      </mask>
      <path
        clipRule="evenodd"
        d="M11.9015 0C6.37866 0 1.90151 4.47715 1.90151 10C1.90151 10.0174 1.90155 10.0347 1.90164 10.052V13.4481C1.90164 15.7681 1.24213 18.0404 0 20H0.459016C2.5867 20 4.55918 19.3355 6.18026 18.2027C7.80134 19.3355 9.77382 20 11.9015 20H106C111.523 20 116 15.5228 116 10C116 4.47715 111.523 0 106 0H11.9015Z"
        fill="hsl(var(--muted))"
        fillRule="evenodd"
      />
      <path
        d="M1.90164 10.052L2.90165 10.052L2.90163 10.0469L1.90164 10.052ZM0 20L-0.84461 19.4646L-1.81786 21H0V20ZM6.18026 18.2027L6.75305 17.383L6.18026 16.9828L5.60747 17.383L6.18026 18.2027ZM2.90151 10C2.90151 5.02944 6.93094 1 11.9015 1V-1C5.82637 -1 0.901507 3.92487 0.901507 10H2.90151ZM2.90163 10.0469C2.90155 10.0313 2.90151 10.0157 2.90151 10H0.901507C0.901507 10.0191 0.901555 10.0381 0.901652 10.0571L2.90163 10.0469ZM2.90164 13.4481V10.052H0.901639V13.4481H2.90164ZM0.84461 20.5354C2.18824 18.4157 2.90164 15.9577 2.90164 13.4481H0.901639C0.901639 15.5786 0.29602 17.6652 -0.84461 19.4646L0.84461 20.5354ZM0.459016 19H0V21H0.459016V19ZM5.60747 17.383C4.14889 18.4023 2.37526 19 0.459016 19V21C2.79815 21 4.96947 20.2688 6.75305 19.0224L5.60747 17.383ZM11.9015 19C9.98527 19 8.21163 18.4023 6.75305 17.383L5.60747 19.0224C7.39105 20.2688 9.56238 21 11.9015 21V19ZM106 19H11.9015V21H106V19ZM115 10C115 14.9706 110.97 19 106 19V21C112.075 21 117 16.0751 117 10H115ZM106 1C110.97 1 115 5.02944 115 10H117C117 3.92487 112.075 -1 106 -1V1ZM11.9015 1H106V-1H11.9015V1Z"
        fill="hsl(var(--alpha-400))"
        mask="url(#path-1-inside-1_5217_99418)"
      />
    </svg>
  )
}
function ChatBubble2() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 140 20"
      width="140"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask fill="white" id="path-1-inside-1_5217_99419">
        <path
          clipRule="evenodd"
          d="M11.8708 0C6.34791 0 1.87076 4.47715 1.87076 10C1.87076 10.0218 1.87083 10.0436 1.87097 10.0653V13.4644C1.87097 15.7751 1.22275 18.0394 0 20H0.290322C2.44828 20 4.44658 19.3165 6.08054 18.1541C7.7145 19.3165 9.7128 20 11.8708 20H47.9998C53.5226 20 57.9998 15.5228 57.9998 10C57.9998 4.47715 53.5226 0 47.9998 0H11.8708Z"
          fillRule="evenodd"
        />
      </mask>
      <path
        clipRule="evenodd"
        d="M11.8708 0C6.34791 0 1.87076 4.47715 1.87076 10C1.87076 10.0218 1.87083 10.0436 1.87097 10.0653V13.4644C1.87097 15.7751 1.22275 18.0394 0 20H0.290322C2.44828 20 4.44658 19.3165 6.08054 18.1541C7.7145 19.3165 9.7128 20 11.8708 20H47.9998C53.5226 20 57.9998 15.5228 57.9998 10C57.9998 4.47715 53.5226 0 47.9998 0H11.8708Z"
        fill="hsl(var(--muted))"
        fillRule="evenodd"
      />
      <path
        d="M1.87097 10.0653L2.87099 10.0653L2.87095 10.0589L1.87097 10.0653ZM0 20L-0.848511 19.4708L-1.80219 21H0V20ZM6.08054 18.1541L6.66021 17.3392L6.08054 16.9269L5.50087 17.3392L6.08054 18.1541ZM2.87076 10C2.87076 5.02944 6.9002 1 11.8708 1V-1C5.79563 -1 0.870759 3.92487 0.870759 10H2.87076ZM2.87095 10.0589C2.87082 10.0393 2.87076 10.0197 2.87076 10H0.870759C0.870759 10.0239 0.870835 10.0478 0.870988 10.0717L2.87095 10.0589ZM2.87097 13.4644V10.0653H0.870968V13.4644H2.87097ZM0.848511 20.5292C2.17027 18.4098 2.87097 15.9621 2.87097 13.4644H0.870968C0.870968 15.588 0.275238 17.6689 -0.848511 19.4708L0.848511 20.5292ZM0.290322 19H0V21H0.290322V19ZM5.50087 17.3392C4.03063 18.3851 2.23376 19 0.290322 19V21C2.66279 21 4.86253 20.2478 6.66021 18.9689L5.50087 17.3392ZM11.8708 19C9.92732 19 8.13045 18.3851 6.66021 17.3392L5.50087 18.9689C7.29854 20.2478 9.49829 21 11.8708 21V19ZM47.9998 19H11.8708V21H47.9998V19ZM56.9998 10C56.9998 14.9706 52.9704 19 47.9998 19V21C54.0749 21 58.9998 16.0751 58.9998 10H56.9998ZM47.9998 1C52.9704 1 56.9998 5.02944 56.9998 10H58.9998C58.9998 3.92487 54.0749 -1 47.9998 -1V1ZM11.8708 1H47.9998V-1H11.8708V1Z"
        fill="hsl(var(--alpha-400))"
        mask="url(#path-1-inside-1_5217_99419)"
      />
    </svg>
  )
}
function ChatBubble3() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 140 20"
      width="140"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask fill="white" id="path-1-inside-1_5217_99420">
        <path
          clipRule="evenodd"
          d="M128.161 0C133.684 0 138.161 4.47715 138.161 10C138.161 10.0216 138.161 10.0432 138.161 10.0647V13.4814C138.161 15.7822 138.798 18.0383 140 20H139.887C137.697 20 135.671 19.296 134.024 18.102C132.377 19.296 130.352 20 128.161 20H93.0002C87.4774 20 83.0002 15.5228 83.0002 10C83.0002 4.47715 87.4774 0 93.0002 0H128.161Z"
          fillRule="evenodd"
        />
      </mask>
      <path
        clipRule="evenodd"
        d="M128.161 0C133.684 0 138.161 4.47715 138.161 10C138.161 10.0216 138.161 10.0432 138.161 10.0647V13.4814C138.161 15.7822 138.798 18.0383 140 20H139.887C137.697 20 135.671 19.296 134.024 18.102C132.377 19.296 130.352 20 128.161 20H93.0002C87.4774 20 83.0002 15.5228 83.0002 10C83.0002 4.47715 87.4774 0 93.0002 0H128.161Z"
        fill="hsl(var(--muted))"
        fillRule="evenodd"
      />
      <path
        d="M138.161 10.0647L137.161 10.0647L137.161 10.0584L138.161 10.0647ZM140 20L140.853 19.4774L141.786 21H140V20ZM134.024 18.102L133.437 17.2923L134.024 16.8669L134.611 17.2923L134.024 18.102ZM137.161 10C137.161 5.02944 133.132 1 128.161 1V-1C134.237 -1 139.161 3.92487 139.161 10H137.161ZM137.161 10.0584C137.161 10.0389 137.161 10.0195 137.161 10H139.161C139.161 10.0237 139.161 10.0474 139.161 10.0711L137.161 10.0584ZM137.161 13.4814V10.0647H139.161V13.4814H137.161ZM139.147 20.5226C137.849 18.4036 137.161 15.9667 137.161 13.4814H139.161C139.161 15.5978 139.747 17.673 140.853 19.4774L139.147 20.5226ZM139.887 19H140V21H139.887V19ZM134.611 17.2923C136.093 18.3668 137.915 19 139.887 19V21C137.479 21 135.25 20.2252 133.437 18.9116L134.611 17.2923ZM128.161 19C130.134 19 131.955 18.3668 133.437 17.2923L134.611 18.9116C132.799 20.2252 130.569 21 128.161 21V19ZM93.0002 19H128.161V21H93.0002V19ZM84.0002 10C84.0002 14.9706 88.0296 19 93.0002 19V21C86.9251 21 82.0002 16.0751 82.0002 10H84.0002ZM93.0002 1C88.0297 1 84.0002 5.02944 84.0002 10H82.0002C82.0002 3.92487 86.9251 -1 93.0002 -1V1ZM128.161 1H93.0002V-1H128.161V1Z"
        fill="hsl(var(--alpha-400))"
        mask="url(#path-1-inside-1_5217_99420)"
      />
    </svg>
  )
}
