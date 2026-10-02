import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight, Coffee, Cookie, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import TearTicket from './components/TearTicket'
import { COFFEES, DESSERTS, PAIRINGS } from './data'

type Step = 'coffee' | 'dessert' | 'ticket' | 'recipe'
type Item = { id: string; name: string; src: string; bg: string; short: string }

function useCarousel(count: number) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const navigate = useCallback(
    (dir: 'next' | 'prev') => {
      if (isAnimating) return
      setIsAnimating(true)
      setActiveIndex((prev) => (dir === 'next' ? (prev + 1) % count : (prev + count - 1) % count))
      setTimeout(() => setIsAnimating(false), 650)
    },
    [isAnimating, count]
  )

  return { activeIndex, isMobile, navigate }
}

function getCoffeeRoleStyle(index: number, activeIndex: number, count: number, isMobile: boolean): React.CSSProperties {
  const center = activeIndex
  const left = (activeIndex + count - 1) % count
  const right = (activeIndex + 1) % count
  const role = index === center ? 'center' : index === left ? 'left' : index === right ? 'right' : 'back'
  const base: React.CSSProperties = {
    position: 'absolute',
    aspectRatio: '0.6 / 1',
    transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)',
    willChange: 'transform, filter, opacity',
  }
  if (role === 'center') {
    return { ...base, transform: `translateX(-50%) scale(${isMobile ? 1.35 : 1.75})`, filter: 'none', opacity: 1, zIndex: 20, left: '50%', height: isMobile ? '62%' : '95%', bottom: isMobile ? '18%' : '-2%' }
  }
  if (role === 'left') {
    return { ...base, transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.85, zIndex: 10, left: isMobile ? '18%' : '28%', height: isMobile ? '15%' : '26%', bottom: isMobile ? '30%' : '10%' }
  }
  if (role === 'right') {
    return { ...base, transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.85, zIndex: 10, left: isMobile ? '82%' : '72%', height: isMobile ? '15%' : '26%', bottom: isMobile ? '30%' : '10%' }
  }
  return { ...base, transform: 'translateX(-50%) scale(1)', filter: 'blur(4px)', opacity: 0.95, zIndex: 5, left: '50%', height: isMobile ? '12%' : '20%', bottom: isMobile ? '30%' : '10%' }
}

function getDessertRoleStyle(index: number, activeIndex: number, count: number, isMobile: boolean): React.CSSProperties {
  const center = activeIndex
  const left = (activeIndex + count - 1) % count
  const right = (activeIndex + 1) % count
  const role = index === center ? 'center' : index === left ? 'left' : index === right ? 'right' : 'back'
  const base: React.CSSProperties = {
    position: 'absolute',
    aspectRatio: '1 / 1',
    transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)',
    willChange: 'transform, filter, opacity',
  }
  if (role === 'center') {
    return { ...base, transform: `translateX(-50%) scale(${isMobile ? 1.1 : 1.25})`, filter: 'none', opacity: 1, zIndex: 20, left: '50%', height: isMobile ? '38%' : '48%', bottom: isMobile ? '28%' : '18%' }
  }
  if (role === 'left') {
    return { ...base, transform: 'translateX(-50%) scale(0.9)', filter: 'blur(2px)', opacity: 0.8, zIndex: 10, left: isMobile ? '18%' : '26%', height: isMobile ? '14%' : '20%', bottom: isMobile ? '32%' : '22%' }
  }
  if (role === 'right') {
    return { ...base, transform: 'translateX(-50%) scale(0.9)', filter: 'blur(2px)', opacity: 0.8, zIndex: 10, left: isMobile ? '82%' : '74%', height: isMobile ? '14%' : '20%', bottom: isMobile ? '32%' : '22%' }
  }
  return { ...base, transform: 'translateX(-50%) scale(0.85)', filter: 'blur(4px)', opacity: 0.9, zIndex: 5, left: '50%', height: isMobile ? '11%' : '16%', bottom: isMobile ? '32%' : '22%' }
}

