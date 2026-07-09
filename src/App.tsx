import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Circuits from './pages/Circuits'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/circuits" element={<Circuits />} />
      </Routes>
    </BrowserRouter>
  )
}