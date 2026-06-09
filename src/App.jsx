
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import CreatePost from './pages/CreatePost'
import ViewPost from './pages/ViewPost'
import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import ProtectedRout from './components/ProtectedRoute'
import UpdatePage from './pages/UpdatePage'

function App() {

  return (
    <>
      <NavBar/>
      <div className="pt-5">
        <hr />
        <Routes>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/add-post' element={<ProtectedRout><CreatePost/></ProtectedRout> }/>
          <Route path='/view-post/:id' element={<ViewPost />}/>    
          <Route path='/auth/:page' element={ < AuthPage />} />
          <Route path='/update-post/:id/' element={<UpdatePage/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
