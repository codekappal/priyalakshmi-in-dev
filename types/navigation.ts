export type HeaderNavItem = {
  label: string;
  key?: string;
  isDropDown: boolean;
  visibleOnDomains: string[];
  items?: {
    key?: string;
    label: string;
    description?: string;
    isSubDomain: boolean;
    href: string;
    isExternal: boolean;
    image: string;
    visibleOnDomains: string[];
  }[];
  href?: string;
  isExternal?: boolean;
};

export type HeaderNavConfig = HeaderNavItem[];

export type FooterNavItem = {
  label: string;
  href: string;
  isExternal: boolean;
  visibleOnDomains: string[];
};

export type FooterNavSection = {
  title: string;
  visibleOnDomains: string[];
  items?: FooterNavItem[];
  component?: string; // For special cases like SocialLinks
};

export type FooterNavConfig = FooterNavSection[];
