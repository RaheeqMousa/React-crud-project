import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Users from './components/User/Users'
import Create from './components/User/Create'
import Details from './components/User/Details'
import {Route, Routes} from 'react-router-dom'

export default function App() {

  return (
    <>
      <Navbar/>

      <div className='container'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} /> 
            <Route path="/users/:id" element={<Details />} />
            <Route path="/create" element={<Create />} />
        </Routes>
      </div>
        

      <Footer/>
    </>
  )

}
