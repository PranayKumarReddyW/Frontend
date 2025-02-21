import { Icons } from "@/components/icons";

interface NavItem {
  title: string;
  to?: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export const mainMenu: NavItemWithChildren[] = [
  {
    title: "Dashboard",
    to: "dashboard",
  },
  {
    title: "Events",
    to: "events",
  },
  {
    title: "Signup",
    to: "signup",
  },
];

export const sideMenu: NavItemWithChildren[] = [];
