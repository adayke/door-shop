// ─── Mock data — используется когда Directus недоступен ───────────────────────

const U = 'https://images.unsplash.com'

// Фото дверей и фурнитуры с Unsplash
const PHOTOS = {
  // Межкомнатные двери
  inter_oak:  `${U}/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=85`,
  inter_wenge:`${U}/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop&q=85`,
  inter_white:`${U}/photo-1613545325278-f24b0cae1224?w=800&h=600&fit=crop&q=85`,
  inter_glass:`${U}/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=85`,
  inter_nat:  `${U}/photo-1617103996702-96ff29b1c467?w=800&h=600&fit=crop&q=85`,

  // Входные двери
  entry_steel:`${U}/photo-1516455590571-18256e5bb9ff?w=800&h=600&fit=crop&q=85`,
  entry_wood: `${U}/photo-1566662434997-be0e9234419c?w=800&h=600&fit=crop&q=85`,
  entry_metal:`${U}/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&q=85`,

  // Ручки
  handle_gold:`${U}/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&q=85`,
  handle_chr: `${U}/photo-1484154218328-5335d67e2e74?w=800&h=600&fit=crop&q=85`,
  handle_blk: `${U}/photo-1601760562234-9814eea6663a?w=800&h=600&fit=crop&q=85`,

  // Замки
  lock_1:     `${U}/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=85`,
  lock_2:     `${U}/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&q=85`,

  // Фурнитура / пороги
  hinge:      `${U}/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop&q=85`,
  closer:     `${U}/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop&q=85`,
  threshold:  `${U}/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&q=85`,
}

export const mockCategories = [
  { id: 1, name: 'Межкомнатные двери', slug: 'mezhkomnatnye', icon: '🚪', description: 'Двери для внутренних помещений' },
  { id: 2, name: 'Входные двери',       slug: 'vhodnye',       icon: '🏠', description: 'Надёжные двери для входа' },
  { id: 3, name: 'Дверные ручки',       slug: 'ruchki',        icon: '🔑', description: 'Ручки из металла и дерева' },
  { id: 4, name: 'Врезные замки',       slug: 'zamki',         icon: '🔒', description: 'Надёжные замочные системы' },
  { id: 5, name: 'Фурнитура',           slug: 'furnitura',     icon: '⚙️', description: 'Петли, доводчики, ограничители' },
  { id: 6, name: 'Пороги и уплотнители',slug: 'porogi',        icon: '📏', description: 'Алюминиевые пороги и резинки' },
]

