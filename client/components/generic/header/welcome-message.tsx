
import React from 'react'
import { Heading } from '../heading'


export const WelcomeMessage = () => {
    //todo add username
  return (
    <div className='text-white space-y-2'>
        <Heading>Welcome</Heading> 
        <p className='text-sm lg:text-base'>This is your financial overview report</p>
    </div>
  )
}
