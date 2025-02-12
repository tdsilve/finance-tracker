import { Route } from "~/model/types";

export const PASSWORD_MIN = {
  min: 5,
  message: "Must be 5 or more characters long",
};

export const routes: Route[] = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Transactions",
    href: "/transactions",
  },
  {
    label: "Accounts",
    href: "/accounts",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];
