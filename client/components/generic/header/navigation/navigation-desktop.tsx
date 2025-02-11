import React from 'react'
import { NavigationItem } from './navigation-item';
import { routes } from "~/model/constants";
import { Flex } from '../../flex';


export const NavigationDesktop = () => {
  return (
    
    <Flex  items='center' className='gap-x-3'>
        {routes?.map(({href, label}) => <NavigationItem key={href} href={href} label={label}/>)}
    </Flex>
  )
}
