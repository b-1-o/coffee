import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import './TearTicket.css'

type Props = {
  coffeeName: string
  dessertName: string
  coffeeImg: string
  onTear: () => void
}

export default function TearTicket({ coffeeName, dessertName, coffeeImg, onTear }: Props) {
  const [torn, setTorn] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [pull, setPull] = useState(0)
  const startX = useRef(0)

  const handleDown = (e: React.PointerEvent) => {
    if (torn) return
    e.currentTarget.setPointerCapture(e.pointerId)
    startX.current = e.clientX
    setDragging(true)
  }

  const handleMove = (e: React.PointerEvent) => {
    if (!dragging || torn) return
    const dx = Math.max(0, e.clientX - startX.current)
    setPull(Math.min(dx, 120))
  }

  const handleUp = () => {
    if (!dragging) return
    setDragging(false)
    if (pull > 55) {
      setTorn(true)
      setTimeout(() => onTear(), 450)
    } else {
      setPull(0)
    }
  }

  return (
    <div className="tear-ticket" data-torn={torn ? '' : undefined}>
      <div className="tear-ticket__stage">
        <motion.div
          className="tear-ticket__plane"
          style={{ rotateX: 0, rotateY: 0 }}
          whileHover={{ rotateX: -2, rotateY: 3 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="tear-ticket__body">
            <img src={coffeeImg} alt="" className="tear-ticket__body-art" draggable={false} />
            <div className="tear-ticket__body-content">
              <div>
                <p className="tear-ticket__meta">Brew &amp; Bloom · Combo</p>
                <p className="tear-ticket__pair">
                  {coffeeName} + {dessertName}
                </p>
              </div>
              <p className="tear-ticket__cta">Get your combo recipe</p>
              <p className="tear-ticket__meta">Tear the stub →</p>
            </div>
          </div>

          <div
            className="tear-ticket__stub"
            style={{
              transform: torn
                ? undefined
                : `translateX(${pull}px) rotate(${pull * 0.08}deg)`,
              opacity: torn ? undefined : 1 - pull / 200,
            }}
            onPointerDown={handleDown}
            onPointerMove={handleMove}
            onPointerUp={handleUp}
            onPointerCancel={handleUp}
            role="button"
            tabIndex={0}
            aria-label="Tear off the stub to reveal recipe"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setTorn(true)
                setTimeout(() => onTear(), 450)
              }
            }}
          >
            <div className="tear-ticket__perforation">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="tear-ticket__hole" />
              ))}
            </div>
            <span className="tear-ticket__hint">Tear here</span>
            <span className="tear-ticket__label" style={{ fontSize: '0.85rem', textAlign: 'center' }}>
              RECIPE
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
