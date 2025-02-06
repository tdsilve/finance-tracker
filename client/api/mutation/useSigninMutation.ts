import { useMutation } from "@tanstack/react-query";
import { SignIn } from "~/model/types";

export const useSingInMutation = () => useMutation({
    mutationFn: async (data: SignIn) => {
        const response = await fetch("http://localhost:8000/auth/login", {
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
}) 