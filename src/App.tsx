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

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => dir === 'next' ? (prev + 1) % count : (prev + count - 1) % count)
    window.setTimeout(() => setIsAnimating(false), 650)
  }, [isAnimating, count])

  return { activeIndex, isMobile, navigate }
}

function getItemRole(index: number, activeIndex: number, count: number, isMobile: boolean, dessert: boolean): React.CSSProperties {
  const center = activeIndex
  const left = (activeIndex + count - 1) % count
  const right = (activeIndex + 1) % count
  const role = index === center ? 'center' : index === left ? 'left' : index === right ? 'right' : 'back'
  const duration = isMobile ? 520 : 650
  const easing = 'cubic-bezier(0.22,1,0.36,1)'
  const transition = isMobile
    ? `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}, left ${duration}ms ${easing}, height ${duration}ms ${easing}, bottom ${duration}ms ${easing}`
    : `transform ${duration}ms ${easing}, filter ${duration}ms ${easing}, opacity ${duration}ms ${easing}, left ${duration}ms ${easing}, height ${duration}ms ${easing}, bottom ${duration}ms ${easing}`
  const base: React.CSSProperties = {
    position: 'absolute',
    transition,
    willChange: isMobile ? 'transform, opacity' : 'transform, filter, opacity',
  }

  if (role === 'center') {
    return {
      ...base,
      left: '50%',
      bottom: dessert ? (isMobile ? '24%' : '14%') : (isMobile ? '12%' : '8%'),
      height: dessert ? (isMobile ? '36%' : '43%') : (isMobile ? '68%' : '72%'),
      aspectRatio: dessert ? '1 / 1' : '0.58 / 1',
      transform: 'translate3d(-50%, 0, 0) scale(' + (dessert ? (isMobile ? 1.04 : 1.1) : 1) + ')',
      filter: isMobile ? 'none' : 'none',
      opacity: 1,
      zIndex: 20,
    }
  }

  if (role === 'left' || role === 'right') {
    return {
      ...base,
      left: role === 'left' ? (isMobile ? '15%' : '23%') : (isMobile ? '85%' : '77%'),
      bottom: dessert ? (isMobile ? '27%' : '19%') : (isMobile ? '22%' : '18%'),
      height: dessert ? (isMobile ? '13%' : '16%') : (isMobile ? '14%' : '17%'),
      aspectRatio: dessert ? '1 / 1' : '0.6 / 1',
      transform: 'translate3d(-50%, 0, 0) scale(' + (dessert ? 0.92 : (isMobile ? 0.94 : 1.0)) + ')',
      filter: isMobile ? 'none' : 'blur(2px)',
      opacity: dessert ? 0.68 : 0.72,
      zIndex: 10,
    }
  }

  return {
    ...base,
    left: '50%',
    bottom: dessert ? (isMobile ? '29%' : '19%') : (isMobile ? '27%' : '17%'),
    height: dessert ? (isMobile ? '10%' : '13%') : (isMobile ? '8%' : '12%'),
    aspectRatio: dessert ? '1 / 1' : '0.6 / 1',
    transform: 'translate3d(-50%, 0, 0) scale(0.8)',
    filter: isMobile ? 'none' : 'blur(4px)',
    opacity: dessert ? 0.35 : 0.25,
    zIndex: 5,
  }
}
function HeroCarousel({
  items, brand, ghost, onSelect, subtitle, mode,
}: {
  items: readonly Item[]
  brand: string
  ghost: string
  subtitle?: string
  onSelect: (item: Item) => void
  mode: 'coffee' | 'dessert'
}) {
  const { activeIndex, isMobile, navigate } = useCarousel(items.length)
  const current = items[activeIndex]
  const dessert = mode === 'dessert'

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: current.bg, transition: 'background-color 650ms cubic-bezier(0.22,1,0.36,1)', fontFamily: "'Inter', sans-serif" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.28) 34%, rgba(255,255,255,0.04) 72%, rgba(255,255,255,0.16) 100%)' }} />
      <div className="relative w-full" style={{ height: '100svh', minHeight: isMobile ? 560 : 620, overflow: 'hidden', touchAction: 'pan-y' }}>
        <div className="carousel-noise absolute inset-0 pointer-events-none" style={{ zIndex: 50, opacity: isMobile ? 0.08 : 0.32, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', backgroundRepeat: 'repeat' }} />

        {/* Layer 1 — oversized editorial word in the background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ zIndex: 1, fontFamily: "'Anton', sans-serif", fontSize: dessert ? 'clamp(120px, 27vw, 360px)' : 'clamp(180px, 35vw, 520px)', fontWeight: 900, color: 'white', opacity: dessert ? 0.105 : 0.16, lineHeight: 0.8, letterSpacing: '-0.055em', whiteSpace: 'nowrap', transform: 'translateY(-2%)' }}
        >
          {ghost}
        </div>

        <div className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase text-white/90 tracking-[0.18em]" style={{ zIndex: 60 }}>{brand}</div>

        {/* Layer 2 — product photography sits in front of the word */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {items.map((item, i) => {
            const role = i === activeIndex ? 'center' : i === (activeIndex + items.length - 1) % items.length ? 'left' : i === (activeIndex + 1) % items.length ? 'right' : 'back'
            if (isMobile && role === 'back') return null
            return (
              <div key={item.id} style={getItemRole(i, activeIndex, items.length, isMobile, dessert)}>
                <img
                  src={item.src}
                  alt={item.name}
                  style={{
                    width: dessert ? '100%' : (isMobile ? '128%' : '124%'),
                    height: dessert ? '100%' : (isMobile ? '128%' : '124%'),
                    maxWidth: 'none',
                    maxHeight: 'none',
                    marginLeft: dessert ? '0' : (isMobile ? '-14%' : '-12%'),
                    marginTop: dessert ? '0' : (isMobile ? '-10%' : '-8%'),
                    objectFit: 'contain',
                    objectPosition: 'center center',
                    transform: dessert ? 'none' : 'scale(2)',
                    transformOrigin: 'center center',
                    display: 'block',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                  draggable={false}
                />
                <div
                  aria-hidden={role !== 'center'}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: isMobile ? 'calc(100% + 6px)' : 'calc(100% + 10px)',
                    transform: 'translate3d(-50%, 0, 0)',
                    width: 'max-content',
                    maxWidth: 'calc(100vw - 40px)',
                    textAlign: 'center',
                    opacity: role === 'center' ? 1 : 0,
                    transition: `opacity ${isMobile ? 520 : 650}ms cubic-bezier(0.22,1,0.36,1)`,
                    pointerEvents: 'none',
                  }}
                >
                  <p style={{
                    margin: 0,
                    fontFamily: "'Anton', sans-serif",
                    fontSize: isMobile ? 'clamp(21px, 6.4vw, 30px)' : 'clamp(26px, 3vw, 40px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.025em',
                    textTransform: 'uppercase',
                    color: 'white',
                    whiteSpace: 'nowrap',
                    textShadow: '0 2px 24px rgba(0,0,0,0.3)',
                  }}>{item.name}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="absolute bottom-5 left-4 sm:bottom-16 sm:left-16 max-w-[340px]" style={{ zIndex: 60 }}>
          <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 mb-2">{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</p>
          <p className="hidden sm:block text-xs sm:text-sm text-white/75 leading-relaxed mb-4">{subtitle || current.short}</p>
          <div className="flex gap-2.5 sm:gap-3 items-center">
            <button onClick={() => navigate('prev')} className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/80 bg-black/10 text-white flex items-center justify-center transition-transform duration-200 hover:scale-105" aria-label="Previous"><ArrowLeft size={24} /></button>
            <button onClick={() => navigate('next')} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/80 bg-black/10 backdrop-blur-sm text-white flex items-center justify-center transition-transform duration-200 hover:scale-105" aria-label="Next"><ArrowRight size={24} /></button>
          </div>
        </div>

        {/* One action only — the existing Pair It flow */}
        <button onClick={() => onSelect(current)} className="absolute bottom-6 right-4 sm:bottom-16 sm:right-10 flex items-center gap-2 text-white/95 hover:text-white transition-transform duration-200 hover:translate-x-1 bg-transparent border-0 cursor-pointer p-0" style={{ zIndex: 60, fontFamily: "'Anton', sans-serif", fontSize: isMobile ? 'clamp(28px, 9vw, 44px)' : 'clamp(22px, 4vw, 54px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase', bottom: isMobile ? '28px' : undefined }}>
          PAIR IT <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

function App() {
  const [step, setStep] = useState<Step>('coffee')
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<string | null>(null)
  const [selectedDessertId, setSelectedDessertId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
          <motion.div key="coffee" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}>
            <HeroCarousel mode="coffee" items={COFFEES} brand="BREW & BLOOM" ghost="BREW" subtitle="Choose your coffee, then pair it with a dessert for a complete recipe." onSelect={(coffee) => { setSelectedCoffeeId(coffee.id); setStep('dessert') }} />
          </motion.div>
        )}

        {step === 'dessert' && selectedCoffee && (
          <motion.div key="dessert" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <div className="absolute top-6 right-4 sm:right-8 z-[70]">
              <button onClick={() => setStep('coffee')} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors flex items-center gap-1"><X size={14} /> Change coffee</button>
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 text-white/80 text-xs"><Coffee size={14} /><span className="font-medium">{selectedCoffee.name}</span></div>
            <HeroCarousel mode="dessert" items={DESSERTS} brand="BREW & BLOOM" ghost="SWEETS" subtitle={`Pair your ${selectedCoffee.name} with one of these sweets for a complete recipe.`} onSelect={(dessert) => { setSelectedDessertId(dessert.id); setStep('ticket') }} />
          </motion.div>
        )}

        {step === 'ticket' && selectedCoffee && selectedDessert && (
          <motion.div key="ticket" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#071612]">
            <div className="w-full max-w-[780px] rounded-[24px] p-2 sm:p-5" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.16) 40%, rgba(255,255,255,0.04) 78%, rgba(255,255,255,0.10) 100%)' }}>
              <TearTicket
                image={selectedCoffee.src}
                imageAlt={selectedCoffee.name}
                stub={<div style={{ padding: '20px 14px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, textAlign: 'center' }}><span style={{ fontFamily: "'Anton', sans-serif", fontSize: isMobile ? 16 : 18, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>RECIPE</span><span style={{ fontSize: isMobile ? 9 : 10, opacity: 0.55, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tear here</span></div>}
                orientation="horizontal"
                scrim
                imageRadius={8}
                onTear={() => setStep('recipe')}
                width={736}
                height={400}
                stubSize={240}
                radius={16}
                holes={12}
                holeSize={6}
                notch={3}
                roughness={0}
                tearAngle={30}
                stretch={30}
                resistance={0.45}
                rotate={4}
                tilt={!isMobile}
                tiltMax={isMobile ? 0 : 9}
                tiltReach={isMobile ? 0 : 260}
                parallax={isMobile ? 0 : 6}
                perspective={isMobile ? 900 : 1000}
                background="#151b18"
                color="#f5f5f5"
                border
                borderWidth={1}
                recenter
              >
                <div style={{ padding: isMobile ? '18px 20px' : '22px 24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div><p style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 6 }}>Brew & Bloom · Combo</p><p style={{ fontSize: 12, opacity: 0.8 }}>{selectedCoffee.name}</p><p style={{ fontSize: 12, opacity: 0.8 }}>+ {selectedDessert.name}</p></div>
                  <p style={{ fontFamily: "'Anton', sans-serif", fontSize: isMobile ? 'clamp(20px, 6vw, 27px)' : 'clamp(22px, 4vw, 32px)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.1 }}>Get your combo recipe</p>
                </div>
              </TearTicket>
            </div>
            <button onClick={() => setStep('dessert')} className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-white/50 hover:text-white transition-colors">← Change dessert</button>
          </motion.div>
        )}

        {step === 'recipe' && recipe && selectedCoffee && selectedDessert && (
          <motion.div key="recipe" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="min-h-screen flex flex-col bg-[#071612]">
            <header className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-emerald-900/50"><button onClick={() => setStep('ticket')} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors">← Ticket</button><button onClick={reset} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors flex items-center gap-1"><X size={14} /> Start over</button></header>
            <div className="flex-1 px-4 sm:px-8 py-10 max-w-4xl mx-auto w-full">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                <div className="flex items-center gap-4"><div className="w-24 h-28 sm:w-28 sm:h-32 bg-[#0c241c] rounded-xl flex items-end justify-center p-2 border border-emerald-900/50"><img src={selectedCoffee.src} alt="" className="max-h-full object-contain" /></div><span className="text-emerald-500 text-2xl font-light">+</span><div className="w-24 h-28 sm:w-28 sm:h-32 bg-[#0c241c] rounded-xl flex items-center justify-center p-3 border border-emerald-900/50"><img src={selectedDessert.src} alt="" className="max-h-full max-w-full object-contain" /></div></div>
                <div className="text-center sm:text-left"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80 mb-2">Your pairing · {recipe.time}</p><h2 className="text-2xl sm:text-4xl text-white" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '-0.02em' }}>{recipe.title}</h2><p className="text-white/65 text-sm mt-2 max-w-md">{recipe.why}</p></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#0c241c] border border-emerald-900/50 rounded-2xl p-6 space-y-5"><div className="flex items-center gap-2"><Coffee size={18} className="text-emerald-400" /><h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Coffee</h3></div><div><h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Ingredients</h4><ul className="space-y-1 text-sm text-white/80">{recipe.coffeeIngredients.map((ing, i) => <li key={i} className="flex gap-2"><span className="text-emerald-500">•</span>{ing}</li>)}</ul></div><div><h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Method</h4><ol className="space-y-2.5 text-sm text-white/80">{recipe.coffeeSteps.map((s, i) => <li key={i} className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold flex items-center justify-center">{i + 1}</span><span className="pt-0.5">{s}</span></li>)}</ol></div></div>
                <div className="bg-[#0c241c] border border-emerald-900/50 rounded-2xl p-6 space-y-5"><div className="flex items-center gap-2"><Cookie size={18} className="text-emerald-400" /><h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Dessert</h3></div><div><h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Ingredients</h4><ul className="space-y-1 text-sm text-white/80">{recipe.dessertIngredients.map((ing, i) => <li key={i} className="flex gap-2"><span className="text-emerald-500">•</span>{ing}</li>)}</ul></div><div><h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Method</h4><ol className="space-y-2.5 text-sm text-white/80">{recipe.dessertSteps.map((s, i) => <li key={i} className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold flex items-center justify-center">{i + 1}</span><span className="pt-0.5">{s}</span></li>)}</ol></div></div>
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
