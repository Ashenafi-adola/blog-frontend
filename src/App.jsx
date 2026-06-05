
import './App.css'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import CreatePost from './pages/CreatePost'
import ViewPost from './pages/ViewPost'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <NavBar/>
      <hr />
        <Routes>
          <Route path='/home' element={<HomePage/>}/>    
          <Route path='/add-post' element={<CreatePost/>}/>    
          <Route path='/view-post/:id' element={<ViewPost />}/>    
        </Routes>
    </>
  )
}

export default App
