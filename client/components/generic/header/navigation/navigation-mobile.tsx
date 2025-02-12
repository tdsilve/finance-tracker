import React from "react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "~/components/ui/sheet";
import { Flex } from "../../flex";
import { NavigationList } from "./navigation-list";
import { RiMenuLine } from "react-icons/ri";

/*I add  the following in order to fix a bug https://github.com/shadcn-ui/ui/issues/5746
  <SheetTitle className='hidden'></SheetTitle>  
  <SheetDescription className='hidden'></SheetDescription>  */

export const NavigationMobile = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="border">
        <Button
          variant={"ghost"}
          className="border-none text-white hover:bg-white/20"
        >
          <RiMenuLine />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white p-0">
        <SheetTitle className="hidden"></SheetTitle>
        <SheetDescription className="hidden"></SheetDescription>
        <Flex col className="mt-12">
          <NavigationList />
        </Flex>
      </SheetContent>{" "}
    </Sheet>
  );
};
