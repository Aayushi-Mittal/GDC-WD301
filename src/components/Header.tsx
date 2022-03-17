import React from 'react'
import logo from '../logo.svg';

const Header = (props:{title:string}) => {
  return (
    <div className="flex items-center">
        <img src={logo} className="w-16 h-16 animate-spin" alt="logo" />
        <h1 className="text-center text-2xl pt-2 font-semibold">{props.title}</h1>
    </div>
  )
}

export default Header