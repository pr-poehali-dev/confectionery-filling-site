import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type IconName = string;

const HERO_IMG = "https://cdn.poehali.dev/projects/e71c6a29-9831-4c07-a76f-792b1407bf26/files/0851f471-d34f-4cc1-ba7c-4aac70eae451.jpg";
const FACTORY_IMG = "https://cdn.poehali.dev/projects/e71c6a29-9831-4c07-a76f-792b1407bf26/files/b594a83a-541e-4fbd-ae46-0e33c2ca3fb2.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Продукция", href: "#products" },
  { label: "Каталог", href: "#catalog" },
  { label: "Сертификаты", href: "#certificates" },
  { label: "Доставка", href: "#delivery" },
  { label: "Контакты", href: "#contacts" },
];

const PRODUCTS = [
  {
    icon: "🍫",
    title: "Шоколадные начинки",
    desc: "Тёмный, молочный и белый шоколад. Трюфельные массы, ганаш, шоколадные пралине с орехами.",
    tags: ["Ганаш", "Трюфель", "Пралине"],
  },
  {
    icon: "🍓",
    title: "Фруктово-ягодные",
    desc: "Натуральные конфитюры, мармелады и желе из свежих ягод и фруктов. Без консервантов.",
    tags: ["Малина", "Клубника", "Маракуйя"],
  },
  {
    icon: "🍯",
    title: "Карамельные",
    desc: "Классическая карамель, солёная карамель, варёная сгущёнка, ириска и нуга.",
    tags: ["Карамель", "Нуга", "Ириска"],
  },
  {
    icon: "🥜",
    title: "Ореховые пасты",
    desc: "Арахисовая, фундучная и миндальная пасты. Джандуйя и пралине с цельными орехами.",
    tags: ["Фундук", "Арахис", "Миндаль"],
  },
  {
    icon: "🍋",
    title: "Кремы и муссы",
    desc: "Лимонный курд, сливочный крем, ванильный крем-брюле и воздушные суфле.",
    tags: ["Курд", "Суфле", "Крем-брюле"],
  },
  {
    icon: "🌿",
    title: "Специальные серии",
    desc: "Без сахара, веганские и безглютеновые начинки для диетических кондитерских изделий.",
    tags: ["Без сахара", "Веган", "ЗОЖ"],
  },
];

const CATALOG_ITEMS = [
  { name: "Ганаш тёмный 60%", volume: "от 5 кг", price: "от 850 ₽/кг", badge: "Хит" },
  { name: "Малиновый конфитюр", volume: "от 5 кг", price: "от 620 ₽/кг", badge: "" },
  { name: "Карамель солёная", volume: "от 3 кг", price: "от 540 ₽/кг", badge: "Хит" },
  { name: "Фундучная паста", volume: "от 5 кг", price: "от 980 ₽/кг", badge: "" },
  { name: "Клубничный конфитюр", volume: "от 5 кг", price: "от 590 ₽/кг", badge: "" },
  { name: "Ганаш молочный", volume: "от 5 кг", price: "от 790 ₽/кг", badge: "Новинка" },
  { name: "Лимонный курд", volume: "от 3 кг", price: "от 680 ₽/кг", badge: "" },
  { name: "Пралине фундуковое", volume: "от 3 кг", price: "от 1100 ₽/кг", badge: "Премиум" },
  { name: "Арахисовая паста", volume: "от 5 кг", price: "от 480 ₽/кг", badge: "" },
  { name: "Начинка без сахара", volume: "от 5 кг", price: "от 720 ₽/кг", badge: "ЗОЖ" },
  { name: "Нуга классическая", volume: "от 5 кг", price: "от 560 ₽/кг", badge: "" },
  { name: "Маракуйя-манго", volume: "от 5 кг", price: "от 750 ₽/кг", badge: "Новинка" },
];

const CERTS = [
  { icon: "🏆", title: "ГОСТ Р ИСО 22000", desc: "Система менеджмента безопасности пищевых продуктов" },
  { icon: "✅", title: "ХАССП", desc: "Анализ рисков и критические контрольные точки" },
  { icon: "📋", title: "Декларация соответствия", desc: "ТР ТС 021/2011 «О безопасности пищевой продукции»" },
  { icon: "🌿", title: "Органик сертификат", desc: "Подтверждение использования натурального сырья" },
  { icon: "🔬", title: "Лабораторные протоколы", desc: "Регулярные испытания в аккредитованных лабораториях" },
  { icon: "📄", title: "Ветеринарные свидетельства", desc: "На сырьё животного происхождения" },
];

