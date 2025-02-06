"use client";
import React from "react";
import Image from "next/image";
import LoginImage from "../../../assets/images/svg/login.svg";

type SignInMainImageProps = {
  width?: number;
  height?: number;
};
export const SignUpMainImage = ({
  width = 1000,
  height = 500,
}: SignInMainImageProps) => {
  return (
    <Image src={LoginImage} alt="Login Main" width={width} height={height} />
  );
};
