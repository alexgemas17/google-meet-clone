import React from 'react'
import './App.css'
import { LoginView } from './views/Login/LoginView'
import { initalData } from './Dtos/ContextData'

const App: React.FunctionComponent = () => {
  return (
    <div>
      <LoginView />
    </div>
  )
}

export default App
