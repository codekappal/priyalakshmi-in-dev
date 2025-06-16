import { HeaderNavConfig, FooterNavConfig } from "@/types/navigation";

// Domain constants
const DOMAINS = {
  MAIN: {
    production: "www.priyalakshmi.in",
    local: "localhost",
    all: [] as string[],
  },
  PORTFOLIO: {
    production: "www.priyalakshmi.in",
    local: "localhost",
    all: [] as string[],
  },
  PHOTOGRAPHY: {
    production: "photography.priyalakshmi.in",
    local: "photography.localhost",
    all: [] as string[],
  },
  STORE: {
    production: "store.priyalakshmi.in",
    local: "store.localhost",
    all: [] as string[],
  },
  BLOG: {
    production: "blog.priyalakshmi.in",
    local: "blog.localhost",
    all: [] as string[],
  },
};

// Initialize domain arrays
Object.values(DOMAINS).forEach((domain) => {
  domain.all = [domain.production, domain.local];
});

const ALL_DOMAINS = Object.values(DOMAINS).flatMap((domain) => domain.all);
// const EXCEPT_MAIN_DOMAINS = ALL_DOMAINS.filter(
//   (domain) => !DOMAINS.MAIN.all.includes(domain),
// );
// const EXCEPT_DETAILADDRESS_DOMAINS = ALL_DOMAINS.filter(
//   (domain) => !DOMAINS.PHOTOGRAPHY.all.includes(domain),
// );

export const siteConfig = {
  name: "Priyalakshmi - Talent Acquisition Specialist",
  description:
    "Passionate Talent Acquisition professional with 11+ years of comprehensive experience in SaaS & FinTech recruitment",
  links: {
    more: "/about",
    portfolio: "https://priyalakshmi.in",
  },
  MainDomainNavItems: [
    {
      label: "About",
      key: "about",
      isDropDown: false,
      isExternal: false,
      href: "/about",
      visibleOnDomains: [...DOMAINS.PORTFOLIO.all],
    },
    {
      label: "Experience",
      key: "experience",
      isDropDown: false,
      isExternal: false,
      href: "/experience",
      visibleOnDomains: [...DOMAINS.PORTFOLIO.all],
    },
    {
      label: "Services",
      key: "services",
      isDropDown: false,
      isExternal: false,
      href: "/services",
      visibleOnDomains: [...DOMAINS.PORTFOLIO.all],
    },
    {
      label: "Musings",
      key: "blogs",
      isDropDown: false,
      isExternal: false,
      href: "/blogs",
      visibleOnDomains: [...DOMAINS.PORTFOLIO.all],
    },
    {
      label: "Contact",
      key: "contact",
      isDropDown: false,
      isExternal: false,
      href: "/contact",
      visibleOnDomains: [...DOMAINS.PORTFOLIO.all],
    },
    // {
    //   label: "Subdomains",
    //   isDropDown: true,
    //   visibleOnDomains: ALL_DOMAINS,
    //   items: [
    //     {
    //       key: "photography",
    //       label: "Photography",
    //       description: "Personal Photography Portfolio",
    //       href: "https://photography.priyalakshmi.in",
    //       isExternal: true,
    //       isSubDomain: true,
    //       image: "/images/nav/photography.png",
    //       visibleOnDomains: [
    //         ...DOMAINS.PHOTOGRAPHY.all,
    //         ...DOMAINS.PORTFOLIO.all,
    //       ],
    //     },
    //     {
    //       key: "store",
    //       label: "Store",
    //       description: "Online Store",
    //       href: "https://store.priyalakshmi.in",
    //       isExternal: true,
    //       isSubDomain: true,
    //       image: "/images/nav/store.png",
    //       visibleOnDomains: [...DOMAINS.STORE.all, ...DOMAINS.PORTFOLIO.all],
    //     },
    //     {
    //       key: "blog",
    //       label: "Blog",
    //       description: "HR Insights & Career Tips",
    //       href: "https://blog.priyalakshmi.in",
    //       isExternal: true,
    //       isSubDomain: true,
    //       image: "/images/nav/blog.png",
    //       visibleOnDomains: [...DOMAINS.BLOG.all, ...DOMAINS.PORTFOLIO.all],
    //     },
    //   ],
    // },
  ] as HeaderNavConfig,
  FooterLinks: [
    {
      title: "Site Links",
      visibleOnDomains: ALL_DOMAINS,
      items: [
        {
          label: "About Us",
          href: "/about",
          isExternal: false,
          visibleOnDomains: DOMAINS.MAIN.all,
        },
        {
          label: "Careers",
          href: "/careers",
          isExternal: false,
          visibleOnDomains: DOMAINS.MAIN.all,
        },
        {
          label: "Blogs",
          href: "/blogs",
          isExternal: false,
          visibleOnDomains: DOMAINS.MAIN.all,
        },
      ],
    },
    {
      title: "Follow Us",
      component: "SocialLinks",
      visibleOnDomains: ALL_DOMAINS,
    },
  ] as FooterNavConfig,
};
