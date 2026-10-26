import { useId, useState } from 'react'
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDollarSign,
  Fingerprint,
  Globe2,
  KeyRound,
  Layers3,
  LockKeyhole,
  Menu,
  PiggyBank,
  Plus,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'
import './App.css'
import './palette.css'
import './maven.css'
import './charts.css'

const assets = [
  { symbol: 'BTC', name: 'Bitcoin', color: '#ff8600', amount: '57 800 ₽', share: 45 },
  { symbol: 'USDT', name: 'Tether', color: '#0aa851', amount: '38 500 ₽', share: 30 },
  { symbol: 'ETH', name: 'Ethereum', color: '#4882ff', amount: '19 300 ₽', share: 15 },
  { symbol: 'SOL', name: 'Solana', color: '#ff8488', amount: '12 800 ₽', share: 10 },
]

const steps = [
  { number: '01', title: 'Откройте кошелёк', text: 'В браузере, за пару минут. Без анкет, очередей и лишних документов.', icon: WalletCards },
  { number: '02', title: 'Запишите 12 слов', text: 'Это ваш ключ. На бумаге, в надёжном месте и только у вас.', icon: KeyRound },
  { number: '03', title: 'Пополните и пользуйтесь', text: 'Переведите с биржи или получите от друга. Дальше — как в привычном банке.', icon: Zap },
]

const faqs = [
  ['Я ничего не понимаю в крипте. Справлюсь?', 'Да. В Depo понятные действия, крупные суммы и привычная логика банковского приложения. Для перевода достаточно адреса или QR-кода.'],
  ['Что такое 12 слов?', 'Это ключ восстановления кошелька. Запишите слова на бумаге и никому не показывайте. Depo не хранит их и не может восстановить за вас.'],
  ['Что будет, если я потеряю телефон?', 'Установите кошелёк заново и введите свою резервную фразу. Доступ к счетам восстановится на новом устройстве.'],
  ['Сколько стоит Depo?', 'Сам кошелёк бесплатный. При блокчейн-переводе оплачивается только комиссия сети — она не идёт Depo.'],
]

function Logo() {
  return <a className="logo" href="#top" aria-label="Depo — наверх"><span className="logo-mark">d</span><span>depo</span></a>
}

function AssetIcon({ symbol, color }: { symbol: string; color: string }) {
  return <span className="asset-icon" style={{ backgroundColor: color }}>{symbol.slice(0, 1)}</span>
}

const chartSeries = {
  '6 мес': { values: [78, 85, 82, 96, 104, 112, 128], labels: ['май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя'] },
  '1 год': { values: [65, 70, 82, 76, 89, 94, 102, 98, 110, 116, 121, 128], labels: ['ноя 25', 'дек 25', 'янв 26', 'фев 26', 'мар 26', 'апр 26', 'май 26', 'июн 26', 'июл 26', 'авг 26', 'сен 26', 'окт 26'] },
  'всё': { values: [42, 55, 48, 68, 60, 75, 82, 79, 94, 89, 105, 111, 118, 128], labels: ['2021', '', '2022', '', '2023', '', '2024', '', '2025', '', '2026', '', '', 'сейчас'] },
}
type ChartPeriod = keyof typeof chartSeries

function chartPath(points: readonly { x: number; y: number }[]) {
  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index]!
    const middle = (previous.x + point.x) / 2
    return `${path} C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`
  }, `M ${points[0]!.x} ${points[0]!.y}`)
}

