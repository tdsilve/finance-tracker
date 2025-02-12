import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { UserAvatar } from "./UserAvatar"

const menuItems = [
  
]

export const UserButton = () =>{
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"rounded-full-fit"}><UserAvatar name="Thais" profileImage=""/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit bg-white">
  
  
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {/* <User /> */}
            <span>Profile</span>
     
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <CreditCard /> */}
            <span>Billing</span>

          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <Settings /> */}
            <span>Settings</span>

          </DropdownMenuItem>
          <DropdownMenuItem>

            <span>Keyboard shortcuts</span>

          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
       
          
           
      
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
