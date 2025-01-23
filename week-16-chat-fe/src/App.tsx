import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Chat from './components/Chat'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/chat/:room' element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
