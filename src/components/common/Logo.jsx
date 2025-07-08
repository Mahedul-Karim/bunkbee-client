import React from 'react'
import { Link } from 'react-router'

const Logo = () => {
  return (
    <Link to="/" className='flex items-center gap-1'>
        <img src="/logo.png" alt="" className='size-10 object-cover' />
        <p className='text-muted font-semibold text-lg'>Bunk<span className='text-gradient font-bold'>BEE</span></p>
    </Link>
  )
}

export default Logo