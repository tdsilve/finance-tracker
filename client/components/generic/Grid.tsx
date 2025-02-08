import React from "react";
import { cn } from "~/lib/css";

const props = {
  cols: {
    none: "grid-cols-none",
    subgrid: "grid-cols-subgrid",
    auto: "grid-cols-auto",
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  },
  rows: {
    none: "grid-rows-none",
    subgrid: "grid-rows-subgrid",
    auto: "grid-rows-auto",
    1: "grid-rows-1",
    2: "grid-rows-2",
    3: "grid-rows-3",
    4: "grid-rows-4",
    5: "grid-rows-5",
    6: "grid-rows-6",
  },
  gap: {
    0: "gap-0",
    0.5: "gap-0.5",
    1: "gap-1",
    1.5: "gap-1.5",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
    16: "gap-16",
    20: "gap-20",
    24: "gap-24",
    32: "gap-32",
    40: "gap-40",
  },
  justify: {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  },
  items: {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch",
  },
  placeItems: {
    start: "place-items-start",
    end: "place-items-end",
    center: "place-items-center",
    baseline: "place-items-baseline",
    stretch: "place-items-stretch",
  },
};

type GridProps = {
  col?: boolean;
  cols?: keyof typeof props.cols;
  rows?: keyof typeof props.rows;
  gap?: keyof typeof props.gap;
  justify?: keyof typeof props.justify;
  items?: keyof typeof props.items;
  placeItems?: keyof typeof props.placeItems;
} & React.ComponentProps<"div">;

export const Grid = ({
  cols,
  col,
  rows,
  gap,
  justify,
  items,
  placeItems,
  ...divProps
}: GridProps) => {
  return (
    <div
      {...divProps}
      className={cn(
        "grid",
        col && "grid-flow-col",
        cols && props.cols[cols],
        rows && props.rows[rows],
        gap != null && props.gap[gap],
        justify && props.justify[justify],
        items && props.items[items],
        placeItems && props.placeItems[placeItems],
        divProps.className,
      )}
    />
  );
};
