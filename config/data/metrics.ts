// Centralized metrics data for consistency across the application
export const businessMetrics = {
  industries: {
    count: "4+",
    label: "Industries",
    fullLabel: "Industry Sectors",
    description: "E-commerce, Agriculture, Cloud & Ads",
    list: ["E-commerce", "Agriculture", "Cloud", "Ads", "Industrial"],
  },
  products: {
    count: "5+",
    label: "Products",
    fullLabel: "Product Solutions",
    description: "comprehensive platform offerings",
    list: [
      "E-Commerce Platform",
      "Farm ERP",
      "Cloud Solutions",
      "Kappal Ads",
      "Industrial ERP Solutions",
    ],
  },
  clients: {
    count: "25+",
    label: "Clients",
    fullLabel: "Enterprise Clients",
    description: "trust us with their digital transformation",
  },
  uptime: {
    count: "99.9%",
    label: "Uptime",
    fullLabel: "System Uptime",
    description: "guaranteed across all platforms",
  },
} as const;

// Export individual metrics for easy access
export const { industries, products, clients, uptime } = businessMetrics;
