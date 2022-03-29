import React from 'react'

const Home = (props:{openFormCB: ()=> void}) => {
  return (
    <div>
      <p className="flex justify-center text-xl my-4 font-medium">Welcome to the Home Page of the Quiz</p>
      <button className="mt-4 p-2 bg-gray-100 border-2 border-cyan-200 rounded-lg hover:bg-cyan-200 w-full" onClick={props.openFormCB}>Open Form</button>
    </div>
  )
}

export default Home