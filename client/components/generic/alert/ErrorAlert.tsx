"use client";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Flex } from "../flex";
import { Button } from "~/components/ui/button";

type ErrorAlertProps = {
  message: string;
  onClose?: () => void;
  action?: () => void;
};
export const ErrorAlert = ({ message, onClose, action }: ErrorAlertProps) => {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <Flex
      justify="between"
      items="center"
      className="w-full max-w-md rounded-lg border border-red-400 bg-red-100 p-4  mx-auto "
    >
      <div className="text-sm font-medium text-center border w-full">
        <div className="text-red-700">{message}</div>
        {action && <Button className="mt-2" onClick={() => action?.()} variant={"destructive"}>Try again</Button>}
      </div>

      {onClose && (
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="text-red-700 transition hover:text-red-900"
        >
          <RiCloseLine size={20} />
        </button>
      )}
    </Flex>
  );
};
