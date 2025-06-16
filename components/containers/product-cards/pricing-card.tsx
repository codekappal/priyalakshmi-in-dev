// components/PricingCard.jsx
import { CheckIcon } from "lucide-react";
import { Button, Card } from "@heroui/react";
import { Link } from "@heroui/link";

export const PricingCard = ({ plan }) => {
  return (
    <Card
      className={`p-8 text-center ${plan.highlight ? "border-2 border-blue-500 transform hover:scale-105 transition-transform" : ""}`}
    >
      <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
      <p className="text-4xl font-bold text-blue-600 mb-6">
        {plan.price}
        <span className="text-medium font-extralight text-primary">
          {" "}
          {plan.period}
        </span>
      </p>
      <ul className="space-y-3 mb-8 text-left">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        as={Link}
        className={`${plan.highlight ? "bg-brandsecondary text-secondary" : "bg-default"} w-full`}
        href={plan.button.href}
        variant={plan.button.variant}
      >
        {plan.button.text}
      </Button>
    </Card>
  );
};
