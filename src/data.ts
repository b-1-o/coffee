export const COFFEES = [
  { id: 'caramel-macchiato', name: 'Caramel Macchiato', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee1.png', bg: '#0B3D2E', short: 'Vanilla syrup, steamed milk, espresso mark & caramel drizzle' },
  { id: 'iced-vanilla-latte', name: 'Iced Vanilla Latte', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee2.png', bg: '#0A2F24', short: 'Chilled espresso, vanilla & cold milk over ice' },
  { id: 'caramel-frappuccino', name: 'Caramel Frappuccino', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee3.png', bg: '#0C3528', short: 'Blended coffee, caramel, ice & whipped cream' },
  { id: 'chocolate-mocha', name: 'Chocolate Mocha', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee4.png', bg: '#0A2A20', short: 'Espresso, rich chocolate & steamed milk' },
  { id: 'iced-white-mocha', name: 'Iced White Mocha', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/coffee.png', bg: '#0B3D2E', short: 'White chocolate, espresso & milk over ice' },
] as const

export const DESSERTS = [
  { id: 'chocolate-chip-cookies', name: 'Chocolate Chip Cookies', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/cookie.png', bg: '#0A2F24', short: 'Classic chewy cookies with melty chocolate chips' },
  { id: 'fluffy-pancakes', name: 'Fluffy Pancakes', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/pancakes.png', bg: '#0C3528', short: 'Light, airy stack — perfect with maple or berries' },
  { id: 'chocolate-brownies', name: 'Chocolate Brownies', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/brownie.png', bg: '#0A2A20', short: 'Fudgy, dense chocolate squares' },
  { id: 'double-chocolate-cookies', name: 'Double Chocolate Cookies', src: 'https://raw.githubusercontent.com/b-1-o/coffee/main/assets/chock.png', bg: '#0B3D2E', short: 'Cocoa dough loaded with chocolate chunks' },
] as const

export type Recipe = {
  title: string
  why: string
  coffeeIngredients: string[]
  coffeeSteps: string[]
  dessertIngredients: string[]
  dessertSteps: string[]
  tip: string
  time: string
}

function R(
  title: string,
  why: string,
  time: string,
  cIng: string[],
  cSteps: string[],
  dIng: string[],
  dSteps: string[],
  tip: string
): Recipe {
  return { title, why, time, coffeeIngredients: cIng, coffeeSteps: cSteps, dessertIngredients: dIng, dessertSteps: dSteps, tip }
}

export const PAIRINGS: Record<string, Recipe> = {
  'caramel-macchiato|chocolate-chip-cookies': R(
    'Caramel Macchiato + Chocolate Chip Cookies',
    'Vanilla-caramel sweetness cuts the buttery cookie; warm cookie + hot macchiato is peak café comfort.',
    '25 min',
    ['2 tbsp vanilla syrup', '180 ml whole milk', '1–2 shots espresso', 'Caramel sauce'],
    ['Add vanilla syrup to a tall glass.', 'Steam milk to 60–65 °C with fine microfoam.', 'Pour milk, then slowly pour espresso through the foam.', 'Finish with a cross-pattern caramel drizzle.'],
    ['115 g butter', '100 g brown + 50 g white sugar', '1 egg', '1 tsp vanilla', '190 g flour', '½ tsp baking soda', 'Salt', '150 g chocolate chips'],
    ['Cream butter and sugars. Beat in egg and vanilla.', 'Fold in dry ingredients and chips.', 'Bake 10–12 min at 180 °C until edges golden, centers soft.'],
    'Serve one cookie slightly warm so chips stay soft.'
  ),
  'caramel-macchiato|fluffy-pancakes': R(
    'Caramel Macchiato + Fluffy Pancakes',
    'Caramel echoes maple; light pancakes soak up leftover drizzle.',
    '30 min',
    ['2 tbsp vanilla syrup', '180 ml milk', '1–2 shots espresso', 'Caramel sauce'],
    ['Build macchiato: syrup → steamed milk → espresso → caramel.'],
    ['200 g flour', '2 tsp baking powder', '1 tbsp sugar', 'Salt', '250 ml milk', '1 egg', '2 tbsp melted butter'],
    ['Whisk dry. Mix wet. Combine gently — do not overmix.', 'Cook until bubbles form, flip once. Serve with caramel drizzle.'],
    'Use the same caramel for drink and pancakes.'
  ),
  'caramel-macchiato|chocolate-brownies': R(
    'Caramel Macchiato + Chocolate Brownies',
    'Deep cocoa meets caramel-vanilla — classic salted-caramel brownie vibe.',
    '45 min',
    ['2 tbsp vanilla syrup', '180 ml milk', '1–2 shots espresso', 'Caramel'],
    ['Prepare a standard caramel macchiato.'],
    ['150 g dark chocolate', '100 g butter', '150 g sugar', '2 eggs', '1 tsp vanilla', '75 g flour', '20 g cocoa', 'Salt'],
    ['Melt chocolate and butter. Whisk in sugar, eggs, vanilla.', 'Fold in flour, cocoa, salt. Bake 25–30 min at 175 °C.'],
    'Slightly underbake for a fudgy center.'
  ),
  'caramel-macchiato|double-chocolate-cookies': R(
    'Caramel Macchiato + Double Chocolate Cookies',
    'Double chocolate intensifies coffee; caramel balances bitterness.',
    '30 min',
    ['2 tbsp vanilla syrup', '180 ml milk', '1–2 shots espresso', 'Caramel'],
    ['Make the caramel macchiato as usual.'],
    ['115 g butter', '150 g sugars', '1 egg', '150 g flour', '40 g cocoa', '½ tsp baking soda', 'Salt', '150 g dark chocolate chunks'],
    ['Cream butter and sugars. Add egg. Mix dry ingredients and chunks.', 'Bake 11–13 min at 175 °C.'],
    'Dip cookie edge in caramel for a café touch.'
  ),
  'iced-vanilla-latte|chocolate-chip-cookies': R(
    'Iced Vanilla Latte + Chocolate Chip Cookies',
    'Cold vanilla milk and a classic cookie — timeless summer café combo.',
    '20 min',
    ['2 tbsp vanilla syrup', '150 ml cold milk', '2 shots cooled espresso', 'Ice'],
    ['Fill glass with ice. Add syrup. Pour cold milk, then espresso. Stir once.'],
    ['115 g butter', '150 g sugars', '1 egg', '190 g flour', '½ tsp baking soda', 'Salt', '150 g chips'],
    ['Cream butter and sugars; add egg. Fold in dry ingredients and chips.', 'Bake 10–12 min at 180 °C.'],
    'Cool cookie fully so it does not melt the ice.'
  ),
  'iced-vanilla-latte|fluffy-pancakes': R(
    'Iced Vanilla Latte + Fluffy Pancakes',
    'Vanilla in drink and batter creates a soft dessert brunch.',
    '30 min',
    ['2 tbsp vanilla syrup', '150 ml cold milk', '2 shots cooled espresso', 'Ice'],
    ['Iced vanilla latte: ice + syrup + cold milk + espresso.'],
    ['200 g flour', '2 tsp baking powder', '1 tbsp sugar', 'Salt', '250 ml milk', '1 egg', '2 tbsp butter', '1 tsp vanilla'],
    ['Whisk dry, mix wet (with vanilla), combine gently.', 'Cook, stack, serve with powdered sugar or berries.'],
    'A small pour of latte over pancakes works well.'
  ),
  'iced-vanilla-latte|chocolate-brownies': R(
    'Iced Vanilla Latte + Chocolate Brownies',
    'Cold creamy vanilla softens a dense brownie.',
    '45 min',
    ['2 tbsp vanilla syrup', '150 ml cold milk', '2 shots cooled espresso', 'Ice'],
    ['Build iced vanilla latte over plenty of ice.'],
    ['150 g dark chocolate', '100 g butter', '150 g sugar', '2 eggs', '75 g flour', '20 g cocoa', 'Salt'],
    ['Melt chocolate and butter; whisk in sugar and eggs. Fold dry. Bake 25–30 min at 175 °C. Chill slightly.'],
    'Cut brownies small to alternate sips and bites.'
  ),
  'iced-vanilla-latte|double-chocolate-cookies': R(
    'Iced Vanilla Latte + Double Chocolate Cookies',
    'Vanilla cools double-chocolate intensity; iced drink stays refreshing.',
    '30 min',
    ['2 tbsp vanilla syrup', '150 ml cold milk', '2 shots cooled espresso', 'Ice'],
    ['Iced vanilla latte as above.'],
    ['115 g butter', '150 g sugars', '1 egg', '150 g flour', '40 g cocoa', '½ tsp baking soda', 'Salt', '150 g chunks'],
    ['Cream butter and sugars; add egg. Mix dry and chunks. Bake 11–13 min at 175 °C. Cool fully.'],
    'Sea salt on cookies makes the vanilla pop.'
  ),
  'caramel-frappuccino|chocolate-chip-cookies': R(
    'Caramel Frappuccino + Chocolate Chip Cookies',
    'Blended caramel coffee and a chewy cookie — ultimate sweet café treat.',
    '25 min',
    ['2 shots espresso, cooled', '2 tbsp caramel', '150 ml milk', '1 cup ice', 'Whipped cream'],
    ['Blend espresso, caramel, milk, ice until thick. Top with cream and caramel drizzle.'],
    ['115 g butter', '150 g sugars', '1 egg', '190 g flour', '½ tsp baking soda', 'Salt', '150 g chips'],
    ['Cream butter and sugars; add egg. Fold in dry ingredients and chips. Bake 10–12 min at 180 °C.'],
    'Crush a cookie on the whipped cream for texture.'
  ),
  'caramel-frappuccino|fluffy-pancakes': R(
    'Caramel Frappuccino + Fluffy Pancakes',
    'Dessert-for-breakfast: blended caramel coffee next to a soft stack.',
    '35 min',
    ['2 shots espresso', '2 tbsp caramel', '150 ml milk', 'Ice', 'Whipped cream'],
    ['Blend caramel frappuccino thick. Top with cream and caramel.'],
    ['200 g flour', '2 tsp baking powder', '1 tbsp sugar', 'Salt', '250 ml milk', '1 egg', '2 tbsp melted butter'],
    ['Whisk dry. Mix wet. Combine gently. Cook until bubbles form, flip once. Serve with caramel sauce.'],
    'Same caramel for drink and pancakes.'
  ),
  'caramel-frappuccino|chocolate-brownies': R(
    'Caramel Frappuccino + Chocolate Brownies',
    'Frozen caramel coffee and dense brownie is pure indulgence.',
    '50 min',
    ['2 shots espresso', '2 tbsp caramel', '150 ml milk', 'Ice', 'Whipped cream'],
    ['Caramel frappuccino; top with cream and caramel.'],
    ['150 g dark chocolate', '100 g butter', '150 g sugar', '2 eggs', '75 g flour', '20 g cocoa', 'Salt'],
    ['Melt chocolate and butter. Whisk in sugar and eggs. Fold dry. Bake 25–30 min at 175 °C. Optional: warm slightly.'],
    'Warm brownie + cold frappuccino creates great contrast.'
  ),
  'caramel-frappuccino|double-chocolate-cookies': R(
    'Caramel Frappuccino + Double Chocolate Cookies',
    'Caramel softens double chocolate; ice keeps it light.',
    '30 min',
    ['2 shots espresso', '2 tbsp caramel', '150 ml milk', 'Ice', 'Whipped cream'],
    ['Caramel frappuccino as usual.'],
    ['115 g butter', '150 g sugars', '1 egg', '150 g flour', '40 g cocoa', '½ tsp baking soda', 'Salt', '150 g chunks'],
    ['Cream butter and sugars. Add egg. Mix dry and chunks. Bake 11–13 min at 175 °C. Serve 1–2.'],
    'Dip cookie into the frappuccino.'
  ),
  'chocolate-mocha|chocolate-chip-cookies': R(
    'Chocolate Mocha + Chocolate Chip Cookies',
    'Chocolate-on-chocolate with a coffee backbone.',
    '25 min',
    ['20 g mocha sauce', '1–2 shots espresso', '150 ml steamed milk', 'Cocoa or cream'],
    ['Stir mocha into cup. Pull espresso, mix. Steam and pour milk. Dust with cocoa.'],
    ['115 g butter', '150 g sugars', '1 egg', '190 g flour', '½ tsp baking soda', 'Salt', '150 g chips'],
    ['Cream butter and sugars; add egg. Fold in dry ingredients and chips. Bake until golden edges.'],
    'Same chocolate for sauce and cookies if possible.'
  ),
  'chocolate-mocha|fluffy-pancakes': R(
    'Chocolate Mocha + Fluffy Pancakes',
    'Mocha becomes a grown-up hot chocolate next to soft pancakes.',
    '35 min',
    ['20 g mocha sauce', '1–2 shots espresso', '150 ml steamed milk'],
    ['Make a rich chocolate mocha.'],
    ['200 g flour', '2 tsp baking powder', '1 tbsp sugar', 'Salt', '250 ml milk', '1 egg', '2 tbsp melted butter'],
    ['Whisk dry. Mix wet. Combine gently. Cook and stack. Serve with light chocolate drizzle or berries.'],
    'A spoon of mocha foam on pancakes is excellent.'
  ),
  'chocolate-mocha|chocolate-brownies': R(
    'Chocolate Mocha + Chocolate Brownies',
    'Maximum chocolate intensity balanced by espresso.',
    '50 min',
    ['20 g mocha sauce', '1–2 shots espresso', '150 ml steamed milk'],
    ['Strong chocolate mocha.'],
    ['150 g dark chocolate', '100 g butter', '150 g sugar', '2 eggs', '75 g flour', '20 g cocoa', 'Salt'],
    ['Melt chocolate and butter. Whisk in sugar and eggs. Fold dry. Bake 25–30 min at 175 °C.'],
    'Pinch of salt on both keeps it from being cloying.'
  ),
  'chocolate-mocha|double-chocolate-cookies': R(
    'Chocolate Mocha + Double Chocolate Cookies',
    'Triple chocolate with coffee cutting the sweetness.',
    '30 min',
    ['20 g mocha sauce', '1–2 shots espresso', '150 ml steamed milk'],
    ['Chocolate mocha as above.'],
    ['115 g butter', '150 g sugars', '1 egg', '150 g flour', '40 g cocoa', '½ tsp baking soda', 'Salt', '150 g chunks'],
    ['Cream butter and sugars. Add egg. Mix dry and chunks. Bake 11–13 min at 175 °C. Cool slightly.'],
    'Match intensity — darker mocha with darker cookies.'
  ),
  'iced-white-mocha|chocolate-chip-cookies': R(
    'Iced White Mocha + Chocolate Chip Cookies',
    'White chocolate creaminess plus classic chips is soft and nostalgic.',
    '20 min',
    ['2 tbsp white chocolate sauce', '150 ml cold milk', '2 shots cooled espresso', 'Ice'],
    ['Add white chocolate sauce to glass with ice. Pour cold milk and espresso. Stir.'],
    ['115 g butter', '150 g sugars', '1 egg', '190 g flour', '½ tsp baking soda', 'Salt', '150 g chips'],
    ['Cream butter and sugars; add egg. Fold in dry ingredients and chips. Bake and serve cool.'],
    'White mocha is sweeter — cookie needs no extra sugar.'
  ),
  'iced-white-mocha|fluffy-pancakes': R(
    'Iced White Mocha + Fluffy Pancakes',
    'White chocolate and fluffy pancakes feel like dessert brunch.',
    '35 min',
    ['2 tbsp white chocolate sauce', '150 ml cold milk', '2 shots cooled espresso', 'Ice'],
    ['Build iced white mocha over ice.'],
    ['200 g flour', '2 tsp baking powder', '1 tbsp sugar', 'Salt', '250 ml milk', '1 egg', '2 tbsp melted butter'],
    ['Whisk dry. Mix wet. Combine gently. Cook and stack. Light white-chocolate drizzle or powdered sugar.'],
    'Keep pancakes plain so white mocha stays the star.'
  ),
  'iced-white-mocha|chocolate-brownies': R(
    'Iced White Mocha + Chocolate Brownies',
    'White chocolate coolness against dense dark brownie.',
    '50 min',
    ['2 tbsp white chocolate sauce', '150 ml cold milk', '2 shots cooled espresso', 'Ice'],
    ['Iced white mocha as above.'],
    ['150 g dark chocolate', '100 g butter', '150 g sugar', '2 eggs', '75 g flour', '20 g cocoa', 'Salt'],
    ['Melt chocolate and butter. Whisk in sugar and eggs. Fold dry. Bake 25–30 min at 175 °C. Serve slightly chilled.'],
    'Brownie bitterness balances white mocha sweetness.'
  ),
  'iced-white-mocha|double-chocolate-cookies': R(
    'Iced White Mocha + Double Chocolate Cookies',
    'White and dark chocolate with coffee — layered chocolate experience.',
    '30 min',
    ['2 tbsp white chocolate sauce', '150 ml cold milk', '2 shots cooled espresso', 'Ice'],
    ['Iced white mocha as above.'],
    ['115 g butter', '150 g sugars', '1 egg', '150 g flour', '40 g cocoa', '½ tsp baking soda', 'Salt', '150 g chunks'],
    ['Cream butter and sugars. Add egg. Mix dry and chunks. Bake 11–13 min at 175 °C. Cool completely before pairing.'],
    'White chocolate chips in cookies would mirror the drink.'
  ),
}
