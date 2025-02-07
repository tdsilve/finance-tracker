import { useMutation } from "@tanstack/react-query";
import { SignUp } from "~/model/types";

export const useSingUpMutation = () =>
  useMutation({
    mutationFn: async (data: SignUp) => {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
