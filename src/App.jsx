import React, { useState, useMemo } from "react";
import ProductCard from "./components/ProductCard";

const CATEGORIES = [
  "Все материалы",
  "Сухие смеси",
  "Пиломатериалы",
  "Газобетон",
  "Утеплители",
  "Листовые материалы",
  "Клеи и отделка",
];

const ADVANTAGES = [
  {
    code: "01 / ОТГРУЗКА",
    metric: "2–4 ЧАСА",
    title: "Сборка и погрузка со склада",
    desc: "Собственный парк манипуляторов и бортовых машин. Отгрузка в день заказа без простоя техники на объекте.",
    accent: "terracotta",
  },
  {
    code: "02 / СТАНДАРТЫ",
    metric: "ГОСТ / ТУ",
    title: "Сертифицированные партии",
    desc: "Каждая поставка сопровождается паспортом качества, протоколом испытаний и точной маркировкой завода.",
    accent: "emerald",
  },
  {
    code: "03 / ПРОРАБАМ",
    metric: "ОТ 50 000 ₽",
    title: "Спеццена и резерв на 7 дней",
    desc: "Фиксация остатков под смету объекта, быстрая выгрузка спецификации и безналичный расчёт с НДС.",
    accent: "cobalt",
  },
  {
    code: "04 / ВОЗВРАТ",
    metric: "30 ДНЕЙ",
    title: "Приём целых упаковок обратно",
    desc: "Если после монтажа остались нераспечатанные мешки, листы или блоки в заводской упаковке — заберём на склад.",
    accent: "amber",
  },
];