const DELIVERY_ZONES = [
  { city: "Москва и МО", time: "1–2 дня", min: "от 30 кг" },
  { city: "Санкт-Петербург", time: "2–3 дня", min: "от 30 кг" },
  { city: "Регионы РФ", time: "3–7 дней", min: "от 50 кг" },
  { city: "СНГ", time: "5–14 дней", min: "от 100 кг" },
];

const STATS = [
  { value: "12+", label: "лет на рынке" },
  { value: "200+", label: "видов начинок" },
  { value: "500+", label: "партнёров" },
  { value: "50 т", label: "в месяц" },
];

const badgeColor: Record<string, string> = {
  "Хит": "bg-amber-100 text-amber-800",
  "Новинка": "bg-emerald-100 text-emerald-800",
  "Премиум": "bg-amber-200 text-amber-900",
  "ЗОЖ": "bg-green-100 text-green-800",
};

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Все");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const filters = ["Все", "Шоколадные", "Фруктовые", "Карамель", "Ореховые", "Спец. серии"];

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-white))] font-golos overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--choco))] to-[hsl(var(--choco-light))] flex items-center justify-center text-[hsl(var(--gold))] text-lg font-bold">К</div>
            <div className="text-left">
              <div className="font-cormorant text-xl font-bold text-[hsl(var(--choco))] leading-none">Виконди</div>
              <div className="text-[10px] text-[hsl(var(--muted-foreground))] font-golos tracking-widest uppercase">Производство начинок</div>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="nav-link text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--choco))] font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center gap-2 bg-[hsl(var(--gold))] text-[hsl(var(--choco))] px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              <Icon name="Phone" size={14} />
              Заказать звонок
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-[hsl(var(--choco))]">
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-[hsl(var(--border))] px-6 py-4 space-y-3 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="block w-full text-left py-2 text-[hsl(var(--foreground))] font-medium">
                {link.label}
              </button>
            ))}
            <button className="w-full mt-2 bg-[hsl(var(--gold))] text-[hsl(var(--choco))] px-5 py-3 rounded-full font-semibold">Заказать звонок</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--choco))]/90 via-[hsl(var(--choco))]/70 to-transparent" />
        <div className="absolute inset-0 grain-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--gold))]/20 border border-[hsl(var(--gold))]/40 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--gold))]" />
              <span className="text-[hsl(var(--gold))] text-sm font-medium tracking-wide">Производство с 2012 года</span>
            </div>

            <h1 className="font-cormorant text-6xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
              Начинки,<br />
              <span className="gold-shimmer">созданные</span><br />
              для совершенства
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-8 animate-fade-in-up delay-200">
              Профессиональное производство начинок для кондитерских изделий. Более 200 видов — шоколадные, фруктовые, карамельные, ореховые. Поставки по всей России и СНГ.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button
                onClick={() => scrollTo("#catalog")}
                className="bg-[hsl(var(--gold))] text-[hsl(var(--choco))] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all hover:scale-105"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("#contacts")}
                className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))] transition-all"
              >
                Получить прайс
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up delay-400">
              {STATS.map((s) => (
                <div key={s.label} className="text-white">
                  <div className="font-cormorant text-3xl font-bold text-[hsl(var(--gold))]">{s.value}</div>
                  <div className="text-white/70 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button onClick={() => scrollTo("#about")} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-float hover:text-[hsl(var(--gold))] transition-colors">
          <Icon name="ChevronDown" size={32} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-divider mb-6" />
              <h2 className="font-cormorant text-5xl font-bold text-[hsl(var(--choco))] mb-6 leading-tight">
                О компании<br />
                <span className="text-[hsl(var(--gold))]">Виконди</span>
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed mb-6">
                Виконди — производитель профессиональных начинок для кондитерских изделий. С 2012 года создаём продукты, которые выбирают лучшие кондитерские, фабрики и рестораны страны.
              </p>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
                Наше производство оснащено современным европейским оборудованием. Мы используем только натуральное сырьё без искусственных красителей и консервантов. Каждая партия проходит строгий контроль качества по международным стандартам.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "Factory", text: "Собственное производство 2000 м²" },
                  { icon: "Leaf", text: "100% натуральное сырьё" },
                  { icon: "Shield", text: "Международные сертификаты" },
                  { icon: "Truck", text: "Доставка по всей России" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(var(--muted))]">
                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--gold))]/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as IconName} size={16} className="text-[hsl(var(--choco))]" />
                    </div>
                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">{item.text}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => scrollTo("#contacts")} className="inline-flex items-center gap-2 bg-[hsl(var(--choco))] text-[hsl(var(--cream))] px-7 py-3.5 rounded-full font-semibold hover:opacity-90 transition-colors">
                Связаться с нами
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img src={FACTORY_IMG} alt="Производство" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[hsl(var(--gold))] text-[hsl(var(--choco))] rounded-2xl p-6 shadow-xl">
                <div className="font-cormorant text-4xl font-bold">12+</div>
                <div className="text-sm font-semibold mt-1">лет опыта</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[hsl(var(--choco))] text-[hsl(var(--cream))] rounded-2xl p-4 shadow-xl">
                <div className="font-cormorant text-3xl font-bold">ГОСТ</div>
                <div className="text-xs mt-1 opacity-80">сертифицировано</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 bg-[hsl(var(--warm-white))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-cormorant text-5xl font-bold text-[hsl(var(--choco))] mb-4">Наша продукция</h2>
            <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto">
              Широкий ассортимент профессиональных начинок для любого кондитерского производства
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <div key={product.title} className="card-hover bg-white rounded-2xl p-7 border border-[hsl(var(--border))]">
                <div className="text-4xl mb-4">{product.icon}</div>
                <h3 className="font-cormorant text-2xl font-bold text-[hsl(var(--choco))] mb-3">{product.title}</h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mb-4">{product.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-[hsl(var(--gold))]/15 text-[hsl(var(--choco))] px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-cormorant text-5xl font-bold text-[hsl(var(--choco))] mb-4">Каталог</h2>
            <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-xl mx-auto">
              Актуальные позиции с указанием минимального объёма заказа
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f
                    ? "bg-[hsl(var(--choco))] text-[hsl(var(--cream))]"
                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--gold))]/20"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CATALOG_ITEMS.map((item) => (
              <div key={item.name} className="card-hover bg-[hsl(var(--warm-white))] border border-[hsl(var(--border))] rounded-2xl p-5 relative">
                {item.badge && (
                  <span className={`absolute top-4 right-4 text-xs px-2.5 py-1 rounded-full font-semibold ${badgeColor[item.badge] || "bg-gray-100 text-gray-700"}`}>
                    {item.badge}
                  </span>
                )}
                <div className="text-2xl mb-3">🍬</div>
                <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2 pr-12">{item.name}</h4>
                <div className="space-y-1 mb-4">
                  <div className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1.5">
                    <Icon name="Package" size={12} />
                    {item.volume}
                  </div>
                  <div className="text-sm font-semibold text-[hsl(var(--choco))]">{item.price}</div>
                </div>
                <button className="w-full text-xs bg-[hsl(var(--gold))]/15 text-[hsl(var(--choco))] py-2 rounded-lg hover:bg-[hsl(var(--gold))]/30 transition-colors font-medium">
                  Запросить цену
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => scrollTo("#contacts")} className="inline-flex items-center gap-2 border-2 border-[hsl(var(--choco))] text-[hsl(var(--choco))] px-8 py-3.5 rounded-full font-semibold hover:bg-[hsl(var(--choco))] hover:text-[hsl(var(--cream))] transition-all">
              <Icon name="FileText" size={16} />
              Скачать полный прайс-лист
            </button>
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" className="py-24 bg-[hsl(var(--choco))] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-16 h-0.5 bg-[hsl(var(--gold))] mx-auto mb-6" />
            <h2 className="font-cormorant text-5xl font-bold text-white mb-4">Сертификаты и документация</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Вся продукция сертифицирована по российским и международным стандартам качества
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTS.map((cert) => (
              <div key={cert.title} className="card-hover bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 group">
                <div className="text-3xl mb-4">{cert.icon}</div>
                <h3 className="font-cormorant text-xl font-bold text-[hsl(var(--gold))] mb-2">{cert.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{cert.desc}</p>
                <button className="mt-4 text-sm text-[hsl(var(--gold))]/70 hover:text-[hsl(var(--gold))] transition-colors flex items-center gap-1 group-hover:gap-2">
                  Запросить документ
                  <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[hsl(var(--gold))]/20 border border-[hsl(var(--gold))]/30 rounded-2xl p-8 text-center">
            <p className="font-cormorant text-2xl text-white mb-4">
              Предоставляем полный пакет документов для работы с торговыми сетями и маркетплейсами
            </p>
            <button className="bg-[hsl(var(--gold))] text-[hsl(var(--choco))] px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-colors">
              Запросить документацию
            </button>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-cormorant text-5xl font-bold text-[hsl(var(--choco))] mb-4">Доставка</h2>
            <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-xl mx-auto">
              Организуем доставку любым удобным способом в любую точку России и СНГ
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {DELIVERY_ZONES.map((zone) => (
                  <div key={zone.city} className="card-hover bg-[hsl(var(--warm-white))] border border-[hsl(var(--border))] rounded-2xl p-5">
                    <div className="font-cormorant text-xl font-bold text-[hsl(var(--choco))] mb-2">{zone.city}</div>
                    <div className="space-y-1">
                      <div className="text-sm flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                        <Icon name="Clock" size={14} className="text-[hsl(var(--gold))]" />
                        {zone.time}
                      </div>
                      <div className="text-sm flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                        <Icon name="Package" size={14} className="text-[hsl(var(--gold))]" />
                        {zone.min}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: "Truck", title: "Транспортные компании", desc: "Работаем со всеми крупными транспортными компаниями: СДЭК, ПЭК, Деловые Линии, Байкал Сервис" },
                { icon: "Thermometer", title: "Температурный режим", desc: "Специализированный транспорт с поддержанием температуры от 0 до +6°C для термочувствительных начинок" },
                { icon: "Shield", title: "Страхование груза", desc: "Обязательное страхование груза на всём пути следования за счёт компании" },
                { icon: "RotateCcw", title: "Возврат тары", desc: "Организуем возврат многооборотной тары с вашего склада бесплатно при объёме от 200 кг" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-[hsl(var(--warm-white))] border border-[hsl(var(--border))]">
                  <div className="w-11 h-11 rounded-xl bg-[hsl(var(--gold))]/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as IconName} size={20} className="text-[hsl(var(--choco))]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[hsl(var(--foreground))] mb-1">{item.title}</div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[hsl(var(--warm-white))]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-cormorant text-5xl font-bold text-[hsl(var(--choco))] mb-4">Контакты</h2>
            <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-xl mx-auto">
              Свяжитесь с нами для получения прайс-листа и образцов продукции
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 000-00-00", sub: "Бесплатно по России" },
                { icon: "Mail", label: "Email", value: "info@vikondi.ru", sub: "Ответим в течение часа" },
                { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Производственная, 1", sub: "Склад и шоурум" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00 – 18:00", sub: "Сб–Вс: по записи" },
              ].map((contact) => (
                <div key={contact.label} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--gold))]/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={contact.icon as IconName} size={20} className="text-[hsl(var(--choco))]" />
                  </div>
                  <div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-0.5">{contact.label}</div>
                    <div className="font-semibold text-[hsl(var(--foreground))]">{contact.value}</div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">{contact.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[hsl(var(--border))]">
              <h3 className="font-cormorant text-2xl font-bold text-[hsl(var(--choco))] mb-6">Оставить заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/40 bg-[hsl(var(--warm-white))]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/40 bg-[hsl(var(--warm-white))]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">Компания</label>
                  <input
                    type="text"
                    placeholder="ООО «Ваша компания»"
                    className="w-full border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/40 bg-[hsl(var(--warm-white))]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">Сообщение</label>
                  <textarea
                    rows={3}
                    placeholder="Укажите интересующие позиции и объём..."
                    className="w-full border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/40 bg-[hsl(var(--warm-white))] resize-none"
                  />
                </div>
                <button className="w-full bg-[hsl(var(--choco))] text-[hsl(var(--cream))] py-4 rounded-xl font-semibold hover:opacity-90 transition-colors">
                  Отправить заявку
                </button>
                <p className="text-xs text-[hsl(var(--muted-foreground))] text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(var(--choco))] text-white/70 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--gold))]/20 flex items-center justify-center text-[hsl(var(--gold))] text-lg font-bold">К</div>
              <div>
                <div className="font-cormorant text-xl font-bold text-white">Виконди</div>
                <div className="text-xs opacity-60 tracking-widest uppercase">Производство начинок</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm justify-center">
              {NAV_LINKS.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="hover:text-[hsl(var(--gold))] transition-colors">
                  {link.label}
                </button>
              ))}
            </div>
            <div className="text-sm opacity-60">© 2024 Виконди. Все права защищены.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}