import React from 'react'
import {Link} from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
      <nav className='text-center mt-3'>
        <Link to="/" className='m-3'>Home</Link>
        <Link to="/filter" className='m-3'>Filter</Link>
      </nav>
  </div>
  )
}
