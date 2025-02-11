import React from 'react'
import { Button } from '~/components/ui/button';
import {Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription} from '~/components/ui/sheet'
/*I add  the following in order to fix a bug https://github.com/shadcn-ui/ui/issues/5746
  <SheetTitle className='hidden'></SheetTitle>  
  <SheetDescription className='hidden'></SheetDescription>  */

export const NavigationMobile = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild><Button>Open sheet</Button></SheetTrigger>
      <SheetContent side="right">
      <SheetTitle className='hidden'></SheetTitle>  
      <SheetDescription className='hidden'></SheetDescription> 
      </SheetContent>    </Sheet>
  )
}
