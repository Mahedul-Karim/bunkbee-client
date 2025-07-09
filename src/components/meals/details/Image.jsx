import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import React from 'react'

const Image = ({src,status,likes}) => {
  return (
    <div className='relative'>
        <img src={src} alt="" className='max-h-[500px] w-full object-cover object-center rounded-2xl' />
        <div className='absolute top-2 left-2'>
            <Badge className={'rounded-full bg-accent text-dark font-semibold'}>{status}</Badge>
        </div>
        <div className='absolute top-2 right-2'>
            <Button size="sm" className="cursor-pointer bg-white/90 text-dark hover:bg-white/90" >
                <Heart className='text-gray-600' /> {likes}
            </Button>
        </div>
    </div>
  )
}

export default Image