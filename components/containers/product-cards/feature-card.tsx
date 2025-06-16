import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter, Link } from "@heroui/react";

interface BenefitItem {
  description: string;
  icon?: React.ReactNode;
  href?: string;
  isExternal?: boolean;
  hrefText?: string;
  title: string;
  features: string[];
}

interface BenefitCardProps {
  feature: BenefitItem;
  className?: string;
}

export const FeatureCard = ({ feature, className }: BenefitCardProps) => {
  return (
    <Card className={`p-6 bg-transparent  shadow-none ${className}`}>
      <CardHeader className="flex items-center mb-4">
        {feature.icon && (
          <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full mr-4">
            {feature.icon}
          </div>
        )}
        <h3 className="text-xl font-semibold">{feature.title}</h3>
      </CardHeader>
      <CardBody>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          {feature.description}
        </p>
        <ul className="space-y-2">
          {feature.features.map((item, i) => (
            <li key={i} className="flex items-start">
              <svg
                className="h-5 w-5 text-brandsecondary mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <span className="text-slate-600 dark:text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
      </CardBody>
      {feature.href && (
        <CardFooter className="pt-4">
          <Button
            as={Link}
            className="w-full bg-secondary text-header"
            href={feature.isExternal ? "https://" + feature.href : feature.href}
            isExternal={feature.isExternal}
            variant="flat"
          >
            {feature.hrefText || "Learn more"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
