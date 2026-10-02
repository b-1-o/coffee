import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const IMAGES = [
  {
    src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee1.png',
    bg: '#0B3D2E',
    panel: '#0F4A38',
    title: 'Espresso Classic',
    short: 'Bold single origin shot',
  },
  {
    src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee2.png',
    bg: '#0A2F24',
    panel: '#0D3D30',
    title: 'Caramel Macchiato',
    short: 'Velvety & sweet layered',
  },
  {
    src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee3.png',
    bg: '#0C3528',
    panel: '#104A38',
    title: 'Iced Latte',
    short: 'Creamy cold perfection',
  },
  {
    src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee4.png',
    bg: '#0A2A20',
    panel: '#0E3B2C',
    title: 'Mocha Delight',
    short: 'Chocolate meets espresso',
  },
]

const RECIPES = [
  {
    id: 1,
    name: 'Espresso Classic',
    type: 'Coffee',
    time: '3 min',
    difficulty: 'Easy',
    image: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee1.png',
    ingredients: ['18g finely ground coffee', '30–40ml hot water (90–96°C)', 'Optional: demerara sugar'],
    steps: [
      'Preheat your portafilter and cup with hot water.',
      'Dose 18g of freshly ground beans and distribute evenly.',
      'Tamp firmly with ~15kg pressure, level surface.',
      'Extract for 25–30 seconds aiming for 36–40g yield.',
      'Serve immediately. Enjoy the crema.',
    ],
  },
  {
    id: 2,
    name: 'Caramel Macchiato',
    type: 'Coffee',
    time: '8 min',
    difficulty: 'Medium',
    image: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee2.png',
    ingredients: [
      '1 shot espresso',
      '180ml steamed milk',
      '2 tbsp vanilla syrup',
      'Caramel drizzle',
      'Whipped cream (optional)',
    ],
    steps: [
      'Add vanilla syrup to the bottom of a tall glass.',
      'Steam milk to ~65°C with fine microfoam.',
      'Pour steamed milk over the syrup.',
      'Gently pour espresso through the foam (mark).',
      'Finish with a generous caramel drizzle in a cross pattern.',
    ],
  },
  {
    id: 3,
    name: 'Iced Latte',
    type: 'Coffee',
    time: '5 min',
    difficulty: 'Easy',
    image: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee3.png',
    ingredients: [
      '2 shots espresso (cooled)',
      '150ml cold milk',
      'Ice cubes',
      'Optional: simple syrup or oat milk',
    ],
    steps: [
      'Fill a glass ¾ full with ice.',
      'Pour cold milk over the ice.',
      'Slowly add the cooled espresso shots.',
      'Stir gently once or twice.',
      'Add sweetener to taste and serve with a straw.',
    ],
  },
  {
    id: 4,
    name: 'Mocha Delight',
    type: 'Coffee',
    time: '7 min',
    difficulty: 'Medium',
    image: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee4.png',
    ingredients: [
      '1–2 shots espresso',
      '20g dark chocolate or mocha sauce',
      '150ml steamed milk',
      'Whipped cream',
      'Cocoa powder for dusting',
    ],
    steps: [
      'Melt chocolate or warm mocha sauce in the cup.',
      'Pull espresso directly onto the chocolate and stir.',
      'Steam milk and pour, creating a silky texture.',
      'Top with a swirl of whipped cream.',
      'Dust lightly with cocoa powder and serve.',
    ],
  },
  {
    id: 5,
    name: 'Desert Tiramisu Cup',
    type: 'Dessert',
    time: '25 min + chill',
    difficulty: 'Medium',
    image: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/desert.png',
    ingredients: [
      '6 ladyfinger biscuits',
      '150ml strong espresso (cooled)',
      '250g mascarpone',
      '2 tbsp sugar',
      'Cocoa powder',
      'Optional: dark chocolate shavings',
    ],
    steps: [
      'Dip ladyfingers quickly in cooled espresso (do not soak).',
      'Whip mascarpone with sugar until smooth and airy.',
      'Layer soaked biscuits and cream in serving glasses.',
      'Repeat layers, ending with cream.',
      'Chill at least 2 hours. Dust with cocoa before serving.',
    ],
  },
  {
    id: 6,
    name: 'Coffee Affogato',
    type: 'Dessert',
    time: '4 min',
    difficulty: 'Easy',
    image: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee.png',
    ingredients: [
      '1–2 scoops vanilla gelato',
      '1 fresh hot espresso shot',
      'Optional: amaretto or chocolate sauce',
    ],
    steps: [
      'Place scoops of gelato in a small chilled glass or bowl.',
      'Pull a fresh espresso shot.',
      'Pour the hot espresso directly over the gelato.',
      'Serve immediately while the contrast is perfect.',
      'Add a splash of amaretto for an adult twist.',
    ],
  },
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<typeof RECIPES[0] | null>(null)

  // Preload images
  useEffect(() => {
    IMAGES.forEach((img) => {
      const i = new Image()
      i.src = img.src
    })
    RECIPES.forEach((r) => {
      const i = new Image()
      i.src = r.image
    })
  }, [])

  // Mobile detection
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
      setActiveIndex((prev) =>
        dir === 'next' ? (prev + 1) % 4 : (prev + 3) % 4
      )
      setTimeout(() => setIsAnimating(false), 650)
    },
    [isAnimating]
  )

  const center = activeIndex
  const left = (activeIndex + 3) % 4
  const right = (activeIndex + 1) % 4
  const back = (activeIndex + 2) % 4

  const getRoleStyle = (index: number) => {
    const role =
      index === center
        ? 'center'
        : index === left
          ? 'left'
          : index === right
            ? 'right'
            : 'back'

    const base = {
      position: 'absolute' as const,
      aspectRatio: '0.6 / 1',
      transition:
        'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)',
      willChange: 'transform, filter, opacity',
    }

    if (role === 'center') {
      return {
        ...base,
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'none',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom: isMobile ? '22%' : 0,
      }
    }
    if (role === 'left') {
      return {
        ...base,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '20%' : '30%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      }
    }
    if (role === 'right') {
      return {
        ...base,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '80%' : '70%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      }
    }
    // back
    return {
      ...base,
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(4px)',
      opacity: 1,
      zIndex: 5,
      left: '50%',
      height: isMobile ? '13%' : '22%',
      bottom: isMobile ? '32%' : '12%',
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1f1a] text-white">
      {/* HERO */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: IMAGES[activeIndex].bg,
          transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="relative w-full" style={{ height: '100vh', overflow: 'hidden' }}>
          {/* Grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 50,
              opacity: 0.4,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Giant ghost text */}
          <div
            className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
            style={{
              zIndex: 2,
              top: '18%',
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(90px, 28vw, 380px)',
              fontWeight: 900,
              color: 'white',
              opacity: 0.12,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            BREW
          </div>

          {/* Top-left brand */}
          <div
            className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase text-white/90 tracking-[0.18em]"
            style={{ zIndex: 60 }}
          >
            BREW & BLOOM
          </div>

          {/* Carousel */}
          <div className="absolute inset-0" style={{ zIndex: 3 }}>
            {IMAGES.map((img, i) => (
              <div key={i} style={getRoleStyle(i)}>
                <img
                  src={img.src}
                  alt={img.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Bottom-left text + nav */}
          <div
            className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 max-w-[320px]"
            style={{ zIndex: 60 }}
          >
            <p className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-white/95" style={{ letterSpacing: '0.02em' }}>
              {IMAGES[activeIndex].title}
            </p>
            <p className="hidden sm:block text-xs sm:text-sm text-white/85 leading-relaxed mb-4 sm:mb-5">
              Hand-crafted recipes inspired by the finest cafés. Rich aromas, perfect crema, and desserts that pair like a dream. Discover the art of the perfect brew.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('prev')}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-transparent text-white flex items-center justify-center transition-all duration-150 hover:scale-[1.08] hover:bg-white/12"
                aria-label="Previous"
              >
                <ArrowLeft size={26} strokeWidth={2.25} />
              </button>
              <button
                onClick={() => navigate('next')}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-transparent text-white flex items-center justify-center transition-all duration-150 hover:scale-[1.08] hover:bg-white/12"
                aria-label="Next"
              >
                <ArrowRight size={26} strokeWidth={2.25} />
              </button>
            </div>
          </div>

          {/* Bottom-right link */}
          <a
            href="#recipes"
            className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 text-white/95 hover:text-white transition-opacity duration-200 no-underline"
            style={{
              zIndex: 60,
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            DISCOVER
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </a>
        </div>
      </div>

      {/* RECIPES SECTION */}
      <section id="recipes" className="relative py-20 px-4 sm:px-8 lg:px-16 bg-[#071612]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80 mb-3">
              Recipes Collection
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl text-white mb-4"
              style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '-0.02em' }}
            >
              COFFEE & DESSERTS
            </h2>
            <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base">
              Signature drinks and sweet pairings in the spirit of a classic café. Simple techniques, exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECIPES.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="group text-left bg-[#0c241c] border border-emerald-900/60 rounded-2xl overflow-hidden hover:border-emerald-600/80 hover:bg-[#0e2a22] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#0a1f1a]">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-contain object-bottom p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-300">
                      {recipe.type}
                    </span>
                    <span className="text-[10px] text-white/50">{recipe.time}</span>
                    <span className="text-[10px] text-white/50">· {recipe.difficulty}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-200 transition-colors">
                    {recipe.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0c241c] border border-emerald-800/60 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-white/80 hover:text-white flex items-center justify-center z-10"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="aspect-[16/10] bg-[#0a1f1a] flex items-end justify-center p-6">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="max-h-full object-contain"
              />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-300">
                  {selectedRecipe.type}
                </span>
                <span className="text-xs text-white/50">{selectedRecipe.time} · {selectedRecipe.difficulty}</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl text-white mb-6"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                {selectedRecipe.name}
              </h3>

              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-emerald-400/90 mb-3">
                  Ingredients
                </h4>
                <ul className="space-y-1.5 text-sm text-white/80">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-emerald-400/90 mb-3">
                  Method
                </h4>
                <ol className="space-y-3 text-sm text-white/80">
                  {selectedRecipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-emerald-900/40 text-center text-white/40 text-sm">
        <p style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '0.05em' }} className="text-white/60 text-lg mb-2">
          BREW & BLOOM
        </p>
        <p>Crafted with care · Dark emerald café vibes</p>
      </footer>
    </div>
  )
}

export default App
