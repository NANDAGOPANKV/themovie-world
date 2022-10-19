import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/content/home/Home'
import { SignIn } from './pages/auth/SignIn'
import { SignUp } from './pages/auth/SignUp'
import { Account } from './pages/account/Account'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { NavBar } from './components/navbar/NavBar'
import { AuthContext } from './context/auth/AuthContext'

export const App = () => {
  return (
    <>
      <AuthContext>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
        </Routes>
      </AuthContext>
    </>
  )
}
