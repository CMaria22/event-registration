import type { IconName } from "./Icon";

export type NavItem = {
  id: string;
  href: string;
  label: string; // desktop wording
  shortLabel: string; // mobile tab bar wording
  icon: IconName;
  mobileOnly?: boolean;
};

// Single source of truth for navigation.
export const navItems: NavItem[] = [
  {
    id: "explore",
    href: "/events",
    label: "Explore events",
    shortLabel: "Explore",
    icon: "search",
  },
  {
    id: "mine",
    href: "/my-registration",
    label: "My registrations",
    shortLabel: "My events",
    icon: "list",
  },
  {
    id: "profile",
    href: "/profile",
    label: "Profile",
    shortLabel: "Profile",
    icon: "user",
    mobileOnly: true,
  },
];

// "/" must match exactly; other routes also match their sub-routes (/registrations/123).
export function isActive(pathname: string, href: string): boolean {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}
