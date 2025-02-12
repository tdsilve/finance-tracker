"use client"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,

  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { UserAvatar } from "./UserAvatar"

import React from 'react'

const menuItems = [
  {
    label: "Profile",
  },
  {
    label: "Log out",
  }
]

export const UserButton = () =>{

 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"rounded-full-fit"}><UserAvatar name="Thais" profileImage=""/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit bg-white">
  
  
        <DropdownMenuGroup>
          {menuItems.map(({label}) => (
            <DropdownMenuItem key={label}>
              <button>{label}</button>
            </DropdownMenuItem>
          ))}
         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
       
          
           
      
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
