import { Link } from 'react-router-dom'
import './HomePage.css'

const ciphers = [
  {
    id: 'atbash',
    name: 'Cifra de Atbash',
    icon: '🕍',
    description: 'Substituição Inversa - Uma das cifras mais antigas da antiguidade hebraica',
    difficulty: 'Muito Fácil',
    security: 'Extremamente Fraca',
    path: '/atbash'
  },
  {
    id: 'playfair',
    name: 'Cifra Playfair',
    icon: '🧩',
    description: 'Substituição poligráfica usando digramas e uma matriz 5x5 construída com uma palavra-chave',
    difficulty: 'Intermediária',
    security: 'Moderada',
    path: '/playfair'
  },
  {
    id: 'vigenere',
    name: 'Cifra de Vigenère',
    icon: '🔑',
    description: 'Cifra polialfabética usando uma palavra-chave para múltiplos deslocamentos de César',
    difficulty: 'Intermediária',
    security: 'Moderada',
    path: '/vigenere'
  },
]

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Criptografia Didática</h1>
        <p className="subtitle">
          Aprenda sobre algoritmos de criptografia de forma interativa e visual
        </p>
      </header>

      <main className="home-main">
        <section className="intro-section">
          <h2>Bem-vindo!</h2>
          <p>
            Este é um projeto educacional para explorar e entender diferentes
            algoritmos de criptografia através de visualizações interativas.
          </p>
          <p>
            Escolha uma cifra abaixo para começar a experimentar:
          </p>
        </section>

        <section className="ciphers-grid">
          {ciphers.map((cipher) => (
            <Link
              key={cipher.id}
              to={cipher.path}
              className="cipher-card"
            >
              <div className="cipher-icon">{cipher.icon}</div>
              <h3>{cipher.name}</h3>
              <p className="cipher-description">{cipher.description}</p>
              <div className="cipher-meta">
                <span className="badge difficulty">
                  {cipher.difficulty}
                </span>
                <span className="badge security">
                  {cipher.security}
                </span>
              </div>
            </Link>
          ))}

          {/* Card placeholder para futuras cifras */}
          <div className="cipher-card placeholder">
            <div className="cipher-icon">➕</div>
            <h3>Mais em breve...</h3>
            <p className="cipher-description">
              Novas cifras serão adicionadas em breve!
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
