"use client";
import { useWindowSize } from "usehooks-ts";


export const useIsMobileScreen = (breakPoint: number = 786) => {


  const { width } = useWindowSize({
    initializeWithValue: false
  });

  

  return  !!width && width <= breakPoint;

};
