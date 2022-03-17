import React from 'react'

const AppContainer = (props: {children: React.ReactNode}) => {
  return (
    <div className="flex h-screen bg-cyan-200 items-center">
      <div className=" p-8 mx-auto bg-white shadow-lg rounded-xl">
        {props.children}
      </div>
    </div>
  )
}

export default AppContainer