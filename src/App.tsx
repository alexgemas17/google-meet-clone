import React from 'react'
import './App.css'
import { LoginView } from './views/Login/LoginView'
import AppContext from './store/AppContext'
import { initalData } from './Dtos/ContextData'

const App: React.FunctionComponent = () => {
  return (
    <AppContext.Provider value={initalData}>
      <div>
        <LoginView />
      </div>
    </AppContext.Provider>
  )
}

export default App
