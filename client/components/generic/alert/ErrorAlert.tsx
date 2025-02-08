"use client";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Flex } from "../Flex";

type ErrorAlertProps = {
  message: string;
  onClose?: () => void;
  action?: React.ReactNode;
};
export const ErrorAlert = ({ message, onClose, action }: ErrorAlertProps) => {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <Flex
      justify="between"
      items="center"
      className="w-full max-w-md p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg "
    >
      <div className="text-sm font-medium">
        <div>{message}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>

      {onClose && (
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="text-red-700 hover:text-red-900 transition"
        >
          <RiCloseLine size={20} />
        </button>
      )}
    </Flex>
  );
};
