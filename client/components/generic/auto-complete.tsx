"use client";
import React from "react";

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
type AutocompleteProps = {
  placement?: Placement;

  content: (props?: RenderContentProps) => React.ReactNode;
  contentClass?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      placement = "center",
      content,
      contentClass,
      value,
      onChange,
      placeholder,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const el = React.useRef<HTMLDivElement | null>(null);

    useOnClickOutside(el as React.RefObject<HTMLElement>, () => setOpen(false));

    return (
      <div ref={ref} className="w-full">
        <Popover open={open}>
          <PopoverTrigger className="w-full text-left">
            <div ref={el} className="w-full">
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
            </div>
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
  },
);