export const mockProducts = [
  // ───────────── МЕЖКОМНАТНЫЕ ─────────────
  {
    id: 1,
    name: 'Дверь межкомнатная «Классика Дуб»',
    slug: 'klassika-dub',
    category: { name: 'Межкомнатные двери', slug: 'mezhkomnatnye' },
    price: 89000,
    old_price: 115000,
    material: 'МДФ шпон дуба',
    color: 'Дуб',
    brand: 'ProfilDoors',
    images: [PHOTOS.inter_oak, PHOTOS.inter_nat, PHOTOS.inter_glass],
    in_stock: true,
    is_new: false,
    rating: 5,
    reviews_count: 47,
    description: 'Межкомнатная дверь с натуральным шпоном дуба. Экологически чистый материал, устойчивый к влаге и механическим повреждениям. Подходит для классических и современных интерьеров.',
    specs: {
      'Высота': '2000 мм',
      'Ширина': '700/800/900 мм',
      'Толщина полотна': '40 мм',
      'Покрытие': 'Натуральный шпон дуба',
      'Стекло': 'Нет',
    },
  },
  {
    id: 2,
    name: 'Дверь межкомнатная «Венге Модерн»',
    slug: 'venge-modern',
    category: { name: 'Межкомнатные двери', slug: 'mezhkomnatnye' },
    price: 74000,
    old_price: null,
    material: 'МДФ ПВХ',
    color: 'Венге',
    brand: 'Экошпон',
    images: [PHOTOS.inter_wenge, PHOTOS.inter_oak],
    in_stock: true,
    is_new: true,
    rating: 4,
    reviews_count: 23,
    description: 'Стильная дверь в тёмном оттенке венге. Покрытие ПВХ устойчиво к царапинам и влаге. Отличный выбор для современного минималистичного интерьера.',
    specs: {
      'Высота': '2000 мм',
      'Ширина': '700/800/900 мм',
      'Толщина полотна': '38 мм',
      'Покрытие': 'Экошпон ПВХ',
      'Стекло': 'Нет',
    },
  },
  {
    id: 3,
    name: 'Дверь межкомнатная «Белая Эмаль Люкс»',
    slug: 'belaya-emal-lyuks',
    category: { name: 'Межкомнатные двери', slug: 'mezhkomnatnye' },
    price: 96000,
    old_price: null,
    material: 'МДФ эмаль',
    color: 'Белый',
    brand: 'Velldoris',
    images: [PHOTOS.inter_white, PHOTOS.inter_oak],
    in_stock: true,
    is_new: true,
    rating: 5,
    reviews_count: 61,
    description: 'Классическая белая дверь с матовым покрытием из высококачественной эмали. Идеально вписывается в светлые скандинавские и классические интерьеры.',
    specs: {
      'Высота': '2000 мм',
      'Ширина': '600/700/800/900 мм',
      'Толщина полотна': '40 мм',
      'Покрытие': 'Эмаль матовая',
      'Стекло': 'Нет',
    },
  },
  {
    id: 4,
    name: 'Дверь «Лофт» со стеклом Lacobel чёрный',
    slug: 'loft-lacobel-cherny',
    category: { name: 'Межкомнатные двери', slug: 'mezhkomnatnye' },
    price: 138000,
    old_price: 165000,
    material: 'МДФ + стекло',
    color: 'Чёрный',
    brand: 'Браво',
    images: [PHOTOS.inter_glass, PHOTOS.inter_wenge],
    in_stock: true,
    is_new: false,
    rating: 5,
    reviews_count: 38,
    description: 'Дверь в стиле лофт с панорамным стеклом Lacobel чёрного цвета. Создаёт ощущение пространства, пропускает свет между комнатами. Металлический короб — часть дизайна.',
    specs: {
      'Высота': '2000 мм',
      'Ширина': '800/900 мм',
      'Толщина полотна': '42 мм',
      'Стекло': 'Lacobel чёрный',
      'Фурнитура': 'Хром матовый',
    },
  },
  {
    id: 5,
    name: 'Дверь «Натуральный орех» Velvet',
    slug: 'natural-orekh-velvet',
    category: { name: 'Межкомнатные двери', slug: 'mezhkomnatnye' },
    price: 112000,
    old_price: null,
    material: 'Шпон ореха',
    color: 'Орех',
    brand: 'Velldoris',
    images: [PHOTOS.inter_nat, PHOTOS.inter_oak],
    in_stock: true,
    is_new: false,
    rating: 4,
    reviews_count: 19,
    description: 'Дверь с натуральным шпоном ореха тёплого оттенка. Текстура дерева уникальна на каждом изделии. Производство Испания.',
    specs: {
      'Высота': '2000/2100 мм',
      'Ширина': '700/800/900 мм',
      'Толщина полотна': '40 мм',
      'Покрытие': 'Шпон ореха + лак',
      'Страна': 'Испания',
    },
  },

  // ───────────── ВХОДНЫЕ ─────────────
  {
    id: 6,
    name: 'Входная дверь «Форт» Антик медь',
    slug: 'fort-antik-med',
    category: { name: 'Входные двери', slug: 'vhodnye' },
    price: 245000,
    old_price: 290000,
    material: 'Сталь + МДФ',
    color: 'Антик медь',
    brand: 'Гардиан',
    images: [PHOTOS.entry_steel, PHOTOS.entry_wood],
    in_stock: true,
    is_new: false,
    rating: 5,
    reviews_count: 84,
    description: 'Металлическая входная дверь с отделкой под антик. 3 контура уплотнения, класс взломостойкости М3. Утепление пенополиуретаном, бесшумный замок Kale.',
    specs: {
      'Класс защиты': 'М3 (взломостойкость)',
      'Утепление': 'Пенополиуретан 60 мм',
      'Замок': 'Kale 3-классовый',
      'Толщина двери': '90 мм',
      'Вес': '85 кг',
      'Гарантия': '7 лет',
    },
  },
  {
    id: 7,
    name: 'Входная дверь «Лесная» массив сосны',
    slug: 'lesnaya-massiv',
    category: { name: 'Входные двери', slug: 'vhodnye' },
    price: 189000,
    old_price: null,
    material: 'Массив сосны',
    color: 'Натуральный',
    brand: 'WoodDoor',
    images: [PHOTOS.entry_wood, PHOTOS.entry_steel],
    in_stock: true,
    is_new: true,
    rating: 4,
    reviews_count: 12,
    description: 'Входная дверь из массива сосны с двойным утеплением. Экологически чистый материал. Подходит для загородных домов и квартир с деревянным интерьером.',
    specs: {
      'Материал': 'Массив сосны',
      'Утепление': 'Базальтовая вата 80 мм',
      'Замок': 'CISA 2-контурный',
      'Толщина двери': '100 мм',
      'Обработка': 'Масло + воск',
    },
  },
  {
    id: 8,
    name: 'Входная дверь «Бронь» Premium Steel',
    slug: 'bron-premium-steel',
    category: { name: 'Входные двери', slug: 'vhodnye' },
    price: 385000,
    old_price: 430000,
    material: 'Сталь 3 мм',
    color: 'Серый',
    brand: 'Бастион',
    images: [PHOTOS.entry_metal, PHOTOS.entry_steel],
    in_stock: false,
    is_new: false,
    rating: 5,
    reviews_count: 29,
    description: 'Бронированная дверь класса взломостойкости М4. Лист стали 3 мм, 4 контура уплотнения, встроенная сейф-панель для документов. Для квартир и офисов высокого класса.',
    specs: {
      'Класс защиты': 'М4',
      'Толщина стального листа': '3 мм',
      'Контуры уплотнения': '4',
      'Замки': 'Mul-T-Lock + Cisa',
      'Вес': '130 кг',
    },
  },

  // ───────────── РУЧКИ ─────────────
  {
    id: 9,
    name: 'Ручка дверная «Аурум» золото матовое',
    slug: 'aurum-zoloto',
    category: { name: 'Дверные ручки', slug: 'ruchki' },
    price: 18500,
    old_price: 23000,
    material: 'Латунь',
    color: 'Золото',
    brand: 'Archie',
    images: [PHOTOS.handle_gold, PHOTOS.handle_chr],
    in_stock: true,
    is_new: false,
    rating: 5,
    reviews_count: 56,
    description: 'Ручка нажимная из латуни с покрытием золото матовое. Плавный ход, бесшумный механизм. Подходит для дверей толщиной 35–50 мм. Комплект: 2 ручки + сантехника.',
    specs: {
      'Материал': 'Латунь литая',
      'Покрытие': 'PVD золото матовое',
      'Тип': 'Нажимная',
      'Крепление': 'На розетке',
      'Диаметр шпинделя': '8 × 72 мм',
    },
  },
  {
    id: 10,
    name: 'Ручка «Хром Брасс» скандинавская',
    slug: 'hrom-brass-skandinavskaya',
    category: { name: 'Дверные ручки', slug: 'ruchki' },
    price: 12900,
    old_price: null,
    material: 'Сталь нержавеющая',
    color: 'Хром',
    brand: 'Fuaro',
    images: [PHOTOS.handle_chr, PHOTOS.handle_gold],
    in_stock: true,
    is_new: true,
    rating: 4,
    reviews_count: 33,
    description: 'Стильная ручка в скандинавском стиле из нержавеющей стали с хромовым покрытием. Устойчива к коррозии и механическим повреждениям.',
    specs: {
      'Материал': 'Нержавеющая сталь',
      'Покрытие': 'Хром полированный',
      'Тип': 'Нажимная',
      'Длина ручки': '135 мм',
    },
  },
  {
    id: 11,
    name: 'Ручка-кноб «Чёрный Оникс» матовая',
    slug: 'cherny-oniks-knob',
    category: { name: 'Дверные ручки', slug: 'ruchki' },
    price: 9800,
    old_price: null,
    material: 'Цинк',
    color: 'Чёрный',
    brand: 'MORELLI',
    images: [PHOTOS.handle_blk, PHOTOS.handle_chr],
    in_stock: true,
    is_new: false,
    rating: 4,
    reviews_count: 18,
    description: 'Круглая ручка-кноб в матовом чёрном цвете. Идеально сочетается с дверями в стиле лофт и хай-тек. Цинково-алюминиевый сплав, гальваническое покрытие.',
    specs: {
      'Материал': 'Цинковый сплав',
      'Покрытие': 'Порошковое чёрный мат',
      'Тип': 'Кноб (шаровидная)',
      'Диаметр шара': '55 мм',
    },
  },

  // ───────────── ЗАМКИ ─────────────
  {
    id: 12,
    name: 'Замок врезной CISA «Астра» 5 секретов',
    slug: 'cisa-astra-5-sekretov',
    category: { name: 'Врезные замки', slug: 'zamki' },
    price: 32000,
    old_price: 38000,
    material: 'Сталь',
    color: 'Серебро',
    brand: 'CISA',
    images: [PHOTOS.lock_2, PHOTOS.lock_1],
    in_stock: true,
    is_new: false,
    rating: 5,
    reviews_count: 72,
    description: 'Врезной цилиндровый замок CISA серии ASTRA. 5 секретов, 3 ключа в комплекте. Класс защиты 3, устойчив к высверливанию и отмычкам.',
    specs: {
      'Количество секретов': '5',
      'Класс защиты': '3',
      'Тип': 'Цилиндровый',
      'Бэкшест': '60 мм',
      'Ключи в комплекте': '3 шт.',
    },
  },
  {
    id: 13,
    name: 'Замок Mul-T-Lock «Классик» повышенная защита',
    slug: 'mul-t-lock-klassik',
    category: { name: 'Врезные замки', slug: 'zamki' },
    price: 58000,
    old_price: null,
    material: 'Сталь',
    color: 'Золото',
    brand: 'Mul-T-Lock',
    images: [PHOTOS.lock_1, PHOTOS.lock_2],
    in_stock: true,
    is_new: true,
    rating: 5,
    reviews_count: 41,
    description: 'Высокосекретный цилиндровый замок Mul-T-Lock Classic. Двойной механизм, 10 секретов, защита от перфорации. Используется в банках и правительственных учреждениях.',
    specs: {
      'Количество секретов': '10',
      'Класс защиты': '5',
      'Тип': 'Цилиндровый двойной',
      'Бэкшест': '60/68/85 мм',
      'Дубликаты': 'Только в авторизованных центрах',
    },
  },

  // ───────────── ФУРНИТУРА ─────────────
  {
    id: 14,
    name: 'Петли скрытые Anselmi «Evo» золото',
    slug: 'anselmi-evo-petli',
    category: { name: 'Фурнитура', slug: 'furnitura' },
    price: 14500,
    old_price: null,
    material: 'Сталь',
    color: 'Золото',
    brand: 'Anselmi',
    images: [PHOTOS.hinge, PHOTOS.closer],
    in_stock: true,
    is_new: false,
    rating: 4,
    reviews_count: 27,
    description: 'Скрытые петли итальянского производства Anselmi серии EVO. Регулировка по 3 осям, нагрузка до 80 кг. Устанавливаются без фрезерования. Комплект: 2 петли.',
    specs: {
      'Тип': 'Скрытые 3D',
      'Нагрузка': 'до 80 кг',
      'Регулировка': '3 оси ±3 мм',
      'Покрытие': 'PVD золото',
      'Производство': 'Италия',
    },
  },
  {
    id: 15,
    name: 'Доводчик дверной GEZE TS 2000 V NV',
    slug: 'geze-ts-2000-dovodchik',
    category: { name: 'Фурнитура', slug: 'furnitura' },
    price: 22000,
    old_price: 27000,
    material: 'Алюминий',
    color: 'Серый',
    brand: 'GEZE',
    images: [PHOTOS.closer, PHOTOS.hinge],
    in_stock: true,
    is_new: false,
    rating: 5,
    reviews_count: 38,
    description: 'Доводчик GEZE TS 2000 — надёжное немецкое качество. Регулировка скорости закрывания и доводки. Подходит для дверей шириной до 1000 мм, вес до 80 кг.',
    specs: {
      'Нагрузка': 'до 80 кг, ширина до 1000 мм',
      'Сила EN': '2–4 (регулируемая)',
      'Монтаж': 'Стандартный / скользящий рычаг',
      'Производство': 'Германия',
    },
  },

  // ───────────── ПОРОГИ ─────────────
  {
    id: 16,
    name: 'Порог алюминиевый «Премиум» анодированный',
    slug: 'porog-alyuminievy-premium',
    category: { name: 'Пороги и уплотнители', slug: 'porogi' },
    price: 4800,
    old_price: null,
    material: 'Алюминий',
    color: 'Серебро',
    brand: 'Rexer',
    images: [PHOTOS.threshold, PHOTOS.hinge],
    in_stock: true,
    is_new: false,
    rating: 4,
    reviews_count: 15,
    description: 'Алюминиевый порог с анодированным покрытием серебро. Подходит для любых напольных покрытий. Длина 0,9 / 1,8 м, скрытое крепление.',
    specs: {
      'Материал': 'Алюминий анодированный',
      'Длина': '0,9 / 1,8 м',
      'Ширина': '40 мм',
      'Высота': '7 мм',
      'Нагрузка': 'до 300 кг/м²',
    },
  },
  {
    id: 17,
    name: 'Уплотнитель «Акустик» силиконовый 6 м',
    slug: 'uplotnitel-akustik-silikonovy',
    category: { name: 'Пороги и уплотнители', slug: 'porogi' },
    price: 3200,
    old_price: 3900,
    material: 'Силикон',
    color: 'Белый',
    brand: 'Deventer',
    images: [PHOTOS.threshold, PHOTOS.closer],
    in_stock: true,
    is_new: false,
    rating: 4,
    reviews_count: 9,
    description: 'Самоклеящийся силиконовый уплотнитель для дверей. Снижает шум на 15 дБ, защищает от сквозняков и пыли. Рулон 6 м, толщина профиля P-образный.',
    specs: {
      'Материал': 'Силикон',
      'Длина': '6 м',
      'Профиль': 'P-образный',
      'Снижение шума': 'до 15 дБ',
      'Рабочая температура': '-30°C...+70°C',
    },
  },
]

