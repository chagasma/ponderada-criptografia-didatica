import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AtbashPage from './pages/AtbashPage'
import PlayfairPage from './pages/PlayfairPage'
import VigenerePage from './pages/VigenerePage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/atbash" element={<AtbashPage />} />
        <Route path="/playfair" element={<PlayfairPage />} />
        <Route path="/vigenere" element={<VigenerePage />} />
      </Routes>
    </Router>
  )
}

export default App
