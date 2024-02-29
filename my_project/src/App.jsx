import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import  Login  from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import About from './pages/About'
import {Profile}  from './pages/Profile'
import Header from './components/Header';


function App() {
  

  return (
    <div >
      
      <BrowserRouter>
       <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
