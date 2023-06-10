import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import Hotel from './Hotel'
import './css/App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/hotel' element={<Hotel />} />
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
