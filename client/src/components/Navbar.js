import React from 'react'
import {Link} from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
      <nav className='mt-3 d-flex justify-content-center'>
        <Link to="/" className='m-3 nav-link'>Home</Link>
        <Link to="/filter" className='m-3 nav-link'>Filter</Link>
      </nav>
  </div>
  )
}