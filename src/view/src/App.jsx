import { useState } from 'react'
import './App.css'
import { atbash, getMapping } from '../../cyphers/atbash'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const mapping = getMapping()

  const handleEncrypt = () => {
    const result = atbash(inputText)
    setOutputText(result)
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
  }

  return (
    <div className="app">
      <header>
        <h1>🕍 Cifra de Atbash</h1>
        <p>Substituição Inversa - Uma das cifras mais antigas da antiguidade hebraica</p>
      </header>

      <main>
        <section className="cipher-info">
          <h2>Como funciona?</h2>
          <p>
            A primeira letra do alfabeto ('A') é substituída pela última ('Z'),
            a segunda ('B') pela penúltima ('Y'), e assim por diante.
          </p>
        </section>

        <section className="mapping-table">
          <h3>Mapeamento do Alfabeto</h3>
          <div className="mapping-grid">
            {mapping.map((item, index) => (
              <div key={index} className="mapping-item">
                <span className="original">{item.original}</span>
                <span className="arrow">↓</span>
                <span className="cipher">{item.cipher}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="cipher-tool">
          <h3>Experimente!</h3>
          <div className="input-group">
            <label htmlFor="input-text">Texto Original:</label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite seu texto aqui..."
              rows="4"
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
            <label htmlFor="output-text">Texto Cifrado:</label>
            <textarea
              id="output-text"
              value={outputText}
              readOnly
              placeholder="O resultado aparecerá aqui..."
              rows="4"
            />
          </div>
        </section>

        <section className="security-note">
          <h3>⚠️ Segurança</h3>
          <p>
            <strong>Extremamente fraca!</strong> Não há chave secreta.
            É mais um código cultural do que um sistema criptográfico robusto.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