function PortfolioChart({ withControls = false }: { withControls?: boolean }) {
  const [period, setPeriod] = useState<ChartPeriod>('6 мес')
  const [active, setActive] = useState<number | null>(null)
  const gradientId = useId().replace(/:/g, '')
  const data = chartSeries[period]
  const previousValues = data.values.map((value, index) => value * (0.88 + (index % 3) * 0.025))
  const max = Math.max(...data.values, ...previousValues) * 1.08
  const min = Math.min(...data.values, ...previousValues) * 0.88
  const toPoints = (values: number[]) => values.map((value, index) => ({
    x: index * (620 / (values.length - 1)),
    y: 16 + ((max - value) / (max - min)) * 137,
  }))
  const points = toPoints(data.values)
  const previousPoints = toPoints(previousValues)
  const line = chartPath(points)
  const area = `${line} L 620 190 L 0 190 Z`
  const last = points[points.length - 1]!
  const activePoint = active == null ? null : points[active]!
  const tooltipX = activePoint ? Math.max(3, Math.min(469, activePoint.x - 74)) : 0
  const tooltipY = activePoint ? Math.max(3, activePoint.y - 53) : 0
  const labelCount = Math.min(6, data.labels.length)
  const labelIndexes = Array.from({ length: labelCount }, (_, index) => Math.round(index * (data.labels.length - 1) / (labelCount - 1)))

  function handlePointer(event: React.PointerEvent<SVGSVGElement>) {
    if (event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 620
    setActive(Math.max(0, Math.min(data.values.length - 1, Math.round(x / (620 / (data.values.length - 1))))))
  }

  return (
    <div className="portfolio-chart-wrap">
      {withControls && <div className="chart-toolbar"><span><i /> Этот период <i /> Прошлый</span><div className="chart-periods">{(Object.keys(chartSeries) as ChartPeriod[]).map((item) => <button type="button" key={item} className={period === item ? 'chart-period chart-period-active' : 'chart-period'} aria-pressed={period === item} onClick={() => { setPeriod(item); setActive(null) }}>{item}</button>)}</div></div>}
      <svg key={period} className="portfolio-chart" viewBox="0 0 620 190" role="img" aria-label={`Демонстрационный график портфеля: ${period}`} onPointerMove={handlePointer} onPointerLeave={() => setActive(null)}>
        <defs>
          <linearGradient id={`${gradientId}-area`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4882ff" stopOpacity="0.3" /><stop offset="100%" stopColor="#4882ff" stopOpacity="0" /></linearGradient>
          <linearGradient id={`${gradientId}-line`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#4882ff" /><stop offset="65%" stopColor="#7188f6" /><stop offset="100%" stopColor="#ff8488" /></linearGradient>
        </defs>
        {[35, 85, 135].map((y) => <line key={y} x1="0" y1={y} x2="620" y2={y} className="chart-grid" />)}
        <path d={area} fill={`url(#${gradientId}-area)`} className="chart-area-animated" />
        <path d={chartPath(previousPoints)} fill="none" stroke="#ff8488" strokeOpacity="0.52" strokeWidth="2" strokeDasharray="5 7" strokeLinecap="round" />
        <path d={line} fill="none" stroke={`url(#${gradientId}-line)`} strokeWidth="4" strokeLinecap="round" className="chart-line-animated" />
        <circle cx={last.x} cy={last.y} r="11" fill="#4882ff" opacity="0.14" /><circle cx={last.x} cy={last.y} r="5" fill="#4882ff" stroke="white" strokeWidth="3" />
        {activePoint && active != null && <g className="chart-tooltip" pointerEvents="none"><line x1={activePoint.x} y1="15" x2={activePoint.x} y2="165" stroke="#4882ff" strokeOpacity="0.35" strokeDasharray="3 5" /><circle cx={activePoint.x} cy={activePoint.y} r="6" fill="#4882ff" stroke="white" strokeWidth="2" /><rect x={tooltipX} y={tooltipY} width="151" height="45" rx="10" fill="#2a2a2a" /><text className="chart-tooltip-date" x={tooltipX + 11} y={tooltipY + 16}>{data.labels[active]}</text><text className="chart-tooltip-value" x={tooltipX + 11} y={tooltipY + 34}>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(data.values[active]! / 128 * 128430)}</text></g>}
      </svg>
      <div className="chart-months">{labelIndexes.map((index) => <span key={index}>{data.labels[index]}</span>)}</div>
    </div>
  )
}

function WalletPreview() {
  return (
    <div className="wallet-scene" aria-label="Пример интерфейса Depo">
      <span className="floating-chip floating-chip-btc"><span>₿</span> Bitcoin</span>
      <span className="floating-chip floating-chip-safe"><ShieldCheck size={15} /> только ваши ключи</span>
      <div className="wallet-preview glass">
        <div className="wallet-top"><span className="wallet-account"><span className="mini-avatar">D</span><span>Основной счёт<small>Все активы</small></span></span><button className="icon-button" aria-label="Добавить счёт"><Plus size={18} /></button></div>
        <div className="wallet-balance"><span>Общий баланс</span><strong>128 430 <small>₽</small></strong><span className="gain"><ArrowUpRight size={14} /> 12,4% за полгода</span></div>
        <PortfolioChart withControls />
        <div className="wallet-actions">
          <button><span><ArrowDownLeft size={17} /></span>Получить</button>
          <button className="action-dark"><span><Send size={16} /></span>Отправить</button>
          <button><span><RefreshCw size={16} /></span>Обменять</button>
        </div>
        <div className="wallet-assets">
          {assets.slice(0, 3).map((asset) => <div className="wallet-asset" key={asset.symbol}><AssetIcon symbol={asset.symbol} color={asset.color} /><span>{asset.name}<small>{asset.symbol}</small></span><strong>{asset.amount}</strong></div>)}
        </div>
      </div>
    </div>
  )
}

function AllocationChart() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedAsset = assets.find((asset) => asset.symbol === selected)
  return (
    <div className="allocation-wrap">
      <svg viewBox="0 0 160 160" className="allocation-chart" role="img" aria-label="Пример распределения активов">
        <circle cx="80" cy="80" r="56" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="18" />
        {assets.map((asset, index) => {
          const previousShare = assets.slice(0, index).reduce((sum, item) => sum + item.share, 0)
          const isSelected = selected === asset.symbol
          return <circle className="allocation-segment" key={asset.symbol} cx="80" cy="80" r="56" fill="none" stroke={asset.color} strokeWidth={isSelected ? 23 : 18} opacity={selected == null || isSelected ? 1 : 0.38} pathLength="100" strokeDasharray={`${asset.share} ${100 - asset.share}`} strokeDashoffset={-previousShare} tabIndex={0} aria-label={`${asset.name}: ${asset.share}%`} onMouseEnter={() => setSelected(asset.symbol)} onMouseLeave={() => setSelected(null)} onFocus={() => setSelected(asset.symbol)} onBlur={() => setSelected(null)} />
        })}
      </svg>
      <div className="allocation-center"><strong>{selectedAsset ? `${selectedAsset.share}%` : '4'}</strong><span>{selectedAsset ? selectedAsset.name : 'актива'}</span></div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="site" id="top">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="notice"><LockKeyhole size={13} /> Depo никогда не попросит вашу seed-фразу. Ни в чате, ни по телефону — никогда.</div>
      <header className="header glass">
        <Logo />
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Основная навигация">
          <a href="#features" onClick={() => setMenuOpen(false)}>Возможности</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>Как это работает</a>
          <a href="#security" onClick={() => setMenuOpen(false)}>Безопасность</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Вопросы</a>
        </nav>
        <a className="button button-small header-cta" href="#start">Открыть кошелёк <ArrowUpRight size={16} /></a>
        <button className="menu-button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <div className="hero-surface">
          <section className="hero section-shell">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> Крипта без лишнего</div>
              <h1>Крипта.<br /><span className="text-gradient serif-line">Просто.</span></h1>
              <p className="hero-lead">Переводы родным, оплата за границей и накопления. Всё в одном спокойном приложении — без биржевого шума и сложных терминов.</p>
              <div className="hero-actions"><a className="button" href="#start">Создать кошелёк <ArrowRight size={18} /></a><a className="text-link" href="#how">Посмотреть, как работает <ArrowDownLeft size={17} /></a></div>
              <div className="hero-proof"><span className="proof-icon"><Fingerprint size={21} /></span><span><strong>Некастодиальный кошелёк</strong><small>Ключи остаются на вашем устройстве</small></span></div>
            </div>
            <WalletPreview />
          </section>

          <section className="metrics section-shell" aria-label="Ключевые особенности">
            <div><strong>0</strong><span>ключей на наших серверах</span></div>
            <div><strong>24/7</strong><span>доступ к своим активам</span></div>
            <div><strong>12</strong><span>слов для восстановления</span></div>
            <div><strong>1</strong><span>понятное приложение</span></div>
          </section>
        </div>
        <div className="light-surface">

        <section className="section-shell section" id="features">
          <div className="section-heading"><div><span className="kicker">Всё нужное. Ничего лишнего.</span><h2>Финансы,<br /><span className="serif-line">которые видно.</span></h2></div><p>Баланс, динамика и состав портфеля — на одном экране. Не нужно быть трейдером, чтобы понимать, что происходит с вашими деньгами.</p></div>
          <div className="bento">
            <article className="bento-card glass bento-portfolio">
              <div className="card-heading"><span className="feature-icon violet"><Layers3 size={19} /></span><span>Портфель</span><span className="soft-badge">пример</span></div>
              <div className="portfolio-total"><span>128 430 ₽</span><span className="gain"><ArrowUpRight size={13} /> 12,4%</span></div>
              <PortfolioChart />
              <div className="asset-list">{assets.map((asset) => <div key={asset.symbol}><AssetIcon symbol={asset.symbol} color={asset.color} /><span>{asset.symbol}</span><strong>{asset.amount}</strong><small>{asset.share}%</small></div>)}</div>
            </article>
            <article className="bento-card glass bento-allocation">
              <div className="card-heading"><span className="feature-icon mint"><CircleDollarSign size={19} /></span><span>Структура активов</span></div>
              <AllocationChart />
              <p>Не просто список монет — понятная картина вашего портфеля.</p>
              <div className="allocation-legend">{assets.map((asset) => <span key={asset.symbol}><i style={{ backgroundColor: asset.color }} />{asset.symbol} · {asset.share}%</span>)}</div>
            </article>
            <article className="bento-card glass bento-savings">
              <div className="card-heading"><span className="feature-icon coral"><PiggyBank size={19} /></span><span>Накопления</span><span className="soft-badge">по своим правилам</span></div>
              <h3>Маленькие шаги.<br />Заметный результат.</h3>
              <p>Отдельные счета, копилки и автопокупка. Цель и сумму выбираете вы.</p>
              <div className="savings-visual">
                <div className="savings-top"><span>На путешествие</span><strong>68%</strong></div>
                <div className="progress"><span /></div>
                <div className="savings-bottom"><span>85 000 ₽ собрано</span><span>125 000 ₽</span></div>
                <div className="weekly-bars">{[34, 43, 38, 58, 52, 72, 65, 88, 78, 96].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
                <span className="savings-caption">+ 25 USDT каждую неделю</span>
              </div>
            </article>
            <article className="bento-card glass bento-transfer">
              <div className="card-heading"><span className="feature-icon blue"><Send size={18} /></span><span>Перевод</span></div>
              <div className="transfer-route"><div><span className="route-avatar">Вы</span><small>Отправитель</small></div><div className="route-line"><span /><Zap size={16} /><span /></div><div><span className="route-avatar route-avatar-mint">А</span><small>Анна · Berlin</small></div></div>
              <div className="transfer-amount"><span>Отправлено</span><strong>120,00 <small>USDT</small></strong><span className="transfer-status"><Check size={13} /> Доставлено</span></div>
              <p>Адрес или QR. Проверка перед отправкой. Понятный статус после.</p>
            </article>
          </div>
        </section>

        <section className="section-shell section" id="how">
          <div className="section-heading compact"><div><span className="kicker">Начать просто</span><h2>Три шага.<br /><span className="serif-line">И вы в Depo.</span></h2></div><p>Никакой финансовой терминологии на первом экране. Только то, что нужно для безопасного старта.</p></div>
          <div className="steps">{steps.map((step) => { const Icon = step.icon; return <article className="step glass" key={step.number}><div className="step-top"><span>{step.number}</span><Icon size={23} /></div><h3>{step.title}</h3><p>{step.text}</p></article> })}</div>
        </section>
        </div>

        <section className="asset-band"><div className="asset-track">{[...assets, ...assets, { symbol: 'TON', name: 'Toncoin', color: '#4882ff', amount: '', share: 0 }].map((asset, index) => <span key={`${asset.symbol}-${index}`}><AssetIcon symbol={asset.symbol} color={asset.color} />{asset.name}<small>{asset.symbol}</small></span>)}</div></section>

        <section className="section-shell section security-section" id="security">
          <div className="security-panel">
            <div className="security-copy"><span className="kicker kicker-dark">Безопасность без обещаний</span><h2>Мы не храним.<br /><span className="serif-line">Вы управляете.</span></h2><p>Seed-фраза создаётся и шифруется на вашем устройстве. У Depo нет копии ключей и доступа к вашим средствам.</p><div className="security-points"><span><ShieldCheck size={18} /> Локальное шифрование</span><span><KeyRound size={18} /> Восстановление по 12 словам</span><span><Globe2 size={18} /> Проверяемые публичные данные</span></div></div>
            <div className="security-visual"><div className="security-orbit orbit-one" /><div className="security-orbit orbit-two" /><div className="security-core glass-dark"><Fingerprint size={52} /><strong>Только вы</strong><span>владеете ключами</span></div><span className="security-tag tag-one"><Check size={13} /> На устройстве</span><span className="security-tag tag-two"><LockKeyhole size={13} /> Не передаётся</span></div>
          </div>
          <div className="honest-warning"><span><Sparkles size={18} /></span><p><strong>Честно:</strong> если вы потеряете 12 слов, восстановить доступ не сможет никто. Полный контроль означает полную ответственность.</p></div>
        </section>

        <div className="light-surface lower-surface">
        <section className="section-shell section use-cases">
          <div className="section-heading compact"><div><span className="kicker">Для жизни, не только для рынка</span><h2>Один кошелёк.<br /><span className="serif-line">Много сценариев.</span></h2></div></div>
          <div className="use-grid"><article><Globe2 /><h3>Переводы без границ</h3><p>Родным в другой стране или оплата услуг — без банковского графика.</p><span>24/7 · из телефона</span></article><article><PiggyBank /><h3>Накопления с целью</h3><p>Отдельные копилки и регулярные пополнения в удобном темпе.</p><span>Без сроков · без штрафов</span></article><article><CircleDollarSign /><h3>Оплата работы</h3><p>Покажите адрес или QR-код. Сумма и статус всегда под рукой.</p><span>BTC · USDT · другие активы</span></article></div>
        </section>

        <section className="section-shell section faq-section" id="faq">
          <div className="faq-title"><span className="kicker">Без мелкого шрифта</span><h2>Спросите<br /><span className="serif-line">честно.</span></h2><p>Коротко отвечаем на то, что действительно важно перед первым переводом.</p></div>
          <div className="faq-list">{faqs.map(([question, answer], index) => <article className={openFaq === index ? 'faq-item faq-open' : 'faq-item'} key={question}><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown size={20} /></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div>
        </section>
        </div>

        <section className="section-shell start-section" id="start"><div className="start-card"><span className="start-orb start-orb-one" /><span className="start-orb start-orb-two" /><div className="start-icon"><WalletCards size={27} /></div><span className="kicker kicker-dark">Ваши ключи. Ваши правила.</span><h2>Начните с одного<br /><span className="serif-line">понятного кошелька.</span></h2><p>Создайте Depo за пару минут и посмотрите всё изнутри.</p><a className="button button-light" href="https://depowallet.com/account">Создать кошелёк <ArrowUpRight size={18} /></a><small>Бесплатно · Без анкет · С ответственностью за свою seed-фразу</small></div></section>
      </main>

      <footer className="footer section-shell"><div className="footer-main"><div className="footer-brand"><Logo /><p>Крипта. Просто.<br />Кошелёк, ключи которого принадлежат вам.</p><span className="system-status"><i /> Все системы работают</span></div><div className="footer-column"><strong>Продукт</strong><a href="#features">Возможности</a><a href="#how">Как это работает</a><a href="#security">Безопасность</a></div><div className="footer-column"><strong>Помощь</strong><a href="#faq">Вопросы и ответы</a><a href="#security">Что такое 12 слов</a><a href="https://status.depowallet.com">Статус сети</a></div><div className="footer-column"><strong>Документы</strong><a href="#footer-note">Условия использования</a><a href="#footer-note">Конфиденциальность</a><a href="#footer-note">Риски</a></div></div><div className="footer-bottom" id="footer-note"><span>© 2026 Depo Wallet</span><p>Криптовалюты связаны с рисками. Depo никогда не попросит вашу seed-фразу.</p><span>depowallet.com</span></div></footer>
    </div>
  )
}

export default App
