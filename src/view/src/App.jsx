import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AtbashPage from './pages/AtbashPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/atbash" element={<AtbashPage />} />
      </Routes>
    </Router>
  )
}

export default App