const INITIAL_PRODUCTS = [
  {
    id: "mix-m300",
    sku: "SM-300-25",
    name: "Пескобетон М300 универсальный, 25 кг",
    brand: "КРЕПС-ПРО",
    category: "Сухие смеси",
    unit: "меш.",
    price: 345,
    oldPrice: 390,
    stock: 480,
    badge: { text: "ХИТ", tone: "terracotta" },
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Мешки со строительной сухой смесью и цементом на складе",
    specs: [
      { label: "Прочность", value: "30 МПа (М300)" },
      { label: "Расход слоя", value: "18–20 кг/м² (10 мм)" },
      { label: "Масса нетто", value: "25.0 кг" },
    ],
  },
  {
    id: "mix-gypsum",
    sku: "SM-GP-30",
    name: "Штукатурка гипсовая машинная и ручная, 30 кг",
    brand: "ВОЛМА-ТЕХ",
    category: "Сухие смеси",
    unit: "меш.",
    price: 520,
    oldPrice: null,
    stock: 215,
    badge: { text: "ГОСТ", tone: "emerald" },
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Подготовка стен и отделочные работы строительной смесью",
    specs: [
      { label: "Толщина слоя", value: "5–50 мм" },
      { label: "Жизнеспособность", value: "до 30 мин" },
      { label: "Расход", value: "8.5–9.0 кг/м² (10 мм)" },
    ],
  },
  {
    id: "wood-timber",
    sku: "PM-BR-100",
    name: "Брус строганный сухой камерной сушки 100×100×6000 мм",
    brand: "СЕВЕРЛЕС",
    category: "Пиломатериалы",
    unit: "шт.",
    price: 1180,
    oldPrice: 1320,
    stock: 94,
    badge: { text: "-11%", tone: "terracotta" },
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Штабель строганного деревянного бруса и пиломатериалов",
    specs: [
      { label: "Сечение / длина", value: "100×100×6000 мм" },
      { label: "Влажность", value: "12–14% (камерная)" },
      { label: "Порода дерева", value: "Сосна / ель (сорт AB)" },
    ],
  },
  {
    id: "wood-board",
    sku: "PM-DS-40150",
    name: "Доска обрезная конструкционная 40×150×6000 мм",
    brand: "СЕВЕРЛЕС",
    category: "Пиломатериалы",
    unit: "шт.",
    price: 790,
    oldPrice: null,
    stock: 0,
    badge: { text: "ОПТ", tone: "cobalt" },
    image:
      "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Сложенные деревянные доски с выраженной текстурой древесины",
    specs: [
      { label: "Сечение / длина", value: "40×150×6000 мм" },
      { label: "Объём 1 шт.", value: "0.036 м³" },
      { label: "Обработка", value: "Обрезная, ГОСТ 8486-86" },
    ],
  },
  {
    id: "gas-d500-200",
    sku: "GB-D500-200",
    name: "Блок газобетонный автоклавный D500 625×200×300 мм",
    brand: "БОНОЛИТ",
    category: "Газобетон",
    unit: "шт.",
    price: 265,
    oldPrice: 295,
    stock: 1240,
    badge: { text: "ХИТ", tone: "terracotta" },
    image:
      "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Кладка из светлых газобетонных блоков на строительном объекте",
    specs: [
      { label: "Плотность / класс", value: "D500 / B2.5" },
      { label: "Геометрия", value: "±1.0 мм (паз-гребень)" },
      { label: "Теплопроводность", value: "0.12 Вт/(м·°C)" },
    ],
  },
  {
    id: "gas-d400-100",
    sku: "GB-D400-100",
    name: "Блок перегородочный газобетонный D400 625×100×250 мм",
    brand: "YTONG-СТРОЙ",
    category: "Газобетон",
    unit: "шт.",
    price: 148,
    oldPrice: null,
    stock: 860,
    badge: { text: "ГОСТ", tone: "emerald" },
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Строительная площадка с кладкой стен из ячеистобетонных блоков",
    specs: [
      { label: "Плотность / класс", value: "D400 / B2.0" },
      { label: "Толщина стены", value: "100 мм" },
      { label: "На поддоне", value: "96 шт. (1.5 м³)" },
    ],
  },
  {
    id: "ins-rockwool-100",
    sku: "UT-MW-100",
    name: "Утеплитель базальтовый плитный 1000×600×100 мм",
    brand: "ROCKWOOL",
    category: "Утеплители",
    unit: "упак.",
    price: 1640,
    oldPrice: 1850,
    stock: 132,
    badge: { text: "-11%", tone: "terracotta" },
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Теплоизоляционные плиты и строительные материалы на объекте",
    specs: [
      { label: "Толщина плиты", value: "100 мм" },
      { label: "Площадь в упак.", value: "2.4 м² (4 плиты)" },
      { label: "Группа горючести", value: "НГ (негорючий)" },
    ],
  },
  {
    id: "ins-xps-50",
    sku: "UT-XPS-50",
    name: "Экструдированный пенополистирол XPS 1180×580×50 мм",
    brand: "ТЕХНОНИКОЛЬ",
    category: "Утеплители",
    unit: "упак.",
    price: 2390,
    oldPrice: null,
    stock: 76,
    badge: { text: "ОПТ", tone: "cobalt" },
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Конструктивные слои утепления и строительная инженерия",
    specs: [
      { label: "Прочность на сжатие", value: "250 кПа (10% деф.)" },
      { label: "Площадь в упак.", value: "5.47 м² (8 плит)" },
      { label: "Водопоглощение", value: "не более 0.4% по объёму" },
    ],
  },
  {
    id: "sheet-osb-12",
    sku: "LM-OSB3-12",
    name: "Плита OSB-3 влагостойкая 2500×1250×12 мм",
    brand: "KRONOSPAN",
    category: "Листовые материалы",
    unit: "лист",
    price: 1290,
    oldPrice: 1410,
    stock: 260,
    badge: { text: "ХИТ", tone: "terracotta" },
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Листовые строительные панели и монтажные работы",
    specs: [
      { label: "Размер листа", value: "2500×1250 мм (3.125 м²)" },
      { label: "Толщина", value: "12.0 мм" },
      { label: "Класс эмиссии", value: "E1 / влагостойкая" },
    ],
  },
  {
    id: "sheet-gkl-125",
    sku: "LM-GKL-125",
    name: "Гипсокартон влагостойкий ГКЛВ 2500×1200×12.5 мм",
    brand: "KNAUF",
    category: "Листовые материалы",
    unit: "лист",
    price: 615,
    oldPrice: null,
    stock: 340,
    badge: { text: "ГОСТ", tone: "emerald" },
    image:
      "https://images.unsplash.com/photo-1517581177697-a06a1875f3c5?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Ровная листовая отделка стен и интерьерные конструкции",
    specs: [
      { label: "Размер листа", value: "2500×1200 мм (3.0 м²)" },
      { label: "Кромка", value: "ПЛУК (утонённая)" },
      { label: "Вес листа", value: "около 25.5 кг" },
    ],
  },
  {
    id: "fin-tile-glue",
    sku: "OT-KL-25",
    name: "Клей плиточный усиленный C2 TE для керамогранита, 25 кг",
    brand: "CERESIT",
    category: "Клеи и отделка",
    unit: "меш.",
    price: 780,
    oldPrice: 860,
    stock: 195,
    badge: { text: "СПЕЦ", tone: "amber" },
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Отделка плиткой и керамогранитом в интерьере",
    specs: [
      { label: "Класс по EN 12004", value: "C2 TE (усиленный)" },
      { label: "Макс. формат плитки", value: "до 800×800 мм" },
      { label: "Расход (зуб 8–10 мм)", value: "3.5–5.2 кг/м²" },
    ],
  },
  {
    id: "fin-primer-10",
    sku: "OT-GR-10",
    name: "Грунт глубокого проникновения акриловый, 10 л",
    brand: "TIKKURILA",
    category: "Клеи и отделка",
    unit: "шт.",
    price: 1540,
    oldPrice: null,
    stock: 68,
    badge: { text: "ГОСТ", tone: "emerald" },
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Малярный инструмент и подготовительные отделочные материалы",
    specs: [
      { label: "Объём канистры", value: "10.0 л" },
      { label: "Время высыхания", value: "1.5–2 часа (+20 °C)" },
      { label: "Расход", value: "8–12 м²/л" },
    ],
  },
];

