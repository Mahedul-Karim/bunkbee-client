import React from 'react'
import Search from './sidebar/Search'
import Category from './sidebar/Category'
import Pricing from './sidebar/Pricing'

const Sidebar = () => {
  return (
    <aside className='bg-background p-4 rounded-md space-y-4 md:h-[500px]'>
        <Search />
        <Category />
        <Pricing />
    </aside>
  )
}

export default Sidebar