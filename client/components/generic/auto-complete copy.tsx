"uyse client";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/css";

type Placement = "center" | "start" | "end";

type RenderChildrenProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  bind: {
    ref: React.RefObject<HTMLElement | null>;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

type RenderContentProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};
type PopoverDemoProps = {
  placement?: Placement;

  children: (props: RenderChildrenProps) => React.ReactNode;
  content: (props?: RenderContentProps) => React.ReactNode;
  contentClass?: string;
};

export function PopoverDemo({
  placement = "center",
  children,
  content,
  contentClass,
}: PopoverDemoProps) {
  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef<HTMLElement | null>(null);
  const isOpen = open;

  // React.useEffect(() => {
  //   if(open && anchorEl.current) {
  //     setTimeout(() => {
  //       anchorEl.current?.focus();
  //     },100)
  //   }
  // }, [open]);

  return (
    <Popover open={open}>
      <PopoverTrigger className="text-left">
        {children({
          open: isOpen,
          setOpen,
          bind: {
            ref: anchorEl,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === "Tab" || e.key === "Escape") {
                e.preventDefault();
                setOpen(false);
              }
            },
            onChange: () => {
              setOpen(true);
            },
          },
        })}
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-full ", contentClass)}
        align={placement}
        tabIndex={-1}
      >
        {content({ open, setOpen })}
      </PopoverContent>
    </Popover>
  );
}
