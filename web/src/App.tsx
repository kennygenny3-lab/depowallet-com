import { useState } from 'react'
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

function PortfolioChart() {
  return (
    <svg className="portfolio-chart" viewBox="0 0 620 190" role="img" aria-label="Пример роста портфеля за шесть месяцев">
      <defs>
        <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#756cf5" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#756cf5" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#668af3" />
          <stop offset="55%" stopColor="#756cf5" />
          <stop offset="100%" stopColor="#e77da6" />
        </linearGradient>
      </defs>
      {[35, 85, 135].map((y) => <line key={y} x1="0" y1={y} x2="620" y2={y} className="chart-grid" />)}
      <path d="M0 151 C35 145 50 122 86 129 C126 137 143 111 178 116 C215 121 234 79 270 91 C306 103 335 78 367 83 C410 90 423 43 459 58 C497 73 513 37 548 43 C578 48 596 25 620 21 L620 190 L0 190 Z" fill="url(#heroArea)" />
      <path d="M0 151 C35 145 50 122 86 129 C126 137 143 111 178 116 C215 121 234 79 270 91 C306 103 335 78 367 83 C410 90 423 43 459 58 C497 73 513 37 548 43 C578 48 596 25 620 21" fill="none" stroke="url(#heroLine)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="620" cy="21" r="11" fill="#756cf5" opacity="0.16" />
      <circle cx="620" cy="21" r="5" fill="#756cf5" stroke="white" strokeWidth="3" />
    </svg>
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
        <PortfolioChart />
        <div className="chart-months"><span>сен</span><span>окт</span><span>ноя</span><span>дек</span><span>янв</span><span>фев</span></div>
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
  return (
    <div className="allocation-wrap">
      <svg viewBox="0 0 160 160" className="allocation-chart" role="img" aria-label="Пример распределения активов">
        <circle cx="80" cy="80" r="56" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="18" />
        {assets.map((asset, index) => {
          const dash = `${asset.share} ${100 - asset.share}`
          const previousShare = assets.slice(0, index).reduce((sum, item) => sum + item.share, 0)
          return <circle key={asset.symbol} cx="80" cy="80" r="56" fill="none" stroke={asset.color} strokeWidth="18" pathLength="100" strokeDasharray={dash} strokeDashoffset={-previousShare} />
        })}
      </svg>
      <div className="allocation-center"><strong>4</strong><span>актива</span></div>
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
