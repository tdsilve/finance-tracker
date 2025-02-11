"use client";

import React from 'react'
import { NavigationDesktop} from './navigation-desktop';
import { NavigationMobile } from './navigation-mobile';



export const Navigation = () => {
  return (
    
    <nav >
        <div className='hidden lg:block'>
        <NavigationDesktop/>
        </div>
        <div className='block lg:hidden'><NavigationMobile/></div>
       
    </nav>
  )
}
