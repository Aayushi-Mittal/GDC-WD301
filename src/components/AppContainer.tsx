import React from 'react'
import Header from './Header'

const AppContainer = (props: {children: React.ReactNode}) => {
  return (
    <div className="flex p-6 bg-cyan-200 min-h-screen items-center">
      <div className="p-8 mx-auto bg-white shadow-lg rounded-xl">
        <Header title={"Welcome to 5 #react-typescript with #tailwindcss"}/>
        {props.children}
      </div>
    </div>
  )
}

export default AppContainer