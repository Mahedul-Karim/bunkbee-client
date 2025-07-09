import { Input } from '@/components/ui/input'
import { Search as SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {
  return (
    <div className='flex items-center bg-white rounded-md h-10 pr-2 border border-border'>
        <Input type={'text'} className="bg-transparent shadow-none border-none text-dark" placeholder="Search Meals..." />
        <SearchIcon className='text-muted' />
    </div>
  )
}

export default Search