function HeroCarousel({
  items, brand, ghost, cta, onSelect, subtitle, mode,
}: {
  items: readonly Item[]
  brand: string
  ghost: string
  cta: string
  subtitle?: string
  onSelect: (item: Item) => void
  mode: 'coffee' | 'dessert'
}) {
  const { activeIndex, isMobile, navigate } = useCarousel(items.length)
  const current = items[activeIndex]
  const styleFn = mode === 'coffee' ? getCoffeeRoleStyle : getDessertRoleStyle

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: current.bg, transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)', fontFamily: "'Inter', sans-serif" }}>
      <div className="relative w-full" style={{ height: '100vh', overflow: 'hidden' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 50, opacity: 0.4, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', backgroundRepeat: 'repeat' }} />

        {/* LAYER 1 — giant ghost text as background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            zIndex: 1,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(100px, 32vw, 420px)',
            fontWeight: 900,
            color: 'white',
            opacity: 0.12,
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          {ghost}
        </div>

        <div className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase text-white/90 tracking-[0.18em]" style={{ zIndex: 60 }}>{brand}</div>

        {/* LAYER 2 — carousel on top of text */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {items.map((item, i) => (
            <div key={item.id} style={styleFn(i, activeIndex, items.length, isMobile)}>
              <img src={item.src} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center' }} draggable={false} />
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 max-w-[320px]" style={{ zIndex: 60 }}>
          <p className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-white/95" style={{ letterSpacing: '0.02em' }}>{current.name}</p>
          <p className="hidden sm:block text-xs sm:text-sm text-white/85 leading-relaxed mb-4 sm:mb-5">{subtitle || current.short}</p>
          <div className="flex gap-3 items-center">
            <button onClick={() => navigate('prev')} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-transparent text-white flex items-center justify-center transition-all duration-150 hover:scale-[1.08] hover:bg-white/12" aria-label="Previous"><ArrowLeft size={26} strokeWidth={2.25} /></button>
            <button onClick={() => navigate('next')} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-transparent text-white flex items-center justify-center transition-all duration-150 hover:scale-[1.08] hover:bg-white/12" aria-label="Next"><ArrowRight size={26} strokeWidth={2.25} /></button>
          </div>
        </div>

        <button onClick={() => onSelect(current)} className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 text-white/95 hover:text-white transition-opacity duration-200 bg-transparent border-0 cursor-pointer p-0" style={{ zIndex: 60, fontFamily: "'Anton', sans-serif", fontSize: 'clamp(20px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase' }}>{cta}<ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} /></button>
      </div>
    </div>
  )
}

function App() {
  const [step, setStep] = useState<Step>('coffee')
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<string | null>(null)
  const [selectedDessertId, setSelectedDessertId] = useState<string | null>(null)

  useEffect(() => {
    ;[...COFFEES, ...DESSERTS].forEach((item) => { const img = new Image(); img.src = item.src })
  }, [])

  const selectedCoffee = COFFEES.find((c) => c.id === selectedCoffeeId)
  const selectedDessert = DESSERTS.find((d) => d.id === selectedDessertId)
  const pairingKey = selectedCoffeeId && selectedDessertId ? `${selectedCoffeeId}|${selectedDessertId}` : ''
  const recipe = pairingKey ? PAIRINGS[pairingKey] : null

  const reset = () => { setStep('coffee'); setSelectedCoffeeId(null); setSelectedDessertId(null) }

  return (
    <div className="min-h-screen bg-[#0a1f1a] text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {step === 'coffee' && (
          <motion.div key="coffee" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>
            <HeroCarousel mode="coffee" items={COFFEES} brand="BREW & BLOOM" ghost="BREW" cta="PAIR IT" subtitle="Choose your coffee, then pair it with a dessert for a perfect recipe." onSelect={(c) => { setSelectedCoffeeId(c.id); setStep('dessert') }} />
          </motion.div>
        )}

        {step === 'dessert' && selectedCoffee && (
          <motion.div key="dessert" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
            <div className="absolute top-6 right-4 sm:right-8 z-[70]">
              <button onClick={() => setStep('coffee')} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors flex items-center gap-1"><X size={14} /> Change coffee</button>
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 text-emerald-300/90 text-xs"><Coffee size={14} /><span className="font-medium">{selectedCoffee.name}</span></div>
            <HeroCarousel mode="dessert" items={DESSERTS} brand="BREW & BLOOM" ghost="SWEET" cta="CHOOSE" subtitle={`Pair your ${selectedCoffee.name} with one of these sweets for a complete recipe.`} onSelect={(d) => { setSelectedDessertId(d.id); setStep('ticket') }} />
          </motion.div>
        )}

        {step === 'ticket' && selectedCoffee && selectedDessert && (
          <motion.div key="ticket" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#071612]">
            <div className="w-full max-w-[480px]">
              <TearTicket
                image={selectedCoffee.src}
                imageAlt={selectedCoffee.name}
                stub={
                  <div style={{ padding: '20px 14px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, textAlign: 'center' }}>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 18, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>RECIPE</span>
                    <span style={{ fontSize: 10, opacity: 0.55, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tear here</span>
                  </div>
                }
                orientation="horizontal"
                scrim
                imageRadius={8}
                onTear={() => setStep('recipe')}
                width={460}
                height={250}
                stubSize={130}
                radius={16}
                holes={12}
                holeSize={6}
                notch={3}
                roughness={0}
                tearAngle={30}
                stretch={30}
                resistance={0.45}
                rotate={3}
                tilt
                tiltMax={8}
                tiltReach={260}
                parallax={6}
                perspective={1000}
                background="#1a2e24"
                color="#f5f5f5"
                border
                borderWidth={1}
                recenter
              >
                <div style={{ padding: '22px 24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 6 }}>Brew & Bloom · Combo</p>
                    <p style={{ fontSize: 12, opacity: 0.8 }}>{selectedCoffee.name}</p>
                    <p style={{ fontSize: 12, opacity: 0.8 }}>+ {selectedDessert.name}</p>
                  </div>
                  <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(22px, 4vw, 32px)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.1 }}>
                    Get your combo recipe
                  </p>
                </div>
              </TearTicket>
            </div>
            <button onClick={() => setStep('dessert')} className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-white/50 hover:text-white transition-colors">← Change dessert</button>
          </motion.div>
        )}

        {step === 'recipe' && recipe && selectedCoffee && selectedDessert && (
          <motion.div key="recipe" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="min-h-screen flex flex-col bg-[#071612]">
            <header className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-emerald-900/50">
              <button onClick={() => setStep('ticket')} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors">← Ticket</button>
              <button onClick={reset} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors flex items-center gap-1"><X size={14} /> Start over</button>
            </header>
            <div className="flex-1 px-4 sm:px-8 py-10 max-w-4xl mx-auto w-full">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-28 sm:w-28 sm:h-32 bg-[#0c241c] rounded-xl flex items-end justify-center p-2 border border-emerald-900/50"><img src={selectedCoffee.src} alt="" className="max-h-full object-contain" /></div>
                  <span className="text-emerald-500 text-2xl font-light">+</span>
                  <div className="w-24 h-28 sm:w-28 sm:h-32 bg-[#0c241c] rounded-xl flex items-center justify-center p-3 border border-emerald-900/50"><img src={selectedDessert.src} alt="" className="max-h-full max-w-full object-contain" /></div>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80 mb-2">Your pairing · {recipe.time}</p>
                  <h2 className="text-2xl sm:text-4xl text-white" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '-0.02em' }}>{recipe.title}</h2>
                  <p className="text-white/65 text-sm mt-2 max-w-md">{recipe.why}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#0c241c] border border-emerald-900/50 rounded-2xl p-6 space-y-5">
                  <div className="flex items-center gap-2"><Coffee size={18} className="text-emerald-400" /><h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Coffee</h3></div>
                  <div><h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Ingredients</h4><ul className="space-y-1 text-sm text-white/80">{recipe.coffeeIngredients.map((ing, i) => (<li key={i} className="flex gap-2"><span className="text-emerald-500">•</span>{ing}</li>))}</ul></div>
                  <div><h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Method</h4><ol className="space-y-2.5 text-sm text-white/80">{recipe.coffeeSteps.map((s, i) => (<li key={i} className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold flex items-center justify-center">{i + 1}</span><span className="pt-0.5">{s}</span></li>))}</ol></div>
                </div>
                <div className="bg-[#0c241c] border border-emerald-900/50 rounded-2xl p-6 space-y-5">
                  <div className="flex items-center gap-2"><Cookie size={18} className="text-emerald-400" /><h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Dessert</h3></div>
                  <div><h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Ingredients</h4><ul className="space-y-1 text-sm text-white/80">{recipe.dessertIngredients.map((ing, i) => (<li key={i} className="flex gap-2"><span className="text-emerald-500">•</span>{ing}</li>))}</ul></div>
                  <div><h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Method</h4><ol className="space-y-2.5 text-sm text-white/80">{recipe.dessertSteps.map((s, i) => (<li key={i} className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold flex items-center justify-center">{i + 1}</span><span className="pt-0.5">{s}</span></li>))}</ol></div>
                </div>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl px-5 py-4 text-sm text-emerald-100/90"><span className="font-semibold text-emerald-300">Pro tip: </span>{recipe.tip}</div>
              <div className="mt-10 flex justify-center"><button onClick={reset} className="px-6 py-3 rounded-full border-2 border-white/30 text-white text-sm font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors">Pair another combination</button></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
