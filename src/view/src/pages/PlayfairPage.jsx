import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './PlayfairPage.css'
import { playfair, getMapping, getDigramSteps } from '../../../cyphers/playfair'

const DEFAULT_KEY = 'KEYWORD'
const DEFAULT_TEXT = 'HELLO WORLD'

function PlayfairPage() {
  const [keyPhrase, setKeyPhrase] = useState(DEFAULT_KEY)
  const [inputText, setInputText] = useState(DEFAULT_TEXT)
  const [outputText, setOutputText] = useState(() => playfair(DEFAULT_TEXT, DEFAULT_KEY, 'encode'))
  const [digramData, setDigramData] = useState(() => getDigramSteps(DEFAULT_TEXT))

  const normalizedKey = (keyPhrase.trim() || DEFAULT_KEY).toUpperCase()
  const matrixData = useMemo(() => getMapping(normalizedKey), [normalizedKey])
  const { matriz } = matrixData

  const handleEncrypt = () => {
    setOutputText(playfair(inputText, normalizedKey, 'encode'))
    setDigramData(getDigramSteps(inputText))
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setDigramData(getDigramSteps(''))
  }

  return (
    <div className="playfair-page">
      <nav className="page-nav">
        <Link to="/" className="back-button">
          ← Voltar para Home
        </Link>
      </nav>

      <header className="page-header">
        <h1>🧩 Cifra Playfair</h1>
        <p>
          Substituição poligráfica que organiza pares de letras em uma matriz 5x5 construída a partir
          de uma palavra-chave. Cada digrama segue regras claras para garantir que nenhuma letra se repita
          no mesmo par.
        </p>
      </header>

      <main>
        <section className="playfair-intro">
          <h2>Visão geral didática</h2>
          <p>
            A cifra Playfair trabalha com digramas (pares de letras) em vez de caracteres isolados.
            Isso dificulta ataques de frequência e permite demonstrar, passo a passo, como cada par é tratado:
          </p>
          <ul>
            <li>Uma matriz 5x5 é montada com a palavra-chave para determinar posições únicas.</li>
            <li>O texto só com letras válidas é dividido em pares obedecendo regras de repetição e par final.</li>
            <li>Cada par usa a regra da mesma linha, mesma coluna ou retângulo para gerar o substituto.</li>
          </ul>
        </section>

        <section className="matrix-section">
          <div className="matrix-header">
            <h3>Matriz 5x5 (chave atual: {normalizedKey})</h3>
            <p>
              A matriz define as posições de cada letra, tratando 'I' e 'J' como equivalentes.
              A ordem começa pela chave (sem repetição) e depois completa com o restante do alfabeto.
            </p>
          </div>
          <div className="matrix-grid">
            {matriz.map((linha, rowIndex) => (
              <div key={`row-${rowIndex}`} className="matrix-row">
                {linha.map((letra) => (
                  <span key={`${rowIndex}-${letra}`} className="matrix-cell">
                    {letra}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="preparation-section">
          <div className="prep-header">
            <h3>Preparação do texto</h3>
            <p>
              O texto é limpo e dividido em digramas antes de aplicar a matriz. Observe cada etapa
              para entender por que adicionamos 'X' e como os pares se formam.
            </p>
          </div>
          <p className="clean-text">
            Texto limpo: <strong>{digramData.textoLimpo || 'Nenhum texto válido ainda.'}</strong>
          </p>

          {digramData.passos.length > 0 ? (
            <div className="steps-grid">
              {digramData.passos.map((passo, index) => (
                <article key={`${passo.digrama}-${index}`} className="step-card">
                  <h4>{passo.digrama}</h4>
                  <p className="step-rule">{passo.regra}</p>
                  <p className="step-explanation">{passo.explicacao}</p>
                  <span className="step-consumption">{passo.consumo}</span>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-state">
              Digite um texto e clique em <strong>Cifrar/Decifrar</strong> para ver a sequência de digramas.
            </p>
          )}
        </section>

        <section className="cipher-tool">
          <h3>Experimente você mesmo</h3>
          <div className="input-group">
            <label htmlFor="key-input">Palavra-chave</label>
            <input
              id="key-input"
              type="text"
              value={keyPhrase}
              onChange={(e) => setKeyPhrase(e.target.value)}
              placeholder="Digite uma palavra-chave..."
            />
            <small>O campo vazio usa "{DEFAULT_KEY}" por padrão.</small>
          </div>

          <div className="input-group">
            <label htmlFor="plaintext">Texto original</label>
            <textarea
              id="plaintext"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows="4"
              placeholder="Escreva seu texto aqui..."
            />
          </div>

          <div className="button-group">
            <button onClick={handleEncrypt} className="btn-primary">
              Cifrar/Decifrar
            </button>
            <button onClick={handleClear} className="btn-secondary">
              Limpar
            </button>
          </div>

          <div className="input-group">
            <label htmlFor="ciphertext">Texto cifrado</label>
            <textarea
              id="ciphertext"
              value={outputText}
              readOnly
              rows="4"
              placeholder="O resultado aparecerá aqui..."
            />
          </div>

          <div className="security-note">
            <h4>Nota de segurança</h4>
            <p>
              A cifra Playfair melhora a segurança em comparação a cifras monoalfabéticas, porque
              quebra o texto em digramas. Ainda assim, não é adequada para uso real hoje em dia,
              mas vale como excelente ferramenta didática para visualizar manipulações de pares.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default PlayfairPage
