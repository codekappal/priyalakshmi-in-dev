export const DomainLinks = {
  MainDomain: { name: "Priyalakshmi.in", href: "/" },
  PhotographyDomain: {
    name: "My Photography",
    href: "https://photography.priyalakshmi.in",
  },

  Policy: {
    Terms: { name: "Terms of Service", href: "/policy/terms" },
    PrivacyPolicy: { name: "Privacy Policy", href: "/policy/privacy" },
  },
  Email: {
    CompanyEmail: {
      name: "Corporate Email",
      href: "priyalakshmi.mba2012@gmail.in",
    },
  },
  Phone: {
    CompanyPhone: {
      name: "Kappal",
      href: "+91 9445929686",
    },
  },
  Address: {
    RegisteredOffice: {
      name: "No:4, Pettai Street, Virudhunagar, Tamilnadu, PIN-626001",
      href: "https://maps.app.goo.gl/ACD8X7nirZqJKdcE9",
    },
    GenericAddress: {
      name: "CHENNAI | VIRUDHUNAGAR, TAMILNADU, INDIA",
      href: "#",
    },
  },
};

// Professional Experience Data
export const ProfessionalData = {
  careerStartYear: 2013,
  getExperienceYears: () => new Date().getFullYear() - 2013,
  getMentoringYears: () => new Date().getFullYear() - 2021, // Started mentoring in 2021
};
