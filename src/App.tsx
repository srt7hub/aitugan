import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, animate, useMotionValue, useMotionTemplate, useAnimationFrame } from 'motion/react';
import { GridPattern } from './components/ui/the-infinite-grid';
import { CircularTestimonials } from './components/ui/circular-testimonials';
import { 
  ArrowRight, 
  CheckCircle2, 
  Factory, 
  ShieldCheck, 
  Wrench, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram,
  ChevronRight,
  ClipboardList,
  MessageSquare,
  Truck,
  FileBadge2
} from 'lucide-react';

const makePhotos = (folder: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/photos/${folder}/${i + 1}.jpeg`);

const serialProducts = [
  {
    id: 'p1', title: 'Платформы одноосные', price: 'от 43 000 ₽',
    photos: makePhotos('1osn', 6), cover: '/1os.jpg',
    desc: 'Базовые одноосные платформы для перевозки легких грузов. Цены указаны без колёс. Доплата за 1 колесо — 5 200 ₽.',
    note: 'Ступицы 4×98 (R13, R14). По запросу: 5×139.7 (Нива, R15, R16).',
    included: ['Документы для ГИБДД', 'Окрашенная рама', 'Рессоры', 'Ось', 'Амортизаторы', 'Ступицы', 'Полная электрика', 'Крылья', 'Замок фаркопа', 'Задние фары', 'Светоотражатели'],
    sizes: [
      { size: '2.0×1.3', price: '43 000 ₽' },
      { size: '2.5×1.3', price: '46 000 ₽' },
      { size: '2.5×1.5', price: '47 000 ₽' },
      { size: '3.0×1.5', price: '57 000 ₽' },
      { size: '3.5×1.5', price: '58 000 ₽' },
      { size: '4.0×1.5', price: '68 000 ₽' },
    ],
  },
  {
    id: 'p2', title: 'Платформы двухосные', price: 'от 58 000 ₽',
    photos: makePhotos('2osn', 5), cover: '/2os.jpg',
    desc: 'Усиленные двухосные платформы для тяжелых и габаритных грузов. Цены указаны без колёс. Доплата за 1 колесо — 5 200 ₽.',
    note: 'Ступицы 4×98 (R13, R14). По запросу: 5×139.7 (Нива, R15, R16).',
    included: ['Документы для ГИБДД', 'Окрашенная рама', 'Рессоры', 'Ось', 'Амортизаторы', 'Ступицы', 'Полная электрика', 'Крылья', 'Замок фаркопа', 'Задние фары', 'Светоотражатели'],
    sizes: [
      { size: '2.0×1.3', price: '58 000 ₽' },
      { size: '2.5×1.3', price: '61 000 ₽' },
      { size: '2.5×1.5', price: '62 000 ₽' },
      { size: '3.0×1.5', price: '71 000 ₽' },
      { size: '3.5×1.5', price: '72 000 ₽' },
      { size: '4.0×1.5', price: '80 000 ₽' },
    ],
  },
  {
    id: 'p3', title: 'Одноосный прицеп с бортом', price: 'от 53 000 ₽',
    photos: makePhotos('1osnBEZ', 6), cover: '/photos/1osnBEZ/3.jpeg',
    desc: 'Одноосный прицеп с металлическими бортами без тента. Передний и задний борт открываются.',
    included: ['Документы для ГИБДД', 'Окрашенная рама', 'Борта', 'Рессоры', 'Ось', 'Ступицы', 'Полная электрика', 'Крылья', 'Замок фаркопа', 'Задние фары'],
    sizes: [
      { size: '2.0×1.3', price: '53 000 ₽' },
      { size: '2.5×1.3', price: '61 000 ₽' },
      { size: '2.5×1.5', price: '63 000 ₽' },
      { size: '3.0×1.5', price: '74 000 ₽' },
      { size: '3.5×1.5', price: '77 000 ₽' },
      { size: '4.0×1.5', price: '85 000 ₽' },
    ],
  },
  {
    id: 'p4', title: 'Двухосный прицеп с бортом', price: 'от 58 000 ₽',
    photos: makePhotos('2osnBEZ', 7),
    desc: 'Двухосный прицеп с металлическими бортами без тента — для крупных грузов.',
    included: ['Документы для ГИБДД', 'Окрашенная рама', 'Борта', 'Рессоры', 'Ось', 'Ступицы', 'Полная электрика', 'Крылья', 'Замок фаркопа', 'Задние фары'],
    sizes: [
      { size: '2.0×1.3', price: '58 000 ₽' },
      { size: '2.5×1.3', price: '74 000 ₽' },
      { size: '2.5×1.5', price: '77 000 ₽' },
      { size: '3.0×1.5', price: '88 000 ₽' },
      { size: '3.5×1.5', price: '90 000 ₽' },
      { size: '4.0×1.5', price: '100 000 ₽' },
    ],
  },
  {
    id: 'p5', title: 'Одноосный прицеп с тентом', price: 'от 69 000 ₽',
    photos: makePhotos('1osnTENT', 7),
    desc: 'Одноосный прицеп с бортами и тентом для защиты груза от непогоды. Передний и задний борт открываются.',
    included: ['Документы для ГИБДД', 'Окрашенная рама', 'Борта', 'Тент', 'Рессоры', 'Ось', 'Ступицы', 'Полная электрика', 'Крылья', 'Замок фаркопа', 'Задние фары'],
    sizes: [
      { size: '2.0×1.3', price: '69 000 ₽' },
      { size: '2.5×1.3', price: '77 000 ₽' },
      { size: '2.5×1.5', price: '80 000 ₽' },
      { size: '3.0×1.5', price: '93 000 ₽' },
      { size: '3.5×1.5', price: '96 000 ₽' },
      { size: '4.0×1.5', price: '114 000 ₽' },
    ],
  },
  {
    id: 'p6', title: 'Двухосный прицеп с тентом', price: 'от 85 000 ₽',
    photos: makePhotos('2osnTENT', 5),
    desc: 'Двухосный прицеп с бортами и тентом для объемных и чувствительных грузов.',
    included: ['Документы для ГИБДД', 'Окрашенная рама', 'Борта', 'Тент', 'Рессоры', 'Ось', 'Ступицы', 'Полная электрика', 'Крылья', 'Замок фаркопа', 'Задние фары'],
    sizes: [
      { size: '2.0×1.3', price: '85 000 ₽' },
      { size: '2.5×1.3', price: '92 000 ₽' },
      { size: '2.5×1.5', price: '95 000 ₽' },
      { size: '3.0×1.5', price: '108 000 ₽' },
      { size: '3.5×1.5', price: '112 000 ₽' },
      { size: '4.0×1.5', price: '130 000 ₽' },
    ],
  },
  {
    id: 'p7', title: 'Платформа с подрамником', price: 'от 92 000 ₽',
    photos: makePhotos('2osnPODRAMNIK', 7),
    desc: 'Усиленная двухосная платформа с подрамником для пчеловозов, каракатов, автовозов и спецтехники.',
    included: ['Документы для ГИБДД', 'Усиленная рама с подрамником', 'Рессоры', 'Ось', 'Ступицы', 'Полная электрика', 'Крылья', 'Замок фаркопа', 'Задние фары'],
    sizes: [
      { size: '3.0×2.0', price: '92 000 ₽' },
      { size: '3.5×2.0', price: '96 000 ₽' },
      { size: '4.0×2.0', price: '99 000 ₽' },
      { size: '4.5×2.0', price: '102 000 ₽' },
      { size: '5.0×2.0', price: '106 000 ₽' },
      { size: '6.0×2.0', price: '117 000 ₽' },
      { size: '7.0×2.0', price: '145 000 ₽' },
      { size: '8.0×2.0', price: '183 000 ₽' },
      { size: '8.5×2.0', price: '206 000 ₽' },
    ],
  },
  {
    id: 'p8', title: 'Длинномер 5×2', price: 'от 106 000 ₽',
    photos: makePhotos('dlina5x2', 7),
    desc: 'Прицеп-длинномер, двухосный с усиленной рамой и подрамником. Для пчеловозов, каракатов и крупногабаритных грузов.',
    included: ['Документы для ГИБДД', 'Усиленная рама с подрамником', 'Рессоры', 'Ось', 'Ступицы', 'Полная электрика', 'Крылья', 'Замок фаркопа', 'Задние фары'],
    sizes: [
      { size: '3.0×2.0', price: '120 000 ₽' },
      { size: '3.5×2.0', price: '125 000 ₽' },
      { size: '4.0×2.0', price: '134 000 ₽' },
      { size: '4.5×2.0', price: '147 000 ₽' },
      { size: '5.0×2.0', price: '155 000 ₽' },
      { size: '6.0×2.0', price: '178 000 ₽' },
      { size: '7.0×2.0', price: '210 000 ₽' },
      { size: '8.0×2.0', price: '254 000 ₽' },
      { size: '8.5×2.0', price: '276 000 ₽' },
    ],
  },
  {
    id: 'p9', title: 'Фургон двухосный', price: 'от 200 000 ₽',
    photos: makePhotos('furgon', 10),
    desc: 'Закрытый двухосный фургон для безопасной перевозки ценных грузов. Цена уточняется по запросу.',
    included: ['Документы для ГИБДД', 'Окрашенная рама', 'Кузов фургон', 'Рессоры', 'Ось', 'Ступицы', 'Полная электрика', 'Замок фаркопа'],
  },
  {
    id: 'p10', title: 'Прицеп-коневоз', price: 'от 160 000 ₽',
    photos: makePhotos('kovnevos', 7),
    desc: 'Специализированный прицеп для безопасной перевозки лошадей.',
    included: ['Документы для ГИБДД', 'Окрашенная рама', 'Кузов', 'Рессоры', 'Ось', 'Ступицы', 'Полная электрика', 'Замок фаркопа'],
    sizes: [
      { size: '2.4×1.2', price: '160 000 ₽' },
    ],
  },
  {
    id: 'p11', title: 'Подкат', price: 'от 60 000 ₽',
    photos: makePhotos('podkat', 5),
    desc: 'Прицеп-подкат для частичной погрузки и эвакуации автомобиля. Категория В. По ПТС: ПРИЦЕП-ЭВАКУАТОР.',
    note: 'Колёса в комплект не входят. Размерность: 175/70 R13, 175/65 R14. Сверловка 4×98.',
    included: ['Документы для ГИБДД (ПТС, ДКП)', 'Рама основная', 'Рама поворотная', 'Крылья', 'Аппарели (трапы)', 'Дышло', 'Ступицы', 'Проводка и фонари', 'Сцепной замок', 'Кронштейн для лебёдки'],
    sizes: [
      { size: 'Стандарт (до 2000 кг)', price: '60 000 ₽' },
      { size: 'Усиленный (до 3000 кг)', price: '70 000 ₽' },
    ],
  },
];

const customDirections = [
  'Эвакуаторы',
  'Скотовозы',
  'Подкаты',
  'Лодочные прицепы',
  'Бани на колесах',
  'Дома на колесах',
  'Мобильные модули',
  'Индивидуальные проекты',
];

function AnimatedCounter({ from = 0, to, duration = 2, suffix = "" }: { from?: number, to: number, duration?: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration, suffix]);

  return <span ref={ref}>{from}{suffix}</span>;
}

const processSteps = [
  { id: '01', icon: ClipboardList, title: 'Заявка', desc: 'Оставляете заявку на сайте или звоните нам' },
  { id: '02', icon: MessageSquare, title: 'Консультация', desc: 'Уточняем детали, подбираем оптимальное решение и создаем чертежи' },
  { id: '03', icon: Factory, title: 'Производство', desc: 'Изготовление на нашем заводе с контролем качества' },
  { id: '04', icon: Truck, title: 'Отправка', desc: 'Доставка готового транспортного средства в ваш регион' },
  { id: '05', icon: FileBadge2, title: 'Постановка на учет', desc: 'Выдаем полный пакет документов для ГИБДД' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-gray-200' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className={`text-2xl font-display font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>
          КОСМОС
        </a>
        
        <div className={`hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide uppercase ${scrolled ? 'text-gray-600' : 'text-gray-300'}`}>
          <a href="#about" className={`transition-colors ${scrolled ? 'hover:text-black' : 'hover:text-white'}`}>О компании</a>
          <a href="#products" className={`transition-colors ${scrolled ? 'hover:text-black' : 'hover:text-white'}`}>Продукция</a>
          <a href="#process" className={`transition-colors ${scrolled ? 'hover:text-black' : 'hover:text-white'}`}>Процесс</a>
          <a href="#contact" className={`transition-colors ${scrolled ? 'hover:text-black' : 'hover:text-white'}`}>Контакты</a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <a href="tel:+79174770317" className={`font-medium ${scrolled ? 'text-gray-900' : 'text-white'}`}>8 (917) 477-03-17</a>
          <button className={`${scrolled ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'} px-6 py-2 rounded-full font-medium text-sm transition-all hover:scale-105`}>
            Оставить заявку
          </button>
        </div>

        <button className={`md:hidden ${scrolled ? 'text-gray-900' : 'text-white'}`} onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className={`absolute top-full left-0 w-full ${scrolled ? 'bg-white border-b border-gray-200' : 'bg-[#0F172A] border-b border-white/10'} p-6 flex flex-col space-y-4 md:hidden shadow-xl`}>
          <a href="#about" onClick={() => setMobileMenu(false)} className={`text-xl font-display ${scrolled ? 'text-gray-900' : 'text-white'}`}>О компании</a>
          <a href="#products" onClick={() => setMobileMenu(false)} className={`text-xl font-display ${scrolled ? 'text-gray-900' : 'text-white'}`}>Продукция</a>
          <a href="#process" onClick={() => setMobileMenu(false)} className={`text-xl font-display ${scrolled ? 'text-gray-900' : 'text-white'}`}>Процесс</a>
          <a href="#contact" onClick={() => setMobileMenu(false)} className={`text-xl font-display ${scrolled ? 'text-gray-900' : 'text-white'}`}>Контакты</a>
          <div className={`pt-4 mt-4 border-t ${scrolled ? 'border-gray-100' : 'border-white/10'}`}>
            <a href="tel:+79174770317" className={`block text-xl font-medium mb-4 ${scrolled ? 'text-gray-900' : 'text-white'}`}>8 (917) 477-03-17</a>
            <button className={`${scrolled ? 'bg-gray-900 text-white' : 'bg-white text-black'} w-full py-3 rounded-md font-medium`}>Оставить заявку</button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-32 overflow-hidden">
      {/* Background Image / Fake Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-[#0F172A]/30 z-10 mix-blend-multiply" />
        <motion.video 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/IMG_3044.mp4" type="video/mp4" />
        </motion.video>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
            Инженерное качество
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] tracking-tighter mb-6"
          >
            Производство транспортных модулей под ваши задачи
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light"
          >
            Прицепы • Эвакуаторы • Подкаты • Дома на колесах. Создаем надежное транспортное средство премиум-класса с полным циклом 
            сопровождения от инжиниринга до постановки на учет.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a href="#contact" className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-medium text-center transition-transform hover:scale-105 flex justify-center items-center">
              Получить консультацию
            </a>
            <a href="#products" className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-center border border-white/30 hover:bg-white/10 transition-colors flex justify-center items-center">
              Смотреть продукцию <ArrowRight size={18} className="ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.5; 
  const speedY = 0.5;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section 
      id="about" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="pt-24 lg:pt-32 pb-8 lg:pb-12 bg-gray-50 relative z-20 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0 text-slate-800">
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
        </div>
        <motion.div 
          className="absolute inset-0 z-0 opacity-20"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
        </motion.div>

        <div className="absolute right-[10%] top-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[30%] h-[30%] rounded-full bg-blue-400/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Section - Left */}
          <div className="relative w-full flex justify-center lg:justify-start order-2 lg:order-1 pt-8 lg:pt-0">
             <div className="relative z-20 w-full max-w-[450px] lg:max-w-[550px] xl:max-w-[650px]">
               <motion.img 
                 initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                 whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 src="/aitugan2.png" 
                 alt="Руководитель компании" 
                 className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
               />
             </div>
          </div>

          {/* Content Section - Right */}
          <div className="relative z-10 order-1 lg:order-2 py-8 lg:py-0">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="inline-flex items-center text-xs font-bold tracking-widest uppercase mb-8 text-blue-600">
                <span className="w-8 h-[2px] bg-blue-600 mr-3 rounded-full"></span>
                О компании
              </motion.div>
              
              <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-4xl md:text-5xl lg:text-5xl font-display font-bold tracking-tight mb-8 text-[#0F172A] leading-[1.1]">
                Инженерные решения <br className="hidden sm:block"/>премиум-класса
              </motion.h2>
              
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-gray-600 text-lg lg:text-xl mb-14 font-light leading-relaxed">
                Мы создаем надежное транспортное средство под индивидуальные задачи бизнеса. 
                Полный производственный цикл: от 3D-моделирования до постановки на учет.
              </motion.p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-10 pt-10 border-t border-gray-200">
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                  <div className="text-3xl lg:text-4xl font-display font-bold text-[#0F172A] mb-3">
                    <AnimatedCounter to={5} suffix="+" />
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold leading-tight">Лет на<br/>рынке</div>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                  <div className="text-3xl lg:text-4xl font-display font-bold text-[#0F172A] mb-3">
                    <AnimatedCounter to={500} suffix="+" />
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold leading-tight">Выполненных<br/>проектов</div>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                  <div className="text-3xl lg:text-4xl font-display font-bold text-[#0F172A] mb-3">Россия</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold leading-tight">География<br/>поставок</div>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                  <div className="text-3xl lg:text-4xl font-display font-bold text-[#0F172A] mb-3">
                    <AnimatedCounter to={100} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold leading-tight">Свое<br/>производство</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

const PhotoSliderModal: React.FC<{ product: any, onClose: () => void }> = ({ product, onClose }) => {
  const [current, setCurrent] = useState(0);
  const photos: string[] = product.photos || [];
  const total = photos.length;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % total);
      if (e.key === 'ArrowLeft') setCurrent(c => (c - 1 + total) % total);
    };
    const onHash = () => onClose();
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
      document.body.style.overflow = '';
    };
  }, [onClose, total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setCurrent(c => (c + 1) % total);
      else setCurrent(c => (c - 1 + total) % total);
    }
    touchStartX.current = null;
  };

  /* ── Info panel (shared between mobile bottom and desktop right) ── */
  const InfoPanel = () => (
    <div className="flex flex-col h-full">
      {/* Header inside panel (desktop only) */}
      <div className="hidden md:block px-6 pt-5 pb-4 border-b border-white/10 flex-shrink-0">
        <h3 className="text-white font-bold text-xl leading-tight">{product.title}</h3>
        {product.price && <span className="text-blue-400 text-sm font-semibold">{product.price}</span>}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-5">
        <p className="text-gray-400 text-sm leading-relaxed">{product.desc}</p>

        {product.note && (
          <p className="text-yellow-400/80 text-xs leading-relaxed">{product.note}</p>
        )}

        {product.sizes && (
          <div>
            <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Размеры и цены</div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="text-gray-600 text-xs pb-1 border-b border-white/5">Размер (м)</div>
              <div className="text-gray-600 text-xs pb-1 border-b border-white/5">Цена</div>
              {product.sizes.map((row: { size: string; price: string }, i: number) => (
                <React.Fragment key={i}>
                  <div className="text-white text-sm font-mono py-1.5 border-b border-white/5">{row.size}</div>
                  <div className="text-blue-400 text-sm font-semibold py-1.5 border-b border-white/5">{row.price}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {product.included && (
          <div>
            <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Комплектация</div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {product.included.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-1.5 text-gray-300 text-xs">
                  <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-4 md:px-6 py-4 border-t border-white/10">
        <a href="#contact" onClick={onClose} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors">
          Оставить заявку <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col md:flex-row" style={{ paddingTop: 'env(safe-area-inset-top)' }}>

      {/* ── LEFT / TOP: photo area ── */}
      <div className="flex flex-col flex-1 min-h-0 min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex-shrink-0 flex items-center justify-between px-4 py-3 bg-black border-b border-white/10">
          <div className="flex-1 min-w-0 mr-3">
            <h3 className="text-white font-bold text-base leading-tight truncate">{product.title}</h3>
            {product.price && <span className="text-blue-400 text-sm font-semibold">{product.price}</span>}
          </div>
          <span className="text-gray-400 text-sm flex-shrink-0">{current + 1} / {total}</span>
        </div>

        {/* Main image */}
        <div
          className="relative flex-1 min-h-0 bg-black select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={photos[current]}
            alt={`${product.title} ${current + 1}`}
            className="w-full h-full object-contain"
            draggable={false}
          />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white transition-colors border border-white/20 z-10"
            aria-label="Закрыть"
          >
            <X size={22} />
          </button>
          {/* Desktop counter */}
          <div className="hidden md:block absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {current + 1} / {total}
          </div>
          {total > 1 && (
            <>
              <button onClick={() => setCurrent(c => (c - 1 + total) % total)} className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white transition-colors">
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <button onClick={() => setCurrent(c => (c + 1) % total)} className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white transition-colors">
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {total > 1 && (
          <div className="flex-shrink-0 flex gap-2 px-4 py-3 overflow-x-auto bg-black border-t border-white/10">
            {photos.map((src, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-blue-500 opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}`}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Mobile info panel */}
        <div className="md:hidden flex-shrink-0 max-h-[40vh] bg-black border-t border-white/10 overflow-hidden flex flex-col">
          <InfoPanel />
        </div>
      </div>

      {/* ── RIGHT: info panel (desktop only) ── */}
      <div className="hidden md:flex flex-col w-[360px] flex-shrink-0 bg-[#0a0f1c] border-l border-white/10">
        <InfoPanel />
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: any, index: number }> = ({ product, index }) => {
  const [open, setOpen] = useState(false);
  const coverPhoto = product.cover || product.photos?.[0] || product.image;

  return (
    <>
      {open && <PhotoSliderModal product={product} onClose={() => setOpen(false)} />}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onClick={() => setOpen(true)}
        className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors duration-500 z-10 pointer-events-none" />
          <img
            src={coverPhoto}
            alt={product.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {product.price && (
            <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold text-gray-900 shadow-sm flex items-center border border-gray-100/50">
              {product.price}
            </div>
          )}
          {product.photos?.length > 1 && (
            <div className="absolute bottom-3 left-3 z-20 bg-black/50 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
              {product.photos.length} фото
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <h4 className="text-xl md:text-2xl font-display font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h4>
          <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow text-sm md:text-base">
            {product.desc}
          </p>

          <div className="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-widest text-blue-600 group/btn">
            <span className="mr-3 text-gray-900 group-hover:text-blue-600 transition-colors">Подробнее</span>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-colors duration-300 border border-blue-100 group-hover/btn:border-transparent">
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};


const Products = () => {
  return (
    <>
      <section id="products" className="py-24 pt-16 lg:pt-20 bg-slate-50 relative z-10">
      {/* Decorative top border for industrial feel */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center text-xs font-bold tracking-widest uppercase mb-4 text-blue-600">
            <span className="w-8 h-[2px] bg-blue-600 mr-3 rounded-full"></span>
            Каталог продукции
            <span className="w-8 h-[2px] bg-blue-600 ml-3 rounded-full"></span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-display font-bold tracking-tight text-gray-900 leading-tight">
            Производственные решения
          </h2>
        </div>

        {/* Серийная продукция */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-200 pb-6 gap-4">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-[#0F172A]">
              Серийная продукция
            </h3>
            <span className="text-gray-500 font-medium">
              Модели с фиксированными размерами и ценами
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serialProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>

    <section id="custom-design" className="py-24 lg:py-32 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Background & Blueprint Graphics */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        {/* Abstract Blueprint Element */}
        <div className="absolute right-0 bottom-0 opacity-[0.04] text-[#0F172A] transform translate-x-1/4 translate-y-1/6 md:scale-125 lg:scale-150 origin-bottom-right">
          <svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 300 L700 300 L700 150 L650 150 L600 100 L150 100 L100 150 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
            <circle cx="200" cy="300" r="40" stroke="currentColor" strokeWidth="2" />
            <circle cx="200" cy="300" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="600" cy="300" r="40" stroke="currentColor" strokeWidth="2" />
            <circle cx="600" cy="300" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M150 150 L650 150" stroke="currentColor" strokeWidth="1" />
            <path d="M200 100 L200 300" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
            <path d="M600 100 L600 300" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
            <rect x="250" y="120" width="300" height="150" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
            <path d="M50 340 L750 340" stroke="currentColor" strokeWidth="1" strokeDasharray="20 10" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          <div className="lg:col-span-5 xl:col-span-6">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, ease: "easeOut" }}
             >
               <div className="inline-flex items-center text-xs font-mono tracking-widest uppercase mb-6 text-blue-600">
                 <span className="w-8 h-[1px] bg-blue-600 mr-4"></span>
                 Спецпроекты
               </div>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight mb-6">
                 Проектирование и<br /> производство под заказ
               </h2>
               <p className="text-lg md:text-xl text-slate-500 font-light mb-12 max-w-xl">
                 Разрабатываем и производим специализированные транспортные решения под задачи бизнеса и частных клиентов.
               </p>

               <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest uppercase text-white bg-[#0F172A] hover:bg-black transition-colors">
                 Обсудить проект
                 <ArrowRight size={18} className="ml-3 text-blue-500" />
               </a>
             </motion.div>
          </div>

          <div className="lg:col-span-7 xl:col-span-6">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                {customDirections.map((dir, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                    className="group py-5 flex items-center border-b border-slate-100 hover:border-slate-200 transition-colors cursor-default"
                  >
                     <span className="text-slate-300 font-mono text-xs mr-5 group-hover:text-blue-500 transition-colors duration-300">
                       0{idx + 1}
                     </span>
                     <span className="text-lg md:text-xl font-display font-medium text-slate-800 relative inline-block">
                       {dir}
                       <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-500 ease-out"></span>
                     </span>
                  </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

const reviews = [
  {
    name: "Марсель",
    product: "Прицеп новый 2×1.3",
    date: "9 апреля 2025",
    text: "Долго искал прицеп, в магазинах не могли предложить под мои параметры. Ребята молодцы — в кратчайшие сроки изготовили прицеп. Всем рекомендую. Качество отличное!",
    initials: "М",
    color: "bg-blue-600",
  },
  {
    name: "Равиль Тактаев",
    product: "Прицеп платформа 3×1.5 м",
    date: "4 февраля 2025",
    text: "Приобрёл прицеп платформу. Качество платформы и обслуживания отличное! На все мои вопросы ответы получил. Всё чётко и быстро! Рекомендую.",
    initials: "Р",
    color: "bg-emerald-600",
  },
  {
    name: "Зиля К.",
    product: "Двухосный прицеп 3×1.5",
    date: "2 февраля 2025",
    text: "Очень доволен покупкой. Качество выше, чем у большинства серийных прицепов. Исполнение оперативное, общение по делу, без воды.",
    initials: "З",
    color: "bg-violet-600",
  },
  {
    name: "Иван",
    product: "Прицеп платформа 2.5×1.3",
    date: "24 февраля 2025",
    text: "Продавец очень хороший. Качественно и быстро сделали прицеп. Можно договориться о любом нужном варианте. Ставлю пять звёзд.",
    initials: "И",
    color: "bg-orange-500",
  },
  {
    name: "Ильдар",
    product: "Платформа двухосная 2.5×1.5",
    date: "4 марта 2025",
    text: "Приобрёл прицеп-платформу, доволен покупкой. Качество на уровне, всё сделано аккуратно и в срок.",
    initials: "И",
    color: "bg-sky-600",
  },
  {
    name: "Павел",
    product: "Двухосный прицеп 3×1.5",
    date: "4 марта 2025",
    text: "Рекомендую — прицеп хороший и продавец молодец. Всё чётко, без лишних слов. Качество соответствует цене и даже выше.",
    initials: "П",
    color: "bg-rose-600",
  },
];

const TestimonialsBlock = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#0a0f1c] relative overflow-hidden border-t border-slate-800">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-14">
          <div className="inline-flex items-center text-xs font-mono tracking-widest uppercase mb-4 text-blue-500">
            <span className="w-8 h-[1px] bg-blue-500 mr-4" />
            Отзывы клиентов
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Что говорят покупатели
            </h2>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-bold text-lg">5.0</span>
              <span>· 9 отзывов на Авито</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white/5 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/8 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1">«{r.text}»</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className={`w-9 h-9 rounded-full ${r.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {r.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{r.name}</div>
                  <div className="text-gray-500 text-xs">{r.product} · {r.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section id="process" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-24 relative z-10">
          <div className="inline-flex items-center text-xs font-mono tracking-widest uppercase mb-4 text-blue-600">
            <span className="w-8 h-[1px] bg-blue-600 mr-4"></span>
            Этапы
            <span className="w-8 h-[1px] bg-blue-600 ml-4"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">Как мы работаем</h2>
        </div>
        
        <div className="relative">
          {/* Subtle horizontal connecting line for desktop */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-16 lg:gap-8 pt-4">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={step.id} 
                  className="relative group"
                >
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    
                    {/* Accent Blue Semi-transparent Number in Background */}
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 text-[140px] font-black text-blue-600/[0.04] select-none -z-10 group-hover:text-blue-600/[0.08] transition-all duration-500 group-hover:-translate-y-2 leading-none">
                      {step.id}
                    </div>

                    {/* Icon container */}
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-900/5 ring-1 ring-black/5 group-hover:shadow-blue-500/20 group-hover:-translate-y-1 transition-all duration-500 relative z-10 group-hover:ring-blue-100">
                      <Icon className="text-blue-600" size={32} strokeWidth={1.5} />
                    </div>

                    <h4 className="text-xl font-display font-bold mb-3 text-gray-900">{step.title}</h4>
                    <p className="text-gray-600 font-light text-sm px-2 leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Vertical subtle line for mobile/tablet */}
                  {idx !== processSteps.length - 1 && (
                    <div className="md:hidden absolute top-[5rem] left-1/2 -translate-x-1/2 w-[1px] h-[calc(100%+4rem)] bg-gradient-to-b from-blue-200 via-blue-100 to-transparent -z-10"></div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#0F172A] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Готовы обсудить ваш проект?</h2>
          <p className="text-gray-400 font-light text-lg mb-12">
            Оставьте заявку, и наши инженеры свяжутся с вами для предварительного расчета стоимости 
            и сроков производства вашего транспортного средства.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <Phone size={20} className="text-gray-300" />
              </div>
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">Телефон</div>
                <div className="text-xl font-medium">8 (917) 477-03-17</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <Mail size={20} className="text-gray-300" />
              </div>
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">E-mail</div>
                <div className="text-xl font-medium">tuganf@yandex.ru</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                <MapPin size={20} className="text-gray-300" />
              </div>
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">Производство</div>
                <div className="text-base md:text-xl font-medium">Респ. Башкортостан, Абзелиловский район, с. Аскарово</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <h3 className="text-2xl font-display font-bold mb-8">Отправить запрос</h3>
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Ваше имя</label>
                <input 
                  type="text" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Телефон</label>
                <input 
                  type="tel" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Что требуется изготовить?</label>
                <textarea 
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Опишите задачу в свободной форме..."
                />
              </div>
              <button type="submit" className="w-full bg-white text-black py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-transform hover:scale-[1.02]">
                Получить расчет
              </button>
              <p className="text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1c] py-12 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div>
            <div className="text-2xl font-display font-bold tracking-tight mb-4">
              КОСМОС
            </div>
            <p className="text-gray-500 text-sm max-w-sm">
              Производство надежных прицепов и других транспортных модулей премиум-класса для бизнеса и путешествий
            </p>
          </div>
          
          <div className="flex gap-4">
            <a href="https://www.instagram.com/aitugan_fattakhov" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://vk.ru/cosmos_abz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-xs font-bold" aria-label="VK">
              VK
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} КОСМОС. Все права защищены.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden selection:bg-blue-600/30">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <TestimonialsBlock />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}
