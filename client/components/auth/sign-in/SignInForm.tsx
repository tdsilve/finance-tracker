"use client";
import React from "react";
// import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "~/model/schemas";
import { Button } from "~/components/ui/button";
import { Flex } from "~/components/generic/Flex";
import { SignIn } from "~/model/types";

export const SignInForm = () => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignIn) => {
    console.log(data);
  }
  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
      <Flex col>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} required/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} required/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" >Sign in</Button>
        </Flex>
      </form>
    </Form>
  );
};
