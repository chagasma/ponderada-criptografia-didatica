import { useState } from 'react'
import { Link } from 'react-router-dom'
import './VigenerePage.css'
import { vigenere, getMapping } from '../../../cyphers/vigenere'

function VigenerePage() {
  const [inputText, setInputText] = useState('')
  const [key, setKey] = useState('')
  const [outputText, setOutputText] = useState('')
  const [mode, setMode] = useState('encrypt')
  const [selectedKeyChar, setSelectedKeyChar] = useState('A')

  const handleProcess = () => {
    if (!key.trim()) {
      alert('Por favor, insira uma chave!')
      return
    }
    const result = vigenere(inputText, key, mode === 'decrypt')
    setOutputText(result)
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setKey('')
  }

  const mapping = getMapping(selectedKeyChar)

  return (
    <div className="vigenere-page">
      <nav className="page-nav">
        <Link to="/" className="back-button">← Voltar para Home</Link>
      </nav>

      <header>
        <h1>🔐 Cifra de Vigenère</h1>
        <p>Cifra Polialfabética - Múltiplas cifras de César baseadas em uma palavra-chave</p>
      </header>

      <main>
        <section className="cipher-info">
          <h2>Como funciona?</h2>
          <p>
            Usa uma palavra-chave para determinar o deslocamento de cada letra.
            Cada letra da chave define uma cifra de César diferente, criando um padrão que se repete.
          </p>
        </section>

        <section className="mapping-table">
          <h3>Tabula Recta - Linha da letra: 
            <select 
              value={selectedKeyChar} 
              onChange={(e) => setSelectedKeyChar(e.target.value)}
              className="key-selector"
            >
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => (
                <option key={char} value={char}>{char}</option>
              ))}
            </select>
          </h3>
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
            <label htmlFor="key-input">Palavra-chave:</label>
            <input
              id="key-input"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Ex: CHAVE"
            />
          </div>

          <div className="mode-selector">
            <label>
              <input
                type="radio"
                value="encrypt"
                checked={mode === 'encrypt'}
                onChange={(e) => setMode(e.target.value)}
              />
              Cifrar
            </label>
            <label>
              <input
                type="radio"
                value="decrypt"
                checked={mode === 'decrypt'}
                onChange={(e) => setMode(e.target.value)}
              />
              Decifrar
            </label>
          </div>

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
            <button onClick={handleProcess} className="btn-primary">
              {mode === 'encrypt' ? 'Cifrar' : 'Decifrar'}
            </button>
            <button onClick={handleClear} className="btn-secondary">
              Limpar
            </button>
          </div>

          <div className="input-group">
            <label htmlFor="output-text">Resultado:</label>
            <textarea
              id="output-text"
              value={outputText}
              readOnly
              placeholder="O resultado aparecerá aqui..."
              rows="4"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default VigenerePage
