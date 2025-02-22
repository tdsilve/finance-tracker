"use client";
import React, { use } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/css";
import { Input } from "../ui/input";
import { useOnClickOutside } from "usehooks-ts";

type Placement = "center" | "start" | "end";

type RenderContentProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};
type PopoverDemoProps = {
  placement?: Placement;

  content: (props?: RenderContentProps) => React.ReactNode;
  contentClass?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Autocomplete = ({
  placement = "center",
  content,
  contentClass,
  value,
  onChange,
  placeholder,
}: PopoverDemoProps)  => {
  const [open, setOpen] = React.useState(false);
  const el = React.useRef<HTMLDivElement| null >(null) ;

  useOnClickOutside(el  as React.RefObject<HTMLElement>, () => setOpen(false));

  return (
  <div ref={el} className="w-full">


    <Popover open={open} >
      <PopoverTrigger className="text-left w-full">
        <Input
        className="w-full"
          onMouseEnter={() => setOpen(true)}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
        />
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-full ", contentClass)}
        align={placement}
        tabIndex={-1}
      >
        {content({ open, setOpen })}
      </PopoverContent>
    </Popover>
    </div>
  );
}
