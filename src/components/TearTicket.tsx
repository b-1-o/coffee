import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import './TearTicket.css'

export type TearTicketProps = {
  children?: ReactNode
  stub?: ReactNode
  image?: string
  imageAlt?: string
  scrim?: boolean
  imageRadius?: number
  orientation?: 'horizontal' | 'vertical'
  onTear?: () => void
  width?: number
  height?: number
  stubSize?: number
  radius?: number
  holes?: number
  holeSize?: number
  notch?: number
  roughness?: number
  tearAngle?: number
  stretch?: number
  resistance?: number
  rotate?: number
  tilt?: boolean
  tiltMax?: number
  tiltReach?: number
  parallax?: number
  perspective?: number
  background?: string
  color?: string
  border?: boolean
  borderColor?: string
  borderWidth?: number
  stubBackground?: string
  recenter?: boolean
  disabled?: boolean
  ariaLabel?: string
  className?: string
}

export default function TearTicket({
  children = null,
  stub = null,
  image = '',
  imageAlt = '',
  scrim = true,
  onTear,
  width = 460,
  height = 250,
  stubSize = 130,
  radius = 16,
  rotate = 3,
  tilt = true,
  tiltMax = 8,
  perspective = 1000,
  background = '#1a2e24',
  color = '#f5f5f5',
  borderWidth = 1,
  stubBackground = '',
  disabled = false,
  ariaLabel = 'Tear off the stub',
  className = '',
  imageRadius = 8,
}: TearTicketProps) {
  const [torn, setTorn] = useState(false)
  const [grabbing, setGrabbing] = useState(false)
  const [pull, setPull] = useState(0)
  const startX = useRef(0)
  const rootRef = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 220, damping: 24 })
  const springY = useSpring(my, { stiffness: 220, damping: 24 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltMax, -tiltMax])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltMax, tiltMax])

  useEffect(() => {
    if (!tilt || disabled) return
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || grabbing) return
      const el = rootRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      mx.set(Math.max(-1, Math.min(1, nx)))
      my.set(Math.max(-1, Math.min(1, ny)))
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [tilt, disabled, grabbing, mx, my])

  const finish = () => {
    setTorn(true)
    setTimeout(() => onTear?.(), 500)
  }

  const onDown = (e: React.PointerEvent) => {
    if (disabled || torn || e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    startX.current = e.clientX
    setGrabbing(true)
    setPull(0)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!grabbing || torn) return
    const dx = Math.max(0, e.clientX - startX.current)
    setPull(Math.min(dx, 140))
  }
  const onUp = () => {
    if (!grabbing) return
    setGrabbing(false)
    if (pull > 60) finish()
    else setPull(0)
  }

  const bodyW = width - stubSize
  const fit = 1

  return (
    <div
      ref={rootRef}
      className={`tear-ticket${className ? ` ${className}` : ''}`}
      data-used={torn ? '' : undefined}
      data-grabbing={grabbing ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      style={{
        '--tt-w': `${width}px`,
        '--tt-h': `${height}px`,
        '--tt-stub': `${stubSize}px`,
        '--tt-bg': background,
        '--tt-stub-bg': stubBackground || background,
        '--tt-ink': color,
        '--tt-edge': `color-mix(in srgb, ${color} 16%, transparent)`,
        '--tt-edge-w': borderWidth,
        '--tt-body-w': `${bodyW}px`,
        '--tt-body-h': `${height}px`,
        '--tt-art-radius': `${imageRadius}px`,
        '--tt-fit': fit,
        height: `${height * fit}px`,
        color,
      } as React.CSSProperties}
    >
      <div className="tear-ticket__stage" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <motion.div
          className="tear-ticket__plane"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            borderRadius: radius,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
            transformStyle: 'preserve-3d',
            rotateX: tilt ? rotateX : 0,
            rotateY: tilt ? rotateY : 0,
            rotate: rotate,
            perspective,
          }}
        >
          <div
            style={{
              flex: 1,
              background,
              position: 'relative',
              minWidth: 0,
              borderRight: torn ? 'none' : '2px dashed rgba(255,255,255,0.15)',
            }}
          >
            {image ? (
              <div style={{ position: 'absolute', inset: 8, borderRadius: imageRadius, overflow: 'hidden', opacity: 0.35 }}>
                <img src={image} alt={imageAlt} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {scrim ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, ${background} 0%, transparent 70%)`,
                    }}
                  />
                ) : null}
              </div>
            ) : null}
            <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
          </div>

          {!torn && (
            <div
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={ariaLabel}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  finish()
                }
              }}
              style={{
                width: stubSize,
                flexShrink: 0,
                background: stubBackground || background,
                cursor: grabbing ? 'grabbing' : 'grab',
                touchAction: 'none',
                position: 'relative',
                transform: `translateX(${pull}px) rotate(${pull * 0.1}deg)`,
                opacity: 1 - pull / 220,
                transition: grabbing ? 'none' : 'transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 10,
                  bottom: 10,
                  width: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  pointerEvents: 'none',
                }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#0a1f1a',
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                    }}
                  />
                ))}
              </div>
              <div style={{ flex: 1 }}>{stub}</div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
