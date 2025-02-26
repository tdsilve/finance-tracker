"use client";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Flex } from "../flex";
import { Button } from "~/components/ui/button";

type ErrorAlertProps = {
  message: string;
  onClose?: () => void;
  action?: () => void;
  isLoading?: boolean;
};
export const NoDataAlert = ({ message, onClose, action, isLoading }: ErrorAlertProps) => {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <Flex
      justify="between"
      items="center"
      className="mx-auto w-full max-w-md rounded-lg border border-yellow-400 bg-yellow-100  p-4 "
    >
      <div className="w-full  text-center text-sm font-medium">
        <div>{message}</div>
        {action && (
          <Button
          loading={isLoading}
            className="mt-2"
            onClick={() => action?.()}
            variant={"outline"}
          >
            Try again
          </Button>
        )}
      </div>

      {onClose && (
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="text-yellow-700 transition hover:text-yellow-900"
        >
          <RiCloseLine size={20} />
        </button>
      )}
    </Flex>
  );
};
