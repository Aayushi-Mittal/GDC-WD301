import React from 'react'
import logo from '../logo.svg';
import { ActiveLink } from "raviger";

const Header = (props: { title: string }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-1 items-center">
        <img src={logo} className="w-16 h-16 animate-spin" alt="logo" />
        <h1 className="text-2xl pt-2 font-semibold">{props.title}</h1>
      </div>
      <div className="flex gap-1 items-center ml-2">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
        ].map((link) => (
          <ActiveLink key={link.url}
            href={link.url}
            className="p-2 font-semibold pt-2 m-2 uppercase"
            exactActiveClass="p-2 rounded-lg bg-cyan-100">{link.page}</ActiveLink>
        ))}
      </div>
    </div>
  )
}

export default Header