// Применить фильтры к массиву products
export function filterProducts(
  products: typeof mockProducts,
  params: Record<string, string | string[] | undefined>,
) {
  let result = [...products]

  // category filter
  const catSlug = params.category as string | undefined
  if (catSlug) {
    result = result.filter(p => {
      const cat = p.category
      return typeof cat === 'object' ? cat.slug === catSlug : cat === catSlug
    })
  }

  // price
  const priceMin = params.priceMin ? Number(params.priceMin) : 0
  const priceMax = params.priceMax ? Number(params.priceMax) : Infinity
  result = result.filter(p => p.price >= priceMin && p.price <= priceMax)

  // material
  const materials = params.materials
    ? (Array.isArray(params.materials) ? params.materials : String(params.materials).split(','))
    : []
  if (materials.length) {
    result = result.filter(p => p.material && materials.includes(p.material))
  }

  // color
  const colors = params.colors
    ? (Array.isArray(params.colors) ? params.colors : String(params.colors).split(','))
    : []
  if (colors.length) {
    result = result.filter(p => p.color && colors.includes(p.color))
  }

  // brand
  const brands = params.brands
    ? (Array.isArray(params.brands) ? params.brands : String(params.brands).split(','))
    : []
  if (brands.length) {
    result = result.filter(p => p.brand && brands.includes(p.brand))
  }

  // sort
  const sort = (params.sort as string) || '-reviews_count'
  if (sort === 'price') result.sort((a, b) => a.price - b.price)
  else if (sort === '-price') result.sort((a, b) => b.price - a.price)
  else result.sort((a, b) => (b.reviews_count ?? 0) - (a.reviews_count ?? 0))

  return result
}
