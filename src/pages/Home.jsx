import Banner from '@/components/home/Banner'
import FeaturedMeals from '@/components/home/FeaturedMeals'
import { MEALS } from '@/lib/data'
import React from 'react'

const Home = () => {
  return (
    <>
    <Banner />
    <FeaturedMeals meals={MEALS?.slice(0,10)} />
    </>
  )
}

export default Home