function formatRub(value) {
  return `${Number(value).toLocaleString("ru-RU")} ₽`;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все материалы");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categoryCounts = useMemo(() => {
    const counts = { "Все материалы": INITIAL_PRODUCTS.length };
    for (const cat of CATEGORIES.slice(1)) {
      counts[cat] = INITIAL_PRODUCTS.filter((p) => p.category === cat).length;
    }
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = INITIAL_PRODUCTS.filter((product) => {
      if (selectedCategory !== "Все материалы" && product.category !== selectedCategory) {
        return false;
      }
      if (onlyInStock && product.stock <= 0) {
        return false;
      }
      if (!q) return true;

      const haystack = [
        product.name,
        product.brand,
        product.category,
        product.sku,
        ...product.specs.map((s) => `${s.label} ${s.value}`),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    if (sortBy === "price-asc") {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === "stock-desc") {
      return [...list].sort((a, b) => b.stock - a.stock);
    }
    return list;
  }, [searchQuery, selectedCategory, onlyInStock, sortBy]);

  const cartSummary = useMemo(() => {
    const entries = Object.entries(cart)
      .map(([id, qty]) => {
        const item = INITIAL_PRODUCTS.find((p) => p.id === id);
        if (!item || qty <= 0) return null;
        return { product: item, qty, subtotal: item.price * qty };
      })
      .filter(Boolean);

    const totalPositions = entries.length;
    const totalUnits = entries.reduce((acc, row) => acc + row.qty, 0);
    const totalAmount = entries.reduce((acc, row) => acc + row.subtotal, 0);

    return { entries, totalPositions, totalUnits, totalAmount };
  }, [cart]);

  const handleSetCartQty = (productId, nextQty) => {
    const product = INITIAL_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const clamped = Math.max(0, Math.min(nextQty, product.stock));
    setCart((prev) => {
      const updated = { ...prev };
      if (clamped <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = clamped;
      }
      return updated;
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Все материалы");
    setOnlyInStock(false);
    setSortBy("default");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "Все материалы" ||
    onlyInStock ||
    sortBy !== "default";

  return (
    <div className="app-shell">
      <header className="sticky-header">
        <div className="container header-inner">
          <a
            href="#top"
            className="brand-block"
            onClick={(e) => {
              e.preventDefault();
              handleResetFilters();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="brand-mark">SB-26</span>
            <span className="brand-text-group">
              <span className="brand-title">СТРОЙПАСПОРТ</span>
              <span className="brand-subtitle">КАТАЛОГ СТРОЙМАТЕРИАЛОВ</span>
            </span>
          </a>

          <div className="search-box" role="search">
            <span className="search-prefix" aria-hidden="true">
              ПОИСК
            </span>
            <input
              type="search"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Название, бренд, категория или артикул (например: SM-300, D500, KNAUF)..."
              aria-label="Поиск по названию, бренду, категории и артикулу"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Очистить поиск"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="button"
            className={`cart-widget ${cartSummary.totalPositions > 0 ? "cart-widget--active" : ""}`}
            onClick={() => setIsCartOpen((prev) => !prev)}
            aria-expanded={isCartOpen}
          >
            <span className="cart-widget__label">СПЕЦИФИКАЦИЯ / КОРЗИНА</span>
            <span className="cart-widget__metrics mono">
              <span className="cart-widget__count">{cartSummary.totalPositions} поз.</span>
              <span className="cart-widget__divider">/</span>
              <span className="cart-widget__sum">{formatRub(cartSummary.totalAmount)}</span>
            </span>
          </button>
        </div>
      </header>

      {isCartOpen && (
        <aside className="cart-drawer" aria-label="Выбранные товары в корзине">
          <div className="container cart-drawer__inner">
            <div className="cart-drawer__head">
              <div>
                <span className="mono tag-chip tag-chip--cobalt">РЕЕСТР ЗАЯВКИ</span>
                <h2 className="cart-drawer__title">
                  Выбрано позиций: <span className="mono">{cartSummary.totalPositions}</span> (
                  <span className="mono">{cartSummary.totalUnits}</span> ед.)
                </h2>
              </div>
              <div className="cart-drawer__actions">
                {cartSummary.totalPositions > 0 && (
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => setCart({})}
                  >
                    Очистить всё
                  </button>
                )}
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setIsCartOpen(false)}
                >
                  Свернуть панель
                </button>
              </div>
            </div>

            {cartSummary.entries.length === 0 ? (
              <p className="cart-drawer__empty">
                Спецификация пуста. Добавьте материалы из каталога с указанием нужного количества.
              </p>
            ) : (
              <>
                <div className="cart-table-wrap">
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Артикул</th>
                        <th>Наименование</th>
                        <th>Цена</th>
                        <th>Кол-во</th>
                        <th>Сумма</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartSummary.entries.map(({ product, qty, subtotal }) => (
                        <tr key={product.id}>
                          <td className="mono">{product.sku}</td>
                          <td>
                            <strong>{product.name}</strong>
                            <span className="cart-row-brand"> · {product.brand}</span>
                          </td>
                          <td className="mono">
                            {formatRub(product.price)} / {product.unit}
                          </td>
                          <td>
                            <div className="inline-stepper">
                              <button
                                type="button"
                                onClick={() => handleSetCartQty(product.id, qty - 1)}
                                aria-label={`Уменьшить количество ${product.name}`}
                              >
                                −
                              </button>
                              <span className="mono">
                                {qty} {product.unit}
                              </span>
                              <button
                                type="button"
                                disabled={qty >= product.stock}
                                onClick={() => handleSetCartQty(product.id, qty + 1)}
                                aria-label={`Увеличить количество ${product.name}`}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="mono cart-row-total">{formatRub(subtotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="cart-drawer__footer">
                  <div className="cart-drawer__summary">
                    <span>Итого к отгрузке:</span>
                    <strong className="mono">{formatRub(cartSummary.totalAmount)}</strong>
                  </div>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      alert(
                        `Спецификация сформирована: ${cartSummary.totalPositions} поз., сумма ${formatRub(cartSummary.totalAmount)}.`
                      );
                    }}
                  >
                    Оформить заявку со склада
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      )}

      <main id="top" className="container main-content">
        <section className="hero-spec-panel" aria-label="Технический баннер склада">
          <div className="hero-spec-panel__main">
            <div className="hero-spec-panel__meta">
              <span className="mono tag-chip tag-chip--terracotta">СКЛАД №1 · ПАРГОЛОВО / ЦЕНТР</span>
              <span className="mono hero-spec-panel__code">РЕЖИМ: ПН–ВС 07:00–22:00</span>
            </div>
            <h1 className="hero-spec-panel__title">
              Строительные и отделочные материалы с точными параметрами и живыми остатками
            </h1>
            <p className="hero-spec-panel__desc">
              Прямые поставки сухих смесей, автоклавного газобетона, сухого пиломатериала,
              утеплителей, листовых плит и отделочных составов. Единый реестр для частного
              строительства и снабжения объектов.
            </p>
          </div>

          <div className="hero-spec-panel__aside">
            <div className="spec-box">
              <span className="spec-box__label">АКТУАЛЬНЫЙ ПРАЙС</span>
              <strong className="spec-box__value mono">НДС ВКЛЮЧЁН</strong>
              <span className="spec-box__note">Счёт и УПД формируются автоматически</span>
            </div>
            <div className="spec-box spec-box--emerald">
              <span className="spec-box__label">КОНТРОЛЬ ПАРТИЙ</span>
              <strong className="spec-box__value mono">100% ГОСТ</strong>
              <span className="spec-box__note">Проверка геометрии и влажности на приёмке</span>
            </div>
          </div>
        </section>

        <section className="advantages-grid" aria-label="Ключевые условия работы">
          {ADVANTAGES.map((adv) => (
            <article
              key={adv.code}
              className={`advantage-card advantage-card--${adv.accent}`}
            >
              <div className="advantage-card__top">
                <span className="mono advantage-card__code">{adv.code}</span>
                <span className="mono advantage-card__metric">{adv.metric}</span>
              </div>
              <h2 className="advantage-card__title">{adv.title}</h2>
              <p className="advantage-card__desc">{adv.desc}</p>
            </article>
          ))}
        </section>

        <section className="toolbar-panel" aria-label="Фильтры и сортировка каталога">
          <div className="category-bar" role="tablist" aria-label="Категории материалов">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`category-btn ${active ? "category-btn--active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span>{category}</span>
                  <span className="mono category-btn__count">{categoryCounts[category]}</span>
                </button>
              );
            })}
          </div>

          <div className="controls-row">
            <div className="controls-left">
              <label className="stock-toggle">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                />
                <span className="stock-toggle__box" aria-hidden="true" />
                <span className="stock-toggle__text">Только в наличии</span>
              </label>

              <span className="results-counter mono">
                НАЙДЕНО: <strong>{filteredProducts.length}</strong> из {INITIAL_PRODUCTS.length}
              </span>
            </div>

            <div className="controls-right">
              <label className="sort-control">
                <span className="sort-control__label mono">СОРТИРОВКА:</span>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">По умолчанию (каталог)</option>
                  <option value="price-asc">Цена: по возрастанию</option>
                  <option value="price-desc">Цена: по убыванию</option>
                  <option value="stock-desc">Остаток на складе: больше сначала</option>
                </select>
              </label>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="btn-reset-inline"
                  onClick={handleResetFilters}
                >
                  Сбросить всё
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="catalog-section" aria-label="Список материалов">
          {filteredProducts.length > 0 ? (
            <div className="catalog-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantityInCart={cart[product.id] || 0}
                  onUpdateQuantity={(qty) => handleSetCartQty(product.id, qty)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="mono tag-chip tag-chip--amber">0 СОВПАДЕНИЙ</span>
              <h2 className="empty-state__title">По заданным параметрам товары не найдены</h2>
              <p className="empty-state__desc">
                Проверьте артикул или бренд в строке поиска, отключите фильтр «Только в наличии» или
                вернитесь ко всем категориям каталога.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={handleResetFilters}
              >
                Сбросить фильтры и показать весь каталог
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-col">
            <strong className="mono">СТРОЙПАСПОРТ // SB-26</strong>
            <p>Технический каталог строительных и отделочных материалов для частных и подрядных заказов.</p>
          </div>
          <div className="footer-col footer-col--right mono">
            <span>ЦЕХ ОТГРУЗКИ: АКТИВЕН</span>
            <span>ЕДИНИЦЫ: ШТ / МЕШ / ЛИСТ / УПАК</span>
          </div>
        </div>
      </footer>
    </div>
  );
}