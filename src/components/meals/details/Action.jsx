import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import React from 'react'

const Action = ({price}) => {
  return (
    <div className='border border-border p-4 h-max rounded-2xl'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-dark font-medium'>Price</p>
            <p className='text-lg font-bold text-dark'>{formatCurrency(price || 0)}</p>
        </div>
        <Button className="h-10 font-semibold w-full mt-4">Request Meal</Button>
    </div>
  )
}

export default Action