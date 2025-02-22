"use client";
import React from "react";
import { Flex } from "../../flex";
import { NavigationList } from "./navigation-list";
import { useIsMobileScreen } from "~/hooks/useIsMobileScreen";
import { SheetContainer } from "../../sheet/sheet-container";
import { RiMenuLine } from "react-icons/ri";
import { Button } from "~/components/ui/button";

export const NavigationMobile = () => {
  const isMobile = useIsMobileScreen(1024);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <SheetContainer
      open={open}
      setOpen={setOpen}
      sheetTrigger={
        <Button
          variant={"ghost"}
          className="border-none text-white hover:bg-white/20"
        >
          <RiMenuLine />
        </Button>
      }
    >
      <Flex col className="mt-12">
        <NavigationList onClick={() => setOpen(false)} />
      </Flex>
    </SheetContainer>
  );
};
