import { useWindowSize } from "usehooks-ts";

export const useIsMobileScreen = (val: number = 786) => {
  const { width } = useWindowSize();
  return width <= val;
};
