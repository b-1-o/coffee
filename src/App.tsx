import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight, Coffee, Cookie, ChevronRight, X } from 'lucide-react'

const COFFEES = [
  { id: 'caramel-macchiato', name: 'Caramel Macchiato', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee1.png', bg: '#0B3D2E', short: 'Vanilla syrup, steamed milk, espresso mark & caramel drizzle' },
  { id: 'iced-vanilla-latte', name: 'Iced Vanilla Latte', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee2.png', bg: '#0A2F24', short: 'Chilled espresso, vanilla & cold milk over ice' },
  { id: 'caramel-frappuccino', name: 'Caramel Frappuccino', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee3.png', bg: '#0C3528', short: 'Blended coffee, caramel, ice & whipped cream' },
  { id: 'chocolate-mocha', name: 'Chocolate Mocha', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee4.png', bg: '#0A2A20', short: 'Espresso, rich chocolate & steamed milk' },
  { id: 'iced-white-mocha', name: 'Iced White Mocha', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee.png', bg: '#0B3D2E', short: 'White chocolate, espresso & milk over ice' },
]

const DESSERTS = [
  { id: 'chocolate-chip-cookies', name: 'Chocolate Chip Cookies', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/cookie.png', short: 'Classic chewy cookies with melty chocolate chips' },
  { id: 'fluffy-pancakes', name: 'Fluffy Pancakes', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/pancakes.png', short: 'Light, airy stack — perfect with maple or berries' },
  { id: 'chocolate-brownies', name: 'Chocolate Brownies', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/brownie.png', short: 'Fudgy, dense chocolate squares' },
  { id: 'double-chocolate-cookies', name: 'Double Chocolate Cookies', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/chock.png', short: 'Cocoa dough loaded with chocolate chunks' },
]

function makePair(title: string, why: string, coffee: string[], dessert: string[], tip: string) {
  return { title, why, coffeeSteps: coffee, dessertSteps: dessert, tip }
}

const PAIRING_RECIPES: Record<string, ReturnType<typeof makePair>> = {
  'caramel-macchiato|chocolate-chip-cookies': makePair('Caramel Macchiato + Chocolate Chip Cookies', 'Sweet caramel and vanilla cut through the buttery cookie.', ['Add 2 tbsp vanilla syrup to a tall glass.', 'Steam 180 ml milk to ~65°C with fine microfoam.', 'Pour milk, then slowly pour 1–2 espresso shots through the foam.', 'Drizzle caramel in a cross pattern.'], ['Cream 115g butter with sugars, add egg + vanilla.', 'Fold in flour, baking soda, salt and chocolate chips.', 'Bake 10–12 min at 180°C until edges are golden.'], 'Serve the cookie slightly warm so chips are soft.'),
  'caramel-macchiato|fluffy-pancakes': makePair('Caramel Macchiato + Fluffy Pancakes', 'Caramel echoes maple; light pancakes soak up leftover drizzle.', ['Build the macchiato: vanilla → steamed milk → espresso → caramel.'], ['Whisk flour, baking powder, sugar, salt.', 'Mix milk, egg, melted butter; combine (do not overmix).', 'Cook until bubbles form, flip once. Serve with extra caramel.'], 'A light caramel drizzle over the pancakes ties it together.'),
  'caramel-macchiato|chocolate-brownies': makePair('Caramel Macchiato + Chocolate Brownies', 'Deep cocoa meets caramel-vanilla — classic café pair.', ['Prepare a standard caramel macchiato.'], ['Melt dark chocolate + butter. Whisk in sugar, eggs, vanilla.', 'Fold in flour, cocoa, salt. Bake 25–30 min at 175°C.', 'Cool and cut into squares.'], 'Slightly underbake for a fudgy center.'),
  'caramel-macchiato|double-chocolate-cookies': makePair('Caramel Macchiato + Double Chocolate Cookies', 'Double chocolate intensifies the coffee; caramel balances bitterness.', ['Make the caramel macchiato as usual.'], ['Cream butter + sugars, add egg + vanilla.', 'Mix in flour, cocoa, baking soda, salt and chocolate chunks.', 'Bake 11–13 min at 175°C.'], 'Dip the cookie edge in a little caramel.'),
  'iced-vanilla-latte|chocolate-chip-cookies': makePair('Iced Vanilla Latte + Chocolate Chip Cookies', 'Cold vanilla milk and cookies — timeless summer café combo.', ['Fill glass with ice, add 2 tbsp vanilla syrup.', 'Pour cold milk, then 2 shots cooled espresso. Stir once.'], ['Classic chocolate chip cookie dough. Bake until golden edges.'], 'Let the cookie cool completely so it does not melt the ice.'),
  'iced-vanilla-latte|fluffy-pancakes': makePair('Iced Vanilla Latte + Fluffy Pancakes', 'Vanilla in both drink and batter creates a soft dessert brunch.', ['Iced vanilla latte: ice + vanilla + cold milk + cooled espresso.'], ['Make fluffy pancakes; add 1 tsp vanilla to the batter.', 'Serve with powdered sugar or berries.'], 'A small pour of latte over the pancakes is surprisingly good.'),
  'iced-vanilla-latte|chocolate-brownies': makePair('Iced Vanilla Latte + Chocolate Brownies', 'Cold creamy vanilla softens a dense brownie.', ['Build an iced vanilla latte over plenty of ice.'], ['Bake fudgy brownies; chill slightly for a firmer bite.'], 'Cut brownies small so you can alternate sips and bites.'),
  'iced-vanilla-latte|double-chocolate-cookies': makePair('Iced Vanilla Latte + Double Chocolate Cookies', 'Vanilla cools double-chocolate intensity; iced drink stays refreshing.', ['Iced vanilla latte as above.'], ['Bake double chocolate cookies; cool fully before serving.'], 'A pinch of sea salt on the cookies makes the vanilla pop.'),
  'caramel-frappuccino|chocolate-chip-cookies': makePair('Caramel Frappuccino + Chocolate Chip Cookies', 'Blended caramel coffee + chewy cookies = ultimate sweet treat.', ['Blend 2 shots espresso, 2 tbsp caramel, 150 ml milk, ice, sugar until smooth.', 'Top with whipped cream and caramel drizzle.'], ['Bake classic chocolate chip cookies. Serve 1–2 on the side.'], 'Crush a cookie and sprinkle on the whipped cream.'),
  'caramel-frappuccino|fluffy-pancakes': makePair('Caramel Frappuccino + Fluffy Pancakes', 'Dessert-for-breakfast: blended caramel coffee next to a soft stack.', ['Blend caramel frappuccino; keep it thick.'], ['Cook fluffy pancakes. Serve with caramel sauce.'], 'Use the same caramel sauce for both.'),
  'caramel-frappuccino|chocolate-brownies': makePair('Caramel Frappuccino + Chocolate Brownies', 'Frozen caramel coffee and dense brownie is pure indulgence.', ['Make a caramel frappuccino; top with cream and caramel.'], ['Serve a fudgy brownie square. Optional: warm it slightly.'], 'Warm brownie + cold frappuccino creates great contrast.'),
  'caramel-frappuccino|double-chocolate-cookies': makePair('Caramel Frappuccino + Double Chocolate Cookies', 'Caramel softens double chocolate; ice keeps it light.', ['Caramel frappuccino as usual.'], ['Bake double chocolate cookies. Cool and serve 1–2.'], 'Dip the cookie into the frappuccino.'),
  'chocolate-mocha|chocolate-chip-cookies': makePair('Chocolate Mocha + Chocolate Chip Cookies', 'Chocolate-on-chocolate with a coffee backbone.', ['Stir 20g mocha sauce into a cup.', 'Add 1–2 espresso shots, steam and pour milk. Top with cocoa or cream.'], ['Bake chocolate chip cookies. The chips echo the mocha.'], 'Use the same chocolate for sauce and cookies if possible.'),
  'chocolate-mocha|fluffy-pancakes': makePair('Chocolate Mocha + Fluffy Pancakes', 'Mocha becomes a grown-up hot chocolate next to soft pancakes.', ['Make a rich chocolate mocha.'], ['Cook fluffy pancakes. Serve with light chocolate drizzle or berries.'], 'A spoon of mocha foam on the pancakes is excellent.'),
  'chocolate-mocha|chocolate-brownies': makePair('Chocolate Mocha + Chocolate Brownies', 'Maximum chocolate intensity balanced by espresso.', ['Prepare a strong chocolate mocha.'], ['Bake dense fudgy brownies. Serve at room temp or slightly warm.'], 'A pinch of salt on both keeps it from being cloying.'),
  'chocolate-mocha|double-chocolate-cookies': makePair('Chocolate Mocha + Double Chocolate Cookies', 'Triple chocolate with coffee cutting the sweetness.', ['Chocolate mocha as above.'], ['Bake double chocolate cookies. Cool slightly so they stay soft.'], 'Match intensity — darker mocha with darker cookies.'),
  'iced-white-mocha|chocolate-chip-cookies': makePair('Iced White Mocha + Chocolate Chip Cookies', 'White chocolate creaminess + classic chips is soft and nostalgic.', ['Add 2 tbsp white chocolate sauce to a glass with ice.', 'Pour cold milk + 2 shots cooled espresso. Stir. Optional cream.'], ['Bake chocolate chip cookies. Serve cool or room temperature.'], 'White mocha is sweeter — cookie needs no extra sugar.'),
  'iced-white-mocha|fluffy-pancakes': makePair('Iced White Mocha + Fluffy Pancakes', 'White chocolate and fluffy pancakes feel like dessert brunch.', ['Build an iced white mocha over ice.'], ['Cook fluffy pancakes. Light white-chocolate drizzle or powdered sugar.'], 'Keep pancakes plain so the white mocha stays the star.'),
  'iced-white-mocha|chocolate-brownies': makePair('Iced White Mocha + Chocolate Brownies', 'White chocolate coolness against dense dark brownie.', ['Iced white mocha as above.'], ['Serve a fudgy brownie. Slightly chilled + iced drink is refreshing.'], 'Brownie bitterness balances white mocha sweetness.'),
  'iced-white-mocha|double-chocolate-cookies': makePair('Iced White Mocha + Double Chocolate Cookies', 'White + dark chocolate with coffee — layered chocolate experience.', ['Iced white mocha as above.'], ['Bake double chocolate cookies. Cool completely before pairing.'], 'A few white chocolate chips in the cookies would mirror the drink.'),
}

type Step = 'hero' | 'pick-dessert' | 'recipe'

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [step, setStep] = useState<Step>('hero')
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<string | null>(null)
  const [selectedDessertId, setSelectedDessertId] = useState<string | null>(null)

  useEffect(() => {
    ;[...COFFEES, ...DESSERTS].forEach((item) => {
      const img = new Image()
      img.src = item.src
    })
  }, [])

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
      setActiveIndex((prev) => (dir === 'next' ? (prev + 1) % 5 : (prev + 4) % 5))
      setTimeout(() => setIsAnimating(false), 650)
    },
    [isAnimating]
  )

  const center = activeIndex
  const left = (activeIndex + 4) % 5
  const right = (activeIndex + 1) % 5

  const getRoleStyle = (index: number): React.CSSProperties => {
    const role = index === center ? 'center' : index === left ? 'left' : index === right ? 'right' : 'back'
    const base: React.CSSProperties = {
      position: 'absolute',
      aspectRatio: '0.6 / 1',
      transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)',
      willChange: 'transform, filter, opacity',
    }
    if (role === 'center') {
      return { ...base, transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`, filter: 'none', opacity: 1, zIndex: 20, left: '50%', height: isMobile ? '58%' : '88%', bottom: isMobile ? '26%' : '4%' }
    }
    if (role === 'left') {
      return { ...base, transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.85, zIndex: 10, left: isMobile ? '18%' : '28%', height: isMobile ? '15%' : '26%', bottom: isMobile ? '36%' : '16%' }
    }
    if (role === 'right') {
      return { ...base, transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.85, zIndex: 10, left: isMobile ? '82%' : '72%', height: isMobile ? '15%' : '26%', bottom: isMobile ? '36%' : '16%' }
    }
    return { ...base, transform: 'translateX(-50%) scale(1)', filter: 'blur(4px)', opacity: 0.9, zIndex: 5, left: '50%', height: isMobile ? '12%' : '20%', bottom: isMobile ? '36%' : '16%' }
  }

  const selectCoffeeFromHero = () => {
    setSelectedCoffeeId(COFFEES[activeIndex].id)
    setStep('pick-dessert')
  }

  const selectDessert = (id: string) => {
    setSelectedDessertId(id)
    setStep('recipe')
  }

  const resetFlow = () => {
    setStep('hero')
    setSelectedCoffeeId(null)
    setSelectedDessertId(null)
  }

  const pairingKey = selectedCoffeeId && selectedDessertId ? `${selectedCoffeeId}|${selectedDessertId}` : ''
  const recipe = pairingKey ? PAIRING_RECIPES[pairingKey] : null
  const selectedCoffee = COFFEES.find((c) => c.id === selectedCoffeeId)
  const selectedDessert = DESSERTS.find((d) => d.id === selectedDessertId)

  return (
    <div className="min-h-screen bg-[#0a1f1a] text-white">
      {step === 'hero' && (
        <div className="relative w-full overflow-hidden" style={{ backgroundColor: COFFEES[activeIndex].bg, transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)', fontFamily: "'Inter', sans-serif" }}>
          <div className="relative w-full" style={{ height: '100vh', overflow: 'hidden' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 50, opacity: 0.4, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', backgroundRepeat: 'repeat' }} />
            <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none" style={{ zIndex: 2, top: '12%', fontFamily: "'Anton', sans-serif", fontSize: 'clamp(80px, 26vw, 360px)', fontWeight: 900, color: 'white', opacity: 0.11, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>BREW</div>
            <div className="absolute top-5 left-4 sm:top-6 sm:left-8 text-xs font-semibold uppercase text-white/90 tracking-[0.18em]" style={{ zIndex: 60 }}>BREW & BLOOM</div>
            <div className="absolute inset-0" style={{ zIndex: 3 }}>
              {COFFEES.map((item, i) => (
                <div key={item.id} style={getRoleStyle(i)}>
                  <img src={item.src} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center' }} draggable={false} />
                </div>
              ))}
            </div>
            <div className="absolute bottom-16 left-4 sm:bottom-28 sm:left-20 max-w-[340px]" style={{ zIndex: 60 }}>
              <p className="font-bold uppercase tracking-widest mb-1.5 sm:mb-2 text-base sm:text-[22px] text-white/95" style={{ letterSpacing: '0.02em' }}>{COFFEES[activeIndex].name}</p>
              <p className="hidden sm:block text-xs sm:text-sm text-white/80 leading-relaxed mb-3 sm:mb-4">{COFFEES[activeIndex].short}. Choose your coffee, then pair it with a dessert for a perfect recipe.</p>
              <div className="flex gap-3 items-center">
                <button onClick={() => navigate('prev')} className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-white bg-transparent text-white flex items-center justify-center transition-all duration-150 hover:scale-[1.08] hover:bg-white/12" aria-label="Previous"><ArrowLeft size={24} strokeWidth={2.25} /></button>
                <button onClick={() => navigate('next')} className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-white bg-transparent text-white flex items-center justify-center transition-all duration-150 hover:scale-[1.08] hover:bg-white/12" aria-label="Next"><ArrowRight size={24} strokeWidth={2.25} /></button>
                <button onClick={selectCoffeeFromHero} className="ml-1 sm:ml-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white text-[#0a1f1a] text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-emerald-100 transition-colors flex items-center gap-1.5">Select <ChevronRight size={16} strokeWidth={2.5} /></button>
              </div>
            </div>
            <button onClick={selectCoffeeFromHero} className="absolute bottom-16 right-4 sm:bottom-28 sm:right-10 flex items-center gap-2 text-white/95 hover:text-white transition-opacity duration-200 bg-transparent border-0 cursor-pointer p-0" style={{ zIndex: 60, fontFamily: "'Anton', sans-serif", fontSize: 'clamp(18px, 3.5vw, 48px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase' }}>PAIR IT <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2.25} /></button>
          </div>
        </div>
      )}

      {step === 'pick-dessert' && selectedCoffee && (
        <div className="min-h-screen flex flex-col bg-[#071612]">
          <header className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-emerald-900/50">
            <button onClick={resetFlow} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors">← BREW & BLOOM</button>
            <div className="flex items-center gap-2 text-emerald-400/90 text-xs sm:text-sm"><Coffee size={16} /><span className="font-medium">{selectedCoffee.name}</span></div>
          </header>
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80 mb-3">Step 2 of 2</p>
            <h2 className="text-3xl sm:text-5xl text-white mb-3 text-center" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '-0.02em' }}>CHOOSE A DESSERT</h2>
            <p className="text-white/60 text-sm mb-10 text-center max-w-md">Pair your {selectedCoffee.name} with one of these sweets for a complete recipe.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl w-full">
              {DESSERTS.map((d) => (
                <button key={d.id} onClick={() => selectDessert(d.id)} className="group text-left bg-[#0c241c] border border-emerald-900/60 rounded-2xl overflow-hidden hover:border-emerald-500/70 hover:bg-[#0e2a22] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <div className="aspect-[5/4] overflow-hidden bg-[#0a1f1a] flex items-center justify-center p-6">
                    <img src={d.src} alt={d.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-1"><Cookie size={14} className="text-emerald-400/80" /><span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-300/90">Dessert</span></div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-emerald-100 transition-colors">{d.name}</h3>
                    <p className="text-xs text-white/55 mt-1">{d.short}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 'recipe' && recipe && selectedCoffee && selectedDessert && (
        <div className="min-h-screen flex flex-col bg-[#071612]">
          <header className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-emerald-900/50">
            <button onClick={() => setStep('pick-dessert')} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors">← Change dessert</button>
            <button onClick={resetFlow} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors flex items-center gap-1"><X size={14} /> Start over</button>
          </header>
          <div className="flex-1 px-4 sm:px-8 py-10 max-w-4xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-24 h-28 sm:w-28 sm:h-32 bg-[#0c241c] rounded-xl flex items-end justify-center p-2 border border-emerald-900/50"><img src={selectedCoffee.src} alt="" className="max-h-full object-contain" /></div>
                <span className="text-emerald-500 text-2xl font-light">+</span>
                <div className="w-24 h-28 sm:w-28 sm:h-32 bg-[#0c241c] rounded-xl flex items-center justify-center p-3 border border-emerald-900/50"><img src={selectedDessert.src} alt="" className="max-h-full max-w-full object-contain" /></div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80 mb-2">Your pairing</p>
                <h2 className="text-2xl sm:text-4xl text-white" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '-0.02em' }}>{recipe.title}</h2>
                <p className="text-white/65 text-sm mt-2 max-w-md">{recipe.why}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#0c241c] border border-emerald-900/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4"><Coffee size={18} className="text-emerald-400" /><h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Coffee method</h3></div>
                <ol className="space-y-3 text-sm text-white/80">{recipe.coffeeSteps.map((s, i) => (<li key={i} className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold flex items-center justify-center">{i + 1}</span><span className="pt-0.5">{s}</span></li>))}</ol>
              </div>
              <div className="bg-[#0c241c] border border-emerald-900/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4"><Cookie size={18} className="text-emerald-400" /><h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Dessert method</h3></div>
                <ol className="space-y-3 text-sm text-white/80">{recipe.dessertSteps.map((s, i) => (<li key={i} className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold flex items-center justify-center">{i + 1}</span><span className="pt-0.5">{s}</span></li>))}</ol>
              </div>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl px-5 py-4 text-sm text-emerald-100/90"><span className="font-semibold text-emerald-300">Pro tip: </span>{recipe.tip}</div>
            <div className="mt-10 flex justify-center"><button onClick={resetFlow} className="px-6 py-3 rounded-full border-2 border-white/30 text-white text-sm font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors">Pair another combination</button></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
